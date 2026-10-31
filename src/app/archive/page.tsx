import type { Metadata } from 'next';
import Reveal from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Arquivo',
  description: 'Lista completa dos projetos de Felipe Costa.',
};

export default async function ArchivePage() {
  const projects = await getProjects();

  return (
    <main>
      <Reveal as="header">
        <h1 className="big-heading">Arquivo</h1>
        <p className="mt-2.5 font-mono text-lg text-green">Uma lista completa dos meus projetos</p>
      </Reveal>

      <Reveal>
        <table className="archive-table">
          <thead>
            <tr>
              <th>Ano</th>
              <th>Projeto</th>
              <th className="hide-on-mobile whitespace-nowrap">Feito em</th>
              <th className="hide-on-mobile">Tecnologias</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.slug}>
                <td className="year">{project.date ? project.date.slice(0, 4) : '—'}</td>
                <td className="title">{project.title}</td>
                <td className="company hide-on-mobile">{project.company ?? '—'}</td>
                <td className="tech hide-on-mobile">
                  {project.tech.map((tech, index) => (
                    <span key={tech}>
                      {tech}
                      {index < project.tech.length - 1 && <span className="mx-1.5">·</span>}
                    </span>
                  ))}
                </td>
                <td className="links">
                  <div>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </main>
  );
}
