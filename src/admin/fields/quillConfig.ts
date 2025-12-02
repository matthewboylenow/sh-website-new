/**
 * Quill Editor Configuration
 *
 * Shared configuration for ReactQuill instances in the Payload admin.
 * This provides a consistent editing experience across all rich text fields.
 */

/**
 * Saint Helen Brand Colors
 * These match the colors used in the Lexical TextColorFeature
 */
export const brandColors = [
  '#20336B', // Brand (Primary Blue) -> text-brand
  '#585858', // Muted (Gray) -> text-muted
  '#E0A63A', // Accent (Gold) -> text-accent
  '#000000', // Black
  '#FFFFFF', // White
]

/**
 * Standard Quill toolbar configuration
 * Includes text color, background color, and common formatting options
 */
export const standardModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: brandColors }, { background: brandColors }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote'],
    ['link'],
    ['clean'],
  ],
}

/**
 * Modules for subtitle fields (no headings)
 */
export const subtitleModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ color: brandColors }, { background: brandColors }],
    ['link'],
    ['clean'],
  ],
}

/**
 * Modules for simple rich text (minimal formatting)
 */
export const simpleModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
}

/**
 * Modules for full content editing (posts, long-form content)
 */
export const fullModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: brandColors }, { background: brandColors }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['blockquote'],
    [{ align: [] }],
    ['link'],
    ['clean'],
  ],
}

/**
 * Standard formats supported by the editor
 */
export const standardFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'indent',
  'blockquote',
  'align',
  'link',
]

/**
 * Subtitle formats (subset of standard)
 */
export const subtitleFormats = ['bold', 'italic', 'underline', 'color', 'background', 'link']

/**
 * Simple formats (minimal)
 */
export const simpleFormats = ['bold', 'italic', 'underline', 'list', 'link']
