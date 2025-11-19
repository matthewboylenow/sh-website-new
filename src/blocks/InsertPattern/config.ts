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
    {
      type: 'ui',
      name: 'instructions',
      admin: {
        components: {
          Field: () => {
            return `
              <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <h4 style="margin: 0 0 8px 0; color: #0369a1; font-size: 14px; font-weight: 600;">
                  📐 Insert a Reusable Pattern
                </h4>
                <p style="margin: 0; color: #0c4a6e; font-size: 13px; line-height: 1.5;">
                  Select a predefined pattern below and click "Insert Pattern" to add its blocks to this page.
                  This block will be replaced with the pattern's content.
                </p>
              </div>
            `
          },
        },
      },
    },
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
      type: 'ui',
      name: 'insertButton',
      admin: {
        components: {
          // TODO: Implement custom Field component that:
          // 1. Fetches the selected pattern's layout
          // 2. Provides a button to trigger insertion
          // 3. Replaces this block with the pattern's blocks in the parent layout array
          // 4. Updates the form state
          //
          // This requires using Payload's useFormFields hook and accessing:
          // - Current block index in layout array
          // - Parent form's setValue for the layout field
          // - API call to fetch pattern data
          //
          // Example implementation would go in:
          // src/components/admin/InsertPatternButton.tsx
          Field: () => {
            return `
              <div style="margin-top: 16px;">
                <button
                  type="button"
                  style="
                    background: #0ea5e9;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: not-allowed;
                    opacity: 0.6;
                  "
                  disabled
                >
                  Insert Pattern (TODO: Implement)
                </button>
                <p style="margin-top: 8px; font-size: 12px; color: #64748b;">
                  Note: Pattern insertion logic requires custom admin component implementation.
                  For now, manually copy blocks from the pattern into your page.
                </p>
              </div>
            `
          },
        },
      },
    },
  ],
}

// TODO: Create custom admin component in src/components/admin/InsertPatternButton.tsx
// TODO: Wire component into insertButton field above
// TODO: Add InsertPattern block to Pages layout blocks array
