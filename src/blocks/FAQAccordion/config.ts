import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'

export const FAQAccordion: Block = {
  slug: 'faqAccordion',
  interfaceName: 'FAQAccordionBlock',
  labels: {
    singular: 'FAQ Accordion',
    plural: 'FAQ Accordions',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Optional: Main heading for this FAQ section',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Answer',
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Tags',
          admin: {
            description: 'Optional: Tags for filtering/categorization',
          },
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
          ],
        },
      ],
      admin: {
        description: 'Add questions and answers',
      },
    },
    {
      name: 'defaultOpen',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'All Closed', value: 'none' },
        { label: 'First Item Open', value: 'first' },
        { label: 'All Open', value: 'all' },
      ],
      admin: {
        description: 'Which items should be open by default',
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
