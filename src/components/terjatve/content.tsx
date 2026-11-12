import { createContext, useContext, type ReactNode } from 'react';
import catalog from '../cms/catalog.json';
export type Content = Record<string, string>;
export const ContentContext = createContext<Content>({});
const byText = new Map(catalog.filter(x => x.kind === 'text').map(x => [x.defaultValue, x.key]));
const byImage = new Map(catalog.filter(x => x.kind === 'image').map(x => [x.defaultValue, x.key]));
export function contentText(content: Content | undefined, key: string, fallback: string) { return content?.[key] ?? fallback; }
export function resolveImage(content: Content | undefined, fallback: string) { return content?.[byImage.get(fallback) ?? ''] ?? fallback; }
export function translateContent<T>(value: T, content: Content | undefined): T {
  if (typeof value === 'string') return (content?.[byText.get(value) ?? ''] ?? value) as T;
  if (Array.isArray(value)) return value.map(v => translateContent(v, content)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, ['id','n'].includes(k) ? v : translateContent(v, content)])) as T;
  return value;
}
export function useSiteContent() { const content = useContext(ContentContext); return { content, text: (key: string, fallback: string) => contentText(content, key, fallback) }; }
export function SiteContentProvider({ content, children }: { content: Content; children: ReactNode }) { return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>; }