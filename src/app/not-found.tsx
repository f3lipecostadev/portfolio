import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Página não encontrada' };

export default function NotFound() {
  return (
    <main className="fill-height flex flex-col items-center justify-center text-center">
      <h1 className="anim anim-fadeup text-[clamp(100px,25vw,200px)] leading-none text-green">
        404
      </h1>
      <h2
        className="anim anim-fadeup text-[clamp(24px,5vw,32px)]"
        style={{ animationDelay: '100ms' }}
      >
        Página não encontrada
      </h2>
      <p className="anim anim-fadeup mb-10" style={{ animationDelay: '200ms' }}>
        O endereço pode ter mudado ou nunca ter existido.
      </p>
      <Link href="/" className="btn anim anim-fadeup" style={{ animationDelay: '300ms' }}>
        Voltar para o início
      </Link>
    </main>
  );
}
