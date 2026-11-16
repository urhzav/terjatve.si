import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { useEffect,useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { getPublicContent } from '@/components/cms/content.functions';
import catalog from '@/components/cms/catalog.json';
const publicOptions = queryOptions({ queryKey: ['site-content'], queryFn: () => getPublicContent() });
export const Route = createFileRoute('/auth')({ component:Auth, head:()=>({meta:[{title:'Skrbniška prijava — terjatve.si'},{name:'description',content:'Prijava za urejanje spletne strani terjatve.si.'},{property:'og:title',content:'Skrbniška prijava — terjatve.si'},{property:'og:description',content:'Varna prijava za skrbnike terjatve.si.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex,nofollow'}]}) });
function Auth(){const navigate=useNavigate();const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[register,setRegister]=useState(false);
const { data: content } = useQuery(publicOptions);
const logoUrl = (label: string) => {
  const entry = catalog.find(item => item.kind === 'image' && item.label === label);
  return entry ? content?.find(row => row.key === entry.key)?.value ?? entry.defaultValue : undefined;
};
useEffect(()=>{void supabase.auth.getUser().then(({data})=>{if(data.user)void navigate({to:'/admin'});});},[navigate]);
async function resetPassword(){if(!/^\S+@\S+\.\S+$/.test(email)){setMessage('Najprej vpišite svoj e-poštni naslov.');return;}setBusy(true);setMessage('');try{const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/reset-password`});if(error)throw error;setMessage('Če račun obstaja, boste prejeli povezavo za nastavitev gesla.');}catch{setMessage('Povezave ni bilo mogoče poslati. Poskusite znova pozneje.');}finally{setBusy(false);}}
async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage('');try{const result=register?await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${window.location.origin}/auth`}}):await supabase.auth.signInWithPassword({email,password});if(result.error)throw result.error;if(result.data.session)await navigate({to:'/admin'});else setMessage('Preverite e-pošto in potrdite račun.');}catch{setMessage('Preverite e-pošto in geslo ter poskusite znova.');}finally{setBusy(false);}}
return <main className="cms-auth"><Link to="/" className="cms-brand cms-brand--logo" aria-label="terjatve.si — spletna stran"><img className="cms-brand__dark" src={logoUrl('logo-white.png')} alt="terjatve.si"/><img className="cms-brand__light" src={logoUrl('logo.png')} alt="terjatve.si"/></Link><div className="cms-eyebrow">SKRBNIŠKI DOSTOP</div><h1>{register?'Ustvari račun':'Prijava'}</h1><form onSubmit={submit}><label>E-pošta<Input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Geslo<Input type="password" autoComplete={register?'new-password':'current-password'} required minLength={8} value={password} onChange={e=>setPassword(e.target.value)}/></label><Button type="submit" disabled={busy}>{busy?'Počakajte …':register?'Ustvari račun':'Prijava'}</Button></form><Button variant="ghost" onClick={resetPassword} disabled={busy}>Nastavi ali ponastavi geslo</Button><Button variant="ghost" onClick={()=>setRegister(!register)}>{register?'Že imam račun':'Ustvari račun z e-pošto'}</Button>{message&&<p role="status">{message}</p>}<Link to="/">Nazaj na spletno stran</Link></main>;}
