import type { Media } from '@/payload-types'

export const image2: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Curving abstract shapes with an orange and blue gradient',
  caption:
    '<p>Photo by <a href="https://unsplash.com/@kirp" target="_blank" rel="noopener noreferrer">Andrew Kliatskyi</a> on Unsplash.</p>',
}
