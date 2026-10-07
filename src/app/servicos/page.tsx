import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { blur, photos } from '@/content/photos'
import { services } from '@/content/venue'
import { pageMetadata } from '@/lib/seo'
import { servicesSchema, webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Casamentos e cerimônias ao ar livre em BH'
const description =
  'Casamentos completos, cerimônias sob as jabuticabeiras, bodas e celebrações especiais no Lanai, na Pampulha, com um único evento por dia.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/servicos' })

const slugByTag: Record<string, string> = {
  Casamentos: 'casamento',
  Cerimônia: 'casamento',
  Recepção: 'casamento',
}

export default function ServicosPage() {
  return (
    <>
      <JsonLd data={[webPageSchema({ path: '/servicos', name: title, description }), servicesSchema()]} />
      <PageHero
        crumb={{ label: 'Serviços', href: '/servicos' }}
        image={photos.saidaNoivos}
        title="Cada celebração com o cenário que ela merece."
        highlight={{ cenário: 'text-highlight' }}
        description="Do casamento completo à renovação de votos, o Lanai reúne natureza, sofisticação e uma equipe dedicada a cada detalhe."
      >
        <ButtonLink href="/contato" variant="primary" size="lg" icon="arrowRight">
          Solicitar proposta
        </ButtonLink>
      </PageHero>

      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <SectionHeading
            eyebrow="O que realizamos"
            title="Uma estrutura completa, cercada de verde."
            description="Escolha a ocasião e fale com a equipe: apresentamos cada ambiente e montamos a proposta para a sua data."
          />
          <Stagger as="ul" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {services.map((s) => {
              const slug = slugByTag[s.tag]
              return (
                <StaggerItem as="li" key={s.title} className="h-full">
                  <Link
                    href={slug ? `/contato?evento=${slug}` : '/contato'}
                    className="group border-ink-950/10 hover:border-primary-300 flex h-full flex-col border bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgb(31_31_31/0.4)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={s.photo.src}
                        {...blur(s.photo)}
                        alt={s.photo.alt}
                        fill
                        quality={85}
                        sizes="(min-width: 1024px) 760px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                      />
                      <span className="eyebrow bg-paper text-primary-700 absolute top-4 left-4 px-3 py-1.5 text-[0.6rem]">
                        {s.tag}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-8">
                      <Icon name={s.icon} size={24} className="text-primary-600" />
                      <h3 className="mt-5 text-3xl leading-tight">{s.title}</h3>
                      <p className="text-ink-950/70 mt-3 leading-relaxed">{s.text}</p>
                      <span className="text-ink-950 mt-auto flex items-center gap-2 pt-7 text-[0.68rem] font-semibold tracking-[0.22em] uppercase">
                        {s.tag === 'Visita' ? 'Agendar visita' : 'Pedir proposta'}
                        <Icon name="arrowRight" size={15} className="transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </section>
      <FinalCta photo={photos.salaoLustre} />
    </>
  )
}
