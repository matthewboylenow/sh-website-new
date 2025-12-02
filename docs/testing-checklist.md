P# Testing Checklist

## Before Testing

Make sure you have:
- ✅ All dependencies installed: `pnpm install`
- ✅ Environment variables configured (`.env` file)
- ✅ Database connection working

## Start the Development Server

```bash
pnpm dev
```

The site should be available at `http://localhost:3000`

---

## 1. Initial Setup Tests

### Admin Panel Access
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Create your admin account
- [ ] Successfully log in to the CMS
- [ ] Verify all collections are visible:
  - [ ] Pages
  - [ ] Posts
  - [ ] Events
  - [ ] Bulletins
  - [ ] Podcasts
  - [ ] Ministries
  - [ ] LifeLines
  - [ ] Staff
  - [ ] Search Items
  - [ ] Media
  - [ ] Users
  - [ ] Categories

### Global Settings
- [ ] Navigate to Globals → Global Settings
- [ ] Fill in Parish Information tab
- [ ] Fill in Mass Times tab
- [ ] Fill in Social Media tab
- [ ] Add at least one External Resource
- [ ] Save changes

### Header & Footer Configuration
- [ ] Navigate to Globals → Header
- [ ] Add navigation items (e.g., About, Ministries, Events, Contact)
- [ ] Save changes
- [ ] Navigate to Globals → Footer
- [ ] Add footer navigation items
- [ ] Save changes

---

## 2. Block Component Tests

### Test Each Block Type
Create a test page and add each block type to verify functionality:

#### Hero Blocks
- [ ] **HeroBasic** - Add with background image, overlay, and CTAs
- [ ] **HeroWithStats** - Add with 2-4 statistics

#### Content Blocks
- [ ] **RichTextSection** - Add with formatted text
- [ ] **Columns** - Test 2, 3, and 4 column layouts
- [ ] **CTAFullWidth** - Add with background image
- [ ] **AlertBanner** - Test all 4 types (info, warning, urgent, success)

#### Cards & Grids
- [ ] **CardGrid** - Test manual cards mode
- [ ] **BentoGrid** - Add 4-6 tiles with different variants

#### Lists & Feeds
- [ ] **EventList** - Verify it shows "no events" message (before adding events)
- [ ] **PostList** - Verify it shows "no posts" message (before adding posts)
- [ ] **BulletinList** - Verify fallback behavior
- [ ] **MediaList** - Verify fallback behavior

#### Story & Testimony
- [ ] **Testimonial** - Test all 3 layouts (card, inline, featured)
- [ ] **StoryHighlight** - Test with image on left and right

#### Interactive
- [ ] **FAQAccordion** - Add 3-5 FAQ items, test expanding/collapsing
- [ ] **VideoEmbed** - Test with YouTube and Vimeo URLs
- [ ] **FormEmbed** - Test with iframe URL

#### Layout Utilities
- [ ] **Spacer** - Test all 4 sizes
- [ ] **Divider** - Test all 3 styles (line, space, decorative)

### Block Appearance Settings
For each block, verify:
- [ ] Background Variant options work (light, dark, brand, transparent)
- [ ] Alignment options work (left, center, right)
- [ ] Padding options work (none, small, medium, large)
- [ ] Full Width toggle works

---

## 3. Collection Tests

### Create Sample Content

#### Events
- [ ] Create 3-5 upcoming events
- [ ] Fill in all required fields
- [ ] Upload featured images
- [ ] Mark one as "Featured"
- [ ] Verify they appear in EventList block

#### Posts
- [ ] Create 2-3 blog posts
- [ ] Add categories
- [ ] Add featured images
- [ ] Publish posts
- [ ] Verify they appear in PostList block

#### Bulletins
- [ ] Create 2-3 bulletins
- [ ] Upload PDF files
- [ ] Mark the latest as "Current"
- [ ] Verify they appear in BulletinList block

#### Ministries
- [ ] Create 3-5 ministries
- [ ] Fill in descriptions and contact info
- [ ] Upload featured images
- [ ] Mark some as "Featured"

#### LifeLines
- [ ] Create 3-5 LifeLine groups
- [ ] Fill in meeting details
- [ ] Set some as "Accepting Members"

#### Staff
- [ ] Create 3-5 staff members
- [ ] Upload photos
- [ ] Set display order
- [ ] Verify showOnWebsite toggle

#### Podcasts/Media
- [ ] Create 2-3 podcast/sermon entries
- [ ] Add audio/video URLs
- [ ] Verify they can appear in MediaList block

---

## 4. Frontend Component Tests

### Header
- [ ] Logo appears and links to homepage
- [ ] Desktop navigation shows all menu items
- [ ] Search icon is visible
- [ ] "Give" button is prominent
- [ ] **Mobile**:
  - [ ] Hamburger menu appears on small screens
  - [ ] Menu slides in from right
  - [ ] Quick action buttons work
  - [ ] Menu closes when clicking outside
  - [ ] Body scroll locks when menu open

