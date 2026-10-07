import type { Metadata } from 'next'
import { absoluteUrl, site } from '@/config/site'
import { galleryPhotos, photos } from '@/content/photos'
import { pageMetadata } from '@/lib/seo'
import { webPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHero } from '@/components/layout/PageHero'
import { Reveal } from '@/components/motion/Reveal'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { FinalCta } from '@/components/sections/FinalCta'

const title = 'Galeria de casamentos no Lanai, em BH'
const description =
  'Fotos de casamentos no Lanai Eventos, na Pampulha: cerimônias sob as jabuticabeiras, jardins, salão, suíte da noiva, pub do noivo e brinquedoteca.'

export const metadata: Metadata = pageMetadata({ title, description, path: '/galeria' })

export default function GaleriaPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: '/galeria', name: title, description, type: 'CollectionPage' }),
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `Galeria do ${site.name}`,
            url: absoluteUrl('/galeria'),
            image: galleryPhotos.map((p) => ({
              '@type': 'ImageObject',
              contentUrl: absoluteUrl(p.src),
              caption: p.alt,
              width: p.width,
              height: p.height,
            })),
          },
        ]}
      />
      <PageHero
        crumb={{ label: 'Galeria', href: '/galeria' }}
        image={photos.salaoNoite}
        title="Imagine o seu dia acontecendo aqui."
        highlight={{ aqui: 'text-highlight' }}
        description="Cerimônias entre as árvores, festas no salão e os bastidores de cada casamento no Lanai Eventos, na Pampulha."
      />
      <section className="bg-paper py-24 md:py-28">
        <div className="container-site">
          <Reveal>
            <GalleryGrid items={galleryPhotos} />
          </Reveal>
          <Reveal className="border-primary-400 bg-primary-50 text-ink-950/80 mt-10 border-l-2 px-6 py-5">
            Cada montagem revela uma nova possibilidade. Explore diferentes momentos, ambientes e estilos de evento
            realizados no Lanai e encontre referências para a sua celebração.
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  )
}
