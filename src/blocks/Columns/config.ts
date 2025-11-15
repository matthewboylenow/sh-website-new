import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'
import { linkGroup } from '@/fields/linkGroup'

const columnFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Column Title',
  },
  {
    name: 'body',
    type: 'richText',
    label: 'Column Content',
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
  },
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
    label: 'Icon/Image',
    admin: {
      description: 'Optional icon or image for this column',
    },
  },
  linkGroup({
    appearances: ['default', 'outline'],
    overrides: {
      maxRows: 3,
      admin: {
        description: 'Optional links for this column',
      },
    },
  }),
]

export const Columns: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  labels: {
    singular: 'Columns',
    plural: 'Columns',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Optional title above the columns',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'equal',
      options: [
        { label: 'Equal Columns', value: 'equal' },
        { label: '1/3 - 2/3 (Left Heavy)', value: 'oneThirdLeft' },
        { label: '2/3 - 1/3 (Right Heavy)', value: 'oneThirdRight' },
      ],
      admin: {
        description: 'Column width distribution',
      },
    },
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: columnFields,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'columnGap',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'large' },
      ],
      admin: {
        description: 'Space between columns',
      },
    },
    blockAppearance(),
  ],
}
