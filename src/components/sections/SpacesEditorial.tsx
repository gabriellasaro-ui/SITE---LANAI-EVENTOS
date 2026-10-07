import Image from 'next/image'
import { blur } from '@/content/photos'
import type { Space } from '@/content/venue'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { ImageReveal } from '@/components/motion/ImageReveal'
import { Parallax } from '@/components/motion/Parallax'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

/**
 * Ambientes em formato editorial: foto grande que "abre" ao rolar, uma segunda foto menor em parallax
 * e o texto ao lado, alternando os lados a cada ambiente.
 */
export function SpacesEditorial({
  spaces,
  eyebrow = 'Os ambientes',
  title,
  tone = 'paper',
}: {
  spaces: Space[]
  eyebrow?: string
  title?: React.ReactNode
  tone?: 'paper' | 'mist'
}) {
  return (
    <section className={cn('py-28 md:py-36', tone === 'mist' ? 'bg-mist' : 'bg-paper')}>
      <div className="container-site">
        {title && (
          <Reveal className="mx-auto mb-20 max-w-3xl text-center md:mb-28">
            <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
            <h2 className="text-[clamp(2.34rem,4.86vw,4.32rem)] leading-[1.02] font-light">{title}</h2>
          </Reveal>
        )}
        <ol className="grid gap-28 md:gap-40">
          {spaces.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <li key={s.slug} id={s.slug} className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-12 lg:gap-8">
                <div className={cn('relative lg:col-span-7', flip && 'lg:order-2 lg:col-start-6')}>
                  <ImageReveal
                    photo={s.photo}
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="photo-frame aspect-[4/3] w-full"
                  />
                  {s.detail && (
                    <Parallax
                      speed={50}
                      className={cn('absolute -bottom-14 hidden w-[38%] md:block', flip ? '-left-10' : '-right-10')}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden ring-[10px] ring-[var(--color-paper)]">
                        <Image
                          src={s.detail.src}
                          {...blur(s.detail)}
                          alt={s.detail.alt}
                          fill
                          sizes="300px"
                          quality={85}
                          className="object-cover"
                        />
                      </div>
                    </Parallax>
                  )}
                </div>
                <Reveal
                  delay={0.15}
                  className={cn('lg:col-span-4', flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9')}
                >
                  <span className="font-display text-accent-500 text-5xl leading-none font-light italic">
                    {roman[i]}
                  </span>
                  <h3 className="mt-6 text-[clamp(1.98rem,3.24vw,2.88rem)] leading-[1.04]">{s.title}</h3>
                  <span aria-hidden="true" className="bg-accent-300 mt-7 block h-px w-14" />
                  <p className="text-ink-950/70 mt-7 text-lg leading-relaxed">{s.text}</p>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
