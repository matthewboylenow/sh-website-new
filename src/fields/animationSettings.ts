import type { Field, GroupField } from 'payload'

/**
 * Saint Helen Animation Settings
 *
 * Provides entrance animation controls for blocks:
 * - Animation presets (fadeIn, fadeUp, fadeInScale)
 * - Delay and duration controls
 * - Animate once or repeat on scroll
 *
 * Similar to Breakdance's entrance animations for page builder UX.
 *
 * NOTE: Field names are shortened (preset, delay, duration, once) to avoid
 * PostgreSQL's 63-character limit for identifiers when nested in blocks.
 */

export type AnimationPreset = 'none' | 'fadeIn' | 'fadeUp' | 'fadeInScale'

export interface AnimationSettingsOptions {
  presets?: boolean // Enable animation preset selector
  timing?: boolean // Enable delay and duration controls
  behavior?: boolean // Enable animateOnce toggle
}

/**
 * Creates a reusable AnimationSettings field group
 *
 * @param options - Customize which animation fields to include
 * @returns GroupField configuration for Payload CMS
 */
export const animationSettings = (
  options: AnimationSettingsOptions = {},
): GroupField => {
  const {
    presets = true,
    timing = true,
    behavior = true,
  } = options

  const fields: Field[] = []

  if (presets) {
    fields.push({
      name: 'preset',
      type: 'select',
      label: 'Animation Preset',
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Fade In',
          value: 'fadeIn',
        },
        {
          label: 'Fade Up',
          value: 'fadeUp',
        },
        {
          label: 'Fade In + Scale',
          value: 'fadeInScale',
        },
      ],
      admin: {
        description: 'Choose an entrance animation for this block',
      },
    })
  }

  if (timing) {
    fields.push({
      type: 'row',
      fields: [
        {
          name: 'delay',
          type: 'number',
          label: 'Delay (ms)',
          defaultValue: 0,
          min: 0,
          max: 2000,
          admin: {
            width: '50%',
            description: 'Delay before animation starts (multiples of 100ms recommended)',
            condition: (data, siblingData) => siblingData?.preset !== 'none',
          },
        },
        {
          name: 'duration',
          type: 'number',
          label: 'Duration (ms)',
          defaultValue: 600,
          min: 200,
          max: 2000,
          admin: {
            width: '50%',
            description: 'Animation duration (multiples of 100ms recommended)',
            condition: (data, siblingData) => siblingData?.preset !== 'none',
          },
        },
      ],
    })
  }

  if (behavior) {
    fields.push({
      name: 'once',
      type: 'checkbox',
      defaultValue: true,
      label: 'Animate Once',
      admin: {
        description: 'Only animate on first scroll into view (recommended)',
        condition: (data, siblingData) => siblingData?.preset !== 'none',
      },
    })
  }

  const animationGroup: GroupField = {
    name: 'animation',
    type: 'group',
    label: 'Animation Settings',
    fields,
    admin: {
      description: 'Add entrance animations to this block',
    },
  }

  return animationGroup
}

/**
 * TypeScript type for AnimationSettings data structure
 */
export interface AnimationSettingsType {
  animation?: {
    preset?: AnimationPreset | null
    delay?: number | null
    duration?: number | null
    once?: boolean | null
  } | null
}

// TODO: run "npx payload migration:generate 'add-animation-settings'" after deploying these schema changes
