'use client'

import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useField } from '@payloadcms/ui'
import { standardModules, standardFormats } from './quillConfig'
import type { TextFieldClientComponent } from 'payload'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

// Import Quill styles - these are needed for the editor to render correctly
import 'react-quill/dist/quill.snow.css'

/**
 * QuillRichTextField - A custom Payload CMS field component using ReactQuill
 *
 * This component replaces Payload's default rich text editor with Quill,
 * providing text color, background color, and other formatting options.
 *
 * The field stores content as HTML strings.
 *
 * Usage in Payload config:
 * ```typescript
 * {
 *   name: 'body',
 *   type: 'text',
 *   admin: {
 *     components: {
 *       Field: '@/admin/fields/QuillRichTextField',
 *     },
 *   },
 * }
 * ```
 */
const QuillRichTextField: TextFieldClientComponent = (props) => {
  const { path, readOnly, field } = props
  const modules = standardModules
  const formats = standardFormats
  const placeholder = 'Enter content...'

  // Get field state from Payload's form context
  const { value, setValue } = useField<string>({ path })

  // Track if Quill is mounted (for SSR safety)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle content changes
  const handleChange = useCallback(
    (content: string) => {
      // Quill returns '<p><br></p>' for empty content, normalize to empty string
      const normalizedContent = content === '<p><br></p>' ? '' : content
      setValue(normalizedContent)
    },
    [setValue],
  )

  // Get the current value, handling potential Lexical JSON from unmigrated data
  const getCurrentValue = useCallback((): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    // If it's still Lexical JSON (object), show a placeholder message
    // This will be fixed after migration runs
    if (typeof value === 'object') {
      console.warn('QuillRichTextField: Received Lexical JSON instead of HTML. Run migration.')
      return '<p><em>[Content requires migration from Lexical JSON to HTML]</em></p>'
    }
    return ''
  }, [value])

  // Get label from field config - handle both string and localized labels
  const rawLabel = field?.label || field?.name
  const labelText = typeof rawLabel === 'string' ? rawLabel : rawLabel?.en || ''

  // Show loading state until mounted (SSR safety)
  if (!mounted) {
    return (
      <div className="field-type quill-rich-text">
        {labelText && <label className="field-label">{labelText}</label>}
        <div className="quill-loading">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="field-type quill-rich-text">
      {labelText && <label className="field-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{labelText}</label>}
      <style>{`
        .field-type.quill-rich-text {
          margin-bottom: 1.5rem;
        }
        .field-type.quill-rich-text .ql-container {
          min-height: 200px;
          font-size: 14px;
        }
        .field-type.quill-rich-text .ql-editor {
          min-height: 180px;
        }
        .field-type.quill-rich-text .ql-toolbar {
          background: #f5f5f5;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .field-type.quill-rich-text .ql-container {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .field-type.quill-rich-text .quill-loading {
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 4px;
          color: #666;
          font-style: italic;
        }
        /* Dark mode support */
        [data-theme="dark"] .field-type.quill-rich-text .ql-toolbar {
          background: #333;
          border-color: #444;
        }
        [data-theme="dark"] .field-type.quill-rich-text .ql-container {
          background: #222;
          border-color: #444;
          color: #eee;
        }
        [data-theme="dark"] .field-type.quill-rich-text .ql-editor.ql-blank::before {
          color: #888;
        }
        [data-theme="dark"] .field-type.quill-rich-text .ql-stroke {
          stroke: #ccc;
        }
        [data-theme="dark"] .field-type.quill-rich-text .ql-fill {
          fill: #ccc;
        }
        [data-theme="dark"] .field-type.quill-rich-text .ql-picker-label {
          color: #ccc;
        }
      `}</style>

      <ReactQuill
        theme="snow"
        value={getCurrentValue()}
        onChange={handleChange}
        readOnly={readOnly}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  )
}

export default QuillRichTextField
