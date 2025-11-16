'use client'

import React, { useState, useRef, useEffect } from 'react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { ChevronDown } from 'lucide-react'
import type { Header } from '@/payload-types'

type NavItem = NonNullable<Header['navItems']>[number]

interface DropdownMenuProps {
  item: NavItem
  isMobile?: boolean
  onClose?: () => void
  isTransparent?: boolean
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  isMobile = false,
  onClose,
  isTransparent = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, isMobile])

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout)
    }
  }, [hoverTimeout])

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setIsOpen(false), 150)
    setHoverTimeout(timeout)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(!isOpen)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const submenu = item.submenu || []
  const allItems = submenu.flatMap((group) => group.items || [])

  if (isMobile) {
    return (
      <div className="border-b border-sh-border-subtle">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-sh-text-main hover:bg-sh-surface rounded-lg transition-colors"
        >
          <span>{typeof item.link === 'object' ? item.link.label : 'Menu'}</span>
          <ChevronDown
            className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')}
          />
        </button>
        {isOpen && (
          <div className="pl-4 pb-2 space-y-1">
            {allItems.map((subItem, idx) => (
              <div key={idx} onClick={onClose}>
                <CMSLink
                  {...subItem.link}
                  className="block px-4 py-2 text-sm text-sh-text-main hover:bg-sh-surface hover:text-sh-primary rounded-lg transition-colors"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Desktop dropdown
  return (
    <div className="relative" ref={menuRef}>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-1 text-base font-medium transition-colors',
          isTransparent ? 'text-white hover:text-white/80' : 'text-sh-text-main hover:text-sh-primary'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{typeof item.link === 'object' ? item.link.label : 'Menu'}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="menu"
        >
          <div className="bg-white border border-sh-border-subtle rounded-lg shadow-xl py-2 overflow-hidden">
            {allItems.map((subItem, idx) => (
              <div
                key={idx}
                role="menuitem"
                onClick={() => {
                  setIsOpen(false)
                  onClose?.()
                }}
              >
                <CMSLink
                  {...subItem.link}
                  className="block px-4 py-2.5 text-sm font-medium text-sh-text-main hover:bg-sh-primary/10 hover:text-sh-primary transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
