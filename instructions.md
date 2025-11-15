# Saint Helen Website Rebuild – Master Spec for Claude Code

_Last updated: 2025-11-13_

This document is the **single source of truth** for rebuilding **sainthelen.org** using **Next.js + Payload CMS**. It is written for an AI coding assistant (Claude Code) to follow step-by-step.

It contains:

1. Instructions for how Claude should work with this project.
2. Brand style & design tokens.
3. Homepage layout & IA approach.
4. Content model & reusable blocks.
5. “What are you looking for?” assistant widget.
6. Editor experience (rich text, CTA buttons, alignment, Unsplash).
7. Implementation roadmap and checklist.

---

## 0. Instructions for Claude Code

### 0.1 Project Stack

- Framework: **Next.js 15** (App Router)
- CMS: **Payload CMS**
- IDE: **GitHub Codespaces**
- Repo: Will be created from Payload starter template.
- Deployment: Likely Vercel + Payload deployment (exact infra can be decided later).

### 0.2 Files Claude Should Create

On first use in this repo, Claude should:

1. **Create this file**, if not already present:  
   `docs/saint-helen-spec.md`  
   (That’s this document.)

2. **Create a build log / checklist file**:  
   `docs/build-log.md`  

   Initial content of `docs/build-log.md` should:

   - Summarize:
     - Date started
     - Which Payload starter was used
     - High-level stack choices (TypeScript, Tailwind, etc.)
   - Contain a **checklist** of tasks, drawn from Section 7 of this spec.
   - Have distinct sections:
     - “Completed”
     - “In Progress”
     - “Planned / Not Started”
   - Be updated **every time** Claude makes significant changes:
     - Add bullet points describing what was done in this session.
     - Check off items as they are completed.
     - Optionally add a brief “Next suggestions” note.

3. As work proceeds, Claude should:
   - Respect this spec as the **source of truth**.
   - Only deviate if necessary for technical constraints, and explain that change in `docs/build-log.md`.
   - Keep changes modular and documented, so multiple sessions can pick up where the last left off.

---

## 1. Brand Style & Design

### 1.1 Personality & Voice

Saint Helen’s brand should feel:

- **Warm & welcoming** – “We’re glad you’re here,” especially if someone hasn’t been to church in years.
- **Plain-language & low-jargon** – Avoid heavy church-speak on visitor-facing pages.
- **Modern & hopeful** – Clean, uncluttered, confident design that still feels pastoral, not corporate.
- **Actionable** – Pages should naturally invite clear, gentle next steps (attend, connect, ask for help, serve, give).

Writing guidelines:

- Short sentences and paragraphs.
- Talk to **one person**.
- Prefer everyday language over theological jargon on top-level pages.
- Examples:
  - “If you’re feeling anxious or worn out, you don’t have to carry it alone.”
  - “Life is better with people in your corner. Find a LifeLine group that fits your life.”

### 1.2 Color System

**Core brand colors:**

- Primary brand blue  
  - Token: `--sh-color-primary`  
  - Hex: `#20336B`  
  - Use: primary buttons, links, key accents, nav emphasis.

- Muted white  
  - Token: `--sh-color-bg-light`  
  - Hex: `#F4F4F4`  
  - Use: page background, light cards, light sections. Avoid pure `#FFFFFF` for large areas.

- Matte black (suggested)  
  - Token: `--sh-color-bg-dark` / `--sh-color-text-main`  
  - Hex (suggested): `#111111`  
  - Use: main body text and dark backgrounds. Avoid pure black.

**Secondary palette (suggested):**

- Accent gold  
  - `--sh-color-accent-gold`: `#E0A63A`  
  - Use: tags, subtle highlights, special campaigns.

- Accent teal  
  - `--sh-color-accent-teal`: `#2C9FAF`  
  - Use: LifeLines / community highlights, subtle accent details.

- Soft navy tint  
  - `--sh-color-primary-soft`: `#2B4585` (tint of primary)  
  - Use: hover states, soft backgrounds behind content.

