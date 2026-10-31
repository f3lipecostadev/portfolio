import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import { getTags } from '@/lib/content';

export const metadata: Metadata = { title: 'Tags do Diário' };

export default function TagsPage() {
  const tags = getTags();
  if (tags.length === 0) notFound();

  return (
    <main>
      <Reveal as="header">
        <Link href="/diario" className="inline-link font-mono text-sm">
          Diário
        </Link>
        <h1 className="big-heading mt-2.5">Tags</h1>
      </Reveal>
      <Reveal>
        <ul className="mt-12 list-none p-0 text-[clamp(20px,3vw,28px)]">
          {tags.map((tag) => (
            <li key={tag.slug} className="my-2.5">
              <Link href={`/diario/tags/${tag.slug}`} className="inline-link">
                #{tag.name}
              </Link>{' '}
              <span className="font-mono text-sm text-slate">({tag.count})</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </main>
  );
}
