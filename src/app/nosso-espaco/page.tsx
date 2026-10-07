import type { Metadata } from 'next'
import { photos } from '@/content/photos'
import { amenities, spaces } from '@/content/venue'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { SpacesEditorial } from '@/components/sections/SpacesEditorial'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Nosso espaço: jabuticabeiras, jardins e salão'
const description =
  'Cerimônia sob a alameda de jabuticabeiras, gazebo, jardins, salão climatizado, suíte da noiva, pub do noivo e brinquedoteca: conheça os ambientes do Lanai, na Pampulha.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/nosso-espaco' })

export default function NossoEspacoPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/nosso-espaco', name: title, description })} />
      <PageHero
        crumb={{ label: 'Nosso espaço', href: '/nosso-espaco' }}
        image={photos.pergolado}
        title="Um cenário inspirador, em pleno contato com a natureza."
        highlight={{ natureza: 'text-highlight' }}
        description="Amplas áreas verdes, uma alameda de jabuticabeiras e ambientes pensados para cada momento do dia, do making of à pista."
      >
        <ButtonLink href="#cerimonia" variant="light" size="lg" icon="arrowRight">
          Percorrer os ambientes
        </ButtonLink>
      </PageHero>

      <SpacesEditorial
        spaces={spaces}
        eyebrow="Os ambientes"
        title={
          <>
            Sete cenários, <span className="text-highlight-dark">um só endereço.</span>
          </>
        }
      />

      <section className="bg-ink-900 grain relative overflow-hidden py-28 text-white md:py-36">
        <div className="container-site relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <Eyebrow tone="dark">Estrutura</Eyebrow>
            <h2 className="text-[clamp(2.34rem,4.5vw,3.96rem)] leading-[1.02] font-light">
              Tudo pensado para <span className="text-highlight">receber bem.</span>
            </h2>
            <p className="mt-7 max-w-md leading-relaxed text-white/75">
              Uma estrutura completa para 50 a 300 convidados, com um único evento por dia.
            </p>
            <div className="mt-10">
              <ButtonLink href="/contato" variant="light" icon="arrowRight">
                Agendar visita
              </ButtonLink>
            </div>
          </Reveal>
          <Stagger as="ul" className="grid border-t border-white/15 sm:grid-cols-2" stagger={0.05}>
            {amenities.map((a) => (
              <StaggerItem
                as="li"
                key={a}
                className="font-display flex items-center gap-4 border-b border-white/15 py-5 text-2xl font-light"
              >
                <span aria-hidden="true" className="bg-primary-400 h-1.5 w-1.5 shrink-0 rounded-full" />
                {a}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FinalCta photo={photos.jardimMesas} />
    </>
  )
}
