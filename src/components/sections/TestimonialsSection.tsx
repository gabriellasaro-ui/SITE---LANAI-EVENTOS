import { testimonials } from '@/content/testimonials'
import { ButtonLink } from '@/components/ui/Button'
import { PublicRating } from '@/components/ui/PublicRating'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { TestimonialsCarousel } from './TestimonialsCarousel'

/** Palavras de quem celebrou no Lanai (avaliações públicas reais) em carrossel. */
export function TestimonialsSection({ full = false }: { full?: boolean }) {
  return (
    <section className="bg-paper relative overflow-hidden py-28 md:py-36">
      <div className="container-site relative">
        <SectionHeading
          eyebrow={full ? 'Avaliações públicas' : 'Depoimentos'}
          title={
            <>
              Nas palavras de quem <span className="text-highlight-dark">viveu o grande dia.</span>
            </>
          }
          description="Avaliações publicadas no Casamentos.com.br e depoimentos de casais que celebraram no Lanai, com o texto original."
          action={
            full ? undefined : (
              <ButtonLink href="/clientes" variant="outline-dark" icon="arrowRight">
                Todas as histórias
              </ButtonLink>
            )
          }
        />
        <Reveal className="mb-12">
          <PublicRating variant={full ? 'card' : 'badge'} />
        </Reveal>
        <Reveal>
          <TestimonialsCarousel items={testimonials} />
        </Reveal>
      </div>
    </section>
  )
}
