import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { Download, Mail, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getContacts, getContactAttachment } from './contacts.functions';

export const contactsOptions = queryOptions({ queryKey: ['admin-contacts'], queryFn: () => getContacts() });
export default function Contacts() {
  const { data, refetch, isFetching } = useSuspenseQuery(contactsOptions);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const download = useServerFn(getContactAttachment);
  const rows = data.filter(row => `${row.name} ${row.email} ${row.phone} ${row.service} ${row.message}`.toLowerCase().includes(search.toLowerCase()));
  async function openFile(path: string) {
    try { const url = await download({ data: path }); window.location.assign(url); }
    catch { setMessage('Priloge ni bilo mogoče prenesti.'); }
  }
  return <>
    <div className="cms-filter"><Input aria-label="Poišči kontakt" placeholder="Poišči kontakt …" value={search} onChange={e => setSearch(e.target.value)} /><span>{rows.length} povpraševanj</span><Button variant="ghost" size="icon" title="Osveži kontakte" aria-label="Osveži kontakte" disabled={isFetching} onClick={() => void refetch()}><RefreshCw /></Button></div>
    {message && <p role="status" className="cms-status">{message}</p>}
    <div className="cms-contacts">{rows.map(row => {
      const attachments = Array.isArray(row.attachments) ? row.attachments.flatMap(file => file && typeof file === 'object' && !Array.isArray(file) && typeof file['path'] === 'string' && typeof file['name'] === 'string' ? [{ path: file['path'], name: file['name'] }] : []) : [];
      return <article className="cms-contact" key={row.id}>
        <header><h2>{row.name}</h2><time dateTime={row.created_at}>{new Date(row.created_at).toLocaleString('sl-SI', { timeZone: 'Europe/Ljubljana' })}</time></header>
        <div className="cms-contact-links"><a href={`mailto:${row.email}`}><Mail size={16}/>{row.email}</a>{row.phone && <a href={`tel:${row.phone}`}><Phone size={16}/>{row.phone}</a>}</div>
        <dl><div><dt>Vrsta financiranja</dt><dd>{row.service}</dd></div>{row.amount && <div><dt>Okvirni znesek</dt><dd>{row.amount} €</dd></div>}</dl>
        {row.message && <p className="cms-contact-message">{row.message}</p>}
        {attachments.length > 0 && <div className="cms-contact-files">{attachments.map(file => <Button key={file.path} variant="outline" onClick={() => void openFile(file.path)}><Download size={16}/>{file.name}</Button>)}</div>}
      </article>;
    })}</div>
    {rows.length === 0 && <p className="cms-empty">{search ? 'Ni zadetkov.' : 'Ni prejetih povpraševanj.'}</p>}
  </>;
}