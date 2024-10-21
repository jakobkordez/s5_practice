import { lazy } from 'react';

export const LazyTeX = lazy(() => import('./tex'));

export function MaybeTeX({ text }: { text: string }) {
  const parts = text.split(/(?<!\\)\$+/);

  return parts.map((part, i) =>
    !part ? null : i % 2 === 0 ? (
      <span key={i}>{part}</span>
    ) : (
      <LazyTeX key={i} math={part} />
    ),
  );
}
