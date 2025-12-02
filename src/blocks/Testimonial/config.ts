import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'
import { decorativePattern } from '@/fields/decorativePattern'
import { quillSimple } from '@/fields/quillRichText'

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  fields: [
    quillSimple({
      name: 'quote',
      label: 'Quote',
      required: true,
      admin: {
        description: 'The testimonial quote text',
      },
    }),
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Person Name',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role / Title',
      admin: {
        description: 'Optional: e.g., "Parishioner", "LifeLine Leader", "Parent"',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
      admin: {
        description: 'Optional: Photo of the person',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'card',
      options: [
        {
          label: 'Card (Boxed)',
          value: 'card',
        },
        {
          label: 'Inline Quote',
          value: 'inline',
        },
        {
          label: 'Featured (Large)',
          value: 'featured',
        },
      ],
      admin: {
        description: 'Visual style of the testimonial',
      },
    },
    blockAppearance({
      backgroundVariant: true,
      alignment: true,
      fullWidth: true,
      padding: true,
    }),
    decorativePattern({ enablePatterns: true }),
    visibilitySettings({
      deviceVisibility: true,
      audienceTargeting: true,
      seasonalDisplay: false,
    }),
    animationSettings({
      presets: true,
      timing: true,
      behavior: true,
    }),
    blockName,
  ],
}