### Footer
- [ ] All 4 columns display correctly
- [ ] Parish information from GlobalSettings appears
- [ ] Mass times display (or fallback)
- [ ] Navigation links work
- [ ] Social media icons appear (if configured)
- [ ] Copyright year is current
- [ ] **Mobile**: Stacks properly on small screens

### NeedHelpWidget (Assistant)
- [ ] Floating button appears in bottom-right corner
- [ ] Button text shows on desktop, "Help" on mobile
- [ ] Clicking opens search dialog
- [ ] Dialog is centered and responsive
- [ ] Quick suggestions appear when no query
- [ ] **Search Functionality**:
  - [ ] Type less than 3 characters - shows hint
  - [ ] Type 3+ characters - search activates
  - [ ] Loading spinner appears during search
  - [ ] Results display with proper formatting
  - [ ] Detected topics/audience show as tags
  - [ ] Clicking result closes dialog and navigates
  - [ ] No results message appears for invalid queries
- [ ] "Contact us" link in footer works
- [ ] Close button (X) works
- [ ] Clicking overlay closes dialog
- [ ] Body scroll locks when open

---

## 5. Page Rendering Tests

### Homepage
- [ ] Navigate to `http://localhost:3000/`
- [ ] Default homepage loads (shows admin link if not seeded)
- [ ] Or follow homepage-setup.md to build custom homepage
- [ ] All blocks render without errors
- [ ] Images load properly
- [ ] Links work correctly

### Dynamic Pages
- [ ] Create a test page with slug "about"
- [ ] Add various blocks to the page
- [ ] Publish the page
- [ ] Navigate to `/about`
- [ ] Page renders correctly
- [ ] All blocks display

### Posts
- [ ] Navigate to `/posts`
- [ ] Posts list displays
- [ ] Click on a post
- [ ] Post detail page loads
- [ ] Content renders correctly

---

## 6. Data Integration Tests

### Assistant Widget Search
- [ ] Create some Search Items manually (or wait for auto-population)
- [ ] Test searching for "mass times"
- [ ] Verify results are relevant
- [ ] Test searching for "volunteer"
- [ ] Test searching for "kids"
- [ ] Verify intent detection works (check tags)

### Block Data Fetching
- [ ] **EventList**: Shows real events from database
- [ ] **PostList**: Shows real posts from database
- [ ] **BulletinList**: Shows real bulletins from database
- [ ] **MediaList**: Shows real podcasts from database
- [ ] All show proper "no results" messages when empty

---

## 7. Responsive Design Tests

Test on different screen sizes:

### Mobile (< 768px)
- [ ] Header hamburger menu works
- [ ] All blocks stack properly
- [ ] Text is readable
- [ ] Images scale correctly
- [ ] Assistant widget button is accessible
- [ ] Footer stacks into single column

### Tablet (768px - 1024px)
- [ ] Grid layouts adjust (2 columns)
- [ ] Navigation is readable
- [ ] Content is well-spaced

### Desktop (> 1024px)
- [ ] Full grid layouts show (3-4 columns)
- [ ] Navigation is horizontal
- [ ] Max-width containers center content
- [ ] Everything looks polished

---

## 8. Performance Tests

- [ ] Page loads in reasonable time (< 3s)
- [ ] Images are optimized (Next.js Image component)
- [ ] No console errors in browser
- [ ] No TypeScript errors during build
- [ ] API endpoints respond quickly

---

## 9. Accessibility Tests

- [ ] All images have alt text
- [ ] Buttons have aria-labels where needed
- [ ] Keyboard navigation works
- [ ] Color contrast is adequate
- [ ] Screen reader friendly (test with screen reader if available)

---

## 10. Build Test

```bash
pnpm build
```

- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Types are generated correctly

---

## Common Issues & Solutions

### Issue: "Types not found"
**Solution**: Run `pnpm generate:types`

### Issue: Database connection error
**Solution**: Check `.env` file and database credentials

### Issue: Blocks not rendering
**Solution**: Verify block is registered in `Pages/index.ts` and `RenderBlocks.tsx`

### Issue: Images not loading
**Solution**: Check media upload configuration and storage settings

### Issue: Assistant widget not searching
**Solution**: Verify SearchItems collection has data, check API endpoint at `/api/assistant?q=test`

---

## Success Criteria

Your Saint Helen website is ready when:
- ✅ All blocks render without errors
- ✅ Header and Footer display correctly
- ✅ Assistant widget searches successfully
- ✅ Mobile navigation works smoothly
- ✅ Data fetching blocks show real content (or proper empty states)
- ✅ Build completes successfully
- ✅ No console errors or TypeScript warnings

## Next Steps After Testing

1. **Deploy** - Deploy to Vercel or your hosting platform
2. **Train Staff** - Show parish staff how to use the CMS
3. **Content Migration** - Move existing content from old site
4. **SEO** - Configure meta tags and sitemap
5. **Analytics** - Set up Google Analytics or similar
6. **Launch** - Make the site live!

---

**Need help?** Check the build-log.md for implementation details or create an issue on GitHub.
