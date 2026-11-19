import { queryOptions, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { Download, Mail, Phone, RefreshCw, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getContacts, getContactAttachment, updateContactStatus } from './contacts.functions';
import { contactStatuses, emptyContactFilters, filterContacts, statusLabels } from './contact-status';

export const contactsOptions = queryOptions({ queryKey: ['admin-contacts'], queryFn: () => getContacts() });
export default function Contacts() {
  const { data, refetch, isFetching } = useSuspenseQuery(contactsOptions);
  const [filters, setFilters] = useState(emptyContactFilters);
  const [saving, setSaving] = useState<string[]>([]);
  const qc = useQueryClient();
  const [message, setMessage] = useState('');
  const download = useServerFn(getContactAttachment);
  const update = useServerFn(updateContactStatus);
  const rows = filterContacts(data, filters);
  const services = [...new Set(data.map(row => row.service))].sort((a, b) => a.localeCompare(b, 'sl'));
  async function changeStatus(id: string, status: string) {
    const parsed = contactStatuses.find(value => value === status);
    if (!parsed) return;
    setSaving(current => [...current, id]); setMessage('');
    try {
      const saved = await update({ data: { id, status: parsed } });
      qc.setQueryData(contactsOptions.queryKey, (current: typeof data | undefined) => current?.map(row => row.id === saved.id ? { ...row, status: saved.status } : row));
      setMessage('Status je shranjen.');
    } catch { setMessage('Statusa ni bilo mogoče shraniti. Poskusite znova.'); }
    finally { setSaving(current => current.filter(value => value !== id)); }
  }
  async function openFile(path: string) {
    try { const url = await download({ data: path }); window.location.assign(url); }
    catch { setMessage('Priloge ni bilo mogoče prenesti.'); }
  }
  return <>
    <div className="cms-filter"><Input aria-label="Poišči kontakt" placeholder="Poišči kontakt …" value={filters.search} onChange={e => setFilters(current => ({ ...current, search: e.target.value }))} /><span>{rows.length} / {data.length}</span><Button variant="ghost" size="icon" title="Osveži kontakte" aria-label="Osveži kontakte" disabled={isFetching || saving.length > 0} onClick={() => void refetch()}><RefreshCw /></Button></div>
    <div className="cms-contact-filters">
      <div><label>Status</label><Select value={filters.status} onValueChange={status => setFilters(current => ({ ...current, status }))}><SelectTrigger aria-label="Filtriraj po statusu"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Vsi statusi</SelectItem>{contactStatuses.map(status => <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>)}</SelectContent></Select></div>
      <div><label>Vrsta financiranja</label><Select value={filters.service} onValueChange={service => setFilters(current => ({ ...current, service }))}><SelectTrigger aria-label="Filtriraj po financiranju"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Vse vrste</SelectItem>{services.map(service => <SelectItem key={service} value={service}>{service}</SelectItem>)}</SelectContent></Select></div>
      <label>Od datuma<Input type="date" aria-label="Od datuma" value={filters.from} max={filters.to || undefined} onChange={e => setFilters(current => ({ ...current, from: e.target.value }))} /></label>
      <label>Do datuma<Input type="date" aria-label="Do datuma" value={filters.to} min={filters.from || undefined} onChange={e => setFilters(current => ({ ...current, to: e.target.value }))} /></label>
      <Button variant="ghost" size="icon" title="Počisti filtre" aria-label="Počisti filtre" onClick={() => setFilters(emptyContactFilters)}><RotateCcw /></Button>
    </div>
    {message && <p role="status" className="cms-status">{message}</p>}
    <div className="cms-contacts">{rows.map(row => {
      const attachments = Array.isArray(row.attachments) ? row.attachments.flatMap(file => file && typeof file === 'object' && !Array.isArray(file) && typeof file['path'] === 'string' && typeof file['name'] === 'string' ? [{ path: file['path'], name: file['name'] }] : []) : [];
      return <article className="cms-contact" key={row.id}>
        <header><h2>{row.name}</h2><time dateTime={row.created_at}>{new Date(row.created_at).toLocaleString('sl-SI', { timeZone: 'Europe/Ljubljana' })}</time></header>
        <div className="cms-contact-status"><Select value={row.status} disabled={saving.includes(row.id)} onValueChange={status => void changeStatus(row.id, status)}><SelectTrigger aria-label={`Status: ${row.name}`} data-contact-status={row.status}><SelectValue /></SelectTrigger><SelectContent>{contactStatuses.map(status => <SelectItem key={status} value={status}>{statusLabels[status]}</SelectItem>)}</SelectContent></Select>{saving.includes(row.id) && <span>Shranjevanje …</span>}</div>
        <div className="cms-contact-links"><a href={`mailto:${row.email}`}><Mail size={16}/>{row.email}</a>{row.phone && <a href={`tel:${row.phone}`}><Phone size={16}/>{row.phone}</a>}</div>
        <dl><div><dt>Vrsta financiranja</dt><dd>{row.service}</dd></div>{row.amount && <div><dt>Okvirni znesek</dt><dd>{row.amount} €</dd></div>}</dl>
        {row.message && <p className="cms-contact-message">{row.message}</p>}
        {attachments.length > 0 && <div className="cms-contact-files">{attachments.map(file => <Button key={file.path} variant="outline" onClick={() => void openFile(file.path)}><Download size={16}/>{file.name}</Button>)}</div>}
      </article>;
    })}</div>
    {rows.length === 0 && <p className="cms-empty">{data.length ? 'Ni zadetkov.' : 'Ni prejetih povpraševanj.'}</p>}
  </>;
}