import { describe, it, expect } from 'vitest';
import { inquirySchema, validateAttachments } from '@/components/cms/contact-validation';
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