# Project Status & Next Steps

**Last Updated:** 2025-12-02

---

## Current Status

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1-4 | ✅ Complete | Core CMS, blocks, assistant widget |
| Phase 5 | ⏳ Deferred | Inline CTA buttons, Unsplash (optional) |
| Phase 6 | ✅ Complete | Homepage setup guide ready |
| Phase 7 | ✅ Complete | Visibility, animation, patterns, editor UX |

---

## ✅ Phase 7 Completed Features

### Visibility Settings (Schema + Frontend)
- `src/utilities/shouldRenderBlock.ts` - Filters blocks by audience/date
- `getDeviceVisibilityClasses()` - CSS classes for device visibility
- Integrated into `RenderBlocks.tsx`
- Added to 17 content blocks

### Animation Settings (Schema + Frontend)
- `src/components/AnimatedSection.tsx` - Framer Motion wrapper
- Priority blocks wrapped: HeroBasic, HeroWithStats, RichTextSection, CTAFullWidth, CardGrid, BentoGrid, Testimonial, StoryHighlight
- Added to 17 content blocks

### Editor UX
- `src/components/SectionWrapper.tsx` - Centralized block wrapper
- `src/components/admin/AdminProviders.tsx` - Admin provider wrapper
- `src/components/admin/InsertPatternButton.tsx` - Pattern insertion UI
- EditorHelpOverlay wired into admin

### Patterns Collection
- Reusable page layouts collection
- InsertPattern block added to Pages

---

## 🔄 Future Phases (Not Critical for Launch)

### Phase 3: Site Features
- LifeLines hub page
- "What are you looking for?" helper
- New Here / Visit funnel
- Search page

### Phase 4: Polish
- Block Navigator (sidebar tree view)
- Block Header Quick Actions
- Automatic pattern insertion
- More animation presets

---

## Blocks with Visibility & Animation

All major content blocks have these settings:
- HeroBasic, HeroWithStats
- RichTextSection, CTAFullWidth
- CardGrid, BentoGrid
- Testimonial, StoryHighlight
- Columns, EventList, PostList
- BulletinList, MediaList
- FAQAccordion, VideoEmbed, FormEmbed
- AlertBanner

---

## Database Safety (from Playbook)

Before ANY schema change:
```bash
pnpm generate:types
pnpm lint
pnpm build
```

Vercel auto-runs migrations: `payload migrate && pnpm build`

---

## Documentation Index

| File | Purpose |
|------|---------|
| `build-log.md` | Implementation session log |
| `claude-playbook.md` | Database safety rules |
| `saint-helen-spec.md` | Project specification |
| `typography-guide.md` | Typography reference |
| `homepage-setup.md` | Homepage building guide |
| `testing-checklist.md` | QA checklist |
| `vercel-deployment-guide.md` | Deployment instructions |
| `next-steps.md` | This file - status & roadmap |
