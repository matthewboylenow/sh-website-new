import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'
import { quillSubtitle } from '@/fields/quillRichText'

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
    quillSubtitle({
      name: 'subtitle',
      label: 'Subtitle',
      admin: {
        description: 'Optional: Description or introduction',
      },
    }),
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
    decorativePattern({ enablePatterns: true }),
    visibilitySettings({
      deviceVisibility: true,
      audienceTargeting: true,
      seasonalDisplay: false,
    }),
    animationSettings({
      presets: true,
      timing: true,
      behavior: true,
    }),
    blockName,
  ],
}
