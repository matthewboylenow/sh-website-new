import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { defaultLexical } from '@/fields/defaultLexical'

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
    blockName,
  ],
}
