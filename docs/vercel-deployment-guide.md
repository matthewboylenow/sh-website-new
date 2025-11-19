# Vercel Deployment Guide: Saint Helen Website

**Last Updated:** 2025-11-19

---

## 🎯 Deployment Overview

This guide covers deploying the Saint Helen CMS to Vercel with automatic database migrations for Phase 7 features (visibility settings, animation settings, patterns collection, and welcome card width control).

---

## ✅ Pre-Deployment Checklist

### 1. Local Build Verification
- [x] Build succeeds locally: `pnpm build` ✅
- [x] TypeScript types generated: `pnpm generate:types` ✅
- [x] No TypeScript compilation errors ✅
- [x] ESLint warnings acceptable (existing warnings only) ✅

### 2. Code Readiness
- [x] All Phase 7 feature schemas defined
- [x] Patterns collection created and registered
- [x] Visibility and animation field groups added to blocks
- [x] Migration index up to date (`src/migrations/index.ts`)
- [x] Git commits pushed to main branch

### 3. Database Migration Status
**Existing Migrations (Already Applied on Vercel):**
- ✅ 20251115_195449 - Initial schema
- ✅ 20251115_224016 - Fix hero basic welcome buttons
- ✅ 20251115_231215 - Add block names, min height, typography
- ✅ 20251116_001100 - Add header customization
- ✅ 20251116_002000 - Add mobile/desktop colors
- ✅ 20251116_152000 - Add block text color
- ✅ 20251116_152100 - Add columns video support
- ✅ 20251116_153000 - Add missing text color columns
- ✅ 20251116_160000 - Add BentoGrid customization
- ✅ 20251116_161000 - Expand link appearance enums
- ✅ 20251117_201500 - Fix appearance field names
- ✅ 20251119_000000 - Add all missing appearance columns
- ✅ 20251119_000001 - Add BentoGrid overlay_strength
- ✅ 20251119_000002 - Add decorative pattern columns

**New Phase 7 Migrations Needed:**
- ⚠️ Visibility settings fields (if not automatically detected)
- ⚠️ Animation settings fields (if not automatically detected)
- ⚠️ Patterns collection table
- ⚠️ Welcome card width field

**Migration Strategy:**
Payload 3.x automatically generates migrations on deployment when schema changes are detected. The `ci` script in `package.json` handles this:
```json
"ci": "payload migrate && pnpm build"
```

---

## 🔐 Environment Variables

Ensure these are set in Vercel project settings:

### Required Variables
```bash
POSTGRES_URL=<vercel-postgres-connection-string>
PAYLOAD_SECRET=<random-64-character-string>
NEXT_PUBLIC_SERVER_URL=<your-vercel-domain>
CRON_SECRET=<random-secret-for-cron-jobs>
PREVIEW_SECRET=<random-secret-for-preview-mode>
```

### Optional Variables
```bash
NODE_ENV=production
DATABASE_URI=<fallback-if-postgres-url-fails>
```

**How to Set:**
1. Go to Vercel project settings
2. Navigate to "Environment Variables"
3. Add/verify each variable
4. Select environments: Production, Preview, Development

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
# Ensure all changes are committed
git status

