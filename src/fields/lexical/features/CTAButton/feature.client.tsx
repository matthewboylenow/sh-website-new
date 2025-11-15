'use client'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from 'lexical'
import { useEffect, useState } from 'react'
import { $createCTAButtonNode } from './nodes/CTAButtonNode'
import type { CTAButtonAppearance } from './nodes/CTAButtonNode'

export const CTAButtonFeatureClient = {
  toolbarInline: {
    groups: [
      {
        key: 'ctaButton',
        order: 15,
        items: [
          {
            key: 'ctaButton',
            order: 1,
            Component: CTAButtonToolbarButton,
          },
        ],
      },
    ],
  },
}

function CTAButtonToolbarButton() {
  const [editor] = useLexicalComposerContext()
  const [showModal, setShowModal] = useState(false)
  const [label, setLabel] = useState('')
  const [href, setHref] = useState('')
  const [appearance, setAppearance] = useState<CTAButtonAppearance>('primary')
  const [openInNewTab, setOpenInNewTab] = useState(false)

  const insertCTAButton = () => {
    if (!label || !href) return

    editor.update(() => {
      const ctaButtonNode = $createCTAButtonNode({
        label,
        href,
        appearance,
        openInNewTab,
      })
      $insertNodes([ctaButtonNode])
    })

    // Reset form
    setLabel('')
    setHref('')
    setAppearance('primary')
    setOpenInNewTab(false)
    setShowModal(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="toolbar-button"
        title="Insert CTA Button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="8" width="18" height="8" rx="2" />
          <path d="M12 12h.01" />
        </svg>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Insert CTA Button</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Learn More"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sh-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="text"
                  value={href}
                  onChange={(e) => setHref(e.target.value)}
                  placeholder="/about or https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sh-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Appearance</label>
                <select
                  value={appearance}
                  onChange={(e) => setAppearance(e.target.value as CTAButtonAppearance)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sh-primary"
                >
                  <option value="primary">Primary (Blue)</option>
                  <option value="secondary">Secondary (Gold)</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="openInNewTab"
                  checked={openInNewTab}
                  onChange={(e) => setOpenInNewTab(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="openInNewTab" className="text-sm">
                  Open in new tab
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={insertCTAButton}
                disabled={!label || !href}
                className="px-4 py-2 bg-sh-primary text-white rounded-md hover:bg-sh-primary-soft disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Insert Button
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
