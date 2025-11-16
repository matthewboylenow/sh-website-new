import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import { cn } from '@/utilities/ui'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  // Get global settings for parish info, mass times, etc.
  let globalSettings: any = null
  try {
    globalSettings = await getCachedGlobal('global-settings', 1)()
  } catch (error) {
    // Global settings not yet populated
    console.log('Global settings not available yet')
  }

  const navItems = footerData?.navItems || []
  const currentYear = new Date().getFullYear()

  const appearance = footerData?.appearance
  const backgroundColorMobile = appearance?.backgroundColorMobile || 'dark'
  const backgroundColorDesktop = appearance?.backgroundColorDesktop || 'dark'
  const textColorMobile = appearance?.textColorMobile || 'auto'
  const textColorDesktop = appearance?.textColorDesktop || 'auto'

  // Helper to determine text color
  const getAutoTextColor = (bgColor: string) => {
    return bgColor === 'dark' || bgColor === 'brand' ? 'light' : 'dark'
  }

  const effectiveTextColorMobile = textColorMobile === 'auto' ? getAutoTextColor(backgroundColorMobile) : textColorMobile
  const effectiveTextColorDesktop = textColorDesktop === 'auto' ? getAutoTextColor(backgroundColorDesktop) : textColorDesktop

  // Background classes
  const bgClasses = cn(
    // Mobile
    backgroundColorMobile === 'dark' && 'bg-sh-bg-dark',
    backgroundColorMobile === 'brand' && 'bg-sh-primary',
    backgroundColorMobile === 'surface' && 'bg-sh-surface',
    backgroundColorMobile === 'default' && 'bg-sh-bg',
    // Desktop
    backgroundColorDesktop === 'dark' && 'lg:bg-sh-bg-dark',
    backgroundColorDesktop === 'brand' && 'lg:bg-sh-primary',
    backgroundColorDesktop === 'surface' && 'lg:bg-sh-surface',
    backgroundColorDesktop === 'default' && 'lg:bg-sh-bg',
  )

  // Text classes
  const textClasses = cn(
    // Mobile
    effectiveTextColorMobile === 'light' && 'text-sh-text-on-dark',
    effectiveTextColorMobile === 'dark' && 'text-sh-text-main',
    // Desktop
    effectiveTextColorDesktop === 'light' && 'lg:text-sh-text-on-dark',
    effectiveTextColorDesktop === 'dark' && 'lg:text-sh-text-main',
  )

  const isLightText = effectiveTextColorDesktop === 'light'

  return (
    <footer className={cn('mt-auto', bgClasses, textClasses)}>
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Parish Info Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo className="h-10" />
            </Link>
            {globalSettings?.parishName && (
              <h3 className="text-lg font-heading font-semibold mb-4">
                {globalSettings.parishName}
              </h3>
            )}
            {globalSettings?.address && (
              <address className="not-italic text-sm text-sh-text-on-dark/80 mb-4 leading-relaxed">
                {globalSettings.address.street}
                <br />
                {globalSettings.address.city}, {globalSettings.address.state}{' '}
                {globalSettings.address.zip}
              </address>
            )}
            {globalSettings?.phone && (
              <p className="text-sm text-sh-text-on-dark/80 mb-2">
                <span className="font-medium">Phone:</span>{' '}
                <a href={`tel:${globalSettings.phone}`} className="hover:text-white transition-colors">
                  {globalSettings.phone}
                </a>
              </p>
            )}
            {globalSettings?.email && (
              <p className="text-sm text-sh-text-on-dark/80 mb-4">
                <span className="font-medium">Email:</span>{' '}
                <a href={`mailto:${globalSettings.email}`} className="hover:text-white transition-colors">
                  {globalSettings.email}
                </a>
              </p>
            )}
            {globalSettings?.officeHours && (
              <p className="text-sm text-sh-text-on-dark/80">
                <span className="font-medium">Office Hours:</span>
                <br />
                {globalSettings.officeHours}
              </p>
            )}
          </div>

          {/* Mass Times Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-heading font-semibold mb-4">Mass Times</h3>
            {globalSettings?.weekendMasses && globalSettings.weekendMasses.length > 0 ? (
              <div className="space-y-3 mb-4">
                <p className="text-sm font-medium text-sh-text-on-dark/90">Weekend</p>
                {globalSettings.weekendMasses.map((mass: any, index: number) => (
                  <p key={index} className="text-sm text-sh-text-on-dark/80">
                    {mass.day === 'saturday' ? 'Saturday' : 'Sunday'}: {mass.time}
                    {mass.notes && <span className="block text-xs italic">{mass.notes}</span>}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-sh-text-on-dark/80 mb-4">
                Saturday: 5:00 PM
                <br />
                Sunday: 8:00 AM, 10:00 AM, 12:00 PM
              </p>
            )}
            {globalSettings?.dailyMasses && globalSettings.dailyMasses.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-sh-text-on-dark/90">Daily Mass</p>
                {globalSettings.dailyMasses.map((mass: any, index: number) => (
                  <p key={index} className="text-sm text-sh-text-on-dark/80">
                    {mass.days}: {mass.time}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-sh-text-on-dark/80">
                Monday-Friday: 9:00 AM
              </p>
            )}
            <Link
              href="/mass-times"
              className="inline-block mt-4 text-sm font-medium text-sh-primary hover:text-sh-primary-soft transition-colors"
            >
              View Full Schedule →
            </Link>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="text-sm text-sh-text-on-dark/80 hover:text-white transition-colors"
                />
              ))}
            </nav>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-heading font-semibold mb-4">Resources</h3>
            <nav className="flex flex-col space-y-2">
              {globalSettings?.externalResources && globalSettings.externalResources.length > 0 ? (
                globalSettings.externalResources.map((resource: any, index: number) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sh-text-on-dark/80 hover:text-white transition-colors"
                  >
                    {resource.title}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="https://formed.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sh-text-on-dark/80 hover:text-white transition-colors"
                  >
                    FORMED
                  </a>
                  <a
                    href="https://bible.usccb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sh-text-on-dark/80 hover:text-white transition-colors"
                  >
                    Daily Readings
                  </a>
                  <Link
                    href="/bulletins"
                    className="text-sm text-sh-text-on-dark/80 hover:text-white transition-colors"
                  >
                    Bulletins
                  </Link>
                  <Link
                    href="/prayer-requests"
                    className="text-sm text-sh-text-on-dark/80 hover:text-white transition-colors"
                  >
                    Prayer Requests
                  </Link>
                </>
              )}
            </nav>

            {/* Social Media Links */}
            {globalSettings?.socialMedia && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-sh-text-on-dark/90 mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {globalSettings.socialMedia.facebook && (
                    <a
                      href={globalSettings.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {globalSettings.socialMedia.instagram && (
                    <a
                      href={globalSettings.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {globalSettings.socialMedia.youtube && (
                    <a
                      href={globalSettings.socialMedia.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                  )}
                  {globalSettings.socialMedia.twitter && (
                    <a
                      href={globalSettings.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Twitter/X"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sh-text-on-dark/60">
            <p>
              © {currentYear} {globalSettings?.parishName || 'Saint Helen Catholic Church'}. All
              rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
