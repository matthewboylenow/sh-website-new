import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { linkGroup } from '@/fields/linkGroup'

const columnFields: Field[] = [
  {
    name: 'contentType',
    type: 'radio',
    defaultValue: 'text',
    options: [
      { label: 'Text Only', value: 'text' },
      { label: 'Image', value: 'image' },
      { label: 'Video', value: 'video' },
    ],
    admin: {
      layout: 'horizontal',
      description: 'Choose the type of content for this column',
    },
  },
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
      condition: (data, siblingData) => siblingData?.contentType === 'text' || !siblingData?.contentType,
      description: 'Optional icon or image above text content',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Image',
    admin: {
      condition: (data, siblingData) => siblingData?.contentType === 'image',
      description: 'Main image for this column',
    },
  },
  {
    name: 'video',
    type: 'upload',
    relationTo: 'media',
    label: 'Video File',
    admin: {
      condition: (data, siblingData) => siblingData?.contentType === 'video',
      description: 'Video file (MP4 recommended)',
    },
  },
  {
    name: 'videoPoster',
    type: 'upload',
    relationTo: 'media',
    label: 'Video Poster Image',
    admin: {
      condition: (data, siblingData) => siblingData?.contentType === 'video',
      description: 'Thumbnail image shown before video loads',
    },
  },
  {
    name: 'videoEmbed',
    type: 'text',
    label: 'Video Embed URL',
    admin: {
      condition: (data, siblingData) => siblingData?.contentType === 'video',
      description: 'Alternative: YouTube, Vimeo, or other embed URL (optional if video file provided)',
    },
  },
  linkGroup({
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
    blockName,
  ],
}
