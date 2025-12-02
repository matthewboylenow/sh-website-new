import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { defaultLexical } from '@/fields/defaultLexical'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'

export const EventList: Block = {
  slug: 'eventList',
  interfaceName: 'EventListBlock',
  labels: {
    singular: 'Event List',
    plural: 'Event Lists',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Section Subtitle',
      editor: defaultLexical,
    },
    {
      name: 'mode',
      type: 'select',
      label: 'Display Mode',
      defaultValue: 'upcoming',
      required: true,
      options: [
        { label: 'Upcoming Events', value: 'upcoming' },
        { label: 'Date Range', value: 'dateRange' },
        { label: 'Featured Events', value: 'featured' },
      ],
      admin: {
        description: 'How to filter and display events',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      admin: {
        condition: (data, siblingData) => siblingData?.mode === 'dateRange',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      admin: {
        condition: (data, siblingData) => siblingData?.mode === 'dateRange',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'categoryFilter',
      type: 'select',
      label: 'Filter by Category',
      hasMany: true,
      options: [
        { label: 'Mass & Worship', value: 'mass_worship' },
        { label: 'LifeLines & Community', value: 'lifelines_community' },
        { label: 'Kids & Teens', value: 'kids_teens' },
        { label: 'Formation & Learning', value: 'formation_learning' },
        { label: 'Service & Outreach', value: 'service_outreach' },
        { label: 'Social & Fellowship', value: 'social_fellowship' },
        { label: 'Sacraments', value: 'sacraments' },
        { label: 'Special Events', value: 'special_events' },
      ],
      admin: {
        description: 'Optional: Only show events from these categories',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Events',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        description: 'Maximum number of events to display',
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout Style',
      defaultValue: 'cards',
      options: [
        { label: 'Card Grid', value: 'cards' },
        { label: 'List View', value: 'list' },
        { label: 'Compact List', value: 'compact' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Card Display Options',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'showCategories',
          type: 'checkbox',
          label: 'Show Category Tags',
          defaultValue: true,
          admin: {
            description: 'Display category tags on event cards',
          },
        },
        {
          name: 'imageSize',
          type: 'select',
          label: 'Card Image/Date Badge Size',
          defaultValue: 'default',
          options: [
            { label: 'Small (150px)', value: 'small' },
            { label: 'Default (200px)', value: 'default' },
            { label: 'Large (250px)', value: 'large' },
          ],
          admin: {
            description: 'Size of the date badge area',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Card Color Overrides',
      admin: {
        initCollapsed: true,
        description: 'Override default card colors (leave blank to use defaults)',
      },
      fields: [
        {
          name: 'cardBackgroundColor',
          type: 'text',
          label: 'Card Background Color',
          admin: {
            description: 'Hex color (e.g., #ffffff) or leave blank for default',
            placeholder: '#ffffff',
          },
        },
        {
          name: 'cardTitleColor',
          type: 'text',
          label: 'Card Title Color',
          admin: {
            description: 'Hex color (e.g., #000000) or leave blank for default',
            placeholder: '#000000',
          },
        },
        {
          name: 'cardTextColor',
          type: 'text',
          label: 'Card Text Color',
          admin: {
            description: 'Hex color (e.g., #666666) or leave blank for default',
            placeholder: '#666666',
          },
        },
        {
          name: 'cardCategoryColor',
          type: 'text',
          label: 'Category Tag Background',
          admin: {
            description: 'Hex color (e.g., #D4AF37) or leave blank for default gold',
            placeholder: '#D4AF37',
          },
        },
        {
          name: 'dateBadgeColor',
          type: 'text',
          label: 'Date Badge Background',
          admin: {
            description: 'Hex color (e.g., #D4AF37) or leave blank for default gold',
            placeholder: '#D4AF37',
          },
        },
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
      defaultValue: '/events',
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
