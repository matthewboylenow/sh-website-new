import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { defaultLexical } from '@/fields/defaultLexical'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'

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
      editor: defaultLexical,
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
        { label: 'Grid (Cards)', value: 'grid' },
        { label: 'Cover Gallery (Image Cards)', value: 'covers' },
        { label: 'List', value: 'list' },
        { label: 'Compact', value: 'compact' },
      ],
      admin: {
        description: 'Cover Gallery uses bulletin cover images for a visual magazine-style display',
      },
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
