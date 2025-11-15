import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'

export const RichTextSection: Block = {
  slug: 'richTextSection',
  interfaceName: 'RichTextSectionBlock',
  labels: {
    singular: 'Rich Text Section',
    plural: 'Rich Text Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Optional heading for this section',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Content',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'prose',
      options: [
        { label: 'Narrow (Prose)', value: 'prose' },
        { label: 'Medium', value: 'medium' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full', value: 'full' },
      ],
      admin: {
        description: 'Maximum width of the content',
      },
    },
    blockAppearance(),
  ],
}
