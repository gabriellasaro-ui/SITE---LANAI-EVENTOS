import type { Metadata } from 'next'
import { facts, fullAddress, site } from '@/config/site'
import { photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ArchPhotos } from '@/components/ui/ArchPhotos'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'
import { DifferentialsSection } from '@/components/sections/DifferentialsSection'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Sobre o Lanai Eventos: vivemos de detalhes'
const description =
  'O Lanai Eventos é um espaço onde sofisticação e natureza se encontram, na Pampulha, em BH: mais de 370 casais e 6 prêmios Casamentos Awards entre 2018 e 2024.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/sobre' })

const pillars = [
  {
    title: 'Natureza',
    text: 'Um espaço amplo de área verde, em pleno contato com a natureza: o cenário já nasce pronto.',
  },
  {
    title: 'Detalhe',
    text: 'Cada ambiente pensado para que o dia flua com leveza, do making of à última música.',
  },
  {
    title: 'Memória',
    text: 'Eternizar momentos, revelando como a realidade é rica e única em cada celebração.',
  },
]

export default function SobrePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: '/sobre', name: title, description, type: 'AboutPage' })} />
      <PageHero
        crumb={{ label: 'Sobre nós', href: '/sobre' }}
        image={photos.salaoDia}
        title="Vivemos de detalhes."
        highlight={{ detalhes: 'text-highlight' }}
        description="Um espaço onde sofisticação e natureza se encontram, para que cada celebração seja mais do que um evento: uma história a ser contada."
      />

      <section className="bg-paper overflow-hidden py-28 md:py-40">
        <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>Nossa história</Eyebrow>
            <h2 className="text-[clamp(2.34rem,4.5vw,4.14rem)] leading-[1.02] font-light">
              Um cenário inspirador, <span className="text-highlight-dark">cuidado em cada detalhe.</span>
            </h2>
            <p className="text-ink-950/70 mt-8 text-lg leading-relaxed">
              Com um cenário inspirador, o {site.name} possui um espaço amplo de área verde, em pleno contato com a
              natureza: um ambiente único. Cercado por uma charmosa alameda de jabuticabeiras e por um elegante gazebo,
              o Lanai reúne a estrutura completa para transformar o grande dia em uma experiência inesquecível.
            </p>
            <p className="text-ink-950/70 mt-5 text-lg leading-relaxed">
              Ao longo dos anos, mais de {facts.couples} casais escolheram o Lanai, e o espaço recebeu {facts.awards},
              segundo o Casamentos.com.br.
            </p>
          </Reveal>
          <ArchPhotos left={photos.corredorFlores} right={photos.pergoladoMesa} />
        </div>
      </section>

      <section className="bg-mist py-28 md:py-36">
        <div className="container-site">
          <SectionHeading eyebrow="O que nos move" title="Três palavras que definem o Lanai." align="center" />
          <Stagger as="ul" className="grid gap-12 md:grid-cols-3" stagger={0.12}>
            {pillars.map((p, i) => (
              <StaggerItem as="li" key={p.title} className="text-center">
                <span className="font-display text-accent-600 text-6xl font-light italic">{['I', 'II', 'III'][i]}</span>
                <h3 className="mt-6 text-4xl font-light">{p.title}</h3>
                <p className="text-ink-950/70 mx-auto mt-4 max-w-xs leading-relaxed">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <DifferentialsSection />

      <section className="bg-paper py-28 md:py-36">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <ImageReveal
            photo={photos.altarFlores}
            sizes="(min-width: 1024px) 680px, 100vw"
            className="photo-frame aspect-[4/3] w-full"
          />
          <Reveal>
            <div className="border-ink-950/12 border-t">
              {[
                { t: 'Endereço', d: fullAddress },
                { t: 'Capacidade', d: `${facts.capacity.min} a ${facts.capacity.max} convidados` },
                { t: 'Exclusividade', d: `${facts.eventsPerDay} evento por dia` },
                { t: 'Reconhecimento', d: facts.awards },
                { t: 'Contato', d: `${site.contact.whatsapp.display} · ${site.contact.email}` },
              ].map((item) => (
                <dl key={item.t} className="border-ink-950/12 grid gap-1 border-b py-5 sm:grid-cols-[10rem_1fr]">
                  <dt className="eyebrow text-accent-600 pt-1">{item.t}</dt>
                  <dd className="text-ink-950/80 leading-relaxed">{item.d}</dd>
                </dl>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
