1. Purpose of this playbook

This repo is a Next.js 15 + Payload CMS site for Saint Helen with:

A full page builder (blocks + patterns)

Custom collections (Events, LifeLines, Bulletins, Ministries, etc.)

A lot of UX polish (visibility, animation, typography)

The goal of this playbook is to tell Claude exactly how to work safely:

What files and docs to read first

How to add/edit collections, blocks, and fields without breaking Payload admin

How to debug blank screens in the admin

How to implement “Breakdance-style” functionality in a controlled way

What next features to work on and where the danger zones are

If you’re Claude reading this: follow the checklists. Don’t “freestyle” schema changes.

2. Tech stack & key directories

Stack

Next.js App Router (TypeScript, type: module)

Payload CMS (self-hosted inside Next)

Vercel Postgres (@payloadcms/db-vercel-postgres)

Vercel Blob for Media

Rich text: @payloadcms/richtext-lexical

Styling: Tailwind-style utility classes in globals.css plus semantic components

Package manager: pnpm

Key entry points

src/payload.config.ts
Main Payload configuration. Imports collections, globals, plugins, db adapter, and storage.

src/app/(frontend)/[slug]/page.tsx
Page renderer that:

Fetches a page by slug via Payload

Uses RenderHero and RenderBlocks to output blocks

Handles SSG/ISR and preview

src/app/(payload)/layout.tsx + src/payload.scss
Admin theming / layout for the Payload UI.

Content model

src/collections/:

Pages/ – core page builder collection

Patterns.ts – reusable block layouts (Breakdance template equivalent)

Events.ts, Bulletins.ts, LifeLines.ts, Ministries.ts, Posts/, Podcasts.ts, Staff.ts, etc.

Media.ts, Categories.ts, Users.ts

src/globals/GlobalSettings.ts – parish-wide settings (branding, contact info, etc.)

Blocks

src/blocks/* – each block lives in its own folder, with:

config.ts – Payload block config

Component.tsx or Component.client.tsx – React renderer

Some have an index.ts re-export

Examples:

HeroBasic, HeroWithStats

RichTextSection, Columns, Content

CTAFullWidth, CallToAction, BentoGrid, CardGrid

EventList, PostList, BulletinList, MediaList

Testimonial, StoryHighlight, FAQAccordion

CustomCode, Form, FormEmbed, VideoEmbed

Spacer, Divider, AlertBanner

InsertPattern (WIP)

Shared fields & helpers

src/fields/*

blockAppearance.ts

typography.ts

visibilitySettings.ts

animationSettings.ts

decorativePattern.ts

src/components/AnimatedSection.tsx – wrapper for animation

src/utilities/* – helpers like generatePreviewPath, generateMeta, etc.

Docs to read first

When starting any new task, Claude should skim:

docs/saint-helen-spec.md – high-level vision of site

docs/phase-7-page-builder-ux-polish.md

docs/phase-7-incomplete-features.md

docs/homepage-setup.md

docs/typography-guide.md

3. Safe workflow for schema / block changes

Admin blank screens almost always come from bad schema or admin config. Follow this flow any time you add or modify a collection or block.

3.1 Before changing schema

Find the right collection/block file

Collections: src/collections/*.ts or src/collections/Pages/index.ts, etc.

Blocks: src/blocks/BlockName/config.ts (+ component in same folder).

Search for existing usage

Search for the block slug or collection slug to avoid creating duplicates.

Example: for HeroBasic, search 'heroBasic' across the repo.

Check fields helpers

If you need typography, colors, visibility, or animation, reuse:

typography(...)

blockAppearance(...)

visibilitySettings(...)

animationSettings(...)

decorativePattern(...)

3.2 When adding a new block

Checklist:

Create a new folder:
src/blocks/MyNewBlock/

Add Payload block config in config.ts:

Export a Block object with:

slug

labels

fields

If this block should get Breakdance-style controls, include:

typography(...)

blockAppearance({ ... })

visibilitySettings(...)

animationSettings(...) as needed

Add React component in Component.tsx or Component.client.tsx:

Props should match the Block fields.

Wrap content in AnimatedSection if you want animation:

import AnimatedSection from '@/components/AnimatedSection'

export function MyNewBlockComponent(props: PropsFromBlock) {
  return (
    <AnimatedSection {...props.animationSettings}>
      {/* your layout */}
    </AnimatedSection>
  )
}


Wire into the Page & Pattern collections

Import the config into:

src/collections/Pages/index.ts

src/collections/Patterns.ts (if it should be pattern-able)

