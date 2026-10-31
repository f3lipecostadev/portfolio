import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

const skills = ['TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'APIs REST'];

export default function About() {
  return (
    <Reveal as="section" id="about" className="max-w-[900px]">
      <h2 className="numbered-heading">Sobre Mim</h2>

      <div className="grid grid-cols-[3fr_2fr] gap-[50px] max-md:block">
        <div>
          <p>
            Minha trajetória na tecnologia começou durante o curso Técnico em Informática no IFMA,
            onde desenvolvi minhas primeiras habilidades em programação e descobri meu interesse
            pelo desenvolvimento de software. Atualmente, curso Tecnologia em Sistemas para Internet
            no IFMA, aprofundando meus conhecimentos em desenvolvimento web, lógica de programação,
            bancos de dados e arquitetura de aplicações.
          </p>
          <p>
            Ao longo dessa trajetória, desenvolvi projetos práticos, incluindo o{' '}
            <a
              href="https://body-signs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              Body Signs
            </a>
            , uma plataforma educacional voltada ao aprendizado de Libras, utilizando React,
            TypeScript, Vite e Tailwind CSS. Também venho desenvolvendo conhecimentos em Python,
            programação orientada a objetos, APIs REST e integração de sistemas.
          </p>
          <p>
            Atualmente, trabalho como professor de Robótica e Programação no{' '}
            <a
              href="https://cna.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              CNA
            </a>
            , experiência que fortalece minhas habilidades de comunicação, didática e resolução de
            problemas. Paralelamente, direciono meus estudos e projetos para o desenvolvimento de
            software, buscando evoluir continuamente e criar aplicações úteis, funcionais e bem
            estruturadas.
          </p>

          <p>Algumas tecnologias com as quais tenho trabalhado:</p>
          <ul className="skills-list">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="max-md:mx-auto max-md:w-[70%] max-md:max-w-[300px]">
          <div className="pic-wrapper">
            <Image
              src="/images/me.jpg"
              width={500}
              height={500}
              alt="Retrato de Felipe Costa"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
