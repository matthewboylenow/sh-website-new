import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'

export const Divider: Block = {
  slug: 'divider',
  interfaceName: 'DividerBlock',
  labels: {
    singular: 'Divider',
    plural: 'Dividers',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      required: true,
      defaultValue: 'line',
      options: [
        {
          label: 'Line',
          value: 'line',
        },
        {
          label: 'Space',
          value: 'space',
        },
        {
          label: 'Decorative',
          value: 'decorative',
        },
      ],
      admin: {
        description: 'Style of divider to display',
      },
    },
    {
      name: 'thickness',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Thin', value: 'thin' },
        { label: 'Normal', value: 'normal' },
        { label: 'Thick', value: 'thick' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.style === 'line',
        description: 'Thickness of the line',
      },
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full Width', value: 'full' },
        { label: 'Narrow (75%)', value: 'narrow' },
        { label: 'Short (50%)', value: 'short' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.style !== 'space',
        description: 'Width of the divider',
      },
    },
    blockAppearance({
      backgroundVariant: true,
      alignment: true,
      fullWidth: true,
      padding: true,
    }),
  ],
}
