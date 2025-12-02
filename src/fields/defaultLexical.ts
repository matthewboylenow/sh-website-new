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
  AlignFeature,
  HorizontalRuleFeature,
  IndentFeature,
  StrikethroughFeature,
  InlineCodeFeature,
  ChecklistFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import {
  TextColorFeature,
} from 'payload-lexical-typography'
import { CTAButtonFeature } from '@/fields/lexical/features/CTAButton/feature.server'

/**
 * Enhanced richText configuration for Saint Helen content areas.
 *
 * Features:
 * - Basic formatting: Bold, Italic, Underline, Strikethrough, Inline Code
 * - Text alignment: Left, Center, Right, Justify
 * - Lists: Bulleted, numbered, and checklists
 * - Indentation control
 * - Blockquotes
 * - Horizontal rules (dividers)
 * - Links: Internal (pages, posts) & External
 * - Text Color & Background Color: Full palette with color picker
 * - CTA Buttons: Inline call-to-action buttons
 * - Toolbars: Fixed toolbar + inline formatting toolbar
 *
 * This configuration applies globally to ALL rich text fields.
 * For fields requiring headings, use one of the heading variants below.
 */
export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    // Text formatting
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),
    // Alignment
    AlignFeature(),
    // Lists
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    // Indentation
    IndentFeature(),
    // Block elements
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    // Links
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
    // Text Color with brand palette + color picker for custom colors
    TextColorFeature({
      colors: [
        '#20336B', // Brand (Primary Blue)
        '#585858', // Muted (Gray)
        '#E0A63A', // Accent (Gold)
        '#2B4585', // Primary soft
        '#2C9FAF', // Teal
        '#111111', // Near black
        '#FFFFFF', // White
        '#000000', // Black
        '#2E7D32', // Success green
        '#C62828', // Danger red
      ],
      colorPicker: true, // Allow custom colors
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
