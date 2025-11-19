# Phase 7: Incomplete Features & Implementation Status

**Date:** 2025-11-19
**Status:** ⚠️ Partially Implemented

---

## Overview

This document tracks Phase 7 Page Builder UX Polish features that are defined in the CMS schema but require additional custom admin components or frontend integration to be fully functional.

---

## ✅ Fully Functional Features

### 1. Block Appearance Refinement
- **Status:** ✅ Complete
- **Description:** Appearance fields are organized into collapsible groups (Section Layout / Background & Style)
- **Location:** All major blocks using `blockAppearance()` field group
- **Works out of the box:** Yes

### 2. Visibility Settings Field Group
- **Status:** ✅ Schema Complete, ⚠️ Frontend Integration Needed
- **Description:** Device visibility and audience targeting fields added to blocks
- **Blocks with visibility settings:**
  - HeroBasic
  - RichTextSection
  - CTAFullWidth
  - CardGrid
  - Testimonial
  - *(Other major blocks can follow same pattern)*

**Frontend TODO:**
- Implement filtering logic in page rendering to respect visibility settings
- Add CSS-based responsive hiding for device visibility
- Implement audience targeting (requires authentication system)

### 3. Animation Settings Field Group
- **Status:** ✅ Schema Complete, ⚠️ Frontend Integration Needed
- **Description:** Entrance animation controls added to blocks
- **Blocks with animation settings:**
  - HeroBasic
  - RichTextSection
  - CTAFullWidth
  - CardGrid
  - Testimonial
  - *(Other major blocks can follow same pattern)*

**Frontend TODO:**
- Wrap block components with `<AnimatedSection>` wrapper
- AnimatedSection component already created in `src/components/AnimatedSection.tsx`
- Test animations in production

### 4. Patterns Collection
- **Status:** ✅ Complete
- **Description:** Reusable page layouts can be saved in the Patterns collection
- **Location:** `src/collections/Patterns.ts`
- **Registered in config:** Yes
- **Works out of the box:** Yes (editors can create patterns)

### 5. Welcome Card Width Control (HeroBasic)
- **Status:** ✅ Complete
- **Description:** Editors can control the width of the welcome card
- **Location:** HeroBasic block config
- **Works out of the box:** Yes

### 6. Enhanced Hero Design
- **Status:** ✅ Complete
- **Description:** Video backgrounds, frosted glass welcome card, animated mission statement
- **Location:** HeroBasic block
- **Works out of the box:** Yes

---

## ⚠️ Partially Implemented Features

### 1. InsertPattern Block
- **Status:** ⚠️ Schema Complete, ❌ Admin Component Missing
- **Description:** Block that allows inserting saved patterns into pages
- **What's working:**
  - Block config created in `src/blocks/InsertPattern/config.ts`
  - Pattern relationship field functional
  - Frontend component returns null (editor-only block) ✅
- **What's missing:**
  - **Custom Admin Component:** Button to trigger pattern insertion
  - **Pattern Insertion Logic:** Fetch pattern data, clone blocks, replace InsertPattern block
  - **Form State Manipulation:** Update parent layout array with pattern's blocks

**Implementation Steps:**
1. Create `src/components/admin/InsertPatternButton.tsx`
2. Use Payload's `useFormFields` hook to access parent form state
3. Implement "Insert Pattern" button that:
   - Fetches selected pattern data via API
   - Clones pattern's layout blocks
   - Replaces InsertPattern block with pattern blocks
   - Updates form state with `setValue`
4. Wire component into InsertPattern block config

**Workaround:**
Editors can manually copy blocks from patterns into pages (no automatic insertion).

---

## ❌ Not Yet Implemented Features

### 1. Block Navigator
- **Status:** ❌ Component Not Created
- **Description:** Sidebar component showing visual tree of page blocks
- **Desired Features:**
  - Vertical list showing all blocks with icons and names
  - Block type labels and custom `blockName` display
  - Move up/down controls for reordering
  - Click-to-scroll navigation to blocks in form
  - Empty state handling

**Implementation Steps:**
1. Create `src/components/admin/BlockNavigator.tsx`
2. Use Payload's admin component API to access page form state
3. Render block tree with reordering controls
4. Wire into Pages collection via `admin.components.views.Edit.Default.Nav`

**Payload API Required:**
- Custom admin components
- Form state access hooks
- Block reordering API

**Complexity:** High (requires deep Payload admin API knowledge)

---

### 2. Editor Help Overlay
- **Status:** ✅ Component Created, ❌ Not Wired to Admin
- **Description:** In-CMS documentation modal for editors
- **What's working:**
  - Component created in `src/components/admin/EditorHelpOverlay.tsx`
  - Content covers all Phase 7 features
  - Modal UI with floating "?" button
- **What's missing:**
  - **Admin Integration:** Need to wire component into Pages collection admin header

**Implementation Steps:**
1. Update `src/collections/Pages/index.ts` with admin components configuration:
   ```typescript
   admin: {
     components: {
       afterList: [EditorHelpOverlay],
       // Or as custom view button
     },
   }
   ```
2. Test in Payload admin UI

**Complexity:** Low (just wiring up existing component)

---

