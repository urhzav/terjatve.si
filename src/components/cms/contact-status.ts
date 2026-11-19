import { z } from 'zod';

export const contactStatuses = ['new', 'in_progress', 'completed', 'rejected'] as const;
export const statusLabels = { new: 'Neobdelan', in_progress: 'V obdelavi', completed: 'Zaključen', rejected: 'Zavrnjen' };
export const contactStatusSchema = z.object({ id: z.string().uuid(), status: z.enum(contactStatuses) });
export type ContactStatus = typeof contactStatuses[number];
export type ContactFilters = { search: string; status: string; service: string; from: string; to: string };
export const emptyContactFilters: ContactFilters = { search: '', status: 'all', service: 'all', from: '', to: '' };
export function filterContacts<T extends { name: string; email: string; phone: string; service: string; message: string; status: string; created_at: string }>(rows: T[], filters: ContactFilters): T[] {
  return rows.filter(row => {
    const day = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Ljubljana' }).format(new Date(row.created_at));
    return `${row.name} ${row.email} ${row.phone} ${row.service} ${row.message}`.toLowerCase().includes(filters.search.trim().toLowerCase())
      && (filters.status === 'all' || row.status === filters.status)
      && (filters.service === 'all' || row.service === filters.service)
      && (!filters.from || day >= filters.from)
      && (!filters.to || day <= filters.to);
  });
}