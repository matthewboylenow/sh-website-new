import type { Field, GroupField } from 'payload'
import deepMerge from '@/utilities/deepMerge'

/**
 * Saint Helen Block Appearance Options
 *
 * This field group provides consistent appearance controls across all Saint Helen blocks:
 * - Background variant (light, brand, dark, transparent)
 * - Alignment (left, center, right)
 * - Full width option
 * - Padding overrides
 */

export type BackgroundVariant = 'light' | 'brand' | 'dark' | 'transparent' | 'custom'
export type Alignment = 'left' | 'center' | 'right'
export type PaddingOption = 'default' | 'none' | 'tight' | 'loose'
export type TextColor = 'auto' | 'light' | 'dark' | 'black' | 'brand'

export interface BlockAppearanceOptions {
  backgroundVariant?: boolean // Enable background variant selector
  alignment?: boolean // Enable alignment selector
  fullWidth?: boolean // Enable full width toggle
  padding?: boolean // Enable padding controls
  textColor?: boolean // Enable text color selector
}

/**
 * Creates a reusable BlockAppearance field group
 *
 * @param options - Customize which appearance fields to include
 * @returns GroupField configuration for Payload CMS
 */
export const blockAppearance = (
  options: BlockAppearanceOptions = {}
): GroupField => {
  const {
    backgroundVariant = true,
    alignment = true,
    fullWidth = true,
    padding = true,
    textColor = true,
  } = options

  const fields: Field[] = []

  if (backgroundVariant) {
    fields.push({
      name: 'bgVariant',
      type: 'select',
      label: 'Background Variant',
      defaultValue: 'light',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Brand (Primary Blue)',
          value: 'brand',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'Transparent',
          value: 'transparent',
        },
        {
          label: 'Custom Color',
          value: 'custom',
        },
      ],
      admin: {
        description: 'Choose the background color for this block',
      },
    })

    // Custom background color field
    fields.push({
      name: 'customBgColor',
      type: 'text',
      label: 'Custom Background Color',
      admin: {
        condition: (data, siblingData) => siblingData?.bgVariant === 'custom',
        description: 'Enter hex color (e.g., #1a1a1a) or CSS color (e.g., rgb(26, 26, 26))',
        placeholder: '#1a1a1a',
      },
      validate: (value: string | null | undefined, { siblingData }: any) => {
        if (siblingData?.bgVariant === 'custom' && !value) {
          return 'Custom background color is required when using Custom Color variant'
        }
        return true
      },
    })
  }

  if (textColor) {
    fields.push({
      name: 'textColor',
      type: 'select',
      defaultValue: 'auto',
      options: [
        {
          label: 'Auto (based on background)',
          value: 'auto',
        },
        {
          label: 'Light (white text)',
          value: 'light',
        },
        {
          label: 'Dark (default text)',
          value: 'dark',
        },
        {
          label: 'Black (pure black)',
          value: 'black',
        },
        {
          label: 'Brand (primary blue)',
          value: 'brand',
        },
      ],
      admin: {
        description: 'Override text color for this block',
      },
    })
  }

  if (alignment) {
    fields.push({
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      admin: {
        description: 'Text alignment for this block',
      },
    })
  }

  if (fullWidth) {
    fields.push({
      name: 'fullWidth',
      type: 'checkbox',
      defaultValue: false,
      label: 'Full Width',
      admin: {
        description: 'Extend block to full viewport width (no container)',
      },
    })
  }

  if (padding) {
    fields.push({
      type: 'row',
      fields: [
        {
          name: 'pt',
          type: 'select',
          label: 'Padding Top',
          defaultValue: 'default',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Tight', value: 'tight' },
            { label: 'Default', value: 'default' },
            { label: 'Loose', value: 'loose' },
          ],
          admin: {
            width: '50%',
            description: 'Top padding',
          },
        },
        {
          name: 'pb',
          type: 'select',
          label: 'Padding Bottom',
          defaultValue: 'default',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Tight', value: 'tight' },
            { label: 'Default', value: 'default' },
            { label: 'Loose', value: 'loose' },
          ],
          admin: {
            width: '50%',
            description: 'Bottom padding',
          },
        },
      ],
    })
  }

  // Organize fields into logical groups for better UX (Breakdance-style)
  const organizedFields: Field[] = []

  // Section Layout group
  const layoutFields: Field[] = []
  if (alignment) {
    layoutFields.push(
      fields.find((f) => 'name' in f && f.name === 'alignment') as Field,
    )
  }
  if (fullWidth) {
    layoutFields.push(
      fields.find((f) => 'name' in f && f.name === 'fullWidth') as Field,
    )
  }
  if (padding) {
    layoutFields.push(
      fields.find((f) => f.type === 'row' && 'fields' in f) as Field,
    )
  }

  if (layoutFields.filter(Boolean).length > 0) {
    organizedFields.push({
      type: 'collapsible',
      label: 'Section Layout',
      admin: {
        description: 'Controls width, spacing, and alignment of this section',
        initCollapsed: false,
      },
      fields: layoutFields.filter(Boolean),
    })
  }

  // Background & Style group
  const styleFields: Field[] = []
  if (backgroundVariant) {
    styleFields.push(
      fields.find((f) => 'name' in f && f.name === 'bgVariant') as Field,
    )
    styleFields.push(
      fields.find((f) => 'name' in f && f.name === 'customBgColor') as Field,
    )
  }
  if (textColor) {
    styleFields.push(
      fields.find((f) => 'name' in f && f.name === 'textColor') as Field,
    )
  }

  if (styleFields.filter(Boolean).length > 0) {
    organizedFields.push({
      type: 'collapsible',
      label: 'Background & Style',
      admin: {
        description: 'Choose section background styling and text colors',
        initCollapsed: false,
      },
      fields: styleFields.filter(Boolean),
    })
  }

  const appearanceGroup: GroupField = {
    name: 'appearance',
    type: 'group',
    label: 'Block Appearance',
    fields: organizedFields.length > 0 ? organizedFields : fields,
    admin: {
      description: 'Control the visual appearance of this block',
    },
  }

  return appearanceGroup
}

/**
 * TypeScript type for BlockAppearance data structure
 */
export interface BlockAppearanceType {
  appearance?: {
    bgVariant?: BackgroundVariant | null
    customBgColor?: string | null
    alignment?: Alignment | null
    fullWidth?: boolean | null
    pt?: PaddingOption | null
    pb?: PaddingOption | null
    textColor?: TextColor | null
  } | null
}
