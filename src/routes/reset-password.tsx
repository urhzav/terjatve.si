import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
  head: () => ({ meta: [
    { title: 'Nastavitev gesla — terjatve.si' },
    { name: 'description', content: 'Varna nastavitev gesla za skrbniški račun terjatve.si.' },
    { property: 'og:title', content: 'Nastavitev gesla — terjatve.si' },
    { property: 'og:description', content: 'Nastavitev skrbniškega gesla.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'robots', content: 'noindex,nofollow' },
  ] }),
});

function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    let active = true;
    // getSession waits for the SDK to consume recovery/invitation tokens from the URL.
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setReady(!!data.session);
      if (!data.session) setMessage('Povezava je potekla ali ni veljavna. Zahtevajte novo povezavo za geslo.');
    });
    return () => { active = false; };
  }, []);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (password !== confirm) { setMessage('Gesli se ne ujemata.'); return; }
    setBusy(true); setMessage('');
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      await navigate({ to: '/admin' });
    } catch { setMessage('Gesla ni bilo mogoče shraniti. Izberite močnejše geslo ali zahtevajte novo povezavo.'); }
    finally { setBusy(false); }
  }
  return <main className="cms-auth">
    <Link to="/" className="cms-brand">terjatve<span>.si</span></Link>
    <div className="cms-eyebrow">SKRBNIŠKI DOSTOP</div>
    <h1>Nastavi geslo</h1>
    {ready && <form onSubmit={submit}>
      <label>Novo geslo<Input type="password" autoComplete="new-password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} /></label>
      <label>Ponovi geslo<Input type="password" autoComplete="new-password" required minLength={8} value={confirm} onChange={e => setConfirm(e.target.value)} /></label>
      <Button type="submit" disabled={busy}>{busy ? 'Shranjevanje …' : 'Shrani geslo'}</Button>
    </form>}
    {message && <p role="status">{message}</p>}
    <Link to="/auth">Nazaj na prijavo</Link>
  </main>;
}