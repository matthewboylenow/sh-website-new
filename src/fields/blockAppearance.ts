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

export type BackgroundVariant = 'light' | 'brand' | 'dark' | 'transparent'
export type Alignment = 'left' | 'center' | 'right'
export type PaddingOption = 'default' | 'none' | 'tight' | 'loose'
export type TextColor = 'auto' | 'light' | 'dark' | 'brand'

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
      name: 'backgroundVariant',
      type: 'select',
      defaultValue: 'light',
      dbName: 'bg_var',
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
      ],
      admin: {
        description: 'Choose the background color for this block',
      },
    })
  }

  if (textColor) {
    fields.push({
      name: 'textColor',
      type: 'select',
      defaultValue: 'auto',
      dbName: 'text_color',
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
      dbName: 'align',
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
          name: 'paddingTop',
          type: 'select',
          defaultValue: 'default',
          dbName: 'pad_top',
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
          name: 'paddingBottom',
          type: 'select',
          defaultValue: 'default',
          dbName: 'pad_btm',
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

  const appearanceGroup: GroupField = {
    name: 'appearance',
    type: 'group',
    label: 'Block Appearance',
    fields,
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
    backgroundVariant?: BackgroundVariant | null
    alignment?: Alignment | null
    fullWidth?: boolean | null
    paddingTop?: PaddingOption | null
    paddingBottom?: PaddingOption | null
    textColor?: TextColor | null
  } | null
}
