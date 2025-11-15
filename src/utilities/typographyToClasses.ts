type TypographyData = {
  fontFamily?: 'default' | 'heading' | 'body' | 'mono' | null
  alignment?: 'left' | 'center' | 'right' | null
  textSize?: 'default' | 'sm' | 'base' | 'lg' | 'xl' | null
}

/**
 * Converts typography field data to Tailwind CSS classes
 *
 * @param typography - Typography field data from Payload CMS
 * @returns Space-separated string of Tailwind classes
 *
 * @example
 * typographyToClasses({ fontFamily: 'heading', alignment: 'center' })
 * // Returns: "font-heading text-center"
 */
export function typographyToClasses(typography?: TypographyData | null): string {
  if (!typography) return ''

  const classes: string[] = []

  // Font family classes
  if (typography.fontFamily && typography.fontFamily !== 'default') {
    classes.push(`font-${typography.fontFamily}`)
  }

  // Text alignment classes
  if (typography.alignment) {
    classes.push(`text-${typography.alignment}`)
  }

  // Text size classes
  if (typography.textSize && typography.textSize !== 'default') {
    const sizeMap = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }
    classes.push(sizeMap[typography.textSize])
  }

  return classes.join(' ')
}
