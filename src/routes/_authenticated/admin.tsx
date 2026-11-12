import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { queryOptions, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { Save, Search, Upload, RotateCcw, LogOut, ExternalLink, FileText, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { getAdminContent, saveContent } from '@/components/cms/content.functions';
import catalog from '@/components/cms/catalog.json';
const adminOptions = queryOptions({ queryKey: ['admin-content'], queryFn: () => getAdminContent() });
export const Route = createFileRoute('/_authenticated/admin')({
  loader: ({ context }) => context.queryClient.ensureQueryData(adminOptions),
  component: Admin,
  head: () => ({ meta: [{ title: 'Urejanje vsebine — terjatve.si' }, { name: 'description', content: 'Skrbniška nadzorna plošča za besedila in slike terjatve.si.' }, { property: 'og:title', content: 'Urejanje vsebine — terjatve.si' }, { property: 'og:description', content: 'Skrbniška nadzorna plošča terjatve.si.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});
function Admin() {
  const { data } = useSuspenseQuery(adminOptions);
  const logoUrl = (label: string) => {
    const entry = catalog.find(item => item.kind === 'image' && item.label === label);
    return entry ? data.rows.find(row => row.key === entry.key)?.value ?? entry.defaultValue : undefined;
  };
  const qc = useQueryClient(), navigate = useNavigate(), save = useServerFn(saveContent);
  const [values, setValues] = useState<Record<string,string>>(() => Object.fromEntries(data.rows.map(x => [x.key,x.value])));
  const [original, setOriginal] = useState(values);
  const [search,setSearch] = useState(''), [group,setGroup] = useState('Vse'), [mode,setMode] = useState('text');
  const [busy,setBusy] = useState(false), [uploading,setUploading] = useState(''), [message,setMessage] = useState('');
  const dirty = catalog.filter(x => (values[x.key] ?? x.defaultValue) !== (original[x.key] ?? x.defaultValue));
  const groups = ['Vse', ...new Set(catalog.filter(x => x.kind === mode).map(x => x.group))];
  const visible = catalog.filter(x => x.kind===mode && (group==='Vse'||x.group===group) && `${x.label} ${values[x.key]??x.defaultValue}`.toLowerCase().includes(search.toLowerCase()));
  async function signOut() { await qc.cancelQueries(); qc.clear(); await supabase.auth.signOut(); await navigate({ to:'/auth',replace:true }); }
  async function publish() { setBusy(true); setMessage(''); try { await save({ data: dirty.map(x => ({key:x.key,kind:x.kind as 'text'|'image',value:values[x.key]??x.defaultValue})) }); setOriginal({...values}); await qc.invalidateQueries({queryKey:['site-content']}); setMessage('Spremembe so shranjene.'); } catch { setMessage('Shranjevanje ni uspelo. Poskusite znova.'); } finally {setBusy(false);} }
  async function upload(key:string,file:File) { setUploading(key); setMessage(''); try {
    if (!['image/jpeg','image/png','image/webp','image/gif','image/avif'].includes(file.type) || file.size>10*1024*1024) throw Error('Izberite JPG, PNG, WebP, GIF ali AVIF do 10 MB.');
    const path=`${crypto.randomUUID()}.${file.type.split('/')[1]}`;
    const {error}=await supabase.storage.from('website-images').upload(path,file,{contentType:file.type}); if(error)throw error;
    const {data: link,error:linkError}=await supabase.storage.from('website-images').createSignedUrl(path,315360000); if(linkError||!link)throw linkError;
    setValues(v=>({...v,[key]:link.signedUrl}));
  } catch(error) {setMessage(error instanceof Error ? error.message : 'Nalaganje slike ni uspelo.');} finally {setUploading('');} }
  if(!data.allowed) return <main className="cms-auth"><h1>Dostop ni dovoljen</h1><p>Ta račun nima skrbniškega dostopa.</p><Button onClick={signOut}>Odjava</Button><Link to="/">Nazaj na stran</Link></main>;
  return <div className="cms-shell"><aside className="cms-sidebar"><Link to="/" className="cms-brand cms-brand--logo" aria-label="terjatve.si — spletna stran"><img className="cms-brand__dark" src={logoUrl('logo-white.png')} alt="terjatve.si"/><img className="cms-brand__light" src={logoUrl('logo.png')} alt="terjatve.si"/></Link><div className="cms-eyebrow">UREJANJE VSEBINE</div><nav><Button variant="original" className={`cms-nav ${mode==='text'?'is-active':''}`} onClick={()=>{setMode('text');setGroup('Vse');setSearch('')}}><FileText size={18}/>Besedila <span>{catalog.filter(x=>x.kind==='text').length}</span></Button><Button variant="original" className={`cms-nav ${mode==='image'?'is-active':''}`} onClick={()=>{setMode('image');setGroup('Vse');setSearch('')}}><ImageIcon size={18}/>Slike <span>{catalog.filter(x=>x.kind==='image').length}</span></Button></nav><div className="cms-groups">{groups.map(g=><Button key={g} variant="original" className={`cms-group ${group===g?'is-active':''}`} onClick={()=>setGroup(g)}>{g}</Button>)}</div><Button variant="original" className="cms-nav cms-logout" onClick={signOut}><LogOut size={18}/>Odjava</Button></aside><main className="cms-main"><header className="cms-toolbar"><div><div className="cms-eyebrow">NADZORNA PLOŠČA</div><h1>{mode==='text'?'Besedila':'Slike'}</h1></div><div className="cms-actions"><Button variant="outline" asChild><Link to="/" target="_blank"><ExternalLink/>Ogled strani</Link></Button><Button onClick={publish} disabled={busy||uploading!==''||dirty.length===0}><Save/>{busy?'Shranjevanje …':'Shrani spremembe'}{dirty.length>0?` (${dirty.length})`:''}</Button></div></header><div className="cms-filter"><Search size={18}/><Input aria-label="Poišči vsebino" placeholder="Poišči vsebino …" value={search} onChange={e=>setSearch(e.target.value)}/><span>{visible.length} polj</span></div>{message&&<p role="status" className="cms-status">{message}</p>}<div className={mode==='image'?'cms-images':'cms-fields'}>{visible.map(entry=><section key={entry.key} className="cms-field"><div className="cms-field-head"><label htmlFor={entry.key}>{entry.label}</label><Button variant="ghost" size="icon" title="Povrni izvirno vsebino" aria-label={`Povrni: ${entry.label}`} onClick={()=>setValues(v=>({...v,[entry.key]:entry.defaultValue}))}><RotateCcw/></Button></div><span className="cms-field-group">{entry.group}</span>{entry.kind==='text'?<Textarea id={entry.key} value={values[entry.key]??entry.defaultValue} rows={(values[entry.key]??entry.defaultValue).length>120?4:2} onChange={e=>setValues(v=>({...v,[entry.key]:e.target.value}))}/>:<><img className="cms-image" src={values[entry.key]??entry.defaultValue} alt={entry.label}/><label className="cms-upload"><Upload size={16}/>{uploading===entry.key?'Nalaganje …':'Zamenjaj sliko'}<input type="file" aria-label={`Zamenjaj sliko: ${entry.label}`} accept="image/jpeg,image/png,image/webp,image/gif,image/avif" disabled={!!uploading||busy} onChange={e=>{const file=e.target.files?.[0];if(file)void upload(entry.key,file);e.target.value='';}}/></label></>}</section>)}</div>{visible.length===0&&<p className="cms-empty">Ni zadetkov.</p>}</main></div>;
}
