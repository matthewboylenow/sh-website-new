/**
 * Rich Text Configuration for Saint Helen Website
 *
 * This file provides shared configuration and helpers for Payload CMS rich text fields.
 * All rich text content uses the Lexical editor with a standardized feature set.
 *
 * @module lib/richText
 */

/**
 * Standard Rich Text Features
 * ---------------------------
 * The default rich text editor (defined in src/fields/defaultLexical.ts) includes:
 *
 * 1. **Basic Formatting**
 *    - Bold, Italic, Underline
 *
 * 2. **Lists**
 *    - Bulleted lists (UnorderedListFeature)
 *    - Numbered lists (OrderedListFeature)
 *
 * 3. **Blockquotes**
 *    - Quote formatting with BlockquoteFeature
 *
 * 4. **Links**
 *    - Internal links to Pages and Posts
 *    - External links with URL validation
 *
 * 5. **Text Color** (Controlled Palette)
 *    - Brand (Primary Blue)
 *    - Muted (Gray)
 *    - Accent (Gold)
 *
 * Headings (H2-H4) are added on a per-field basis where needed,
 * as different content areas require different heading levels.
 */

/**
 * Text Color Mapping
 * ------------------
 * Colors selected in the admin UI are mapped to CSS classes in the frontend:
 *
 * Admin Selection → Stored Value → Frontend Class → CSS Variable
 * --------------------------------------------------------
 * Brand           → #20336B      → text-brand    → var(--sh-color-primary)
 * Muted           → #585858      → text-muted    → var(--sh-color-text-muted)
 * Accent          → #E0A63A      → text-accent   → var(--sh-color-accent-gold)
 *
 * These classes are defined in src/app/(frontend)/globals.css
 */

export const TEXT_COLOR_MAP = {
  '#20336B': 'text-brand',
  '#585858': 'text-muted',
  '#E0A63A': 'text-accent',
} as const

/**
 * Helper to get CSS class for a text color hex value.
 * Used by the frontend renderer (src/components/RichText/textColorConverter.tsx).
 *
 * @param hex - Hex color value from Lexical editor
 * @returns CSS class name or null if not mapped
 */
export function getTextColorClass(hex: string): string | null {
  const normalized = hex.toLowerCase()
  return TEXT_COLOR_MAP[normalized as keyof typeof TEXT_COLOR_MAP] || null
}

/**
 * Adding Headings to Rich Text Fields
 * ------------------------------------
 * To add heading support to a specific rich text field:
 *
 * ```typescript
 * import { HeadingFeature } from '@payloadcms/richtext-lexical'
 * import { lexicalEditor } from '@payloadcms/richtext-lexical'
 *
 * {
 *   name: 'body',
 *   type: 'richText',
 *   editor: lexicalEditor({
 *     features: ({ rootFeatures }) => [
 *       ...rootFeatures,
 *       HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
 *     ],
 *   }),
 * }
 * ```
 */

/**
 * Custom CTA Button Feature
 * --------------------------
 * The rich text editor includes a custom CTA Button plugin that allows
 * editors to insert inline call-to-action buttons within content.
 *
 * Features:
 * - Configurable button text and href
 * - Multiple appearances: primary, secondary, outline, ghost
 * - Optional "open in new tab" setting
 *
 * Implementation:
 * - Admin UI: src/fields/lexical/features/CTAButton/
 * - Frontend: src/components/RichText/CTAButton.tsx
 */

/**
 * Frontend Rendering
 * ------------------
 * Rich text content is rendered using the RichText component:
 *
 * ```tsx
 * import RichText from '@/components/RichText'
 *
 * <RichText
 *   data={content}
 *   enableGutter={true}   // Adds container padding
 *   enableProse={true}    // Applies prose typography styles
 * />
 * ```
 *
 * The component handles:
 * - Text color mapping to CSS classes
 * - Link rendering (internal doc links, external links)
 * - CTA button rendering
 * - Block rendering (banner, media, code, etc.)
 * - Prose styling with Tailwind typography
 */

/**
 * Restoring Previous Configuration
 * ---------------------------------
 * The previous comprehensive typography features (text size, font family, extended colors)
 * have been backed up to src/fields/defaultLexical.backup.ts.
 *
 * To restore:
 * 1. Replace src/fields/defaultLexical.ts with defaultLexical.backup.ts
 * 2. Update src/components/RichText/index.tsx to import TypographyJSXConverters
 *    instead of TextColorJSXConverter
 * 3. Remove the custom text color CSS classes from globals.css if desired
 */
