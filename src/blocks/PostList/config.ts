import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { defaultLexical } from '@/fields/defaultLexical'
import { decorativePattern } from '@/fields/decorativePattern'

export const PostList: Block = {
  slug: 'postList',
  interfaceName: 'PostListBlock',
  labels: {
    singular: 'Post List',
    plural: 'Post Lists',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Recent Posts',
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Section Subtitle',
      editor: defaultLexical,
    },
    {
      name: 'categoryFilter',
      type: 'relationship',
      label: 'Filter by Categories',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Optional: Only show posts from these categories',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Number of Posts',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        description: 'Maximum number of posts to display',
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
        { label: 'Featured + Grid', value: 'featured' },
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
          label: 'Show Categories',
          defaultValue: true,
          admin: {
            description: 'Display category tags on cards',
          },
        },
        {
          name: 'showExcerpt',
          type: 'checkbox',
          label: 'Show Excerpt',
          defaultValue: true,
          admin: {
            description: 'Display post excerpt/preview text',
          },
        },
        {
          name: 'showAuthor',
          type: 'checkbox',
          label: 'Show Author',
          defaultValue: true,
          admin: {
            description: 'Display post author',
          },
        },
        {
          name: 'showDate',
          type: 'checkbox',
          label: 'Show Date',
          defaultValue: true,
          admin: {
            description: 'Display publication date',
          },
        },
        {
          name: 'imageSize',
          type: 'select',
          label: 'Card Image Size',
          defaultValue: 'default',
          options: [
            { label: 'Small (150px)', value: 'small' },
            { label: 'Default (250px)', value: 'default' },
            { label: 'Large (350px)', value: 'large' },
            { label: 'Extra Large (450px)', value: 'xlarge' },
          ],
          admin: {
            description: 'Height of the card image',
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
            description: 'Hex color (e.g., #4F46E5) or leave blank for default gradient',
            placeholder: '#4F46E5',
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
      defaultValue: '/blog',
      admin: {
        condition: (data, siblingData) => siblingData?.showViewAllLink === true,
      },
    },
    blockAppearance(),
    decorativePattern({ enablePatterns: true }),
    blockName,
  ],
}
