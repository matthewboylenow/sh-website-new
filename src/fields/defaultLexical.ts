import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import {
  TextColorFeature,
} from 'payload-lexical-typography'
import { CTAButtonFeature } from '@/fields/lexical/features/CTAButton/feature.server'

/**
 * Enhanced richText configuration for Saint Helen content areas.
 *
 * Standard Features:
 * - Basic formatting: Bold, Italic, Underline
 * - Lists: Bulleted and numbered
 * - Blockquotes
 * - Links: Internal (pages, posts) & External
 * - Text Color: Controlled palette (Brand, Muted, Accent)
 * - CTA Buttons: Inline call-to-action buttons
 * - Toolbars: Fixed toolbar + inline formatting toolbar
 *
 * For fields requiring headings, use one of the heading variants below.
 * Previous comprehensive typography features backed up to defaultLexical.backup.ts
 */
export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    BlockquoteFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    // Simplified Text Color with controlled brand palette
    // Maps to CSS classes in frontend: text-brand, text-muted, text-accent
    TextColorFeature({
      colors: [
        '#20336B', // Brand (Primary Blue) → text-brand
        '#585858', // Muted (Gray) → text-muted
        '#E0A63A', // Accent (Gold) → text-accent
      ],
      colorPicker: false, // Disable custom colors for consistency
    }),
    // CTA Button feature - allows inline call-to-action buttons
    CTAButtonFeature(),
    // Toolbars
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

/**
 * Lexical config with H2-H4 headings (for general content sections)
 * Use for: RichTextSection body, general page content
 */
export const defaultLexicalWithHeadings = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({
      enabledHeadingSizes: ['h2', 'h3', 'h4'],
    }),
  ],
})

/**
 * Lexical config with H3-H4 headings (for nested content like columns)
 * Use for: Columns, nested sections within blocks
 */
export const defaultLexicalWithSubheadings = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({
      enabledHeadingSizes: ['h3', 'h4'],
    }),
  ],
})

/**
 * Lexical config with all heading levels H1-H4 (for article content)
 * Use for: Blog posts, long-form content, articles
 */
export const defaultLexicalWithAllHeadings = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
    }),
  ],
})
