# Next Steps - Saint Helen Website

**Last Updated:** 2025-12-02
**Status:** Phase 1-2 Complete ✅ | Phase 3-4 Pending

---

## ✅ COMPLETED - Phase 1: Page Builder Core

### 1. Visibility Settings - COMPLETE ✅
- Created `src/utilities/shouldRenderBlock.ts`
- Implemented audience targeting (visitor/parishioner)
- Implemented seasonal display (date range filtering)
- Implemented device visibility CSS classes
- Integrated into `RenderBlocks.tsx`

### 2. Animation Settings - COMPLETE ✅
- `AnimatedSection` component already existed
- Wrapped 8 priority blocks with animation support:
  - HeroBasic, HeroWithStats, RichTextSection, CTAFullWidth
  - CardGrid, BentoGrid, Testimonial, StoryHighlight

### 3. Block Styling Consistency - COMPLETE ✅
- Created `src/components/SectionWrapper.tsx`
- Centralized appearance, animation, and visibility handling
- All blocks use consistent blockAppearanceToClasses pattern

### 4. Guardrails Against Blank Admin Screens
- Following playbook: `pnpm generate:types` → `pnpm lint` → `pnpm build`
- All blocks have Component.tsx and are registered in RenderBlocks

---

## ✅ COMPLETED - Phase 2: Editor UX & Patterns

### 1. InsertPattern - COMPLETE ✅
- Created `src/components/admin/InsertPatternButton.tsx`
- Updated InsertPattern config with UI field
- Added InsertPattern to Pages layout blocks
- Provides step-by-step instructions for pattern insertion
- *Note: Manual workflow - automatic insertion deferred*

### 2. Editor Help & Guidance - COMPLETE ✅
- `src/components/admin/EditorHelpOverlay.tsx` (already existed)
- Created `src/components/admin/AdminProviders.tsx`
- Wired into Payload via admin.components.providers in `payload.config.ts`
- Shows ? button for page builder documentation

### 3. Visibility/Animation on All Blocks - COMPLETE ✅
- Added to 17 blocks total (see phase-7-incomplete-features.md for full list)

---

## 🔄 PENDING - Phase 3: Site Features Using the Builder

### LifeLines Hub
- Hub page with list of all LifeLines
- Detail pages for each LifeLine
- Uses existing LifeLines collection

### "What Are You Looking For?" Helper
- Consider adding as a block or page component
- Uses SearchItems collection

### New Here / Visit Funnel
- Series of pages using existing blocks
- Consider pattern for common layouts

### Search Page
- /search page using SearchItems collection
- Or direct queries against collections

---

## 🔄 PENDING - Phase 4: Polish & "Breakdance Energy"

### Optional Enhancements (Low Priority)
1. **Block Navigator** - Sidebar showing visual tree of page blocks
2. **Block Header Quick Actions** - Breakdance-style block cards
3. **Automatic Pattern Insertion** - Auto-insert via form state manipulation
4. **More Animation Presets** - Expanded animation library
5. **Pattern Library Expansion** - Pre-built common sections

---

## 📋 Database Safety Checklist

Before ANY schema change, follow the playbook:

```bash
# After schema changes
pnpm generate:types
pnpm lint
pnpm build

# Vercel auto-runs migrations via ci script:
# payload migrate && pnpm build
```

---

## 🚀 Deployment Ready

The site is ready for deployment with all Phase 1-2 features complete.

### What Will Be Migrated
New fields added to blocks:
- `visibility` group (showOnMobile, showOnTablet, showOnDesktop, audience, startDate, endDate)
- `animation` group (preset, delay, duration, animateOnce)

### Backward Compatibility
✅ All changes are additive. Existing pages continue to work.

---

## 📚 Files Created This Session

### New Files
- `src/utilities/shouldRenderBlock.ts` - Visibility filtering utility
- `src/components/SectionWrapper.tsx` - Centralized block wrapper
- `src/components/admin/AdminProviders.tsx` - Admin provider wrapper
- `src/components/admin/InsertPatternButton.tsx` - Pattern insertion instructions

### Modified Files
- `src/blocks/RenderBlocks.tsx` - Added visibility integration
- `src/payload.config.ts` - Added admin providers
- `src/collections/Pages/index.ts` - Added InsertPattern block, description
- 17 block configs - Added visibility/animation settings
- 8 block components - Added AnimatedSection wrapper

---

## Best Practices Reminder

1. **Opinionated blocks > endless freedom** - Small set of highly opinionated layouts
2. **Use Patterns as templates** - Capture common block sequences
3. **Guardrails for color & typography** - Use theme tokens, not hex codes
4. **Sensible defaults** - Blocks should look good out of the box
5. **Document for staff** - See EditorHelpOverlay for guidance

---

**Session Completed:** 2025-12-02
