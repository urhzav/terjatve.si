import { z } from 'zod';
import catalog from './catalog.json';
export const contentSchema = z.array(z.object({ key: z.string(), value: z.string().max(20000), kind: z.enum(['text','image']) })).max(500).superRefine((rows, ctx) => {
  for (const row of rows) {
    const entry = catalog.find(x => x.key === row.key);
    if (!entry || entry.kind !== row.kind) ctx.addIssue({ code: 'custom', message: 'Neznano polje.' });
    if (row.kind === 'image' && !row.value.startsWith('/__l5e/assets-v1/') && !/^https:\/\//.test(row.value)) ctx.addIssue({ code: 'custom', message: 'Neveljavna slika.' });
  }
});
export function canEdit(role: unknown) { return role === true; }