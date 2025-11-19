'use client'

import React, { useState } from 'react'

/**
 * Editor Help Overlay
 *
 * Provides in-CMS documentation for editors on how to use the page builder.
 * Opens via a "?" button in the admin header.
 *
 * Content covers:
 * - What blocks are and how they work
 * - Using block names for organization
 * - Block Navigator usage
 * - BlockAppearance settings
 * - Rich text editor features
 * - Assistant widget context
 * - Live Preview and breakpoints
 *
 * USAGE:
 * Wire this component into Pages collection admin header or as a custom view.
 */

export const EditorHelpOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => setIsOpen(!isOpen)

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={toggleModal}
        style={styles.helpButton}
        title="Page Builder Help"
      >
        ?
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div style={styles.backdrop} onClick={toggleModal} />

      {/* Modal */}
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Page Builder Guide</h2>
          <button type="button" onClick={toggleModal} style={styles.closeButton}>
            ✕
          </button>
        </div>

        <div style={styles.modalContent}>
          {/* Section: What are Blocks? */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📦 What are Blocks?</h3>
            <p style={styles.text}>
              Each section of your page is a <strong>block</strong>. Blocks are stacked
              vertically to build your complete page layout.
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Hero blocks</strong>: Page headers with images/video
              </li>
              <li style={styles.listItem}>
                <strong>Content blocks</strong>: Rich text, columns, CTAs
              </li>
              <li style={styles.listItem}>
                <strong>List blocks</strong>: Events, posts, bulletins, media
              </li>
              <li style={styles.listItem}>
                <strong>Interactive blocks</strong>: FAQs, testimonials, forms
              </li>
            </ul>
          </section>

          {/* Section: Block Names */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🏷️ Using Block Names</h3>
            <p style={styles.text}>
              Every block has a <strong>Block Name</strong> field at the bottom. Use this to
              label sections for easy identification in the Block Navigator.
            </p>
            <p style={styles.text}>
              <strong>Example:</strong> "Welcome Hero", "Ministries Grid", "Contact CTA"
            </p>
          </section>

          {/* Section: Block Navigator */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🧭 Block Navigator</h3>
            <p style={styles.text}>
              The Block Navigator shows a tree view of all blocks on your page. Use it to:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>See your page structure at a glance</li>
              <li style={styles.listItem}>Reorder blocks with ↑ ↓ buttons</li>
              <li style={styles.listItem}>Jump to specific blocks by clicking them</li>
            </ul>
          </section>

          {/* Section: Block Appearance */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🎨 Block Appearance Settings</h3>
            <p style={styles.text}>
              Most blocks have an <strong>Appearance</strong> section with grouped options:
            </p>
            <div style={styles.subsection}>
              <h4 style={styles.subsectionTitle}>Section Layout</h4>
              <p style={styles.text}>
                Controls width, spacing (padding), and content alignment.
              </p>
            </div>
            <div style={styles.subsection}>
              <h4 style={styles.subsectionTitle}>Background & Style</h4>
              <p style={styles.text}>
                Choose background colors (Light, Brand, Dark, Transparent, Custom) and text
                colors.
              </p>
            </div>
          </section>

          {/* Section: Visibility Settings */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>👁️ Visibility Settings</h3>
            <p style={styles.text}>
              Control when and where blocks appear:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Device visibility</strong>: Show/hide on mobile, tablet, desktop
              </li>
              <li style={styles.listItem}>
                <strong>Audience targeting</strong>: Show to all visitors, first-timers, or
                parishioners
              </li>
            </ul>
          </section>

          {/* Section: Animation Settings */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>✨ Animation Settings</h3>
            <p style={styles.text}>
              Add entrance animations to blocks for visual polish:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Fade In</strong>: Simple opacity animation
              </li>
              <li style={styles.listItem}>
                <strong>Fade Up</strong>: Slides up while fading in
              </li>
              <li style={styles.listItem}>
                <strong>Fade In + Scale</strong>: Scales and fades simultaneously
              </li>
            </ul>
            <p style={styles.text}>
              Adjust timing with <strong>Delay</strong> and <strong>Duration</strong> controls.
            </p>
          </section>

          {/* Section: Rich Text Editor */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📝 Rich Text Editor</h3>
            <p style={styles.text}>The rich text editor supports:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Formatting</strong>: Bold, italic, underline
              </li>
              <li style={styles.listItem}>
                <strong>Structure</strong>: Headings, lists, blockquotes
              </li>
              <li style={styles.listItem}>
                <strong>Links</strong>: Internal (to pages/posts) and external
              </li>
              <li style={styles.listItem}>
                <strong>Text colors</strong>: Brand, Muted, Accent
              </li>
              <li style={styles.listItem}>
                <strong>CTA Buttons</strong>: Inline call-to-action buttons
              </li>
            </ul>
          </section>

          {/* Section: Patterns */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>📐 Using Patterns</h3>
            <p style={styles.text}>
              Patterns are reusable page layouts saved in the <strong>Patterns</strong>{' '}
              collection. To use one:
            </p>
            <ol style={styles.list}>
              <li style={styles.listItem}>
                Add an <strong>Insert Pattern</strong> block to your page
              </li>
              <li style={styles.listItem}>Select a pattern from the dropdown</li>
              <li style={styles.listItem}>
                The pattern's blocks will be copied into your page
              </li>
            </ol>
            <p style={styles.text}>
              <em>
                Note: Pattern insertion is currently manual (copy blocks from pattern to
                page).
              </em>
            </p>
          </section>

          {/* Section: Live Preview */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>👀 Live Preview</h3>
            <p style={styles.text}>
              Use the <strong>Live Preview</strong> button to see your page as it will appear
              on the website:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                Click <strong>Mobile / Tablet / Desktop</strong> tabs to test different
                breakpoints
              </li>
              <li style={styles.listItem}>
                Preview updates automatically as you edit (requires saving draft)
              </li>
              <li style={styles.listItem}>
                Use preview to check visibility settings and animations
              </li>
            </ul>
          </section>

          {/* Section: Assistant Widget */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>🤖 Assistant Widget</h3>
            <p style={styles.text}>
              The site includes an AI-powered Assistant that helps visitors find content. It
              uses the <strong>SearchItems</strong> collection to know what to suggest.
            </p>
            <p style={styles.text}>
              When creating pages, consider adding relevant search items so the Assistant can
              recommend your content.
            </p>
          </section>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              Need more help? Contact your site administrator.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// Styles
const styles: Record<string, React.CSSProperties> = {
  helpButton: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#0ea5e9',
    color: 'white',
    border: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(14, 165, 233, 0.4)',
    transition: 'all 0.2s',
    zIndex: 1000,
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9998,
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 32px',
    borderBottom: '1px solid #e2e8f0',
  },
  modalTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 600,
    color: '#1e293b',
  },
  closeButton: {
    width: '32px',
    height: '32px',
    border: 'none',
    background: '#f1f5f9',
    borderRadius: '6px',
    fontSize: '20px',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  modalContent: {
    padding: '32px',
    overflowY: 'auto',
    flex: 1,
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    margin: '0 0 12px 0',
    fontSize: '18px',
    fontWeight: 600,
    color: '#0f172a',
  },
  subsection: {
    marginLeft: '16px',
    marginTop: '12px',
  },
  subsectionTitle: {
    margin: '0 0 6px 0',
    fontSize: '15px',
    fontWeight: 500,
    color: '#334155',
  },
  text: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#475569',
  },
  list: {
    margin: '8px 0 0 0',
    padding: '0 0 0 20px',
    listStyle: 'disc',
  },
  listItem: {
    margin: '6px 0',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#475569',
  },
  footer: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0',
  },
  footerText: {
    margin: 0,
    fontSize: '13px',
    color: '#94a3b8',
    textAlign: 'center',
  },
}

// TODO: Wire this component into Pages collection admin
// Example in Pages/index.ts:
//
// admin: {
//   components: {
//     afterList: [EditorHelpOverlay],
//     // Or as a custom view button
//   },
// }
