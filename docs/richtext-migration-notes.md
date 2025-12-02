# Rich Text Editor Migration: Lexical to Quill

## Migration Status: COMPLETE

This document describes the migration from Payload's default Lexical rich text editor to ReactQuill (Quill-based editor) for enhanced formatting options including text color and background color.

---

## Summary

### What Changed

1. **Collections** now use Quill-based editors for rich text fields:
   - `staff.bio` → `quillRichText`
   - `events.description` → `quillRichText`
   - `ministries.description` → `quillRichText`
   - `ministries.howToJoin` → `quillRichText`
   - `lifelines.description` → `quillRichText`
   - `podcasts.description` → `quillRichText`
   - `media.caption` → `quillSimple`
   - `posts.content` → `quillFull`

2. **Blocks** updated to use Quill editors:
   - `FormEmbed.description` → `quillSimple`
   - `VideoEmbed.description` → `quillSimple`
   - `FAQAccordion.answer` → `quillRichText`
   - `MediaList.subtitle` → `quillSubtitle`
   - `StoryHighlight.body` → `quillRichText`
   - `Testimonial.quote` → `quillSimple`

3. **Blocks still using Lexical** (for embedded blocks feature):
   - RichTextSection, Columns, Content, CTAFullWidth, CallToAction
   - CardGrid, BulletinList, PostList, EventList
   - HeroBasic, HeroWithStats, BentoGrid
   - ArchiveBlock, Form

### Data Storage Format

- **Before**: Lexical JSON (complex nested structure)
- **After**: HTML strings (simple, portable)

---

## Components Created

### Admin Field Components

Located in `src/admin/fields/`:

| Component | Description | Use Case |
|-----------|-------------|----------|
| `QuillRichTextField` | Standard editor with H1-H4 headers, colors, lists | General content |
| `QuillSubtitleField` | Minimal editor without headings | Subtitles, short descriptions |
| `QuillSimpleField` | Basic formatting only (bold, italic, lists, links) | Captions, simple text |
| `QuillFullField` | Full-featured editor with all options | Blog posts, long-form content |

### Configuration

The Quill toolbar configuration is centralized in `src/admin/fields/quillConfig.ts`:

```typescript
// Brand colors available in color picker
const brandColors = [
  '#20336B', // Brand (Primary Blue)
  '#585858', // Muted (Gray)
  '#E0A63A', // Accent (Gold)
  '#000000', // Black
  '#FFFFFF', // White
]
```

### Field Helpers

Located in `src/fields/quillRichText.ts`:

```typescript
import { quillRichText, quillSubtitle, quillSimple, quillFull } from '@/fields/quillRichText'

// Example usage
quillRichText({
  name: 'body',
  label: 'Content',
  required: true,
  admin: {
    description: 'Main content area',
  },
})
```

---

## Frontend Rendering

### RichText Component

The `src/components/RichText/index.tsx` component automatically handles both formats:

```typescript
// Accepts both HTML strings and Lexical JSON
<RichText data={content} enableProse={true} />
```

- **HTML strings**: Rendered with `dangerouslySetInnerHTML`
- **Lexical JSON**: Converted to JSX using Payload's converters

### Alternative: RichTextHtml Component

For HTML-only content, use `src/components/RichTextHtml/index.tsx`:

```typescript
import { RichTextHtml } from '@/components/RichTextHtml'

<RichTextHtml content={htmlString} className="my-styles" />
```

---

## Migration Script

### Running the Migration

A database migration is available to convert existing Lexical JSON to HTML:

```bash
# Run the migration
pnpm payload migrate
```

The migration script is located at:
`src/migrations/20251202_230000_migrate_richtext_to_quill_html.ts`

### What the Migration Does

1. Reads Lexical JSON from each rich text field
2. Converts to HTML using `@payloadcms/richtext-lexical/html`
3. Updates the database column type from JSONB to TEXT
4. Preserves all existing content

### Affected Tables

**Collections:**
- staff (bio)
- events (description)
- ministries (description, how_to_join)
- life_lines (description)
- podcasts (description)
- media (caption)
- posts (content)

**Version tables also migrated:**
- _staff_v, _events_v, _ministries_v, etc.

---

## Quill Editor Features

### Standard Toolbar (quillRichText)
- Headers (H1-H4)
- Bold, Italic, Underline
- Text color and background color
- Ordered and unordered lists
- Blockquote
- Links
- Clear formatting

### Subtitle Toolbar (quillSubtitle)
- Bold, Italic, Underline
- Text color and background color
- Links
- Clear formatting

### Simple Toolbar (quillSimple)
- Bold, Italic, Underline
- Ordered and unordered lists
- Links
- Clear formatting

### Full Toolbar (quillFull)
- Headers (H1-H6)
- Bold, Italic, Underline, Strikethrough
- Text color and background color
- Ordered and unordered lists
- Indentation
- Blockquote
- Text alignment
- Links
- Clear formatting

---

## Notes and Limitations

### What's NOT Migrated

The following blocks/collections still use Lexical because they require embedded block functionality (Banner, MediaBlock, Code blocks):

- RichTextSection
- Columns
- Content
- CTAFullWidth
- CallToAction
- CardGrid
- ArchiveBlock
- Form
- Hero blocks (HeroBasic, HeroWithStats)
- List blocks (BulletinList, PostList, EventList, BentoGrid)

### Custom CTA Buttons

The custom CTA button feature in Lexical rich text is **not available** in Quill fields. If CTA buttons are needed, use:
1. Separate link/button fields outside the rich text
2. Add buttons as regular links and style with CSS

### Internal Links

Quill stores links as standard HTML `<a>` tags. Internal links should use relative paths (e.g., `/about`) rather than relationship-based links.

---

## Rollback Procedure

If needed, to revert to Lexical:

1. Restore field configs to use `type: 'richText'`
2. Run the migration down function (note: HTML content will be wrapped in JSON)
3. Manually recreate Lexical JSON structure for complex content

**Warning**: The migration is effectively one-way. HTML cannot be perfectly converted back to Lexical JSON structure.

---

## Verification Checklist

After migration:

- [ ] Admin dashboard loads without errors
- [ ] Quill editors appear for migrated fields
- [ ] Existing content is visible in editors
- [ ] New content can be saved
- [ ] Frontend renders content correctly
- [ ] Text colors display properly
- [ ] Links work correctly
- [ ] Lists format correctly
