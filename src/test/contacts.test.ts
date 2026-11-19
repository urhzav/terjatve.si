import { describe, it, expect } from 'vitest';
import { inquirySchema, validateAttachments } from '@/components/cms/contact-validation';
import { contactStatusSchema, emptyContactFilters, filterContacts } from '@/components/cms/contact-status';
describe('Website inquiries', () => {
  const valid = { name: 'Podjetje', email: 'contact@example.com', phone: '', service: 'Odkup terjatev', amount: '', message: 'Povpraševanje' };
  it('requires a contact name', () => expect(inquirySchema.safeParse({ ...valid, name: ' ' }).success).toBe(false));
  it('requires a valid reply address', () => expect(inquirySchema.safeParse({ ...valid, email: 'invalid' }).success).toBe(false));
  it('requires selected financing', () => expect(inquirySchema.safeParse({ ...valid, service: '' }).success).toBe(false));
  it('preserves all submitted contact fields', () => expect(inquirySchema.parse(valid)).toEqual(valid));
  it('allows five files and rejects six', () => {
    expect(() => validateAttachments(Array(5).fill({ name: 'doc', size: 1 }))).not.toThrow();
    expect(() => validateAttachments(Array(6).fill({ name: 'doc', size: 1 }))).toThrow();
  });
  it('rejects a file over 10 MB', () => expect(() => validateAttachments([{ name: 'doc', size: 10 * 1024 * 1024 + 1 }])).toThrow());
  it('rejects attachments totaling over 20 MB', () => expect(() => validateAttachments(Array(3).fill({ name: 'doc', size: 8 * 1024 * 1024 }))).toThrow());
});
describe('Inquiry status and filters', () => {
  const row = { id: '123e4567-e89b-42d3-a456-426614174000', name: 'Podjetje', email: 'contact@example.com', phone: '', service: 'Odkup terjatev', message: '', status: 'new', created_at: '2026-11-18T23:30:00Z' };
  it('accepts neobdelan status', () => expect(contactStatusSchema.parse({ id: row.id, status: 'new' }).status).toBe('new'));
  it('accepts in-progress status', () => expect(contactStatusSchema.parse({ id: row.id, status: 'in_progress' }).status).toBe('in_progress'));
  it('accepts completed status', () => expect(contactStatusSchema.parse({ id: row.id, status: 'completed' }).status).toBe('completed'));
  it('accepts rejected status', () => expect(contactStatusSchema.parse({ id: row.id, status: 'rejected' }).status).toBe('rejected'));
  it('rejects unknown statuses', () => expect(contactStatusSchema.safeParse({ id: row.id, status: 'admin' }).success).toBe(false));
  it('filters by status', () => expect(filterContacts([row, { ...row, status: 'completed' }], { ...emptyContactFilters, status: 'new' })).toEqual([row]));
  it('filters by financing', () => expect(filterContacts([row], { ...emptyContactFilters, service: 'Hipotekarni krediti' })).toEqual([]));
  it('filters date range inclusively in Ljubljana timezone', () => {
    expect(filterContacts([row], { ...emptyContactFilters, from: '2026-11-19', to: '2026-11-19' })).toEqual([row]);
    expect(filterContacts([row], { ...emptyContactFilters, to: '2026-11-18' })).toEqual([]);
  });
  it('combines search and status filters', () => expect(filterContacts([row], { ...emptyContactFilters, search: ' PODJETJE ', status: 'completed' })).toEqual([]));
});