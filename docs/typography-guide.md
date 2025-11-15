# Typography System Guide

## Overview

The website now uses a custom typography system with granular control over fonts throughout the site.

## Brand Fonts

- **Heading Font**: Libre Baskerville (serif) - Used for all headings (h1-h4)
- **Body Font**: Libre Franklin (sans-serif) - Used for body text and paragraphs
- **Mono Font**: Geist Mono - Used for code blocks

## Global Typography

### Automatic Application

By default, all headings automatically use Libre Baskerville (bold weight), and all body text uses Libre Franklin. This is configured in:

- `/src/app/(frontend)/layout.tsx` - Font loading
- `/tailwind.config.mjs` - Font family tokens and typography plugin
- `/src/app/(frontend)/globals.css` - Base styles

### Tailwind Classes

You can use these semantic font classes anywhere:

```tsx
<h1 className="font-heading">Uses Libre Baskerville</h1>
<p className="font-body">Uses Libre Franklin</p>
<code className="font-mono">Uses Geist Mono</code>
```

## Block-Level Typography Control

### Available Blocks with Typography Control

The following blocks now have a "Typography" field group:

- **HeroBasic** - Control hero text fonts and alignment
- **RichTextSection** - Override fonts for content sections

### Typography Field Options

When editing a block, you'll see a "Typography" section with:

1. **Font Family**
   - Default (Inherits from context)
   - Heading Font (Libre Baskerville)
   - Body Font (Libre Franklin)
   - Mono Font (Geist Mono)

2. **Text Alignment**
   - Left
   - Center
   - Right

### Example Use Cases

#### Hero with Serif Body Text
Set Font Family to "Heading Font" to make all hero text use Libre Baskerville, including body paragraphs.

#### Content Section with Sans-Serif Headings
Set Font Family to "Body Font" to override headings to use Libre Franklin instead of the default serif font.

## Rich Text Editor Font Control

Within the Lexical rich text editor, you can override fonts inline:

1. Select text in the editor
2. Click the font family dropdown in the toolbar
3. Choose from:
   - Default (inherits)
   - Heading (Libre Baskerville)
   - Body (Libre Franklin)
   - Mono (Geist Mono)

This is useful for:
- Emphasizing specific phrases with a different font
- Creating visual variety in long-form content
- Styling pull quotes or callouts

## Adding Typography Control to More Blocks

To add typography controls to additional blocks:

1. Import the typography field:
   ```typescript
   import { typography } from '@/fields/typography'
   ```

2. Add to the block's fields array:
   ```typescript
   fields: [
     // ... other fields
     typography({
       fontFamily: true,
       alignment: true,
       textSize: false, // optional
     }),
   ]
   ```

3. In the block component, import and use:
   ```typescript
   import { typographyToClasses } from '@/utilities/typographyToClasses'

   export const MyBlock = ({ typography, ...props }) => {
     return (
       <div className={typographyToClasses(typography)}>
         {/* content */}
       </div>
     )
   }
   ```

## Technical Reference

### Files

- `/src/fields/typography.ts` - Reusable typography field definition
- `/src/utilities/typographyToClasses.ts` - Converts CMS data to Tailwind classes
- `/src/fields/defaultLexical.ts` - Rich text editor font options
- `/tailwind.config.mjs` - Font family configuration
- `/src/app/(frontend)/layout.tsx` - Font loading

### CSS Variables

- `--font-heading` - Libre Baskerville
- `--font-body` - Libre Franklin
- `--font-mono` - Geist Mono

### Font Weights Available

**Libre Baskerville**: 400 (regular), 700 (bold)
**Libre Franklin**: 300, 400, 500, 600, 700
**Geist Mono**: Variable font (100-900)
