export interface Job {
  slug: string;
  order: number;
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  html: string;
}

export interface FeaturedProject {
  slug: string;
  order: number;
  title: string;
  cover: string;
  coverAlt: string;
  tech: string[];
  github?: string;
  external?: string;
  html: string;
}

export interface Project {
  slug: string;
  title: string;
  date?: string;
  tech: string[];
  github?: string;
  external?: string;
  company?: string;
  showInProjects: boolean;
  html: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Post extends PostMeta {
  html: string;
}
