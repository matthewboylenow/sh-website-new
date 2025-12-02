import type { Field } from 'payload'

/**
 * Quill Rich Text Field Configuration
 *
 * These helpers create text fields with custom Quill editor components.
 * The field stores HTML strings instead of Lexical JSON.
 *
 * Available variants:
 * - quillRichText: Standard editor with H1-H4, colors, lists (default)
 * - quillSubtitle: Minimal editor for subtitles (no headings)
 * - quillSimple: Basic formatting only (bold, italic, lists, links)
 * - quillFull: Full-featured editor with all options
 */

interface QuillFieldOptions {
  name: string
  label?: string
  required?: boolean
  admin?: {
    description?: string
    condition?: (data: unknown, siblingData: unknown) => boolean
    position?: 'sidebar'
    hidden?: boolean
  }
}

/**
 * Creates a standard Quill rich text field with H1-H4, colors, lists
 */
export const quillRichText = (options: QuillFieldOptions): Field => ({
  name: options.name,
  type: 'text',
  label: options.label,
  required: options.required,
  admin: {
    ...options.admin,
    components: {
      Field: '@/admin/fields/QuillRichTextField',
    },
  },
})

/**
 * Creates a Quill subtitle field (no headings, basic formatting + colors)
 */
export const quillSubtitle = (options: QuillFieldOptions): Field => ({
  name: options.name,
  type: 'text',
  label: options.label,
  required: options.required,
  admin: {
    ...options.admin,
    components: {
      Field: '@/admin/fields/QuillSubtitleField',
    },
  },
})

/**
 * Creates a simple Quill field (bold, italic, lists, links - no colors)
 */
export const quillSimple = (options: QuillFieldOptions): Field => ({
  name: options.name,
  type: 'text',
  label: options.label,
  required: options.required,
  admin: {
    ...options.admin,
    components: {
      Field: '@/admin/fields/QuillSimpleField',
    },
  },
})

/**
 * Creates a full-featured Quill field with all formatting options
 */
export const quillFull = (options: QuillFieldOptions): Field => ({
  name: options.name,
  type: 'text',
  label: options.label,
  required: options.required,
  admin: {
    ...options.admin,
    components: {
      Field: '@/admin/fields/QuillFullField',
    },
  },
})

/**
 * Default export for convenience - standard rich text
 */
export default quillRichText
