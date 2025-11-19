import type { JSXConverters } from '@payloadcms/richtext-lexical/react'
import type { SerializedTextNode } from 'lexical'
import { getTextColorClass } from '@/lib/richText'

/**
 * Extended text node with style property for color formatting
 */
type SerializedTextNodeWithStyle = SerializedTextNode & {
  style?: string
}

/**
 * Custom text node converter that maps specific text colors to CSS classes.
 *
 * Replaces payload-lexical-typography's inline style approach with
 * semantic class names that use CSS custom properties.
 */
export const TextColorJSXConverter: JSXConverters = {
  text: ({ node }: { node: SerializedTextNode }) => {
    const format = node.format
    const text = node.text

    // Check if node has text color format
    const nodeWithStyle = node as SerializedTextNodeWithStyle
    const hasColor = 'style' in node && typeof nodeWithStyle.style === 'string' && nodeWithStyle.style.includes('color:')

    if (!hasColor) {
      // No color formatting, return plain text with standard formatting
      let element: React.ReactNode = text

      if (format & 1) element = <strong>{element}</strong> // Bold
      if (format & 2) element = <em>{element}</em> // Italic
      if (format & 8) element = <u>{element}</u> // Underline
      if (format & 16) element = <s>{element}</s> // Strikethrough
      if (format & 32) element = <code>{element}</code> // Code
      if (format & 64) element = <sub>{element}</sub> // Subscript
      if (format & 128) element = <sup>{element}</sup> // Superscript

      return element
    }

    // Extract color from inline style
    const styleString = nodeWithStyle.style || ''
    const colorMatch = styleString.match(/color:\s*([^;]+)/)
    const color = colorMatch ? colorMatch[1].trim() : null

    if (!color) {
      return text
    }

    // Get CSS class for this color
    const colorClass = getTextColorClass(color)

    // Build text with formatting
    let element: React.ReactNode = text

    if (format & 1) element = <strong>{element}</strong>
    if (format & 2) element = <em>{element}</em>
    if (format & 8) element = <u>{element}</u>
    if (format & 16) element = <s>{element}</s>
    if (format & 32) element = <code>{element}</code>
    if (format & 64) element = <sub>{element}</sub>
    if (format & 128) element = <sup>{element}</sup>

    // Wrap with color class or inline style
    if (colorClass) {
      return <span className={colorClass}>{element}</span>
    } else {
      // Fallback to inline style for unknown colors (shouldn't happen with colorPicker: false)
      return <span style={{ color }}>{element}</span>
    }
  },
}
