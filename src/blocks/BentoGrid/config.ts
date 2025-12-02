import type { Block, Field } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { appearanceOptions } from '@/fields/link'
import { decorativePattern } from '@/fields/decorativePattern'
import { defaultLexical } from '@/fields/defaultLexical'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'

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
  {
    name: 'overlayStrength',
    type: 'select',
    label: 'Background Overlay Strength',
    defaultValue: 'medium',
    options: [
      { label: 'Light (20%)', value: 'light' },
      { label: 'Medium (40%)', value: 'medium' },
      { label: 'Strong (60%)', value: 'strong' },
      { label: 'Very Strong (80%)', value: 'veryStrong' },
    ],
    admin: {
      description: 'Controls the darkness of the overlay on background images for better text readability',
      condition: (data, siblingData) => siblingData?.imageStyle === 'background',
    },
  },
  {
    name: 'colorVariant',
    type: 'select',
    label: 'Background Color Variant',
    defaultValue: 'default',
    options: [
      { label: 'Default (White Glass)', value: 'default' },
      { label: 'Brand Blue (Blue Tint)', value: 'brand' },
      { label: 'Gold Accent (Gold Tint)', value: 'gold' },
      { label: 'Dark Glass (Muted)', value: 'dark' },
      { label: 'Gradient Blue', value: 'gradientBlue' },
      { label: 'Gradient Gold', value: 'gradientGold' },
    ],
    admin: {
      description: 'Choose the background color style for this tile to differentiate it',
    },
  },
  {
    type: 'collapsible',
    label: 'Link Appearance',
    admin: {
      description: 'Customize how the link appears on this tile',
      initCollapsed: true,
    },
    fields: [
      {
        name: 'linkType',
        type: 'radio',
        label: 'Link Display Style',
        defaultValue: 'text',
        options: [
          { label: 'Text Link with Arrow', value: 'text' },
          { label: 'Button', value: 'button' },
        ],
        admin: {
          layout: 'horizontal',
        },
      },
      {
        name: 'linkText',
        type: 'text',
        label: 'Link Text',
        defaultValue: 'Learn more',
        admin: {
          description: 'Customize the text displayed (e.g., "Explore", "Get Started", "View Details")',
        },
      },
      {
        name: 'buttonAppearance',
        type: 'select',
        label: 'Button Style',
        defaultValue: 'default',
        options: Object.values(appearanceOptions),
        admin: {
          condition: (data, siblingData) => siblingData?.linkType === 'button',
          description: 'Choose the button style (only applies when Link Display Style is Button)',
        },
      },
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
      editor: defaultLexical,
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
    blockAppearance({
      textColor: true,
      backgroundVariant: true,
      alignment: true,
      fullWidth: true,
      padding: true,
    }),
    decorativePattern({
      enablePatterns: true,
    }),
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
