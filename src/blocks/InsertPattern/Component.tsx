import React from 'react'

/**
 * InsertPattern Block - Frontend Component
 *
 * This block should NEVER render on the frontend since it's purely
 * an editor workflow tool. If it somehow makes it to production,
 * render nothing.
 */
export const InsertPatternBlock: React.FC = () => {
  // In development, log a warning
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'InsertPatternBlock should not render on frontend. This is an editor-only block.',
    )
  }

  // Render nothing
  return null
}
