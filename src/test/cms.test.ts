import { describe, expect, it } from 'vitest';
import { canEdit, contentSchema } from '@/components/cms/validation';
import { translateContent, resolveImage } from '@/components/terjatve/content';
import catalog from '@/components/cms/catalog.json';
describe('CMS rules',()=>{
 it('allows only a confirmed server admin role',()=>{expect(canEdit(true)).toBe(true);expect(canEdit(false)).toBe(false);expect(canEdit('admin')).toBe(false);});
 it('rejects unknown fields',()=>{expect(contentSchema.safeParse([{key:'unknown',kind:'text',value:'x'}]).success).toBe(false);});
 it('replaces shared service copy without changing navigation ids',()=>{const entry=catalog.find(x=>x.defaultValue==='Hipotekarni krediti');if(!entry)throw Error('Missing field');expect(translateContent({id:'hipotekarni',name:'Hipotekarni krediti'},{[entry.key]:'Novo ime'})).toEqual({id:'hipotekarni',name:'Novo ime'});});
 it('replaces the same photo across surfaces',()=>{const entry=catalog.find(x=>x.kind==='image');if(!entry)throw Error('Missing image');expect(resolveImage({[entry.key]:'https://example.com/photo.jpg'},entry.defaultValue)).toBe('https://example.com/photo.jpg');});
});
