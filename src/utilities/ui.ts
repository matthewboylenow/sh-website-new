/**
 * Utility functions for UI components automatically added by ShadCN and used in a few of our frontend components and blocks.
 *
 * Other functions may be exported from here in the future or by installing other shadcn components.
 */

import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Custom tailwind-merge config to handle our custom font-size classes
// Without this, twMerge treats text-h1, text-h2, etc. as color classes
// and removes them when combined with actual color classes like text-sh-primary
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-hero',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-h4',
        'text-body-lg',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
