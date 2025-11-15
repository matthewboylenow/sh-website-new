import React from 'react'
import type { CustomCodeBlock as CustomCodeProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

export const CustomCodeBlock: React.FC<CustomCodeProps> = ({ code, language, appearance }) => {
  // Wrap code based on language type
  const renderCode = () => {
    if (!code) return null

    switch (language) {
      case 'css':
        return <style dangerouslySetInnerHTML={{ __html: code }} />
      case 'javascript':
        return <script dangerouslySetInnerHTML={{ __html: code }} />
      case 'html':
      default:
        return <div dangerouslySetInnerHTML={{ __html: code }} />
    }
  }

  return (
    <section className={cn('relative', blockAppearanceToClasses(appearance))}>
      <div className={getContainerClasses(appearance?.fullWidth)}>{renderCode()}</div>
    </section>
  )
}
