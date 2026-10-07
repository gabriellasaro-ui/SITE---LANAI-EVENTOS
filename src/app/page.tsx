import type { Metadata } from 'next'
import { site } from '@/config/site'
import { featuredFaqs } from '@/content/faq'
import { heroSlides, momentsPhotos } from '@/content/photos'
import { spaces } from '@/content/venue'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { SpacesEditorial } from '@/components/sections/SpacesEditorial'
import { NumbersSection } from '@/components/sections/NumbersSection'
import { ServicesShowcase } from '@/components/sections/ServicesShowcase'
import { MomentsStrip } from '@/components/sections/MomentsStrip'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { DifferentialsSection } from '@/components/sections/DifferentialsSection'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { LocationSection } from '@/components/sections/LocationSection'
import { FinalCta } from '@/components/sections/FinalCta'
import { FaqSection } from '@/components/sections/FaqSection'

const title = 'Lanai Eventos | Espaço para Casamentos e Eventos em Belo Horizonte'
const description =
  'Casamentos na Pampulha, em BH: cerimônia sob a alameda de jabuticabeiras, gazebo, jardins e salão para 50 a 300 convidados, com um único evento por dia.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/', absoluteTitle: true })

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/', name: title, description: site.description })} />
      <PageHero
        eyebrow="Pampulha · Belo Horizonte"
        crumb={{ label: 'Home', href: '/' }}
        images={heroSlides}
        title="É mais do que um evento. É uma história a ser contada."
        highlight={{ história: 'text-highlight' }}
        description="Um cenário inspirador na Pampulha: alameda de jabuticabeiras, gazebo e amplas áreas verdes para casamentos e celebrações de 50 a 300 convidados, com um único evento por dia."
      >
        <ButtonLink href="/contato" variant="light" size="lg" icon="arrowRight">
          Agende uma visita
        </ButtonLink>
        <ButtonLink href="/nosso-espaco" variant="outline-light" size="lg">
          Conheça o espaço
        </ButtonLink>
      </PageHero>

      <ManifestoSection />
      <SpacesEditorial
        spaces={spaces.slice(0, 4)}
        title={
          <>
            Do “sim” sob as árvores <span className="text-highlight-dark">à última música da pista.</span>
          </>
        }
      />
      <NumbersSection />
      <ServicesShowcase />

      <section className="bg-mist overflow-hidden py-28 md:py-36">
        <Reveal className="container-site mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Momentos</Eyebrow>
            <h2 className="text-[clamp(2.34rem,4.86vw,4.32rem)] leading-[1.02] font-light">
              Cenas de quem já <span className="text-highlight-dark">celebrou aqui.</span>
            </h2>
          </div>
          <ButtonLink href="/galeria" variant="outline-dark" icon="arrowRight">
            Ver galeria
          </ButtonLink>
        </Reveal>
        <MomentsStrip photos={momentsPhotos} />
      </section>

      <TestimonialsSection />
      <DifferentialsSection />
      <GalleryPreview />
      <LocationSection />
      <FinalCta />
      {/* FAQ é sempre a última seção antes do rodapé */}
      <FaqSection items={featuredFaqs} className="bg-paper py-28 md:py-36" />
    </>
  )
}
