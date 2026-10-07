import Image from 'next/image'
import { blur, type Photo } from '@/content/photos'
import { cn } from '@/lib/cn'
import { Parallax } from '@/components/motion/Parallax'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Duas fotos em arco (moldura clássica de capela/altar): uma alta à esquerda e outra menor, mais baixa,
 * sobreposta à direita com parallax leve. Usado na apresentação da home e no "Sobre".
 */
export function ArchPhotos({ left, right, className }: { left: Photo; right: Photo; className?: string }) {
  return (
    <div className={cn('relative mx-auto aspect-[1.15/1] w-full max-w-[620px]', className)}>
      <span
        aria-hidden="true"
        className="border-accent-300/70 absolute top-6 left-6 h-[86%] w-[54%] rounded-t-full border"
      />
      <Reveal y={60} className="absolute top-0 left-0 h-[86%] w-[54%]">
        <div className="photo-frame relative h-full w-full overflow-hidden rounded-t-full">
          <Image
            src={left.src}
            alt={left.alt}
            fill
            sizes="(min-width: 1024px) 340px, 54vw"
            quality={85}
            {...blur(left)}
            className="object-cover"
          />
        </div>
      </Reveal>
      <Parallax speed={40} className="absolute right-0 bottom-0 h-[68%] w-[44%]">
        <Reveal y={60} delay={0.15} className="h-full w-full">
          <div className="photo-frame relative h-full w-full overflow-hidden rounded-t-full ring-8 ring-[var(--color-paper)]">
            <Image
              src={right.src}
              alt={right.alt}
              fill
              sizes="(min-width: 1024px) 280px, 44vw"
              quality={85}
              {...blur(right)}
              className="object-cover"
            />
          </div>
        </Reveal>
      </Parallax>
    </div>
  )
}
