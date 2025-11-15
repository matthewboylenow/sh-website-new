import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'
import { linkGroup } from '@/fields/linkGroup'

export const CTAFullWidth: Block = {
  slug: 'ctaFullWidth',
  interfaceName: 'CTAFullWidthBlock',
  labels: {
    singular: 'CTA - Full Width',
    plural: 'CTAs - Full Width',
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
        description: 'Main heading for this call-to-action',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        description: 'Supporting text for the CTA',
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
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 3,
        admin: {
          description: 'Call-to-action buttons',
        },
      },
    }),
    blockAppearance({
      backgroundVariant: true,
      alignment: true,
      fullWidth: true,
      padding: true,
    }),
  ],
}