import { MyNewBlock } from '../../blocks/MyNewBlock/config'


Add to the blocks: [] array in the layout / patternLayout field.

Wire into frontend block renderer

RenderBlocks (typically in src/components/RenderBlocks.tsx or similar) must know how to render this slug.

Add a case mapping block.blockType (or blockType) to your component.

Run types & build (locally or in Codespace)

pnpm generate:types
pnpm lint
pnpm build    # or at least 'pnpm dev' and hit a page that uses the block


Smoke-test the admin

Open Payload admin → go to Pages → edit a test page → add your block.

Ensure:

No blank screen

Fields show up correctly

Saving the document works

3.3 When editing an existing collection

Avoid breaking required fields accidentally

If you make a previously required field optional or remove it:

Consider existing documents that might have null/missing values.

In general, prefer marking fields optional before deleting them.

Watch relationTo slugs

If you change a collection slug, update any fields that refer to it via:

relationTo: 'oldSlug'

Mistmatched relation slugs are a common source of admin runtime errors.

Keep admin config simple

admin.components overrides (custom views, field components) are powerful but fragile.

If you see a blank screen:

Temporarily comment out admin.components overrides and restart dev to isolate the issue.

4. Debugging “blank screen” issues in Payload admin

If clicking Pages, Patterns, or another collection shows a blank view:

Open the browser console (F12)

Look for red errors like:

"Cannot read properties of undefined (reading 'fields')"

"ReferenceError: X is not defined"

Module load errors.

Common culprits in this project

A block is imported in Pages or Patterns but:

The file path is wrong, OR

The Block export name changed.

A field helper is called incorrectly:

E.g. blockAppearance() missing required props.

A custom admin component is imported in payload.config.ts or a collection but the file path or default export is wrong.

A new block is referenced in the blocks: [] array but missing from RenderBlocks.

Step-by-step isolation

Comment out recent changes in:

src/collections/Pages/index.ts

src/collections/Patterns.ts

Any new block imports

Restart dev (pnpm dev).

Add imports/blocks back one-by-one to find the offender.

5. Breakdance-style functionality in this repo

The goal is to give editors a powerful page builder without turning it into chaos.

5.1 Section-level styling (already mostly there)

Most “major” blocks (Hero, RichTextSection, Columns, CTA, CardGrid, etc.) already use:

typography(...)

blockAppearance(...)

decorativePattern(...)

visibilitySettings(...)

animationSettings(...)

These provide:

Control over max width, alignment, spacing

Text + background variants

Device visibility & audience visibility

Decorative overlays/accents

Animation presets

When adding new blocks, always reuse these utilities rather than inventing new ad-hoc styling fields.

5.2 Rich text: bold, headings, links, inline tools

RichTextSection uses @payloadcms/richtext-lexical:

editor: lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})


This already yields:

Basic inline formatting (bold/italic, etc.)

Headings (H2–H4)

Inline toolbar with links support

If you want to push this closer to Breakdance:

Add or enable more lexical features:

Underline, code, maybe quote blocks

List support if not already included in rootFeatures

Optionally add a simple color pick feature for inline text, but be careful:

Prefer section-level colors via blockAppearance rather than granular rainbow text.

5.3 Visibility & audience (Breakdance “Conditions” equivalent)

visibilitySettings gives you:

Device visibility (mobile/tablet/desktop)

Audience targeting (visitors/parishioners)

Optional seasonal/date range

Frontend work needed (from Phase 7 docs):

In RenderBlocks, before rendering each block:

Check the visibility settings.

Skip blocks that are “hidden” for the current context.

Add hidden / md:hidden / lg:hidden classes as needed.

Audience:

Once you have auth context, you can:

Hide some blocks from non-logged-in users.

Show “member-only” CTAs for logged-in parishioners.

5.4 Animation (Breakdance-like entrance animations)

You already have:

src/fields/animationSettings.ts

src/components/AnimatedSection.tsx

To make animation usable:

Ensure all content blocks that should animate include an animationSettings group field.

In their React components:

Wrap main content with AnimatedSection and pass through the saved settings.

Avoid animating “heavy” sections too aggressively (large lists, etc.) to keep performance acceptable.

6. Roadmap: what to implement next (and where to be careful)

Here’s a concrete outline of next steps that fit this repo and your Saint Helen goals.

Phase 1 – Finish Page Builder UX polish (Phase 7)

Visibility Settings Integration

Files:

src/fields/visibilitySettings.ts

Block configs that already import it

RenderBlocks (and potentially RenderHero)

Work:

