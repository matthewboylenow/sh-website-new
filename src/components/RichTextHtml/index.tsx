import React from 'react'
import { cn } from '@/utilities/ui'

interface RichTextHtmlProps {
  content: string | null | undefined
  className?: string
  /**
   * Whether to enable prose styling (typography plugin)
   * @default true
   */
  prose?: boolean
}

/**
 * RichTextHtml - Renders HTML rich text content
 *
 * This component safely renders HTML content from Quill editor fields.
 * It applies Tailwind's typography (prose) classes by default for proper styling.
 *
 * @example
 * <RichTextHtml content={post.body} className="text-gray-800" />
 */
export const RichTextHtml: React.FC<RichTextHtmlProps> = ({
  content,
  className,
  prose = true,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        prose && 'prose prose-slate max-w-none',
        // Override prose colors for brand consistency
        prose && 'prose-headings:text-brand prose-a:text-brand prose-strong:text-inherit',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default RichTextHtml
