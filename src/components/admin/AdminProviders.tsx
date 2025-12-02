'use client'

import React from 'react'
import { EditorHelpOverlay } from './EditorHelpOverlay'

/**
 * AdminProviders Component
 *
 * Wraps admin dashboard with additional functionality including:
 * - EditorHelpOverlay for page builder documentation
 *
 * To wire this into Payload, add it to payload.config.ts:
 *
 * admin: {
 *   components: {
 *     providers: ['/components/admin/AdminProviders'],
 *   },
 * }
 */
export const AdminProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <EditorHelpOverlay />
    </>
  )
}

export default AdminProviders
