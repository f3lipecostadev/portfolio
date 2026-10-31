import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { renderMarkdown } from '@/lib/markdown';
import { slugify } from '@/lib/utils';
import type { FeaturedProject, Job, Post, PostMeta, Project } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

interface RawFile {
  slug: string;
  data: Record<string, unknown>;
  body: string;
}

function readFolder(folder: string): RawFile[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return { slug: file.replace(/\.md$/, ''), data, body: content };
    });
}

/** O YAML converte datas sem aspas em Date; normalizamos tudo para 'AAAA-MM-DD'. */
function toISO(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

// ---------------------------------------------------------------------------
// Visibilidade: o site só exibe itens cujo repositório do GitHub é público.
// ---------------------------------------------------------------------------
const visibilityCache = new Map<string, Promise<boolean>>();

function githubRepoPath(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/^https?:\/\/(?:www\.)?github\.com\/([^/\s]+)\/([^/\s#?]+)/i);
  return match ? `${match[1]}/${match[2].replace(/\.git$/i, '')}` : null;
}

/**
 * Um repositório privado responde 404 para visitantes anônimos. Se for 404, o item é
 * ocultado. Qualquer outra resposta (rede fora do ar, limite de requisições) significa
 * "não deu para verificar": o item é mantido e um aviso aparece no log do build.
 * Itens sem link do GitHub não são verificados.
 */
async function isPublic(url?: string): Promise<boolean> {
  const repo = githubRepoPath(url);
  if (!repo) return true;

  let result = visibilityCache.get(repo);
  if (!result) {
    result = fetch(`https://github.com/${repo}`, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    })
      .then((response) => {
        if (response.status === 404) {
          console.warn(`[content] "${repo}" não é público: ocultado do site.`);
          return false;
        }
        if (!response.ok) {
          console.warn(
            `[content] não foi possível verificar "${repo}" (HTTP ${response.status}); mantido.`
          );
        }
        return true;
      })
      .catch(() => {
        console.warn(`[content] sem rede para verificar "${repo}"; mantido.`);
        return true;
      });
    visibilityCache.set(repo, result);
  }
  return result;
}

async function onlyPublic<T extends { github?: string }>(items: T[]): Promise<T[]> {
  const flags = await Promise.all(items.map((item) => isPublic(item.github)));
  return items.filter((_, index) => flags[index]);
}

const str = (value: unknown, fallback = ''): string => (value ? String(value) : fallback);
const list = (value: unknown): string[] => (Array.isArray(value) ? value.map(String) : []);

export async function getJobs(): Promise<Job[]> {
  const jobs = await Promise.all(
    readFolder('jobs').map(async ({ slug, data, body }) => ({
      slug,
      order: Number(data.order ?? 99),
      title: str(data.title),
      company: str(data.company),
      location: str(data.location),
      range: str(data.range),
      url: str(data.url),
      html: await renderMarkdown(body),
    }))
  );
  return jobs.sort((a, b) => a.order - b.order);
}

export async function getFeatured(): Promise<FeaturedProject[]> {
  const items = await Promise.all(
    readFolder('featured').map(async ({ slug, data, body }) => ({
      slug,
      order: Number(data.order ?? 99),
      title: str(data.title),
      cover: str(data.cover),
      coverAlt: str(data.coverAlt, str(data.title)),
      tech: list(data.tech),
      github: str(data.github) || undefined,
      external: str(data.external) || undefined,
      html: await renderMarkdown(body),
    }))
  );
  return onlyPublic(items.sort((a, b) => a.order - b.order));
}

export async function getProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    readFolder('projects').map(async ({ slug, data, body }) => ({
      slug,
      title: str(data.title),
      date: toISO(data.date),
      tech: list(data.tech),
      github: str(data.github) || undefined,
      external: str(data.external) || undefined,
      company: str(data.company) || undefined,
      showInProjects: data.showInProjects === true,
      html: await renderMarkdown(body),
    }))
  );
  // Mais recentes primeiro; itens sem data vão para o fim.
  return onlyPublic(projects.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')));
}

export function getPosts(): PostMeta[] {
  return readFolder('posts')
    .filter(({ data }) => data.draft !== true)
    .map(({ slug, data }) => ({
      slug,
      title: str(data.title),
      description: str(data.description),
      date: toISO(data.date) ?? '',
      tags: list(data.tags),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = readFolder('posts').find((post) => post.slug === slug && post.data.draft !== true);
  if (!file) return null;
  const meta = getPosts().find((post) => post.slug === slug)!;
  return { ...meta, html: await renderMarkdown(file.body) };
}

export function getTags(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of getPosts()) {
    for (const tag of post.tags) {
      const slug = slugify(tag);
      const current = map.get(slug);
      map.set(slug, { name: tag, slug, count: (current?.count ?? 0) + 1 });
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}

export function getPostsByTag(tagSlug: string): PostMeta[] {
  return getPosts().filter((post) => post.tags.some((tag) => slugify(tag) === tagSlug));
}