# If clean, push to main (or your deployment branch)
git push origin main
```

### Step 2: Vercel Automatic Deployment
Vercel will automatically:
1. Detect new commits on main branch
2. Trigger deployment pipeline
3. Run `ci` script: `payload migrate && pnpm build`
4. Apply pending migrations to Vercel Postgres database
5. Build Next.js application
6. Deploy to production

**Timeline:**
- Migration: ~30 seconds
- Build: ~2-3 minutes
- Deployment: ~1 minute
- **Total:** ~4-5 minutes

### Step 3: Monitor Deployment
1. Go to Vercel dashboard → Project → Deployments
2. Click on latest deployment
3. Monitor "Build Logs" tab for:
   - `payload migrate` output
   - Migration success messages
   - Build completion
   - Deployment success

**Look for:**
```
✓ Migrating database...
✓ Applied migrations: phase-7-visibility-animation-patterns
✓ Compiled successfully in 2.7min
✓ Deployment ready
```

### Step 4: Verify Deployment
1. **Test Admin Access:**
   ```
   https://your-domain.vercel.app/admin
   ```
   - Login with credentials
   - Navigate to Pages collection
   - Create/edit a page

2. **Verify New Fields:**
   - Edit HeroBasic block
   - Check for "Visibility Settings" group
   - Check for "Animation Settings" group
   - Check for "Welcome Card Width" field

3. **Verify Patterns Collection:**
   - Navigate to "Content" → "Patterns"
   - Create a test pattern
   - Save successfully

4. **Test Frontend:**
   ```
   https://your-domain.vercel.app/
   ```
   - Homepage loads without errors
   - Blocks render correctly
   - No console errors

---

## ⚠️ Common Issues & Solutions

### Issue 1: Migration Fails
**Symptoms:**
- Build logs show migration errors
- Database connection timeout
- "Migration X failed to apply"

**Solutions:**
1. Check `POSTGRES_URL` is correct in Vercel env vars
2. Verify Postgres database is accessible
3. Check migration files in `src/migrations/` are valid SQL
4. Rollback last deployment, fix migration, redeploy

**Manual Migration (if needed):**
```bash
# In Vercel dashboard, go to "Deployments"
# Click "..." menu → "Redeploy"
# Select "Use existing build cache" = NO
```

---

### Issue 2: Build Fails After Migration
**Symptoms:**
- Migrations succeed
- Build fails with TypeScript errors
- "Property X does not exist on type Y"

**Solutions:**
1. Regenerate types locally:
   ```bash
   pnpm generate:types
   ```
2. Commit updated `src/payload-types.ts`
3. Push and redeploy

---

### Issue 3: New Fields Don't Appear in Admin
**Symptoms:**
- Deployment succeeds
- Admin loads
- New Phase 7 fields missing

**Solutions:**
1. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
2. Clear browser cache
3. Check browser console for JavaScript errors
4. Verify migrations actually ran (check Vercel logs)
5. Manually run migration on Vercel:
   ```bash
   # Via Vercel CLI
   vercel env pull
   pnpm payload migrate
   ```

---

### Issue 4: Database Schema Out of Sync
**Symptoms:**
- Errors like "column X does not exist"
- 500 errors when loading pages
- Admin panel crashes

**Solutions:**
1. Check which migrations ran:
   ```sql
   SELECT * FROM payload_migrations ORDER BY created_at DESC;
   ```
2. Manually run pending migrations:
   ```bash
   npx payload migrate
   ```
3. If severely broken, restore database backup and retry

---

## 🔄 Rollback Strategy

If deployment fails and site is broken:

### Option 1: Revert to Previous Deployment
1. Go to Vercel dashboard → Deployments
2. Find last working deployment
3. Click "..." menu → "Promote to Production"
4. Previous version restored instantly

### Option 2: Rollback Git Commit
1. Locally revert commit:
   ```bash
   git revert HEAD
   git push origin main
   ```
2. Vercel automatically deploys reverted version
3. Database migrations may need manual rollback

### Option 3: Manual Database Rollback
1. Connect to Vercel Postgres
2. Run migration `down()` function manually
3. Redeploy previous code version

---

## 📊 Post-Deployment Tasks

### Immediate (Within 1 Hour)
- [ ] Verify admin loads and new fields appear
- [ ] Test creating a page with HeroBasic block
- [ ] Test visibility settings UI
- [ ] Test animation settings UI
- [ ] Create a test pattern in Patterns collection
- [ ] Verify frontend renders without errors

### Short-Term (Within 1 Week)
- [ ] Train editors on new Phase 7 features
- [ ] Create sample patterns for common page layouts
- [ ] Add animation wrappers to block components (frontend)
- [ ] Implement visibility filtering logic (frontend)
- [ ] Wire Editor Help Overlay into admin
- [ ] Monitor error logs for issues

### Long-Term (Future Enhancements)
- [ ] Implement Block Navigator component
- [ ] Complete InsertPattern button functionality
- [ ] Add visibility & animation to remaining blocks
- [ ] Optimize animation performance
- [ ] A/B test block visibility features

---

## 🛠️ Vercel-Specific Configuration

### Build Settings
```
Framework Preset: Next.js
Build Command: pnpm ci
Output Directory: .next
Install Command: pnpm install --frozen-lockfile
Node Version: 20.x
```

### Build & Deploy Hooks
- **On Push:** Deploy automatically
- **On Pull Request:** Create preview deployment
- **On Merge:** Deploy to production

### Functions Configuration
- **Serverless Functions:** Enabled (for Payload API routes)
- **Edge Functions:** Optional (not required)
- **Function Regions:** Auto (or specify based on user location)

### Database Configuration
- **Provider:** Vercel Postgres
- **Connection Pooling:** Enabled
- **SSL:** Required
- **Max Connections:** 20 (adjust based on traffic)

---

## 📝 Deployment Log Template

After each deployment, record:

```markdown
### Deployment: 2025-11-19

**Branch:** main
**Commit:** 8e97148 - feat: Add Phase 7 Page Builder UX Polish
**Migrations Applied:**
- phase-7-visibility-animation-patterns
- (auto-generated migration for new fields)

**Build Time:** 2.7 minutes
**Status:** ✅ Success

**Verified:**
- [x] Admin loads
- [x] New fields appear in HeroBasic
- [x] Patterns collection functional
- [x] Frontend renders without errors

**Issues:** None

**Next Steps:**
- Add animation wrappers to components
- Implement visibility filtering
```

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Payload Migrations Docs:** https://payloadcms.com/docs/database/migrations
- **Vercel Postgres Docs:** https://vercel.com/docs/storage/vercel-postgres
- **Project Repository:** (your GitHub repo URL)

---

## 🆘 Support & Troubleshooting

### If Deployment Fails:
1. Check Vercel build logs for error details
2. Review `docs/phase-7-incomplete-features.md` for known issues
3. Refer to this guide's "Common Issues" section
4. Check Payload CMS Discord for help
5. Review recent commits for breaking changes

### Monitoring Tools:
- **Vercel Logs:** Real-time deployment and function logs
- **Vercel Analytics:** Page load performance
- **Sentry (optional):** Error tracking and monitoring
- **Database Logs:** Query performance and errors

---

## ✅ Final Checklist

Before marking deployment as complete:

- [ ] Deployment succeeded on Vercel
- [ ] All migrations applied successfully
- [ ] Admin panel loads and new fields visible
- [ ] Patterns collection functional
- [ ] Frontend renders without errors
- [ ] No console errors or warnings
- [ ] Tested on desktop and mobile browsers
- [ ] Editor training scheduled (if needed)
- [ ] Documentation updated (this file)
- [ ] Team notified of new features

---

**Deployment Status:** 🚀 Ready for deployment
**Estimated Downtime:** None (zero-downtime deployment)
**Rollback Plan:** Revert to previous Vercel deployment
**Database Backup:** Automatic (Vercel Postgres)
**Next Deployment:** After frontend integration complete
