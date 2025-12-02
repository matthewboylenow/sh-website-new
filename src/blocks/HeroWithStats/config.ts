import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { linkGroup } from '@/fields/linkGroup'
import { defaultLexical } from '@/fields/defaultLexical'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'

export const HeroWithStats: Block = {
  slug: 'heroWithStats',
  interfaceName: 'HeroWithStatsBlock',
  labels: {
    singular: 'Hero - With Statistics',
    plural: 'Heroes - With Statistics',
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
        description: 'Main hero heading',
      },
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle',
      editor: defaultLexical,
      admin: {
        description: 'Brief description or introduction',
      },
    },
    {
      name: 'backgroundType',
      type: 'radio',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: {
        description: 'Choose background type for the hero',
        layout: 'horizontal',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'image',
        description: 'Background image for the hero',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Video',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'video',
        description: 'Background video for the hero (MP4 format recommended)',
      },
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Video Poster Image',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'video',
        description: 'Fallback image shown while video loads',
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
        condition: (data, siblingData) => siblingData?.backgroundType !== 'none',
        description: 'Overlay darkness for better text readability',
      },
    },
    linkGroup({
      overrides: {
        name: 'buttons',
        label: 'Buttons / CTAs',
        maxRows: 3,
      },
    }),
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 2,
      maxRows: 4,
      admin: {
        description: 'Key statistics to display below the hero',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Stat Value',
          admin: {
            description: 'e.g., "2,500+", "35", "50 Years"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Stat Label',
          admin: {
            description: 'e.g., "Parishioners", "LifeLine Groups", "Serving the Community"',
          },
        },
      ],
    },
    {
      name: 'minHeight',
      type: 'select',
      label: 'Minimum Height',
      defaultValue: 'default',
      options: [
        { label: 'Small (50vh)', value: 'small' },
        { label: 'Default (60vh / 70vh)', value: 'default' },
        { label: 'Large (80vh)', value: 'large' },
        { label: 'Full Screen (100vh)', value: 'fullscreen' },
        { label: 'Auto (Fit Content)', value: 'auto' },
      ],
      admin: {
        description: 'Control the vertical height of the hero section',
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
