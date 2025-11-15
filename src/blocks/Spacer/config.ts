import type { Block } from 'payload'
import { blockName } from '@/fields/blockName'

export const Spacer: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  labels: {
    singular: 'Spacer',
    plural: 'Spacers',
  },
  fields: [
    {
      name: 'size',
      type: 'select',
      required: true,
      defaultValue: 'medium',
      options: [
        { label: 'Small (2rem)', value: 'small' },
        { label: 'Medium (4rem)', value: 'medium' },
        { label: 'Large (6rem)', value: 'large' },
        { label: 'Extra Large (8rem)', value: 'xlarge' },
      ],
      admin: {
        description: 'Amount of vertical space to add',
      },
    },
    blockName,
  ],
}
