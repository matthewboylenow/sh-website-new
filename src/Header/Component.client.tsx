'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X, Search } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false) // Close mobile menu on route change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

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

  const navItems = data?.navItems || []

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 bg-sh-bg/95 backdrop-blur-sm border-b border-sh-border-subtle',
        )}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo loading="eager" priority="high" className="h-10" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="text-base font-medium text-sh-text-main hover:text-sh-primary transition-colors"
                />
              ))}
            </nav>

            {/* Desktop Right Side - Give Button + Search */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/search"
                className="p-2 rounded-full hover:bg-sh-surface transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-sh-text-main" />
              </Link>
              <Link
                href="/give"
                className="inline-flex items-center justify-center rounded-lg bg-sh-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sh-primary-soft transition-colors"
              >
                Give
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-sh-surface transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-sh-text-main" />
              ) : (
                <Menu className="h-6 w-6 text-sh-text-main" />
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
          {navItems.map(({ link }, i) => (
            <div key={i} onClick={() => setMobileMenuOpen(false)}>
              <CMSLink
                {...link}
                className="block px-4 py-3 text-base font-medium text-sh-text-main hover:bg-sh-surface hover:text-sh-primary rounded-lg transition-colors"
              />
            </div>
          ))}

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
