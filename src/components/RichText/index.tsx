import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedLexicalNode } from 'lexical'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CTAButton } from './CTAButton'
import type { CTAButtonAppearance } from './CTAButton'
import { TextColorJSXConverter } from './textColorConverter'
import { cn } from '@/utilities/ui'

// Banner block type for Lexical rich text (if still using Lexical in some places)
type BannerBlockProps = {
  style?: 'info' | 'warning' | 'success' | 'error' | null
  content?: DefaultTypedEditorState | null
}

// Simple Banner component for Lexical blocks
const BannerBlock: React.FC<{ className?: string } & BannerBlockProps> = ({
  className,
  style = 'info',
  content,
}) => {
  if (!content) return null
  const styleClasses: Record<string, string> = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  }
  return (
    <div className={cn('border rounded-lg p-4 my-4', styleClasses[style || 'info'], className)}>
      <ConvertRichText data={content} />
    </div>
  )
}

type SerializedCTAButtonNode = SerializedLexicalNode & {
  type: 'ctaButton'
  label: string
  href: string
  appearance: CTAButtonAppearance
  openInNewTab?: boolean
}

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>
  | SerializedCTAButtonNode

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...TextColorJSXConverter, // Custom text color converter with CSS classes
  ctaButton: ({ node }) => {
    if (node.type === 'ctaButton') {
      return (
        <CTAButton
          label={node.label}
          href={node.href}
          appearance={node.appearance}
          openInNewTab={node.openInNewTab}
        />
      )
    }
    return null
  },
  blocks: {
    banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) => (
      <BannerBlock className="col-start-2 mb-4" {...node.fields} />
    ),
    mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
      <CodeBlock className="col-start-2" {...node.fields} />
    ),
    cta: ({ node }: { node: SerializedBlockNode<CTABlockProps> }) => (
      <CallToActionBlock {...node.fields} />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState | string | null | undefined
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

/**
 * RichText Component
 *
 * Renders rich text content from either:
 * - HTML strings (from Quill editor)
 * - Lexical JSON (legacy format)
 *
 * Automatically detects the format and renders appropriately.
 */
export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, data, ...rest } = props

  // Handle null/undefined
  if (!data) {
    return null
  }

  // If data is a string, render as HTML
  if (typeof data === 'string') {
    return (
      <div
        className={cn(
          'payload-richtext',
          {
            container: enableGutter,
            'max-w-none': !enableGutter,
            'mx-auto prose md:prose-md dark:prose-invert': enableProse,
          },
          className,
        )}
        dangerouslySetInnerHTML={{ __html: data }}
        {...rest}
      />
    )
  }

  // Otherwise, render as Lexical JSON
  return (
    <ConvertRichText
      converters={jsxConverters}
      data={data}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}

// Named export for convenience
export { RichText }
