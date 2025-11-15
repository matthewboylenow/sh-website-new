import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'

export const BulletinList: Block = {
  slug: 'bulletinList',
  interfaceName: 'BulletinListBlock',
  labels: {
    singular: 'Bulletin List',
    plural: 'Bulletin Lists',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Weekly Bulletins',
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
      name: 'displayMode',
      type: 'select',
      label: 'Display Mode',
      defaultValue: 'recent',
      required: true,
      options: [
        { label: 'Recent Bulletins', value: 'recent' },
        { label: 'Current Week Only', value: 'current' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Bulletins',
      defaultValue: 4,
      min: 1,
      max: 12,
      admin: {
        condition: (data, siblingData) => siblingData?.displayMode === 'recent',
        description: 'Maximum number of bulletins to display',
      },
    },
    {
      name: 'showHighlights',
      type: 'checkbox',
      label: 'Show Highlights',
      defaultValue: false,
      admin: {
        description: 'Display bulletin highlights/summary if available',
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
        { label: 'Compact', value: 'compact' },
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
      defaultValue: '/bulletins',
      admin: {
        condition: (data, siblingData) => siblingData?.showViewAllLink === true,
      },
    },
    blockAppearance(),
    blockName,
  ],
}
