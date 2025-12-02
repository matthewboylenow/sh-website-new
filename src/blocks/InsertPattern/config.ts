import type { Block } from 'payload'

/**
 * InsertPattern Block
 *
 * Editor-only block that allows inserting predefined patterns into a page.
 * This block should not render on the frontend - it's purely for CMS workflow.
 *
 * USAGE:
 * 1. Editor adds this block to the page
 * 2. Editor selects a pattern from the dropdown
 * 3. Editor follows instructions to copy pattern blocks
 * 4. Editor manually replaces this block with the pattern's blocks
 */
export const InsertPattern: Block = {
  slug: 'insertPattern',
  interfaceName: 'InsertPatternBlock',
  labels: {
    singular: 'Insert Pattern',
    plural: 'Insert Patterns',
  },
  fields: [
    {
      name: 'pattern',
      type: 'relationship',
      relationTo: 'patterns',
      required: true,
      label: 'Select Pattern',
      admin: {
        description: 'Choose a pattern to insert into this page',
      },
    },
    {
      name: 'instructions',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/InsertPatternButton',
        },
      },
    },
  ],
}
