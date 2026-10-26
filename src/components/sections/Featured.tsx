import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import type { FeaturedProject } from '@/types/content';

export default function Featured({ items }: { items: FeaturedProject[] }) {
  return (
    <Reveal as="section" id="projects">
      <h2 className="numbered-heading">Alguns Projetos Que Construí</h2>

      <ul className="m-0 list-none p-0">
        {items.map((project) => {
          const mainLink = project.external ?? project.github;
          return (
            <Reveal as="li" key={project.slug} className="featured-item">
              <div className="featured-content">
                <p className="my-2.5 font-mono text-[13px] font-normal text-green">
                  Projeto em Destaque
                </p>

                <h3 className="featured-title">
                  {mainLink ? (
                    <a href={mainLink} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>

                <div
                  className="featured-description md-content"
                  dangerouslySetInnerHTML={{ __html: project.html }}
                />

                {project.tech.length > 0 && (
                  <ul className="tech-list">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                )}

                <div className="project-links">
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
              </div>

              <div className="featured-image">
                {mainLink ? (
                  <a href={mainLink} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                    <Image
                      src={project.cover}
                      alt={project.coverAlt}
                      width={1400}
                      height={800}
                      className="img"
                    />
                  </a>
                ) : (
                  <Image
                    src={project.cover}
                    alt={project.coverAlt}
                    width={1400}
                    height={800}
                    className="img"
                  />
                )}
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Reveal>
  );
}
