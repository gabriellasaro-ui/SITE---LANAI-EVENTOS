import type { Metadata } from 'next'
import { facts, site } from '@/config/site'
import { momentsPhotos, photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { MomentsStrip } from '@/components/sections/MomentsStrip'
import { NumbersSection } from '@/components/sections/NumbersSection'
import { FinalCta } from '@/components/sections/FinalCta'

const nota = site.rating?.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })

const title = `Casais e avaliações: nota ${nota} no Casamentos.com.br`
const description = `Mais de ${facts.couples} casais escolheram o Lanai, na Pampulha: nota ${nota} em ${site.rating?.count} avaliações públicas e ${facts.awards}. Veja as histórias.`

export const metadata: Metadata = pageMetadata({ title, description, path: '/clientes' })

export default function ClientesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/clientes', name: title, description })} />
      <PageHero
        crumb={{ label: 'Clientes', href: '/clientes' }}
        image={photos.noivaMakingOf}
        title="Mais de 370 histórias contadas aqui."
        highlight={{ histórias: 'text-highlight' }}
        description={`Casais que escolheram o Lanai para o grande dia e deram nota ${nota} no Casamentos.com.br. A prova está em quem viveu cada celebração.`}
      >
        <ButtonLink href={site.rating?.url ?? '/contato'} variant="light" size="lg" icon="arrowUpRight">
          Ver avaliações
        </ButtonLink>
      </PageHero>

      <TestimonialsSection full />
      <NumbersSection />

      <section className="bg-paper overflow-hidden py-28 md:py-36">
        <Reveal className="container-site mb-14 max-w-3xl">
          <Eyebrow>Momentos</Eyebrow>
          <h2 className="text-[clamp(2.34rem,4.86vw,4.32rem)] leading-[1.02] font-light">
            O dia de cada casal, <span className="text-highlight-dark">do seu jeito.</span>
          </h2>
        </Reveal>
        <MomentsStrip photos={momentsPhotos} />
      </section>

      <FinalCta title="A próxima história pode ser a sua." photo={photos.cerimoniaJabuticabeiras} />
    </>
  )
}
