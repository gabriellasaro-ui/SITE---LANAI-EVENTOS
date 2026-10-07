'use client'

import { m } from 'motion/react'
import Image from 'next/image'
import { blur, type Photo } from '@/content/photos'
import { cn } from '@/lib/cn'

const EASE = [0.76, 0, 0.24, 1] as const

/**
 * Foto que "abre" de baixo para cima ao entrar na tela (cortina) e assenta com um zoom suave.
 * Efeito editorial de revista; sem JS, a foto aparece normal (failsafe em globals.css).
 */
export function ImageReveal({
  photo,
  sizes,
  className,
  delay = 0,
  priority,
}: {
  photo: Photo
  sizes: string
  className?: string
  delay?: number
  priority?: boolean
}) {
  // O IntersectionObserver considera o clip-path do próprio alvo: com a cortina fechada (inset 100%) a área
  // visível é zero e o whileInView nunca dispara. Por isso quem observa é o invólucro, sem recorte.
  return (
    <m.div
      data-reveal=""
      className={cn('relative', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <m.div
        data-reveal-clip=""
        className="absolute inset-0 overflow-hidden"
        variants={{
          hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, delay, ease: EASE } },
        }}
      >
        <m.div
          data-reveal-clip=""
          className="absolute inset-0"
          variants={{
            hidden: { scale: 1.18 },
            show: { scale: 1, transition: { duration: 2, delay, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <Image
            src={photo.src}
            {...blur(photo)}
            alt={photo.alt}
            fill
            sizes={sizes}
            quality={85}
            priority={priority}
            className="object-cover"
          />
        </m.div>
      </m.div>
    </m.div>
  )
}
