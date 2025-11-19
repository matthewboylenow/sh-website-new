import type { Field, GroupField } from 'payload'

/**
 * Saint Helen Visibility Settings
 *
 * Controls when and to whom blocks are visible:
 * - Device visibility (mobile, tablet, desktop)
 * - Audience targeting (visitors, parishioners, all)
 * - Optional seasonal display (date ranges)
 *
 * Similar to Breakdance's display conditions for page builder UX.
 */

export type VisibilityAudience = 'all' | 'visitors' | 'parishioners'

export interface VisibilitySettingsOptions {
  deviceVisibility?: boolean // Enable device-specific visibility toggles
  audienceTargeting?: boolean // Enable audience targeting
  seasonalDisplay?: boolean // Enable date range scheduling
}

/**
 * Creates a reusable VisibilitySettings field group
 *
 * @param options - Customize which visibility fields to include
 * @returns GroupField configuration for Payload CMS
 */
export const visibilitySettings = (
  options: VisibilitySettingsOptions = {},
): GroupField => {
  const {
    deviceVisibility = true,
    audienceTargeting = true,
    seasonalDisplay = false, // Optional - can be enabled later
  } = options

  const fields: Field[] = []

  if (deviceVisibility) {
    fields.push({
      type: 'row',
      fields: [
        {
          name: 'showOnMobile',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show on Mobile',
          admin: {
            width: '33%',
            description: 'Display on mobile devices',
          },
        },
        {
          name: 'showOnTablet',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show on Tablet',
          admin: {
            width: '33%',
            description: 'Display on tablet devices',
          },
        },
        {
          name: 'showOnDesktop',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show on Desktop',
          admin: {
            width: '34%',
            description: 'Display on desktop screens',
          },
        },
      ],
    })
  }

  if (audienceTargeting) {
    fields.push({
      name: 'audience',
      type: 'select',
      defaultValue: 'all',
      options: [
        {
          label: 'All Visitors',
          value: 'all',
        },
        {
          label: 'First-time Visitors Only',
          value: 'visitors',
        },
        {
          label: 'Parishioners Only',
          value: 'parishioners',
        },
      ],
      admin: {
        description: 'Target specific audiences (requires authentication system)',
      },
    })
  }

  if (seasonalDisplay) {
    fields.push(
      {
        type: 'row',
        fields: [
          {
            name: 'startDate',
            type: 'date',
            label: 'Start Date',
            admin: {
              width: '50%',
              description: 'Optional: Show block starting from this date',
              date: {
                pickerAppearance: 'dayOnly',
              },
            },
          },
          {
            name: 'endDate',
            type: 'date',
            label: 'End Date',
            admin: {
              width: '50%',
              description: 'Optional: Hide block after this date',
              date: {
                pickerAppearance: 'dayOnly',
              },
            },
          },
        ],
      },
      {
        type: 'ui',
        name: 'seasonalHelp',
        admin: {
          components: {
            Field: () => null,
          },
        },
      },
    )
  }

  const visibilityGroup: GroupField = {
    name: 'visibility',
    type: 'group',
    label: 'Visibility Settings',
    fields,
    admin: {
      description: 'Control when and where this block appears',
    },
  }

  return visibilityGroup
}

/**
 * TypeScript type for VisibilitySettings data structure
 */
export interface VisibilitySettingsType {
  visibility?: {
    showOnMobile?: boolean | null
    showOnTablet?: boolean | null
    showOnDesktop?: boolean | null
    audience?: VisibilityAudience | null
    startDate?: string | null
    endDate?: string | null
  } | null
}

// TODO: run "npx payload migration:generate 'add-visibility-settings'" after deploying these schema changes