- Grays:  
  - `--sh-color-gray-100`: `#E5E5E5`  
  - `--sh-color-gray-300`: `#C4C4C4`  
  - `--sh-color-gray-600`: `#585858`  
  - `--sh-color-gray-800`: `#1F1F1F`

**Semantic tokens:**

- Backgrounds:
  - `--sh-color-bg`: `#F4F4F4`
  - `--sh-color-bg-alt`: `#E5E5E5`
  - `--sh-color-surface`: `#FFFFFF` (card surfaces, never giant full-page pure white)

- Text:
  - `--sh-color-text-main`: `#111111`
  - `--sh-color-text-muted`: `#585858`
  - `--sh-color-text-on-primary`: `#FFFFFF`
  - `--sh-color-text-on-dark`: `#F4F4F4`

- Borders:
  - `--sh-color-border-subtle`: `#E0E0E0`
  - `--sh-color-border-strong`: `#C4C4C4`

- Status:
  - `--sh-color-success`: `#2E7D32`
  - `--sh-color-warning`: `#F9A825`
  - `--sh-color-danger`: `#C62828`

**CTA background variants (used across blocks and buttons):**

- `brand` → primary blue background, light text.
- `light` → muted white / surface background, dark text.
- `dark` → matte black background, light text.

### 1.3 Typography

Font tokens:

- `--sh-font-heading`: primary heading font (modern sans serif)
- `--sh-font-body`: body text font (clear sans serif)
- `--sh-font-monospace`: for code/config snippets in docs

Weights:

- Regular (400), Medium (500), Semibold (600), Bold (700)

Type scale (base 16px):

- Hero / display: `clamp(2.5rem, 4vw, 3.5rem)`
- H1: `clamp(2.1rem, 3.2vw, 2.75rem)`
- H2: `clamp(1.8rem, 2.7vw, 2.1rem)`
- H3: `1.5rem`
- H4: `1.25rem`
- Body: `1rem`–`1.0625rem`
- Small: `0.875rem`

Line-height:

- Headings: `1.1–1.25`
- Body: `1.5–1.7`

### 1.4 Layout & Spacing

- Max content width: `1200–1280px`
- Horizontal padding:
  - Mobile: `1.5rem`
  - Tablet: `2rem`
  - Desktop: `3–4rem` (within max width)
- Vertical spacing:
  - Section padding: `3rem` (mobile) – `5rem` (desktop)
  - Inter-block gap: `1.5–2rem`

---

## 2. Homepage Layout & Experience

The homepage must serve two audiences:

1. People exploring or “church shopping”.
2. Existing parishioners who need quick access to info.

We solve this via:

- Clear hero with “Plan a Visit” + Mass times.
- A “What are you looking for?” assistant widget.
- A “New here / Part of the community” split.
- A bento grid of core journeys.

### 2.1 Global Top Bar

Optional bar above navigation for:

- Weather alerts
- Special Mass schedules
- Major campaigns (e.g., Jubilee)

Content will be controlled via a global settings/alert model in Payload.

### 2.2 Navigation

Desktop top nav (labels can be refined):

- I’m New
- Worship
- LifeLines
- Kids & Teens
- Serve & Support
- Media & Stories
- Events

Right side:

- Give (primary button)
- Search icon (global search / link into assistant widget)

Mobile nav:

- Quick-link buttons:
  - Plan a Visit
  - Mass Times
  - Watch Online
  - Give
- Collapsible groups mirroring desktop sections.

### 2.3 Hero Section

Hero content:

- Title: “We’re glad you’re here.”
- Subtitle: brief, 1–2 sentences welcoming people.
- Primary CTA: **Plan Your Visit**
- Secondary CTAs:
  - **This Sunday at Saint Helen**
  - **Attend Online**

Mass times card:

- Shows weekend and daily Mass times.
- Link to full schedule page.

Hero should be implemented with a `HeroBasic` (or similar) block that supports alignment, CTA buttons, and background variant.

### 2.4 Assistant Widget (“Hi, what are you looking for?”)

Placed directly below hero on homepage.

- Text:
  - Heading: “Hi, what are you looking for?”
  - Subtitle: “Try ‘Mass times’, ‘help with anxiety’, ‘kids program’, or ‘I want to volunteer’.”
