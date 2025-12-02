'use client'

import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useField } from '@payloadcms/ui'
import { fullModules, standardFormats } from './quillConfig'
import type { TextFieldClientComponent } from 'payload'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

/**
 * QuillFullField - Full-featured Quill editor for long-form content
 *
 * Includes all heading levels (H1-H6), alignment, indentation, and full formatting.
 * Best for blog posts, articles, and comprehensive content.
 */
const QuillFullField: TextFieldClientComponent = (props) => {
  const { path, readOnly, field } = props
  const { value, setValue } = useField<string>({ path })
  const [mounted, setMounted] = useState(false)
  const rawLabel = field?.label || field?.name
  const label = typeof rawLabel === 'string' ? rawLabel : rawLabel?.en || ''

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = useCallback(
    (content: string) => {
      const normalizedContent = content === '<p><br></p>' ? '' : content
      setValue(normalizedContent)
    },
    [setValue],
  )

  const getCurrentValue = useCallback((): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object') {
      return '<p><em>[Content requires migration]</em></p>'
    }
    return ''
  }, [value])

  if (!mounted) {
    return (
      <div className="field-type quill-full">
        {label && <label className="field-label">{label}</label>}
        <div className="quill-loading">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="field-type quill-full">
      {label && <label className="field-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{label}</label>}
      <style>{`
        .field-type.quill-full {
          margin-bottom: 1.5rem;
        }
        .field-type.quill-full .ql-container {
          min-height: 300px;
          font-size: 14px;
        }
        .field-type.quill-full .ql-editor {
          min-height: 280px;
        }
        .field-type.quill-full .ql-toolbar {
          background: #f5f5f5;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .field-type.quill-full .ql-container {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        [data-theme="dark"] .field-type.quill-full .ql-toolbar {
          background: #333;
          border-color: #444;
        }
        [data-theme="dark"] .field-type.quill-full .ql-container {
          background: #222;
          border-color: #444;
          color: #eee;
        }
      `}</style>

      <ReactQuill
        theme="snow"
        value={getCurrentValue()}
        onChange={handleChange}
        readOnly={readOnly}
        modules={fullModules}
        formats={standardFormats}
        placeholder="Enter content..."
      />
    </div>
  )
}

export default QuillFullField
