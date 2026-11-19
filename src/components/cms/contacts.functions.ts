import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { inquirySchema, validateAttachments } from './contact-validation';

export const submitInquiry = createServerFn({ method: 'POST' })
  .inputValidator((input: FormData) => {
    if (!(input instanceof FormData)) throw new Error('Neveljavno povpraševanje.');
    return input;
  }).handler(async ({ data }) => {
    const values = inquirySchema.parse(Object.fromEntries(['name','email','phone','service','amount','message'].map(key => [key, String(data.get(key) ?? '')])));
    const files = data.getAll('files').filter((file): file is File => file instanceof File && file.size > 0);
    validateAttachments(files);
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { count, error: rateError } = await supabaseAdmin.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('email', values.email).gte('created_at', new Date(Date.now() - 60000).toISOString());
    if (rateError) throw new Error('Oddaja trenutno ni mogoča. Poskusite znova.');
    if ((count ?? 0) >= 3) throw new Error('Poskusite znova čez minuto.');
    const id = crypto.randomUUID();
    const attachments: { name: string; path: string; size: number }[] = [];
    try {
      for (const file of files) {
        const path = `${id}/${crypto.randomUUID()}`;
        const { error } = await supabaseAdmin.storage.from('contact-attachments').upload(path, file, { contentType: 'application/octet-stream' });
        if (error) throw error;
        attachments.push({ name: file.name.slice(0, 255), path, size: file.size });
      }
      const { error } = await supabaseAdmin.from('contact_submissions').insert({ id, ...values, attachments });
      if (error) throw error;
      return { id };
    } catch {
      if (attachments.length) await supabaseAdmin.storage.from('contact-attachments').remove(attachments.map(file => file.path));
      throw new Error('Povpraševanja ni bilo mogoče shraniti. Poskusite znova.');
    }
  });

export const getContacts = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: allowed, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (roleError || allowed !== true) throw new Error('Nimate skrbniškega dostopa.');
  const { data, error } = await context.supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
});
export const getContactAttachment = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((path: string) => {
  if (typeof path !== 'string' || !/^[0-9a-f-]{36}\/[0-9a-f-]{36}$/.test(path)) throw new Error('Neveljavna priloga.');
  return path;
}).handler(async ({ data, context }) => {
  const { data: allowed } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (allowed !== true) throw new Error('Nimate skrbniškega dostopa.');
  const { data: link, error } = await context.supabase.storage.from('contact-attachments').createSignedUrl(data, 60, { download: true });
  if (error || !link) throw new Error('Prenos ni uspel.');
  return link.signedUrl;
});