- Search input + suggestion chips.
- See Section 5 for full spec.

### 2.5 “I’m New / I’m Part of the Community” Split

Two cards:

1. New to Saint Helen
   - Subtitle: “Start here if you’re checking things out.”
   - Links: Plan a Visit, What to Expect, Kids & Teens, LifeLines Overview.

2. Already Part of the Community
   - Subtitle: “Quick links if Saint Helen is already home.”
   - Links: This Sunday, Find a LifeLine, Serve & Volunteer, Online Giving.

Built using a `Columns` or `CardGrid` block.

### 2.6 Core Journeys Bento Grid

A bento grid of 5–6 tiles:

- LifeLines & Small Groups
- Kids & Teens
- Care & Counseling
- Serving & Volunteering
- Programs & Activities
- Messages, Blog & Podcasts

Each tile: title, 1–2 sentence description, CTA.

Built via `BentoGrid` block.

### 2.7 Featured Campaign / Highlight

One or two featured campaigns:

- e.g., Jubilee 2025, Advent, major series, Service Auction.

Built via a `CTAFullWidth` or dedicated `FeaturedCampaign` block pulling from a `campaigns` collection (optional).

### 2.8 “This Sunday & Upcoming Events”

Two-column layout:

1. This Sunday at Saint Helen:
   - Series name
   - Any special elements (children’s Liturgy, special music, etc.)
   - Link to weekend overview/events.

2. Upcoming Events:
   - List of 3–5 events from `events` collection.

Built via `EventList` block(s).

### 2.9 Stories & Media

Highlight:

- Recent blog posts / pastor’s column.
- Recent podcast episode or message.

Built with `PostList` and/or `MediaList`.

### 2.10 Bulletins & Quick Links

A small section:

- Latest bulletin (download link).
- Quick links to:
  - All bulletins
  - Watch on YouTube
  - Daily readings
  - Online resources (Formed, etc.)

### 2.11 Footer

Footer should include:

- Address, phone, office hours.
- Mass times summary.
- Core resources:
  - Word Among Us, Daily Readings, Formed, Prayer Requests, policies/forms.
- Social icons.

---

## 3. Shared Block Appearance Options

Every major block should share a common “appearance” group:

Fields:

- `backgroundVariant`:
  - `light` → muted white/surface
  - `brand` → primary blue
  - `dark` → matte black
  - `transparent` → inherits parent
- `alignment`:
  - `left` | `center` | `right`
- `fullWidth` (boolean)
- Optional:
  - `paddingTop`, `paddingBottom` (`default`, `none`, `tight`, `loose`)

Claude should implement this as a reusable field group (e.g., `BlockAppearance`) in Payload and a TypeScript type used by all block React components.

---

## 4. Content Model & Blocks

### 4.1 Collections (High-Level)

We expect, at minimum, these Payload collections:

- `pages`
- `events`
- `posts` (blog / pastor’s column)
- `media` or `podcasts`
- `bulletins`
- `ministries`
- `lifelines`
- `staff`
- `globalSettings` (Mass times, address, social links, alerts)
- `searchItems` (for the assistant widget; see Section 5)

### 4.2 Pages Collection

Fields:

- `title`
- `slug`
- `seo` (title, meta description, OG image)
- `hero` (optional: references a hero block or inline hero config)
- `layout` (array of blocks)
- `audience` (`visitor`, `parishioner`, `both`)
- `tags` (string[])

### 4.3 Blocks

Define the following Payload blocks (names are illustrative; exact keys can vary but the structure must match):

**Hero blocks:**

- `HeroBasic`:
  - `eyebrow` (optional)
  - `title`
  - `subtitle` (rich text)
  - `backgroundImage`
  - `buttons` (label, url, variant)
  - `appearance` (shared)

- `HeroWithStats`:
  - Same as `HeroBasic`
  - `stats` (label, value)

**Text blocks:**

- `RichTextSection`:
  - `title` (optional)
  - `body` (rich text – see editor capabilities below)
  - `alignment` (optional override)
  - `appearance`

