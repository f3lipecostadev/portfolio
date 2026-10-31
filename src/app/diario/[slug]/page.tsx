import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import { getPost, getPosts } from '@/lib/content';
import { formatDate, slugify } from '@/lib/utils';

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts().find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <Reveal as="article" className="mx-auto max-w-[700px]">
        <Link href="/diario" className="inline-link font-mono text-sm">
          Diário de Desenvolvimento
        </Link>
        <header className="mt-6">
          <h1 className="text-[clamp(32px,6vw,52px)]">{post.title}</h1>
          <p className="mt-4 font-mono text-[13px] text-slate">
            {formatDate(post.date)}
            {post.tags.map((tag) => (
              <span key={tag}>
                {' '}
                ·{' '}
                <Link href={`/diario/tags/${slugify(tag)}`} className="text-green">
                  #{tag}
                </Link>
              </span>
            ))}
          </p>
        </header>
        <div className="post-content md-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </Reveal>
    </main>
  );
}
