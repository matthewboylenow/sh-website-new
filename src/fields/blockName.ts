import type { TextField } from 'payload'

/**
 * Block Name field - Admin-only label for organizing blocks
 * This field appears in the CMS but is NOT rendered on the frontend
 *
 * Use this to give blocks descriptive names like:
 * - "Homepage Hero"
 * - "About Section"
 * - "Team Members Grid"
 *
 * This helps content editors identify blocks at a glance in the admin panel
 */
export const blockName: TextField = {
  name: 'blockName',
  type: 'text',
  label: 'Block Name',
  admin: {
    description: 'Internal name to help identify this block (not shown on the website)',
  },
}
