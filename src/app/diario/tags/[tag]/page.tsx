import Link from 'next/link';
import type { Metadata } from 'next';
import PostCards from '@/components/ui/PostCards';
import Reveal from '@/components/ui/Reveal';
import { getPostsByTag, getTags } from '@/lib/content';

export const dynamicParams = false;

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const name = getTags().find((item) => item.slug === tag)?.name ?? tag;
  return { title: `Publicações com #${name}` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const name = getTags().find((item) => item.slug === tag)?.name ?? tag;
  const posts = getPostsByTag(tag);

  return (
    <main>
      <Reveal as="header">
        <Link href="/diario/tags" className="inline-link font-mono text-sm">
          Todas as tags
        </Link>
        <h1 className="big-heading mt-2.5">#{name}</h1>
        <p className="mt-2.5 font-mono text-lg text-green">
          {posts.length} {posts.length === 1 ? 'publicação' : 'publicações'}
        </p>
      </Reveal>
      <Reveal>
        <PostCards posts={posts} />
      </Reveal>
    </main>
  );
}
