'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { blur } from '@/content/photos'
import { differentials } from '@/content/venue'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/cn'

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

/**
 * "Por que o Lanai": foto fixa à esquerda que troca (fade + zoom suave) conforme o motivo ativo,
 * e a lista à direita. O ativo muda ao rolar (o item que passa pelo meio da tela) ou ao passar o mouse.
 * No celular cada motivo traz a própria foto.
 */
export function DifferentialsSection() {
  const [active, setActive] = useState(0)
  const items = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="bg-ink-950 grain relative py-28 text-white md:py-40">
      <div className="container-site relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow tone="dark">Por que o Lanai</Eyebrow>
              <h2 className="text-[clamp(2.16rem,3.96vw,3.6rem)] leading-[1.05]">
                Seis razões para dizer <span className="text-highlight">sim aqui.</span>
              </h2>
            </Reveal>
            <div className="relative mt-12 hidden aspect-[4/5] overflow-hidden lg:block">
              {differentials.map((d, i) => (
                <div
                  key={d.title}
                  aria-hidden={i !== active}
                  className={cn(
                    'absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                    i === active ? 'scale-100 opacity-100' : 'scale-[1.06] opacity-0',
                  )}
                >
                  <Image
                    src={d.photo.src}
                    alt={i === active ? d.photo.alt : ''}
                    fill
                    sizes="(min-width: 1280px) 500px, 40vw"
                    quality={85}
                    {...blur(d.photo)}
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="from-ink-950/70 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-6 pt-20">
                <p className="font-display text-accent-200 text-lg italic">
                  {roman[active]}. {differentials[active].title}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {differentials.map((d, i) => (
            <li
              key={d.title}
              ref={(el) => {
                items.current[i] = el
              }}
              data-index={i}
              onMouseEnter={() => setActive(i)}
              className={cn(
                'border-b border-white/12 py-12 transition-opacity duration-700 first:pt-0 md:py-16 lg:first:pt-4',
                i === active ? 'lg:opacity-100' : 'lg:opacity-35',
              )}
            >
              <div className="relative mb-8 aspect-[16/10] overflow-hidden lg:hidden">
                <Image
                  src={d.photo.src}
                  alt={d.photo.alt}
                  fill
                  sizes="100vw"
                  quality={85}
                  {...blur(d.photo)}
                  className="object-cover"
                />
              </div>
              <div className="flex items-baseline gap-6">
                <span className="font-display text-accent-200 w-12 shrink-0 text-2xl italic">{roman[i]}.</span>
                <div>
                  <h3 className="text-[clamp(1.71rem,2.7vw,2.48rem)] leading-[1.08]">{d.title}</h3>
                  <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">{d.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
