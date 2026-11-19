import { z } from 'zod';
export const inquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(100),
  service: z.string().trim().min(1).max(200),
  amount: z.string().trim().max(100),
  message: z.string().trim().max(10000),
});
export function validateAttachments(files: { size: number; name: string }[]) {
  if (files.length > 5 || files.some(f => f.size > 10 * 1024 * 1024) || files.reduce((sum, f) => sum + f.size, 0) > 20 * 1024 * 1024) {
    throw new Error('Priložite največ 5 datotek, do 10 MB na datoteko in skupno do 20 MB.');
  }
}