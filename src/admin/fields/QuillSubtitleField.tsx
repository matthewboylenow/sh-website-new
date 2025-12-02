'use client'

import React, { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useField } from '@payloadcms/ui'
import { subtitleModules, subtitleFormats } from './quillConfig'
import type { TextFieldClientComponent } from 'payload'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

/**
 * QuillSubtitleField - A simpler Quill editor for subtitle/description fields
 *
 * Excludes headings and advanced formatting, keeping just basic inline formatting.
 */
const QuillSubtitleField: TextFieldClientComponent = (props) => {
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
      <div className="field-type quill-subtitle">
        {label && <label className="field-label">{label}</label>}
        <div className="quill-loading">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="field-type quill-subtitle">
      {label && <label className="field-label" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{label}</label>}
      <style>{`
        .field-type.quill-subtitle {
          margin-bottom: 1.5rem;
        }
        .field-type.quill-subtitle .ql-container {
          min-height: 80px;
          font-size: 14px;
        }
        .field-type.quill-subtitle .ql-editor {
          min-height: 60px;
        }
        .field-type.quill-subtitle .ql-toolbar {
          background: #f5f5f5;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .field-type.quill-subtitle .ql-container {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        [data-theme="dark"] .field-type.quill-subtitle .ql-toolbar {
          background: #333;
          border-color: #444;
        }
        [data-theme="dark"] .field-type.quill-subtitle .ql-container {
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
        modules={subtitleModules}
        formats={subtitleFormats}
        placeholder="Enter subtitle..."
      />
    </div>
  )
}

export default QuillSubtitleField
