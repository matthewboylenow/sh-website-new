import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'

export const CustomCode: Block = {
  slug: 'customCode',
  interfaceName: 'CustomCodeBlock',
  labels: {
    singular: 'Custom Code',
    plural: 'Custom Code Blocks',
  },
  fields: [
    {
      name: 'code',
      type: 'code',
      label: 'Custom Code',
      required: true,
      admin: {
        language: 'html',
        description:
          'Add custom HTML, CSS, or JavaScript. WARNING: Code is rendered as-is. Only use trusted code to avoid security issues.',
      },
    },
    {
      name: 'language',
      type: 'select',
      label: 'Code Type',
      defaultValue: 'html',
      options: [
        { label: 'HTML', value: 'html' },
        { label: 'CSS (wrapped in <style> tag)', value: 'css' },
        { label: 'JavaScript (wrapped in <script> tag)', value: 'javascript' },
      ],
      admin: {
        description: 'Select how the code should be rendered',
      },
    },
    blockAppearance({
      backgroundVariant: true,
      alignment: false,
      fullWidth: true,
      padding: true,
    }),
  ],
}
