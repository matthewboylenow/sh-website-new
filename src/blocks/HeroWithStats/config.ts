import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'
import { linkGroup } from '@/fields/linkGroup'

export const HeroWithStats: Block = {
  slug: 'heroWithStats',
  interfaceName: 'HeroWithStatsBlock',
  labels: {
    singular: 'Hero - With Statistics',
    plural: 'Heroes - With Statistics',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      admin: {
        description: 'Optional small text above the title',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'Main hero heading',
      },
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        description: 'Brief description or introduction',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description: 'Optional background image',
      },
    },
    {
      name: 'backgroundOverlay',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Medium', value: 'medium' },
        { label: 'Dark', value: 'dark' },
      ],
      admin: {
        condition: (data, siblingData) => Boolean(siblingData?.backgroundImage),
        description: 'Overlay darkness for better text readability',
      },
    },
    linkGroup({
      overrides: {
        name: 'buttons',
        label: 'Buttons / CTAs',
        maxRows: 3,
      },
    }),
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 2,
      maxRows: 4,
      admin: {
        description: 'Key statistics to display below the hero',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Stat Value',
          admin: {
            description: 'e.g., "2,500+", "35", "50 Years"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Stat Label',
          admin: {
            description: 'e.g., "Parishioners", "LifeLine Groups", "Serving the Community"',
          },
        },
      ],
    },
    blockAppearance({
      backgroundVariant: true,
      alignment: true,
      fullWidth: true,
      padding: true,
    }),
  ],
}
