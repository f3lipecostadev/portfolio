import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { formatDate, slugify } from '@/lib/utils';
import type { PostMeta } from '@/types/content';

export default function PostCards({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="mt-12">Nenhuma publicação por aqui ainda.</p>;
  }

  return (
    <ul className="projects-grid">
      {posts.map((post) => (
        <li key={post.slug}>
          <article className="card-inner">
            <div className="w-full">
              <header className="mb-8 text-green">
                <Icon name="Bookmark" className="h-10 w-10" />
              </header>
              <h3 className="card-title">
                <Link href={`/diario/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="card-desc">{post.description}</p>
            </div>
            <footer className="w-full">
              <p className="mt-5 mb-0 font-mono text-xs text-slate">{formatDate(post.date)}</p>
              <ul className="card-tech">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link href={`/diario/tags/${slugify(tag)}`}>#{tag}</Link>
                  </li>
                ))}
              </ul>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
}
