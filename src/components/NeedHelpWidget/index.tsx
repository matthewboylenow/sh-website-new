'use client'

import React, { useState, useEffect } from 'react'
import { Search, X, HelpCircle, ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  kind: string
  audience: string[]
  topics: string[]
  priority: number
}

interface SearchResponse {
  query: string
  detectedTopics: string[]
  detectedAudience: string[]
  results: SearchResult[]
  count: number
}

// Quick suggestions for common queries
const QUICK_SUGGESTIONS = [
  { label: 'Mass Times', query: 'mass times schedule' },
  { label: 'Watch Online', query: 'watch online mass livestream' },
  { label: 'Get Involved', query: 'volunteer serve ministry' },
  { label: 'First Visit', query: 'new visitor first time' },
  { label: 'LifeLines', query: 'lifeline small group community' },
  { label: 'Sacraments', query: 'baptism confession communion' },
]

export const NeedHelpWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [detectedInfo, setDetectedInfo] = useState<{
    topics: string[]
    audience: string[]
  } | null>(null)

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.length < 3) {
      setResults([])
      setDetectedInfo(null)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsSearching(true)
      try {
        const response = await fetch(
          `/api/assistant?q=${encodeURIComponent(query)}`,
        )
        const data: SearchResponse = await response.json()
        setResults(data.results)
        setDetectedInfo({
          topics: data.detectedTopics,
          audience: data.detectedAudience,
        })
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleQuickSuggestion = (suggestionQuery: string) => {
    setQuery(suggestionQuery)
  }

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    setResults([])
    setDetectedInfo(null)
  }

  const getKindLabel = (kind: string) => {
    const labels: Record<string, string> = {
      page: 'Page',
      ministry: 'Ministry',
      event: 'Event',
      article: 'Article',
      lifeline: 'LifeLine Group',
      resource: 'Resource',
      external: 'External',
    }
    return labels[kind] || kind
  }

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'flex items-center gap-2 px-6 py-3 rounded-full',
          'bg-sh-primary text-white shadow-lg',
          'hover:bg-sh-primary-soft transition-all duration-300',
          'hover:shadow-xl hover:scale-105',
          'font-medium text-sm',
        )}
        aria-label="Need help? Search here"
      >
        <HelpCircle className="h-5 w-5" />
        <span className="hidden sm:inline">What are you looking for?</span>
        <span className="sm:hidden">Help</span>
      </button>

      {/* Dialog Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* Dialog */}
      {isOpen && (
        <div className="fixed inset-x-4 top-20 z-50 mx-auto max-w-3xl md:inset-x-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-sh-border-subtle">
              <Search className="h-5 w-5 text-sh-text-muted flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="flex-1 text-lg outline-none placeholder:text-sh-text-muted"
                autoFocus
              />
              {isSearching && <Loader2 className="h-5 w-5 animate-spin text-sh-primary" />}
              <button
                type="button"
                onClick={handleClose}
                className="p-1 rounded-lg hover:bg-sh-surface transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-sh-text-muted" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1">
              {/* Quick Suggestions (shown when no query) */}
              {!query && (
                <div className="p-6">
                  <p className="text-sm font-medium text-sh-text-muted mb-4">
                    Popular Searches
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {QUICK_SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion.label}
                        type="button"
                        onClick={() => handleQuickSuggestion(suggestion.query)}
                        className="px-4 py-3 text-left rounded-lg bg-sh-surface hover:bg-sh-primary hover:text-white transition-colors text-sm font-medium"
                      >
                        {suggestion.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Detected Info */}
              {detectedInfo && (detectedInfo.topics.length > 0 || detectedInfo.audience.length > 0) && (
                <div className="px-6 pt-4 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {detectedInfo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-sh-accent-teal/10 text-sh-accent-teal text-xs font-medium"
                      >
                        {topic.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {detectedInfo.audience.filter(a => a !== 'both').map((aud) => (
                      <span
                        key={aud}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-sh-gold/10 text-sh-gold text-xs font-medium"
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {query && query.length >= 3 && (
                <div className="p-6 pt-4">
                  {results.length > 0 ? (
                    <>
                      <p className="text-sm text-sh-text-muted mb-4">
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                      </p>
                      <div className="space-y-3">
                        {results.map((result) => (
                          <Link
                            key={result.id}
                            href={result.url}
                            onClick={handleClose}
                            className="block p-4 rounded-lg border border-sh-border-subtle hover:border-sh-border-strong hover:shadow-md transition-all group"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sh-surface text-sh-text-muted">
                                    {getKindLabel(result.kind)}
                                  </span>
                                </div>
                                <h3 className="font-semibold text-sh-text-main group-hover:text-sh-primary transition-colors mb-1">
                                  {result.title}
                                </h3>
                                <p className="text-sm text-sh-text-muted line-clamp-2">
                                  {result.description}
                                </p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-sh-text-muted group-hover:text-sh-primary transition-colors flex-shrink-0" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : !isSearching ? (
                    <div className="text-center py-8">
                      <p className="text-sh-text-muted">
                        No results found for &quot;{query}&quot;
                      </p>
                      <p className="text-sm text-sh-text-muted mt-2">
                        Try different keywords or browse our quick suggestions above
                      </p>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Help Text */}
              {query && query.length < 3 && (
                <div className="p-6 text-center text-sm text-sh-text-muted">
                  Type at least 3 characters to search
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-sh-border-subtle bg-sh-surface/50">
              <p className="text-xs text-sh-text-muted text-center">
                Can&apos;t find what you&apos;re looking for?{' '}
                <Link
                  href="/contact"
                  className="text-sh-primary hover:underline font-medium"
                  onClick={handleClose}
                >
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
