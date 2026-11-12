import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { contentSchema, canEdit } from './validation';
import type { Database } from '@/integrations/supabase/types';

export const getPublicContent = createServerFn({ method: 'GET' }).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error('Vsebina trenutno ni dosegljiva.');
  const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
    const h = new Headers(init?.headers); if (key.startsWith('sb_') && h.get('Authorization') === `Bearer ${key}`) h.delete('Authorization'); h.set('apikey', key); return fetch(input, { ...init, headers: h });
  } } });
  const { data, error } = await client.from('site_content').select('key,value,kind');
  if (error) throw error;
  return data ?? [];
});
export const getAdminContent = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: role, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (roleError || !canEdit(role)) return { allowed: false, rows: [] };
  const { data, error } = await context.supabase.from('site_content').select('key,value,kind');
  if (error) throw error;
  return { allowed: true, rows: data ?? [] };
});
export const saveContent = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(input => contentSchema.parse(input)).handler(async ({ data, context }) => {
  const { data: role, error: roleError } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (roleError || !canEdit(role)) throw new Error('Nimate skrbniškega dostopa.');
  if (!data.length) return { success: true };
  const { error } = await context.supabase.from('site_content').upsert(data.map(row => ({ ...row, updated_at: new Date().toISOString() })));
  if (error) throw error;
  return { success: true };
});