### 3. Block Header Quick Actions
- **Status:** ❌ Not Implemented
- **Description:** Make each block feel like a card with quick controls (Breakdance-style)
- **Desired Features:**
  - Block name as inline editable field in header
  - Block type label visible
  - Duplicate button (clone block)
  - Collapse/Expand toggle

**Implementation Steps:**
1. Research Payload's block-level admin customization API
2. Create custom Field components for blocks
3. Implement duplicate/clone functionality
4. Add collapse/expand controls

**Payload API Required:**
- `admin.components` for blocks
- Custom Field components
- Block duplication API

**Complexity:** Very High (requires custom Payload admin components)

---

## 🔄 Frontend Integration TODOs

### Visibility Settings Frontend Logic

**File:** `app/(frontend)/[...slug]/page.tsx` (or page rendering logic)

**Implementation:**
```typescript
// Example pseudocode
const visibleBlocks = page.layout.filter(block => {
  // Check device visibility
  const showOnDevice = checkDeviceVisibility(block.visibility)

  // Check audience targeting
  const showToAudience = checkAudienceTargeting(block.visibility, userSession)

  // Check date range (if seasonalDisplay enabled)
  const inDateRange = checkDateRange(block.visibility)

  return showOnDevice && showToAudience && inDateRange
})
```

**Complexity:** Medium

---

### Animation Settings Frontend Integration

**Files:** All block components (`src/blocks/*/Component.tsx`)

**Implementation:**
```typescript
// Example in src/blocks/RichTextSection/Component.tsx
import { AnimatedSection } from '@/components/AnimatedSection'

export const RichTextSectionBlock = ({ animation, ...props }) => {
  return (
    <AnimatedSection animation={animation}>
      <section className="...">
        {/* Existing block content */}
      </section>
    </AnimatedSection>
  )
}
```

**Complexity:** Low (repetitive but straightforward)

---

## 📊 Implementation Priority

### High Priority (User-Facing)
1. ✅ **Fix Build Errors** (COMPLETED)
2. ⚠️ **Wire Editor Help Overlay** - Low complexity, high editor value
3. ⚠️ **Add Animation Wrappers** - Low complexity, visual polish
4. ⚠️ **Implement Visibility Filtering** - Medium complexity, conditional rendering

### Medium Priority (Editor UX)
1. ❌ **Block Navigator** - High complexity, significant UX improvement
2. ⚠️ **InsertPattern Button** - Medium complexity, pattern workflow completion

### Low Priority (Nice-to-Have)
1. ❌ **Block Header Quick Actions** - Very high complexity, Breakdance-style polish
2. ⚠️ **Add Visibility & Animation to Remaining Blocks** - Low complexity, consistency

---

## 🛠️ Technical Debt

### Schema vs Implementation Gaps

**Visibility Settings:**
- Schema: ✅ Complete (device visibility, audience, seasonal display)
- Frontend: ❌ Not implemented

**Animation Settings:**
- Schema: ✅ Complete (presets, timing, behavior)
- Component: ✅ AnimatedSection created
- Integration: ❌ Not wired into block components

**Patterns:**
- Collection: ✅ Created and functional
- InsertPattern: ⚠️ Manual workaround only

---

## 📝 Migration Status

### Required Migrations

When deploying Phase 7 to production, run:

```bash
npx payload migration:generate "phase-7-visibility-animation-patterns"
npx payload migrate
```

**What will be migrated:**
1. `visibility` group fields added to blocks (showOnMobile, showOnTablet, showOnDesktop, audience)
2. `animation` group fields added to blocks (animationPreset, animationDelay, animationDuration, animateOnce)
3. `welcomeCardWidth` field added to HeroBasic
4. `patterns` collection table created

**Backward Compatibility:** ✅ All changes are additive, existing pages continue to work without new fields.

---

## 🚀 Deployment Checklist

### Before Deployment:
- [x] Fix all TypeScript build errors
- [x] Regenerate Payload types (`pnpm generate:types`)
- [x] Verify build succeeds (`pnpm build`)
- [ ] Test admin UI in local dev environment
- [ ] Create migration for Phase 7 schema changes
- [ ] Document incomplete features (this file)

### After Deployment:
- [ ] Run migrations on production database
- [ ] Verify patterns collection is accessible
- [ ] Test visibility and animation fields in admin
- [ ] Add animation wrappers to block components
- [ ] Implement visibility filtering logic
- [ ] Wire Editor Help Overlay into admin

### Future Enhancements:
- [ ] Implement Block Navigator
- [ ] Complete InsertPattern button functionality
- [ ] Add visibility & animation to remaining blocks
- [ ] Consider Block Header Quick Actions (if time permits)

---

## 📚 Related Documentation

- `docs/phase-7-page-builder-ux-polish.md` - Full Phase 7 specification
- `docs/build-log.md` - Implementation session log
- `src/components/AnimatedSection.tsx` - Animation wrapper component
- `src/components/admin/EditorHelpOverlay.tsx` - Help modal component (not yet wired)
- `src/blocks/InsertPattern/config.ts` - Pattern insertion block (incomplete)

---

**Last Updated:** 2025-11-19
**Next Review:** After Vercel deployment and migration
