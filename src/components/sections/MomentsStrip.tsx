'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { blur, type Photo } from '@/content/photos'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const INTERVAL = 5000
const REDUCED = '(prefers-reduced-motion: reduce)'
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/**
 * Carrossel de momentos em "coverflow": a foto do centro em destaque, as vizinhas menores e esmaecidas.
 * Arrasta no celular (scroll-snap), setas e clique nas vizinhas no PC, avanço automático com barra de
 * progresso (pausa com o mouse em cima, fora da tela ou com "reduzir movimento").
 */
export function MomentsStrip({ photos }: { photos: Photo[] }) {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  )

  const goTo = useCallback((i: number) => {
    const el = track.current
    const slide = el?.children[i] as HTMLElement | undefined
    if (!el || !slide) return
    el.scrollTo({ left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2, behavior: 'smooth' })
  }, [])

  // Foto ativa = a mais próxima do centro da faixa
  const onScroll = () => {
    const el = track.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let dist = Infinity
    Array.from(el.children).forEach((c, i) => {
      const s = c as HTMLElement
      const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    setActive(best)
  }

  // Começa na 2ª foto, para já haver vizinhas dos dois lados (sem animação)
  useEffect(() => {
    const el = track.current
    const slide = el?.children[1] as HTMLElement | undefined
    if (el && slide) el.scrollLeft = slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 })
    if (track.current) io.observe(track.current)
    return () => io.disconnect()
  }, [])

  const running = visible && !paused && !reduced
  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => goTo((active + 1) % photos.length), INTERVAL)
    return () => window.clearTimeout(id)
  }, [running, active, goTo, photos.length])

  return (
    <div
      className="relative [--w:72vw] sm:[--w:44vw] lg:[--w:min(30vw,440px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <ul
        ref={track}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[calc(50%-var(--w)/2)] py-4 md:gap-8"
      >
        {photos.map((p, i) => (
          <li key={p.src} className="w-[var(--w)] shrink-0 snap-center">
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver foto ${i + 1}: ${p.caption}`}
              aria-current={i === active}
              className={cn(
                'relative block aspect-[3/4] w-full overflow-hidden transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                i === active
                  ? 'photo-frame scale-100 opacity-100'
                  : 'scale-[0.84] opacity-45 saturate-[0.6] hover:opacity-70',
              )}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                quality={85}
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 44vw, 72vw"
                {...blur(p)}
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="container-site mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <div aria-live="polite">
          <p className="eyebrow text-accent-600">
            {String(active + 1).padStart(2, '0')}{' '}
            <span className="text-ink-950/35">/ {String(photos.length).padStart(2, '0')}</span>
          </p>
          <p
            key={active}
            className="font-display text-ink-900 animate-rise mt-3 text-[clamp(1.62rem,2.7vw,2.34rem)] italic"
          >
            {photos[active].caption}
          </p>
          <span className="bg-ink-950/12 relative mt-6 block h-px w-full max-w-xs overflow-hidden">
            {running && (
              <span
                key={active}
                className="bg-accent-600 absolute inset-0 origin-left"
                style={{ animation: `carousel-fill ${INTERVAL}ms linear forwards` }}
              />
            )}
          </span>
        </div>
        <div className="flex gap-2">
          {(
            [
              { label: 'Foto anterior', icon: 'arrowLeft', dir: -1 },
              { label: 'Próxima foto', icon: 'arrowRight', dir: 1 },
            ] as const
          ).map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() => goTo((active + b.dir + photos.length) % photos.length)}
              aria-label={b.label}
              className="border-ink-900/25 hover:bg-ink-900 hover:border-ink-900 hover:text-paper grid h-12 w-12 place-items-center rounded-full border transition"
            >
              <Icon name={b.icon} size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
