import { facts, site } from '@/config/site'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { CountUp } from '@/components/motion/Effects'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal'

/** Números do perfil público (Casamentos.com.br), em bloco floresta com grão. */
export function NumbersSection() {
  const nota = site.rating?.value.toLocaleString('pt-BR', { minimumFractionDigits: 1 })
  const items = [
    {
      value: (
        <>
          <CountUp to={facts.couples} />+
        </>
      ),
      label: 'casais já escolheram o Lanai',
    },
    {
      value: (
        <>
          {nota}
          <span className="text-[0.45em] not-italic">/5</span>
        </>
      ),
      label: `nota em ${site.rating?.count} avaliações públicas`,
    },
    { value: <CountUp to={6} duration={1} />, label: 'prêmios Casamentos Awards (2018–2024)' },
    { value: <CountUp to={facts.eventsPerDay} duration={0.6} />, label: 'evento por dia: o espaço inteiro para você' },
  ]
  return (
    <section className="bg-ink-900 grain relative overflow-hidden py-28 text-white md:py-36">
      <div className="container-site relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="dark" className="justify-center">
            Reconhecimento
          </Eyebrow>
          <h2 className="text-[clamp(2.34rem,4.86vw,4.32rem)] leading-[1.02] font-light">
            Histórias que se repetem, <span className="text-highlight">em mais de 370 casamentos.</span>
          </h2>
        </Reveal>
        <Stagger as="dl" className="mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {items.map((it, i) => (
            <StaggerItem
              key={i}
              className="flex flex-col-reverse items-center gap-4 px-6 text-center lg:border-l lg:border-white/12 lg:first:border-l-0"
            >
              <dt className="eyebrow max-w-[16rem] leading-relaxed text-white/65">{it.label}</dt>
              <dd className="font-display text-primary-300 text-[clamp(3.24rem,5.4vw,5.04rem)] leading-none font-light italic">
                {it.value}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-14 text-center text-xs text-white/45">
          *Conforme o perfil público do Lanai no Casamentos.com.br, consultado em outubro de 2026.
        </p>
      </div>
    </section>
  )
}
