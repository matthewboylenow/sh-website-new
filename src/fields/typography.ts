import type { Field, GroupField } from 'payload'

type TypographyOptions = {
  /**
   * Whether to include font family override option
   * @default true
   */
  fontFamily?: boolean
  /**
   * Whether to include text alignment option
   * @default false
   */
  alignment?: boolean
  /**
   * Whether to include text size override option
   * @default false
   */
  textSize?: boolean
}

type OverridesType = Partial<GroupField> & {
  name?: string
  label?: string
  admin?: GroupField['admin']
}

/**
 * Reusable typography field group for granular font control
 * Allows blocks and components to override default typography settings
 *
 * @example
 * // In a block config:
 * fields: [
 *   typography({ fontFamily: true, alignment: true }),
 *   // ... other fields
 * ]
 */
export const typography = (
  options: TypographyOptions = {},
  overrides: OverridesType = {},
): Field => {
  const { fontFamily = true, alignment = false, textSize = false } = options

  const fields: Field[] = []

  // Font family override
  if (fontFamily) {
    fields.push({
      name: 'fontFamily',
      type: 'select',
      label: 'Font Family',
      defaultValue: 'default',
      options: [
        {
          label: 'Default (Inherits from context)',
          value: 'default',
        },
        {
          label: 'Heading Font (Libre Baskerville)',
          value: 'heading',
        },
        {
          label: 'Body Font (Libre Franklin)',
          value: 'body',
        },
        {
          label: 'Mono Font (Geist Mono)',
          value: 'mono',
        },
      ],
      admin: {
        description: 'Override the font family for this element',
      },
    })
  }

  // Text alignment
  if (alignment) {
    fields.push({
      name: 'alignment',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Horizontal text alignment',
      },
    })
  }

  // Text size override
  if (textSize) {
    fields.push({
      name: 'textSize',
      type: 'select',
      label: 'Text Size',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Small', value: 'sm' },
        { label: 'Base', value: 'base' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      admin: {
        description: 'Override the default text size',
      },
    })
  }

  return {
    type: 'group',
    name: 'typography',
    label: 'Typography',
    fields,
    admin: {
      description: 'Customize typography settings for this element',
    },
    ...overrides,
  }
}
