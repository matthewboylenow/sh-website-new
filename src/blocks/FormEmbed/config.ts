import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'

export const FormEmbed: Block = {
  slug: 'formEmbed',
  interfaceName: 'FormEmbedBlock',
  labels: {
    singular: 'Form Embed',
    plural: 'Form Embeds',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Form Title',
      admin: {
        description: 'Optional: Title displayed above the form',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      admin: {
        description: 'Optional: Description or instructions above the form',
      },
    },
    {
      name: 'embedType',
      type: 'select',
      required: true,
      defaultValue: 'html',
      options: [
        {
          label: 'HTML Embed Code',
          value: 'html',
        },
        {
          label: 'iFrame URL',
          value: 'url',
        },
      ],
      admin: {
        description: 'How to embed the form',
      },
    },
    {
      name: 'embedCode',
      type: 'textarea',
      label: 'Embed Code',
      admin: {
        condition: (data, siblingData) => siblingData?.embedType === 'html',
        description: 'Paste the HTML embed code from your form provider',
        placeholder: '<script>...</script> or <iframe>...</iframe>',
      },
    },
    {
      name: 'formUrl',
      type: 'text',
      label: 'Form URL',
      admin: {
        condition: (data, siblingData) => siblingData?.embedType === 'url',
        description: 'URL to the form (will be embedded in an iframe)',
        placeholder: 'https://forms.google.com/...',
      },
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height (pixels)',
      defaultValue: 600,
      admin: {
        description: 'Height of the form embed in pixels',
      },
    },
    {
      name: 'widthMode',
      type: 'select',
      defaultValue: 'centered',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Centered (Max Width)', value: 'centered' },
      ],
      admin: {
        description: 'Width constraints for the form',
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
