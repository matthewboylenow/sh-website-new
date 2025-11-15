import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'

export const MediaList: Block = {
  slug: 'mediaList',
  interfaceName: 'MediaListBlock',
  labels: {
    singular: 'Media List',
    plural: 'Media Lists',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Optional: Heading for this media section',
      },
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle',
      admin: {
        description: 'Optional: Description or introduction',
      },
    },
    {
      name: 'mediaType',
      type: 'select',
      defaultValue: 'podcast',
      options: [
        { label: 'Podcasts', value: 'podcast' },
        { label: 'Sermons/Messages', value: 'sermon' },
        { label: 'All Media', value: 'all' },
      ],
      admin: {
        description: 'Type of media to display',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        description: 'Number of items to show',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid (Cards)', value: 'grid' },
        { label: 'List View', value: 'list' },
        { label: 'Featured + Grid', value: 'featured' },
      ],
      admin: {
        description: 'Visual layout style',
      },
    },
    {
      name: 'showDate',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Date',
    },
    {
      name: 'showDuration',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Duration',
    },
    {
      name: 'viewAllUrl',
      type: 'text',
      label: '"View All" Link URL',
      admin: {
        description: 'Optional: URL for a "View All Media" link',
      },
    },
    blockAppearance({
      backgroundVariant: true,
      alignment: true,
      fullWidth: true,
      padding: true,
    }),
  ],
}