- `Columns`:
  - `title` (optional)
  - `layout` (`equal`, `oneThirdLeft`, `oneThirdRight`)
  - `columns`:
    - Each has `title` (optional) + `body` (rich text)
  - `appearance`

**Cards & grids:**

- `CardGrid`:
  - `title`
  - `subtitle` (rich text)
  - `sourceType` (`manual` | `collection`)
  - For `manual`:
    - `cards` (title, body, image, url, badge)
  - For `collection`:
    - `collectionSlug`
    - `filterByTags` (string[])
    - `limit`
    - `orderBy`
  - `layout` (columns, cardStyle)
  - `appearance`

- `BentoGrid`:
  - `title`
  - `subtitle` (optional)
  - `items` (3–6; each with title, description, icon/image, size, url, tag)
  - `appearance`

**Lists & feeds:**

- `EventList`:
  - `title`
  - `subtitle`
  - `mode` (`upcoming` | `dateRange`)
  - Dates if `dateRange`
  - `categoryFilter` (optional)
  - `limit`
  - `showViewAllLink`
  - `viewAllUrl`
  - `appearance`

- `PostList`:
  - `title`
  - `subtitle`
  - `categoryFilter`
  - `limit`
  - `viewAllUrl`
  - `appearance`

- `MediaList`:
  - Similar to `PostList` but for media/podcasts.

- `BulletinList`:
  - `title`
  - `subtitle`
  - `limit`
  - `viewAllUrl`
  - `appearance`

**CTA & banner:**

- `CTAFullWidth`:
  - `eyebrow` (optional)
  - `title`
  - `body` (rich text)
  - `buttons` (label, url, variant)
  - `backgroundVariant`
  - `alignment`

- `AlertBanner`:
  - `message`
  - `type` (`info`, `warning`, `urgent`)
  - `linkLabel`, `linkUrl` (optional)
  - `dismissible` (boolean)

**Testimony & story:**

- `Testimonial`:
  - `quote` (rich text)
  - `name`
  - `role`
  - `image` (optional)
  - `appearance`

- `StoryHighlight`:
  - `title`
  - `body` (rich text)
  - `image`
  - `url`
  - `tag` (optional)
  - `appearance`

**FAQ & accordion:**

- `FAQAccordion`:
  - `title`
  - `items` (question, answer rich text, tags)
  - `appearance`

**Embeds:**

- `FormEmbed`:
  - `title`
  - `description` (rich text)
  - `embedType` (`html` | `url`)
  - `embedCode` or `formUrl`
  - `widthMode` (`full`, `centered`)
  - `appearance`

- `VideoEmbed`:
  - `title`
  - `embedUrl`
  - `posterImage` (optional)
  - `description` (optional)
  - `appearance`

**Layout utilities:**

- `Spacer`:
  - `size` (`small`, `medium`, `large`)

- `Divider`:
  - `style` (`line`, `space`, `decorative`)
  - `appearance`

---

## 5. Assistant Widget – “What Are You Looking For?”

The assistant widget is a core homepage feature. It acts as a smart concierge.

### 5.1 Goals

- Let users type free-form queries.
- Map those queries to intents & topics.
- Return grouped, curated results from the CMS.
- Use only real site content (no hallucinated links).

### 5.2 `searchItems` Collection

**Purpose:** a denormalized index of items the widget can surface.

Fields:

- `title` (string)
- `url` (string)
- `kind` (select: `page`, `ministry`, `event`, `article`, `resource`, `external`)
- `audience` (multi-select: `visitor`, `parishioner`, `both`)
- `topics` (string[]; e.g., `volunteer`, `mental_health`, `kids`, `teens`, `family`, `marriage`, `grief`, `support_groups`, `sacraments`, `giving`, `lifelines`, `events`, `online_mass`)
- `shortDescription` (text)
- `priority` (number; 0–10)
- `sourceCollection` (string)
- `sourceId` (relationship or ID)

Population:

- Use Payload hooks on `pages`, `events`, `posts`, `ministries`, `lifelines`, `resources`, etc.
- On create/update/delete:
  - Create/update/remove a corresponding `searchItems` entry.
