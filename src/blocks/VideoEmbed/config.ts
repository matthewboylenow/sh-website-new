import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'
import { quillSimple } from '@/fields/quillRichText'

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  interfaceName: 'VideoEmbedBlock',
  labels: {
    singular: 'Video Embed',
    plural: 'Video Embeds',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Video Title',
      admin: {
        description: 'Optional: Title displayed above the video',
      },
    },
    {
      name: 'embedUrl',
      type: 'text',
      required: true,
      label: 'Video URL',
      admin: {
        description: 'YouTube, Vimeo, or embed URL',
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Poster Image',
      admin: {
        description: 'Optional: Custom thumbnail/poster image',
      },
    },
    quillSimple({
      name: 'description',
      label: 'Description',
      admin: {
        description: 'Optional: Description shown below the video',
      },
    }),
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16/9',
      options: [
        { label: '16:9 (Standard)', value: '16/9' },
        { label: '4:3 (Classic)', value: '4/3' },
        { label: '21:9 (Cinematic)', value: '21/9' },
        { label: '1:1 (Square)', value: '1/1' },
      ],
      admin: {
        description: 'Aspect ratio of the video player',
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