Add a helper function in a utilities file (e.g. src/utilities/shouldRenderBlock.ts) that:

Takes the block’s visibilitySettings

Takes runtime context (device, audience, date)

Returns true/false

Use this in RenderBlocks to conditionally skip blocks.

Watch out for:

Server vs client device detection (SSR can’t “know” window width). Start with CSS-only device hiding: render the block but add responsive hidden classes.

Animation Settings Integration

Files:

src/fields/animationSettings.ts

src/components/AnimatedSection.tsx

Each block’s component

Work:

For each major block, wrap the outermost section in AnimatedSection and pass animationSettings.

Watch out:

Don’t use AnimatedSection in server-only components that use useInView or client hooks; mark such components as client ("use client") or keep AnimatedSection in a client wrapper.

InsertPattern Block

Files:

src/blocks/InsertPattern/*

src/collections/Patterns.ts

src/collections/Pages/index.ts

Work:

In the admin, InsertPattern should:

Let an editor pick a Pattern.

Clone the pattern’s patternLayout blocks into the current page’s layout.

This might involve a custom admin field component that uses Payload’s form context.

Watch out:

Infinite recursion: pattern using InsertPattern pointing to a pattern that uses InsertPattern.

Enforce a simple rule: patterns cannot contain InsertPattern blocks.

Editor Help / “How this page works” sidebar

Files:

Any EditorHelp component you see in the repo

src/collections/Pages/index.ts (admin config)

Work:

Surface a small inline helper in the Pages admin that explains:

How blocks work

How patterns work

How visibility & animation are used

Phase 2 – LifeLines Hub (Breakdance-style mini app)

Goal: A front-end directory for LifeLines.

LifeLines list page

Files:

Create src/app/(frontend)/lifelines/page.tsx

Use payload.find against the lifelines collection.

Features:

Filter controls for:

Day of week

Type (social, faith, activity)

Accepting new members?

Card grid of LifeLines:

Title, short description, meeting details, tags

“I’m Interested” button → either a FormEmbed block or link to Touchpoint/Typeform.

LifeLine detail view

Either:

Use a Page with dedicated blocks; or

Add a [slug] route under /lifelines and a slug field in the collection.

Watch out:

Don’t duplicate data too much between LifeLines and Pages. Prefer one source of truth per group.

Phase 3 – “What are you looking for?” helper

Goal: Guided navigation for visitors.

New block: WhatAreYouLookingFor

Files:

src/blocks/WhatAreYouLookingFor/config.ts

src/blocks/WhatAreYouLookingFor/Component.tsx

Wire into Pages & Patterns.

Fields:

Repeatable list of:

Icon (optional)

Label

Description (optional)

Link (relTo: pages / custom URL)

UI:

Render as a simple grid of big clickable tiles.

Insert into Homepage pattern

Add this block to the home page (or home pattern) near the top.

Phase 4 – Search improvements

Search page

Files:

src/app/(frontend)/search/page.tsx

A small server route or utility for multi-collection search.

Behavior:

Accept q query param.

Search across:

Pages

Events

LifeLines

Posts

Bulletins

Group results by type with small badges.

Header search trigger

Files:

src/Header/Component.client.tsx

Add:

Search icon that opens an overlay search input.

Watch out:

This file is client-side; keep search logic simple (just redirect to /search?q=term)

Phase 5 – “New Here?” funnel & Site Alerts

Visitor / “New Here” Page

Use existing blocks:

HeroBasic / HeroWithStats

RichTextSection

CardGrid / BentoGrid

FormEmbed for “Plan Your Visit”

Mostly configuration in the CMS; minimal code.

Site Alert system (Global)

Either:

Use the existing AlertBanner block at top of pages, or

Add a Global: SiteAlerts with:

Message

Severity

Start/end date

“Show on all pages” flag

Render in main layout so parish staff can turn it on/off in seconds.

7. General rules for Claude in this repo

Always read the docs under docs/ before making large changes.

Reuse field helpers (typography, blockAppearance, visibilitySettings, animationSettings) instead of inventing new style fields.

Keep admin stable:

When in doubt, avoid custom admin.components overrides.

Don’t break existing slugs for collections or blocks unless you also:

Migrate data (if needed), and

Update every reference to that slug.

After structural changes:

Run pnpm generate:types

Run pnpm lint

Hit the admin UI and a few pages in the browser.

If future-Claude follows this playbook, it should be able to extend this site in big ways (more Breakdance-like builder behavior, LifeLines hub, smart navigation, etc.) without you spending three nights chasing a blank admin screen.