- Editors can override `title`, `shortDescription`, `audience`, `priority`.

### 5.3 Intent Detection (Rule-Based)

Create a module (e.g., `lib/intents.ts`) with:

- `IntentId` union (e.g., `mass_times`, `online_mass`, `volunteer`, `mental_health`, `kids`, `teens`, `family`, `marriage`, `grief`, `support_groups`, `lifelines`, `events`, `giving`, `contact`).
- For each intent:
  - `id`
  - `patterns` (string array)
  - `topics` (string array)

Process:

1. Lowercase query.
2. For each intent:
   - If any pattern is found in query → mark that intent.
3. Collect `topics` from all matched intents.
4. Determine `audienceHint`:
   - Contains “I’m new”, “new here”, “first time” → `visitor`
   - Contains “envelope”, “online giving login” → `parishioner`
   - Else: `both`

### 5.4 `/api/search` Endpoint

Endpoint:

- POST `/api/search`
- Request body:
  - `query: string`
  - `audienceHint?: 'visitor' | 'parishioner' | 'both'`

Processing:

1. Run intent detection → `inferredIntents`, `inferredTopics`, `audienceHint`.
2. Fetch candidate `searchItems` filtered by `audience`.
3. Use fuzzy search (e.g., Fuse.js) on:
   - `title`
   - `shortDescription`
   - `topics`
4. Combine:
   - Fuzzy score
   - Topic overlap
   - `priority`
5. Group into categories:

Groups:

- `quickAnswers`
- `careAndSupport`
- `communityAndConnection`
- `learnAndGrow`
- `attendingAndSacraments`
- `givingAndServing`
- `otherResults`

Example mapping:

- care & support → topics: `mental_health`, `counseling`, `grief`, `support_groups`
- community & connection → `lifelines`, `community`, `social`
- learn & grow → `adult_formation`, `articles`, `teaching`
- attending & sacraments → `mass_times`, `online_mass`, `sacraments`, `confession`
- giving & serving → `giving`, `volunteer`, `serve`

Response shape:

- `query`
- `inferredIntents`
- `inferredTopics`
- `groups` with arrays of items.

### 5.5 UI: `NeedHelpWidget` Component

Placed on homepage under hero.

- Title: “Hi, what are you looking for?”
- Subtitle: “Try ‘Mass times’, ‘help with anxiety’, ‘kids program’, or ‘I want to volunteer’.”
- Input box (with enter-to-search) and suggestion chips.
- On load:
  - Chips like “Mass times”, “I’m new here”, “Kids & teens”, “I want to volunteer”, “Help with anxiety”.
- On search:
  - Call `/api/search`.
  - Show loading state.
  - Render results grouped.

Result presentation:

- `Quick Answers` as pill cards at top.
- Group headings (Care & Support, Community & Connection, etc.) with up to 3–5 cards each.
- `Other Results` as a simple list.

States:

- Loading: spinner + text.
- No results: user-friendly message + contact link.

Styling:

- Card over `--sh-color-bg`.
- Background normally `light` but should support variants.
- Clear keyboard focus and semantics for accessibility.

### 5.6 Phase 2 (Optional): AI Classification

Later, add `/api/assistant`:

- Input: `{ query: string }`
- Output: `{ audience, intents, topics, rewrite? }`

`/api/search` can call this to refine topic/audience inference but must **still** only use `searchItems` for results.

---

## 6. Editor Experience – Rich Text, CTA Buttons, Alignment & Unsplash

### 6.1 Rich Text Capabilities

All `richText` fields should support:

- Bold, italic, underline
- Bulleted lists
- Numbered lists
- Blockquotes
- H2/H3/H4 headings (as appropriate)
- Links (internal & external)

### 6.2 Inline CTA Buttons in Rich Text

Define a custom inline element in the rich text editor: **CTA Button**.

Properties:

- `label`
- `url`
- `style`:
  - `primary` (brand background, light text)
  - `light` (light background, brand text)
  - `dark` (dark background, light text)

Editor flow:

- Toolbar button: “Insert CTA Button”.
- Modal collects label, URL, style.
- In editor, appears as a small styled element.

