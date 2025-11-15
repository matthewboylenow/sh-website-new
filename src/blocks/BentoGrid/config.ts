import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'

const bentoItemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Item Title',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Description',
    required: true,
    maxLength: 200,
    admin: {
      description: '1-2 sentences describing this journey or feature',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Icon or Image',
    admin: {
      description: 'Icon or background image for this tile',
    },
  },
  {
    name: 'url',
    type: 'text',
    label: 'Link URL',
    required: true,
  },
  {
    name: 'tag',
    type: 'text',
    label: 'Tag',
    admin: {
      description: 'Optional tag label (e.g., "New", "Popular")',
    },
  },
  {
    name: 'size',
    type: 'select',
    label: 'Tile Size',
    defaultValue: 'medium',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
      { label: 'Extra Large', value: 'xlarge' },
    ],
    admin: {
      description: 'Controls how much space this tile takes up in the grid',
    },
  },
  {
    name: 'imageStyle',
    type: 'select',
    label: 'Image Style',
    defaultValue: 'icon',
    options: [
      { label: 'Icon (Small)', value: 'icon' },
      { label: 'Background Cover', value: 'background' },
    ],
  },
]

export const BentoGrid: Block = {
  slug: 'bentoGrid',
  interfaceName: 'BentoGridBlock',
  labels: {
    singular: 'Bento Grid',
    plural: 'Bento Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Section Subtitle',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'items',
      type: 'array',
      label: 'Grid Items',
      minRows: 3,
      maxRows: 6,
      fields: bentoItemFields,
      admin: {
        initCollapsed: true,
        description: 'Create 3-6 tiles for your bento grid',
      },
    },
    blockAppearance(),
  ],
}
