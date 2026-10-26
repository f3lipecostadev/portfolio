'use client';

import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import Reveal from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/content';

const GRID_LIMIT = 6;

export default function Projects({ projects }: { projects: Project[] }) {
  const [showMore, setShowMore] = useState(false);
  const visible = showMore ? projects : projects.slice(0, GRID_LIMIT);

  return (
    <Reveal as="section" id="outros" className="flex flex-col items-center">
      <h2 className="text-[clamp(24px,5vw,var(--fz-heading))]">Outros Projetos Relevantes</h2>
      <Link href="/archive" className="inline-link font-mono text-sm">
        ver todo o arquivo
      </Link>

      <ul className="projects-grid">
        {visible.map((project, index) => {
          const link = project.external ?? project.github;
          const extra = index >= GRID_LIMIT;
          return (
            <li
              key={project.slug}
              className={cn(extra && 'anim anim-fadeup')}
              style={
                extra
                  ? ({ '--delay': `${(index - GRID_LIMIT) * 100}ms` } as CSSProperties)
                  : undefined
              }
            >
              <article className="card-inner">
                <div className="w-full">
                  <header className="mb-8 flex min-h-[42px] items-center justify-between">
                    <div className="text-green">
                      <Icon name="Folder" className="h-10 w-10" />
                    </div>
                    <div className="project-links !z-[2] !mt-0 !-mr-2.5 !ml-0 text-light-slate">
                      {project.github && (
                        <a
                          href={project.github}
                          aria-label={`Repositório de ${project.title} no GitHub`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {project.external && (
                        <a
                          href={project.external}
                          aria-label={`Abrir ${project.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </header>

                  <h3 className="card-title">
                    {link ? (
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <div
                    className="card-desc md-content"
                    dangerouslySetInnerHTML={{ __html: project.html }}
                  />
                </div>

                <footer className="w-full">
                  <ul className="card-tech">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </footer>
              </article>
            </li>
          );
        })}
      </ul>

      {projects.length > GRID_LIMIT && (
        <button
          type="button"
          className="btn mx-auto mt-20"
          onClick={() => setShowMore((value) => !value)}
        >
          {showMore ? 'Mostrar Menos' : 'Mostrar Mais'}
        </button>
      )}
    </Reveal>
  );
}