Front-end:

- Render as a `<a>` or `<button>` with corresponding classes and color tokens.

### 6.3 Block-Level Alignment & Background

As described in Section 3:

- Each block has:
  - `alignment` (left, center, right)
  - `backgroundVariant` (light, brand, dark, transparent)
  - `fullWidth`
  - Optional padding overrides

These are configured in Payload via a shared field group and passed to components.

### 6.4 Unsplash Integration

Goal: From any image field, editors can search Unsplash.

Behavior:

- Image field offers:
  - Upload
  - or “Search Unsplash”
- Clicking “Search Unsplash” opens modal:
  - Search input + grid of results via Unsplash API.
- On select:
  - Preferred: download and store image in local media library.
  - Store Unsplash metadata (id, url, photographer name/profile).

Media fields should store:

- `unsplashId`
- `unsplashUrl`
- `unsplashPhotographerName`
- `unsplashPhotographerProfileUrl`

Front-end should be able to display attribution if desired.

Configuration:

- Use env var like `UNSPLASH_ACCESS_KEY`.
- Implement a custom Payload field component and a server-side proxy endpoint for Unsplash API calls.

### 6.5 Editor-Friendly Defaults

- Rich text defaults:
  - Left alignment.
  - Light background.
- Block defaults:
  - `alignment: left`
  - `backgroundVariant: light`
- CTA button defaults:
  - `style: primary` for main actions.

---

## 7. Implementation Roadmap & Checklist (For `docs/build-log.md`)

Claude should use this section to build the checklist in `docs/build-log.md` and update it over time.

Recommended top-level phases:

1. **Project Setup**
   - [ ] Initialize repo from Payload starter (Next.js 15, TS).
   - [ ] Configure base theme (colors, typography) using tokens from this spec.
   - [ ] Add `docs/saint-helen-spec.md` and `docs/build-log.md`.

2. **Core CMS Structure**
   - [ ] Create `pages` collection with `layout` blocks.
   - [ ] Create `events`, `posts`, `media/podcasts`, `bulletins`, `ministries`, `lifelines`, `staff`, `globalSettings`.
   - [ ] Implement `BlockAppearance` shared field group.
   - [ ] Implement main block types (Hero, RichTextSection, Columns, CardGrid, BentoGrid, EventList, PostList, MediaList, BulletinList, CTAFullWidth, AlertBanner, FAQAccordion, Testimonial, StoryHighlight, FormEmbed, VideoEmbed, Spacer, Divider).

3. **Frontend Components**
   - [ ] Create React components for each block (using `BlockAppearance` props).
   - [ ] Wire `pages` to render from `layout` array using a component map.
   - [ ] Build base layout (header, footer) matching homepage/nav/footer concepts.

4. **Assistant Widget**
   - [ ] Create `searchItems` collection.
   - [ ] Add hooks to populate `searchItems` from source collections.
   - [ ] Implement intent detection module.
   - [ ] Implement `/api/search` endpoint with fuzzy search and grouping.
   - [ ] Build `NeedHelpWidget` UI on homepage.

5. **Editor Experience**
   - [ ] Configure rich text fields with bold/italic/underline/lists/headings/links.
   - [ ] Implement inline CTA Button element in rich text.
   - [ ] Implement Unsplash integration (field UI + server proxy).
   - [ ] Confirm editors can control alignment and background variants for blocks.

6. **Homepage Assembly**
   - [ ] Build homepage page document in Payload.
   - [ ] Configure hero, assistant widget, “New vs Community”, bento grid, featured campaign, This Sunday & events, stories & media, bulletins & quick links.
   - [ ] Style homepage to align with brand and layout specs.

7. **Polish & QA**
   - [ ] Accessibility checks (contrast, keyboard navigation).
   - [ ] Performance basics (image optimization, lazy loading).
   - [ ] Navigation tests (mobile & desktop).
   - [ ] Content editor test pass: ensure workflows are simple.

Claude should mirror this list into `docs/build-log.md`, track progress, and add notes under each session indicating what changed and what’s next.

---
