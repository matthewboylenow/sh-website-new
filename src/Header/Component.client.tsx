'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X, Search } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { MegaMenu } from './Nav/MegaMenu'
import { DropdownMenu } from './Nav/DropdownMenu'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const appearance = data?.appearance
  const headerStyle = appearance?.style || 'solid'
  const backgroundColor = appearance?.backgroundColor || 'default'
  const stickyHeader = appearance?.stickyHeader !== false
  const logo = data?.logo
  const logoHeight = data?.logoHeight || 40
  const navItems = data?.navItems || []

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Track scroll position for transparentScroll style
  useEffect(() => {
    if (headerStyle !== 'transparentScroll') return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headerStyle])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Determine if header should be transparent
  const isTransparent =
    headerStyle === 'transparent' || (headerStyle === 'transparentScroll' && !isScrolled)

  // Background color classes
  const bgClasses = cn(
    isTransparent
      ? 'bg-transparent'
      : backgroundColor === 'dark'
        ? 'bg-sh-bg-dark'
        : backgroundColor === 'brand'
          ? 'bg-sh-primary'
          : backgroundColor === 'transparent'
            ? 'bg-transparent'
            : 'bg-sh-bg/95 backdrop-blur-sm',
  )

  // Text color classes
  const textClasses = cn(
    isTransparent || backgroundColor === 'dark' || backgroundColor === 'brand'
      ? 'text-white'
      : 'text-sh-text-main',
  )

  // Border classes
  const borderClasses = cn(
    !isTransparent &&
      (backgroundColor === 'dark' || backgroundColor === 'brand'
        ? 'border-white/20'
        : 'border-sh-border-subtle'),
  )

  // Render navigation item based on type
  const renderNavItem = (item: (typeof navItems)[number], index: number, isMobile = false) => {
    const menuType = item.menuType || 'simple'

    if (menuType === 'megamenu') {
      return (
        <MegaMenu
          key={index}
          item={item}
          isMobile={isMobile}
          onClose={() => setMobileMenuOpen(false)}
        />
      )
    }

    if (menuType === 'dropdown') {
      return (
        <DropdownMenu
          key={index}
          item={item}
          isMobile={isMobile}
          onClose={() => setMobileMenuOpen(false)}
        />
      )
    }

    // Simple link
    if (isMobile) {
      return (
        <div key={index} onClick={() => setMobileMenuOpen(false)}>
          <CMSLink
            {...item.link}
            className="block px-4 py-3 text-base font-medium text-sh-text-main hover:bg-sh-surface hover:text-sh-primary rounded-lg transition-colors"
          />
        </div>
      )
    }

    return (
      <CMSLink
        key={index}
        {...item.link}
        className={cn(
          'text-base font-medium transition-colors',
          isTransparent || backgroundColor === 'dark' || backgroundColor === 'brand'
            ? 'text-white hover:text-white/80'
            : 'text-sh-text-main hover:text-sh-primary',
        )}
      />
    )
  }

  return (
    <>
      <header
        className={cn(
          'z-50 transition-all duration-300',
          stickyHeader ? 'sticky top-0' : 'relative',
          bgClasses,
          !isTransparent && 'border-b',
          borderClasses,
        )}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {logo && typeof logo === 'object' ? (
                <div style={{ height: `${logoHeight}px` }}>
                  <Media resource={logo} imgClassName={cn('h-full w-auto object-contain')} />
                </div>
              ) : (
                <Logo loading="eager" priority="high" className="h-10" />
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className={cn('hidden lg:flex items-center gap-8', textClasses)}>
              {navItems.map((item, i) => renderNavItem(item, i, false))}
            </nav>

            {/* Desktop Right Side - Give Button + Search */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/search"
                className={cn(
                  'p-2 rounded-full transition-colors',
                  isTransparent || backgroundColor === 'dark' || backgroundColor === 'brand'
                    ? 'hover:bg-white/10'
                    : 'hover:bg-sh-surface',
                )}
                aria-label="Search"
              >
                <Search className={cn('h-5 w-5', textClasses)} />
              </Link>
              <Link
                href="/give"
                className={cn(
                  'inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors',
                  isTransparent || backgroundColor === 'dark'
                    ? 'bg-white text-sh-primary hover:bg-white/90'
                    : backgroundColor === 'brand'
                      ? 'bg-white text-sh-primary hover:bg-white/90'
                      : 'bg-sh-primary text-white hover:bg-sh-primary-soft',
                )}
              >
                Give
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isTransparent || backgroundColor === 'dark' || backgroundColor === 'brand'
                  ? 'hover:bg-white/10'
                  : 'hover:bg-sh-surface',
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={cn('h-6 w-6', textClasses)} />
              ) : (
                <Menu className={cn('h-6 w-6', textClasses)} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed top-20 right-0 bottom-0 z-40 w-full max-w-sm bg-sh-bg transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav className="flex flex-col p-6 space-y-1">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pb-6 mb-6 border-b border-sh-border-subtle">
            <Link
              href="/visit"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-sh-surface hover:bg-sh-primary hover:text-white transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-sm font-semibold">Plan a Visit</span>
            </Link>
            <Link
              href="/mass-times"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-sh-surface hover:bg-sh-primary hover:text-white transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-sm font-semibold">Mass Times</span>
            </Link>
            <Link
              href="/watch-online"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-sh-surface hover:bg-sh-primary hover:text-white transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-sm font-semibold">Watch Online</span>
            </Link>
            <Link
              href="/give"
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-sh-primary text-white hover:bg-sh-primary-soft transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-sm font-semibold">Give</span>
            </Link>
          </div>

          {/* Navigation Links */}
          {navItems.map((item, i) => renderNavItem(item, i, true))}

          {/* Search Link */}
          <Link
            href="/search"
            className="flex items-center gap-3 px-4 py-3 text-base font-medium text-sh-text-main hover:bg-sh-surface hover:text-sh-primary rounded-lg transition-colors mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Search className="h-5 w-5" />
            Search
          </Link>
        </nav>
      </div>
    </>
  )
}
