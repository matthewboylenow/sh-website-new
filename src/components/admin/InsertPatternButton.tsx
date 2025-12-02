'use client'

import React, { useState } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'

/**
 * InsertPatternButton Component
 *
 * A custom admin UI field component for the InsertPattern block.
 * Provides instructions for manually copying pattern blocks.
 *
 * NOTE: Full automatic pattern insertion would require:
 * 1. Access to the parent form's layout array
 * 2. Fetching the pattern's blocks from the API
 * 3. Inserting blocks at the current position
 * 4. Removing the InsertPattern block itself
 *
 * For now, this shows helpful instructions and a link to the pattern.
 */
export const InsertPatternButton: React.FC<{
  path: string
}> = ({ path }) => {
  const [showInstructions, setShowInstructions] = useState(false)

  // Get the pattern relationship field
  const patternPath = path.replace('.insertButton', '.pattern')

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.icon}>📐</span>
        <span style={styles.title}>Pattern Insertion</span>
      </div>

      <div style={styles.content}>
        <p style={styles.text}>
          After selecting a pattern above, follow these steps to insert it:
        </p>

        <ol style={styles.steps}>
          <li style={styles.step}>
            <strong>Open the pattern</strong> in a new tab from the Patterns collection
          </li>
          <li style={styles.step}>
            <strong>Copy each block</strong> from the pattern&apos;s Layout Blocks
          </li>
          <li style={styles.step}>
            <strong>Paste the blocks</strong> into this page&apos;s Content tab
          </li>
          <li style={styles.step}>
            <strong>Delete this Insert Pattern block</strong> when done
          </li>
        </ol>

        <div style={styles.tipBox}>
          <span style={styles.tipIcon}>💡</span>
          <span style={styles.tipText}>
            Tip: Use block names (like &ldquo;Welcome Hero&rdquo;) to identify blocks when copying
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.open('/admin/collections/patterns', '_blank')}
        style={styles.button}
      >
        Open Patterns →
      </button>
    </div>
  )
}

// Inline styles for the component
const styles: Record<string, React.CSSProperties> = {
  container: {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '8px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  icon: {
    fontSize: '20px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#0369a1',
  },
  content: {
    marginBottom: '12px',
  },
  text: {
    fontSize: '13px',
    color: '#475569',
    margin: '0 0 12px 0',
  },
  steps: {
    margin: '0 0 16px 0',
    padding: '0 0 0 20px',
    listStyle: 'decimal',
  },
  step: {
    fontSize: '13px',
    color: '#475569',
    marginBottom: '8px',
    lineHeight: '1.5',
  },
  tipBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    background: '#fef9c3',
    border: '1px solid #fcd34d',
    borderRadius: '6px',
    padding: '12px',
    marginTop: '12px',
  },
  tipIcon: {
    fontSize: '16px',
    flexShrink: 0,
  },
  tipText: {
    fontSize: '12px',
    color: '#713f12',
    lineHeight: '1.4',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
}

export default InsertPatternButton
