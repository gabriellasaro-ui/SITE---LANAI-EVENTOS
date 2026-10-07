import { photos } from '@/content/photos'
import { ButtonLink } from '@/components/ui/Button'
import { ArchPhotos } from '@/components/ui/ArchPhotos'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

/** "Vivemos de detalhes" (frase da marca): apresentação com as fotos nos dois círculos do logo. */
export function ManifestoSection() {
  return (
    <section className="bg-paper relative overflow-hidden py-28 md:py-40">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <Reveal>
          <Eyebrow>O Lanai</Eyebrow>
          <h2 className="text-[clamp(2.7rem,5.76vw,5.22rem)] leading-[0.98] font-light">
            Vivemos <span className="text-highlight-dark">de detalhes.</span>
          </h2>
          <p className="text-ink-950/70 mt-9 max-w-xl text-lg leading-relaxed">
            Um espaço onde sofisticação e natureza se encontram. Cercado por uma charmosa alameda de jabuticabeiras e
            por um elegante gazebo, o Lanai reúne amplas áreas verdes e uma estrutura completa, em que cada detalhe foi
            pensado para transformar o seu dia em uma experiência inesquecível.
          </p>
          <p className="font-display text-accent-600 mt-8 text-2xl italic">
            “É mais do que um evento. É uma história a ser contada.”
          </p>
          <div className="mt-11">
            <ButtonLink href="/nosso-espaco" variant="outline-dark" size="lg" icon="arrowRight">
              Conheça os ambientes
            </ButtonLink>
          </div>
        </Reveal>
        <ArchPhotos left={photos.noivosAltar} right={photos.passarelaJardim} />
      </div>
    </section>
  )
}
