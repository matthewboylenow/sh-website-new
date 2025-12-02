/**
 * Quill Rich Text Field Components for Payload Admin
 *
 * These components replace Payload's default Lexical rich text editor with Quill,
 * providing text color, background color, and other enhanced formatting options.
 *
 * Available variants:
 *
 * 1. QuillRichTextField (default) - Standard editor with H1-H4, colors, lists
 * 2. QuillSubtitleField - Minimal editor for subtitles (no headings)
 * 3. QuillSimpleField - Basic formatting only (bold, italic, lists, links)
 * 4. QuillFullField - Full-featured editor with all options
 *
 * Usage in Payload field config:
 * ```typescript
 * {
 *   name: 'body',
 *   type: 'text',  // Use 'text' type, not 'richText'
 *   admin: {
 *     components: {
 *       Field: '@/admin/fields/QuillRichTextField',
 *     },
 *   },
 * }
 * ```
 */

export { default as QuillRichTextField } from './QuillRichTextField'
export { default as QuillSubtitleField } from './QuillSubtitleField'
export { default as QuillSimpleField } from './QuillSimpleField'
export { default as QuillFullField } from './QuillFullField'

export * from './quillConfig'
