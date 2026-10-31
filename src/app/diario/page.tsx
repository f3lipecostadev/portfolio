import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PostCards from '@/components/ui/PostCards';
import Reveal from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site';
import { getPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: siteConfig.blogName,
  description: 'Anotações sobre o que estou aprendendo e construindo.',
};

export default function DiarioPage() {
  const posts = getPosts();
  // Sem posts publicados, o blog não existe para o visitante (e some do sitemap).
  if (posts.length === 0) notFound();

  return (
    <main>
      <Reveal as="header">
        <h1 className="big-heading">{siteConfig.blogName}</h1>
        <p className="mt-2.5 font-mono text-lg text-green">
          Anotações sobre o que estou aprendendo e construindo
        </p>
        <Link href="/diario/tags" className="inline-link mt-2.5 font-mono text-sm">
          ver por tags
        </Link>
      </Reveal>
      <Reveal>
        <PostCards posts={posts} />
      </Reveal>
    </main>
  );
}
