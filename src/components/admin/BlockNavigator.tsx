'use client'

import React from 'react'

/**
 * Block Navigator Component
 *
 * Provides a Breakdance-style structure tree for the page layout blocks.
 * Shows all blocks in a vertical list with controls to:
 * - Reorder blocks (move up/down)
 * - Jump to block in form (scroll to)
 * - See block names at a glance
 *
 * USAGE:
 * This component should be wired into the Pages collection via admin.components
 * for the layout field or as a sidebar component.
 *
 * IMPLEMENTATION NOTE:
 * This is a simplified placeholder that demonstrates the UI structure.
 * Full implementation requires:
 * - Payload's useFormFields hook to access layout data
 * - Payload's form setValue to reorder blocks
 * - DOM manipulation to scroll to blocks
 *
 * See TODO comments for implementation details.
 */

interface Block {
  blockType?: string
  blockName?: string
  id?: string
}

interface BlockNavigatorProps {
  // These props would come from Payload's form context
  // TODO: Wire these from useFormFields or custom Field component
  blocks?: Block[]
  onReorder?: (fromIndex: number, toIndex: number) => void
  onBlockClick?: (blockId: string, index: number) => void
}

export const BlockNavigator: React.FC<BlockNavigatorProps> = ({
  blocks = [],
  onReorder,
  onBlockClick,
}) => {
  const handleMoveUp = (index: number) => {
    if (index > 0 && onReorder) {
      onReorder(index, index - 1)
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < blocks.length - 1 && onReorder) {
      onReorder(index, index + 1)
    }
  }

  const handleBlockClick = (block: Block, index: number) => {
    if (onBlockClick && block.id) {
      onBlockClick(block.id, index)
    } else {
      // Fallback: try to scroll to block using DOM
      const blockElement = document.querySelector(`[data-block-index="${index}"]`)
      if (blockElement) {
        blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  // Block type to friendly name mapping
  const getBlockLabel = (block: Block): string => {
    if (block.blockName) {
      return block.blockName
    }

    const typeLabels: Record<string, string> = {
      heroBasic: 'Hero – Basic',
      heroWithStats: 'Hero – With Stats',
      richTextSection: 'Rich Text Section',
      columns: 'Columns',
      ctaFullWidth: 'CTA – Full Width',
      cardGrid: 'Card Grid',
      bentoGrid: 'Bento Grid',
      eventList: 'Event List',
      postList: 'Post List',
      bulletinList: 'Bulletin List',
      mediaList: 'Media List',
      testimonial: 'Testimonial',
      storyHighlight: 'Story Highlight',
      faqAccordion: 'FAQ Accordion',
      videoEmbed: 'Video Embed',
      formEmbed: 'Form Embed',
      spacer: 'Spacer',
      divider: 'Divider',
      customCode: 'Custom Code',
      alertBanner: 'Alert Banner',
      callToAction: 'Call to Action',
      content: 'Content',
      mediaBlock: 'Media Block',
      archive: 'Archive',
      formBlock: 'Form',
    }

    return typeLabels[block.blockType || ''] || block.blockType || 'Unknown Block'
  }

  // Block type to icon mapping (simple initials or emoji)
  const getBlockIcon = (block: Block): string => {
    const iconMap: Record<string, string> = {
      heroBasic: '🎯',
      heroWithStats: '📊',
      richTextSection: '📝',
      columns: '📰',
      ctaFullWidth: '🎬',
      cardGrid: '🃏',
      bentoGrid: '⊞',
      eventList: '📅',
      postList: '📄',
      bulletinList: '📋',
      mediaList: '🖼️',
      testimonial: '💬',
      storyHighlight: '✨',
      faqAccordion: '❓',
      videoEmbed: '🎥',
      formEmbed: '📮',
      spacer: '↕️',
      divider: '—',
      customCode: '💻',
      alertBanner: '⚠️',
    }

    return iconMap[block.blockType || ''] || '■'
  }

  if (blocks.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.title}>Block Navigator</h3>
          <p style={styles.subtitle}>Structure Tree</p>
        </div>
        <div style={styles.empty}>
          <p style={styles.emptyText}>No blocks yet. Add blocks to see them here.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Block Navigator</h3>
        <p style={styles.subtitle}>{blocks.length} block{blocks.length !== 1 ? 's' : ''}</p>
      </div>

      <div style={styles.list}>
        {blocks.map((block, index) => (
          <div
            key={block.id || index}
            style={styles.blockItem}
            onClick={() => handleBlockClick(block, index)}
          >
            <div style={styles.blockMain}>
              <span style={styles.blockIcon}>{getBlockIcon(block)}</span>
              <div style={styles.blockInfo}>
                <div style={styles.blockName}>{getBlockLabel(block)}</div>
                <div style={styles.blockType}>{block.blockType}</div>
              </div>
            </div>

            <div style={styles.blockActions}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMoveUp(index)
                }}
                disabled={index === 0}
                style={{
                  ...styles.actionButton,
                  ...(index === 0 ? styles.actionButtonDisabled : {}),
                }}
                title="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleMoveDown(index)
                }}
                disabled={index === blocks.length - 1}
                style={{
                  ...styles.actionButton,
                  ...(index === blocks.length - 1 ? styles.actionButtonDisabled : {}),
                }}
                title="Move down"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>Click blocks to jump to them in the editor</p>
      </div>
    </div>
  )
}

// Inline styles for simplicity (could be converted to CSS modules or styled-components)
const styles: Record<string, React.CSSProperties> = {
  container: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e2e8f0',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: '#1e293b',
  },
  subtitle: {
    margin: '4px 0 0 0',
    fontSize: '12px',
    color: '#64748b',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  blockItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  blockMain: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  blockIcon: {
    fontSize: '18px',
    width: '24px',
    textAlign: 'center',
  },
  blockInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  blockName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#1e293b',
  },
  blockType: {
    fontSize: '11px',
    color: '#94a3b8',
  },
  blockActions: {
    display: 'flex',
    gap: '4px',
  },
  actionButton: {
    width: '24px',
    height: '24px',
    padding: 0,
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    background: '#ffffff',
    color: '#475569',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  actionButtonDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  empty: {
    padding: '32px 16px',
    textAlign: 'center',
  },
  emptyText: {
    margin: 0,
    fontSize: '13px',
    color: '#94a3b8',
  },
  footer: {
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #e2e8f0',
  },
  footerText: {
    margin: 0,
    fontSize: '11px',
    color: '#94a3b8',
    textAlign: 'center',
  },
}

// TODO: Wire this component into Pages collection
// Example implementation in Pages/index.ts:
//
// admin: {
//   components: {
//     // Option 1: As a sidebar component
//     views: {
//       Edit: {
//         Default: {
//           Nav: BlockNavigator,
//         },
//       },
//     },
//     // Option 2: As a field component for the layout field
//     // (Requires wrapper that extracts form values)
//   },
// }
