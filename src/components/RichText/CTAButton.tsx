import Link from 'next/link'
import { cn } from '@/utilities/ui'

export type CTAButtonAppearance = 'primary' | 'secondary' | 'outline' | 'ghost'

export interface CTAButtonProps {
  label: string
  href: string
  appearance?: CTAButtonAppearance
  openInNewTab?: boolean
  className?: string
}

export function CTAButton({
  label,
  href,
  appearance = 'primary',
  openInNewTab = false,
  className,
}: CTAButtonProps) {
  const baseClasses = 'inline-flex items-center px-4 py-2 rounded-md font-medium transition-colors no-underline'

  const appearanceClasses = {
    primary: 'bg-sh-primary text-white hover:bg-sh-primary-soft',
    secondary: 'bg-sh-gold text-sh-primary hover:bg-sh-gold/90',
    outline: 'border-2 border-sh-primary text-sh-primary hover:bg-sh-primary/10',
    ghost: 'text-sh-primary hover:bg-sh-primary/10',
  }

  const linkProps = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  // Check if it's an external link
  const isExternal = href.startsWith('http://') || href.startsWith('https://')

  if (isExternal || openInNewTab) {
    return (
      <a
        href={href}
        className={cn(baseClasses, appearanceClasses[appearance], className)}
        {...linkProps}
      >
        {label}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(baseClasses, appearanceClasses[appearance], className)}
    >
      {label}
    </Link>
  )
}
