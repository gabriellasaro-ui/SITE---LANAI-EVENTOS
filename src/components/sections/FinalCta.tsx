import Image from 'next/image'
import { hasWhatsapp, site, whatsappUrl } from '@/config/site'
import { blur, photos, type Photo } from '@/content/photos'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type Props = {
  eyebrow?: string
  title?: string
  description?: string
  cta?: string
  photo?: Photo
}

/** Chamada final: foto em tela cheia com sombra por cima (frase da marca: "Vamos realizar o seu sonho juntos"). */
export function FinalCta({
  eyebrow = 'Diga olá',
  title = 'Vamos realizar o seu sonho juntos.',
  description = 'Conte para a equipe o que você está planejando. Apresentamos o espaço, entendemos o estilo da sua celebração e mostramos cada possibilidade do Lanai.',
  cta = 'Solicite uma proposta',
  photo = photos.pergoladoDoces,
}: Props) {
  return (
    <section className="bg-ink-950 grain relative isolate flex min-h-[86svh] items-center overflow-hidden py-32 text-center text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image src={photo.src} alt="" fill sizes="100vw" quality={85} {...blur(photo)} className="object-cover" />
      </div>
      {/* sombra para leitura, mantendo a foto visível nas bordas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(22_27_20/0.82)_0%,rgb(22_27_20/0.66)_50%,rgb(22_27_20/0.45)_100%)]"
      />
      <div className="container-site relative">
        <Reveal>
          <Eyebrow tone="dark" className="justify-center">
            {eyebrow}
          </Eyebrow>
          <h2 className="mx-auto max-w-4xl text-[clamp(2.7rem,6.3vw,5.76rem)] leading-[0.98] font-light">{title}</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/85">{description}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contato" variant="light" size="lg" icon="arrowRight">
            {cta}
          </ButtonLink>
          {hasWhatsapp && (
            <ButtonLink href={whatsappUrl()} variant="outline-light" size="lg" iconLeft="whatsapp">
              {site.contact.whatsapp.display}
            </ButtonLink>
          )}
        </Reveal>
      </div>
    </section>
  )
}
