import { directionsUrl, site } from '@/config/site'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

/** "Localização" (home): card com endereço + mapa. */
export function LocationSection() {
  return (
    <section className="bg-mist py-28 md:py-36">
      <div className="container-site grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <Reveal className="bg-paper flex flex-col justify-center p-10 md:p-14">
          <Eyebrow>Localização</Eyebrow>
          <h2 className="text-[clamp(2.16rem,3.78vw,3.42rem)] leading-[1.03] font-light">
            Na orla da Pampulha, <span className="text-highlight-dark">em meio ao verde.</span>
          </h2>
          <p className="text-ink-950/75 mt-6 leading-relaxed">
            Na Av. Otacílio Negrão de Lima, o Lanai combina a atmosfera da Pampulha com amplas áreas verdes e uma
            estrutura completa para receber casamentos e celebrações em Belo Horizonte.
          </p>
          <address className="border-ink-950/15 my-8 border-y py-6 not-italic">
            <span className="font-display block text-2xl italic">{site.name}</span>
            <span className="text-ink-950/75 mt-1 block">
              {site.address.street}
              <br />
              {site.address.neighborhood} ({site.address.region}) · {site.address.city} – {site.address.stateCode},{' '}
              {site.address.postalCode}
            </span>
          </address>
          <div>
            <ButtonLink href={directionsUrl} variant="dark" icon="arrowUpRight">
              Como chegar
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} scale={0.97} className="min-h-[420px] overflow-hidden bg-[#e5e3df] lg:min-h-[560px]">
          <iframe
            title={`Mapa com a localização do ${site.name}`}
            src={site.address.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[420px] w-full border-0 grayscale-[35%] lg:min-h-[560px]"
          />
        </Reveal>
      </div>
    </section>
  )
}
