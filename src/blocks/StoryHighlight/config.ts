import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'

export const StoryHighlight: Block = {
  slug: 'storyHighlight',
  interfaceName: 'StoryHighlightBlock',
  labels: {
    singular: 'Story Highlight',
    plural: 'Story Highlights',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Story Title',
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Story Content',
      admin: {
        description: 'Main content of the story',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Story Image',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Link URL',
      admin: {
        description: 'Optional: Link to full story or related page',
      },
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Link Label',
      defaultValue: 'Read More',
      admin: {
        condition: (data, siblingData) => Boolean(siblingData?.url),
        description: 'Text for the link button',
      },
    },
    {
      name: 'tag',
      type: 'text',
      label: 'Tag',
      admin: {
        description: 'Optional: Category or tag badge (e.g., "Testimony", "Community", "Ministry")',
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image on Left', value: 'left' },
        { label: 'Image on Right', value: 'right' },
      ],
      admin: {
        description: 'Position of the image relative to content',
      },
    },
    blockAppearance({
      backgroundVariant: true,
      alignment: false, // Story highlights are typically left-aligned
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
