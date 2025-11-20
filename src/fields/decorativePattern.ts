import type { Field, GroupField } from 'payload'

/**
 * Decorative Pattern Field Group
 *
 * Adds customizable background decorative patterns to blocks
 * Inspired by premium church websites like Liquid Church
 */

export interface DecorativePatternOptions {
  enablePatterns?: boolean
}

export const decorativePattern = (
  options: DecorativePatternOptions = {}
): GroupField => {
  const { enablePatterns = true } = options

  const fields: Field[] = []

  if (enablePatterns) {
    fields.push(
      {
        name: 'enabled',
        type: 'checkbox',
        label: 'Enable Decorative Pattern',
        defaultValue: false,
        admin: {
          description: 'Add a decorative background pattern to this block',
        },
      },
      {
        name: 'type',
        type: 'select',
        defaultValue: 'text',
        options: [
          { label: 'Text (Faded Words)', value: 'text' },
          { label: 'Circles', value: 'circles' },
          { label: 'Lines', value: 'lines' },
          { label: 'Dots Grid', value: 'dots' },
          { label: 'Waves', value: 'waves' },
        ],
        admin: {
          condition: (data, siblingData) => siblingData?.enabled === true,
          description: 'Choose the type of decorative pattern',
        },
      },
      {
        name: 'text',
        type: 'text',
        defaultValue: 'CHURCH',
        admin: {
          condition: (data, siblingData) =>
            siblingData?.enabled === true && siblingData?.type === 'text',
          description: 'The text to display as a decorative pattern (e.g., "CHURCH", "FAITH", "HOPE")',
          placeholder: 'CHURCH',
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'opacity',
            type: 'number',
            defaultValue: 5,
            min: 1,
            max: 30,
            admin: {
              condition: (data, siblingData) => siblingData?.enabled === true,
              description: 'Opacity (1-30%)',
              width: '33%',
            },
          },
          {
            name: 'size',
            type: 'select',
            defaultValue: 'large',
            options: [
              { label: 'Small', value: 'small' },
              { label: 'Medium', value: 'medium' },
              { label: 'Large', value: 'large' },
            ],
            admin: {
              condition: (data, siblingData) => siblingData?.enabled === true,
              description: 'Pattern size',
              width: '33%',
            },
          },
          {
            name: 'repeatCount',
            type: 'number',
            defaultValue: 3,
            min: 1,
            max: 10,
            admin: {
              condition: (data, siblingData) => siblingData?.enabled === true,
              description: 'Repeat count',
              width: '34%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'color',
            type: 'text',
            defaultValue: '#20336b',
            admin: {
              condition: (data, siblingData) => siblingData?.enabled === true,
              description: 'Pattern color (hex)',
              placeholder: '#20336b',
              width: '40%',
            },
          },
          {
            name: 'position',
            type: 'select',
            defaultValue: 'center',
            options: [
              { label: 'Center', value: 'center' },
              { label: 'Top Left', value: 'top-left' },
              { label: 'Top Right', value: 'top-right' },
              { label: 'Bottom Left', value: 'bottom-left' },
              { label: 'Bottom Right', value: 'bottom-right' },
            ],
            admin: {
              condition: (data, siblingData) => siblingData?.enabled === true,
              description: 'Pattern position',
              width: '30%',
            },
          },
          {
            name: 'rotation',
            type: 'number',
            defaultValue: 0,
            min: -180,
            max: 180,
            admin: {
              condition: (data, siblingData) => siblingData?.enabled === true,
              description: 'Rotation (degrees)',
              width: '30%',
            },
          },
        ],
      }
    )
  }

  return {
    name: 'decorativePattern',
    type: 'group',
    label: 'Decorative Pattern',
    fields,
    admin: {
      description: 'Add a subtle decorative pattern to the background',
    },
    dbName: 'decor_pattern',
  }
}

/**
 * TypeScript type for DecorativePattern data structure
 */
export interface DecorativePatternType {
  decorativePattern?: {
    enabled?: boolean | null
    type?: 'text' | 'circles' | 'lines' | 'dots' | 'waves' | null
    text?: string | null
    opacity?: number | null
    size?: 'small' | 'medium' | 'large' | null
    repeatCount?: number | null
    color?: string | null
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | null
    rotation?: number | null
  } | null
}
