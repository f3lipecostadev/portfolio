import { siteConfig } from '@/config/site';
import Reveal from '@/components/ui/Reveal';

export default function Contact() {
  return (
    <Reveal
      as="section"
      id="contact"
      className="mx-auto max-w-[600px] text-center max-md:mb-[50px]"
    >
      <h2 className="numbered-heading overline justify-center after:hidden">E agora?</h2>

      <h3 className="mb-5 text-[clamp(36px,5vw,56px)]">Vamos Conversar</h3>

      <p>
        Estou aberto a conversar sobre projetos, oportunidades profissionais e ideias relacionadas
        ao desenvolvimento de software. Se você deseja trocar experiências ou construir algo em
        conjunto, entre em contato.
      </p>

      <a className="btn mt-[50px]" href={`mailto:${siteConfig.email}`}>
        Dizer Olá
      </a>
    </Reveal>
  );
}
