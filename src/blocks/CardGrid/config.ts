import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'

const manualCardFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Card Title',
    required: true,
  },
  {
    name: 'body',
    type: 'richText',
    label: 'Card Body',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Card Image',
  },
  {
    name: 'url',
    type: 'text',
    label: 'Link URL',
    admin: {
      description: 'Where should this card link to?',
    },
  },
  {
    name: 'badge',
    type: 'text',
    label: 'Badge Text',
    admin: {
      description: 'Optional badge label (e.g., "New", "Featured")',
    },
  },
]

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: {
    singular: 'Card Grid',
    plural: 'Card Grids',
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
      name: 'sourceType',
      type: 'select',
      defaultValue: 'manual',
      required: true,
      options: [
        { label: 'Manual Cards', value: 'manual' },
        { label: 'From Collection', value: 'collection' },
      ],
      admin: {
        description: 'Choose whether to manually create cards or pull from a collection',
      },
    },
    // Manual cards
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 12,
      fields: manualCardFields,
      admin: {
        condition: (data, siblingData) => siblingData?.sourceType === 'manual',
        initCollapsed: true,
      },
    },
    // Collection source
    {
      name: 'collectionSlug',
      type: 'select',
      label: 'Collection',
      options: [
        { label: 'Posts', value: 'posts' },
        { label: 'Events', value: 'events' },
        { label: 'Ministries', value: 'ministries' },
        { label: 'LifeLines', value: 'lifelines' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.sourceType === 'collection',
      },
    },
    {
      name: 'filterByTags',
      type: 'text',
      label: 'Filter by Tags',
      hasMany: true,
      admin: {
        condition: (data, siblingData) => siblingData?.sourceType === 'collection',
        description: 'Optional: Filter collection items by these tags',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        condition: (data, siblingData) => siblingData?.sourceType === 'collection',
        description: 'Number of items to display',
      },
    },
    {
      name: 'orderBy',
      type: 'select',
      label: 'Order By',
      defaultValue: 'createdAt_desc',
      options: [
        { label: 'Newest First', value: 'createdAt_desc' },
        { label: 'Oldest First', value: 'createdAt_asc' },
        { label: 'Title A-Z', value: 'title_asc' },
        { label: 'Title Z-A', value: 'title_desc' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.sourceType === 'collection',
      },
    },
    // Layout options
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        description: 'Number of columns on desktop',
      },
    },
    {
      name: 'cardStyle',
      type: 'select',
      label: 'Card Style',
      defaultValue: 'bordered',
      options: [
        { label: 'Bordered', value: 'bordered' },
        { label: 'Elevated', value: 'elevated' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'showViewAllLink',
      type: 'checkbox',
      label: 'Show "View All" Link',
      defaultValue: false,
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      label: '"View All" Link URL',
      admin: {
        condition: (data, siblingData) => siblingData?.showViewAllLink === true,
      },
    },
    blockAppearance(),
  ],
}
