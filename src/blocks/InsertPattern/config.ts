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
 * 3. Editor clicks "Insert Pattern" (admin component)
 * 4. Pattern's layout blocks replace this block in the page
 *
 * NOTE: The actual "Insert Pattern" button requires a custom admin component
 * that can manipulate the parent form's layout array. This is marked with TODO.
 */
export const InsertPattern: Block = {
  slug: 'insertPattern',
  interfaceName: 'InsertPatternBlock',
  labels: {
    singular: 'Insert Pattern',
    plural: 'Insert Patterns',
  },
  fields: [
    // Note: UI field for instructions removed to fix TypeScript compilation
    // Description moved to pattern field below
    {
      name: 'pattern',
      type: 'relationship',
      relationTo: 'patterns',
      required: true,
      label: 'Select Pattern',
      admin: {
        description: '📐 Choose a pattern to insert. After selecting, manually copy the pattern\'s blocks to replace this block.',
      },
    },
    // Note: Insert button UI field removed to fix TypeScript compilation
    // Automatic pattern insertion requires custom admin component (future enhancement)
  ],
}

// TODO: Create custom admin component in src/components/admin/InsertPatternButton.tsx
// TODO: Wire component into insertButton field above
// TODO: Add InsertPattern block to Pages layout blocks array
