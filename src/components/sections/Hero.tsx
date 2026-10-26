import type { CSSProperties } from 'react';
import { siteConfig } from '@/config/site';

const delay = (index: number) => ({ '--delay': `${600 + index * 120}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section className="hero">
      <p
        className="anim anim-fadeup mb-[30px] ml-1 font-mono text-[clamp(14px,5vw,16px)] text-green"
        style={delay(0)}
      >
        Olá, meu nome é
      </p>
      <h1 className="big-heading anim anim-fadeup" style={delay(1)}>
        {siteConfig.name}.
      </h1>
      <h2 className="hero-tagline anim anim-fadeup mt-2.5" style={delay(2)}>
        Transformando ideias em soluções através do código.
      </h2>
      <p className="anim anim-fadeup mt-5 max-w-[600px]" style={delay(3)}>
        Desenvolvedor de Software em formação, com experiência prática na criação de aplicações web,
        integração de APIs e desenvolvimento de soluções tecnológicas. Atualmente, foco em aprimorar
        minhas habilidades em frontend e backend, criando projetos funcionais para resolver
        problemas reais.
      </p>
    </section>
  );
}
