import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'
import { linkGroup } from '@/fields/linkGroup'

export const HeroBasic: Block = {
  slug: 'heroBasic',
  interfaceName: 'HeroBasicBlock',
  labels: {
    singular: 'Hero - Basic',
    plural: 'Heroes - Basic',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      admin: {
        description: 'Optional small text above the title (e.g., "Welcome" or "Join Us")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'Main hero heading (e.g., "We\'re glad you\'re here.")',
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
        description: '1-2 sentences of welcoming text',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description: 'Optional background image for the hero',
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
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 3,
        admin: {
          description: 'Primary and secondary call-to-action buttons',
        },
      },
    }),
    blockAppearance({
      backgroundVariant: true,
      alignment: true,
      fullWidth: false,
      padding: true,
    }),
  ],
}
