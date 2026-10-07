import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'dark' | 'light' | 'accent' | 'outline-light' | 'outline-dark'
type Size = 'md' | 'lg'

/**
 * --btn-fill = cor que atravessa o botão no hover; --btn-fill-text = cor do texto por cima dela.
 * primary = oliva (principal), dark = floresta, accent = cacau, light = marfim.
 */
const variants: Record<Variant, string> = {
  primary: 'bg-primary-600 text-paper [--btn-fill:var(--color-ink-950)]',
  dark: 'bg-ink-900 text-paper [--btn-fill:var(--color-accent-600)]',
  light: 'bg-paper text-ink-950 [--btn-fill:var(--color-primary-600)] [--btn-fill-text:var(--color-paper)]',
  accent: 'bg-accent-600 text-paper [--btn-fill:var(--color-ink-950)]',
  'outline-light':
    'border border-paper/60 text-paper [--btn-fill:var(--color-paper)] [--btn-fill-text:var(--color-ink-950)]',
  'outline-dark':
    'border border-ink-950/40 text-ink-950 [--btn-fill:var(--color-ink-950)] [--btn-fill-text:var(--color-paper)]',
}

const sizes: Record<Size, string> = {
  md: 'h-12 px-7 text-[0.66rem]',
  lg: 'h-14 px-9 text-[0.7rem]',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'btn-brand group inline-flex items-center justify-center gap-3 text-center font-normal tracking-[0.3em] whitespace-nowrap uppercase disabled:pointer-events-none disabled:opacity-60 max-[420px]:h-auto max-[420px]:min-h-12 max-[420px]:py-3.5 max-[420px]:whitespace-normal',
    variants[variant],
    sizes[size],
    className,
  )
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: Variant
  size?: Size
  icon?: IconName
  iconLeft?: IconName
  className?: string
  children: ReactNode
}

export function ButtonLink({ variant, size, icon, iconLeft, className, children, href, ...props }: ButtonLinkProps) {
  const isNewTab = typeof href === 'string' && href.startsWith('http')
  return (
    <Link
      href={href}
      {...props}
      {...(isNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={buttonClasses(variant, size, className)}
    >
      {iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </Link>
  )
}
