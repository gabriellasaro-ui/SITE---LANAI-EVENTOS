'use client'

import { m, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Deslocamento inicial em px */
  y?: number
  x?: number
  scale?: number
  as?: 'div' | 'li' | 'section' | 'article' | 'figure' | 'header'
  /**
   * Quanto do bloco precisa estar visível para animar. Use 'some' em blocos mais altos que a tela
   * (ex.: galeria completa): com 0.2, um bloco 5x mais alto que a janela nunca atinge 20% visível.
   */
  amount?: number | 'some' | 'all'
}

/** Entrada ao rolar: sobe, aparece e desfoca → foca. Anima uma vez. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  x = 0,
  scale = 1,
  as = 'div',
  amount = 0.2,
}: RevealProps) {
  const Component = m[as]
  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.1) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 46, scale: 0.96, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

type StaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
  as?: 'div' | 'ul' | 'ol' | 'dl'
}

/** Container que anima os filhos <StaggerItem> em sequência quando entra na tela. */
export function Stagger({ children, className, stagger = 0.1, as = 'div' }: StaggerProps) {
  const Component = m[as]
  return (
    <Component
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const Component = m[as]
  return (
    <Component data-reveal="" className={className} variants={itemVariants}>
      {children}
    </Component>
  )
}
