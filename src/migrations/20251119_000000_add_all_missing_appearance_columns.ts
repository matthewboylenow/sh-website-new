import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // This migration ensures ALL appearance-related columns exist in block tables
  // It handles:
  // 1. Renaming old long column names to shorter ones
  // 2. Creating any missing columns
  // 3. Adding new fields that didn't exist before (customBgColor, textColor)

  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_hero_basic',
       'pages_blocks_hero_with_stats',
       'pages_blocks_rich_text_section',
       'pages_blocks_columns',
       'pages_blocks_cta_full_width',
       'pages_blocks_card_grid',
       'pages_blocks_bento_grid',
       'pages_blocks_event_list',
       'pages_blocks_post_list',
       'pages_blocks_bulletin_list',
       'pages_blocks_media_list',
       'pages_blocks_testimonial',
       'pages_blocks_story_highlight',
       'pages_blocks_faq_accordion',
       'pages_blocks_video_embed',
       'pages_blocks_form_embed',
       'pages_blocks_divider',
       'pages_blocks_custom_code',
       '_pages_v_blocks_hero_basic',
       '_pages_v_blocks_hero_with_stats',
       '_pages_v_blocks_rich_text_section',
       '_pages_v_blocks_columns',
       '_pages_v_blocks_cta_full_width',
       '_pages_v_blocks_card_grid',
       '_pages_v_blocks_bento_grid',
       '_pages_v_blocks_event_list',
       '_pages_v_blocks_post_list',
       '_pages_v_blocks_bulletin_list',
       '_pages_v_blocks_media_list',
       '_pages_v_blocks_testimonial',
       '_pages_v_blocks_story_highlight',
       '_pages_v_blocks_faq_accordion',
       '_pages_v_blocks_video_embed',
       '_pages_v_blocks_form_embed',
       '_pages_v_blocks_divider',
       '_pages_v_blocks_custom_code'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Handle appearance_bg_variant
         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_background_variant'
         ) THEN
           RAISE NOTICE '  Renaming appearance_background_variant to appearance_bg_variant';
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_background_variant TO appearance_bg_variant', tbl);
         ELSIF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_bg_variant'
         ) THEN
           RAISE NOTICE '  Creating appearance_bg_variant column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_bg_variant text DEFAULT ''light''', tbl);
         ELSE
           RAISE NOTICE '  appearance_bg_variant already exists';
         END IF;

         -- Handle appearance_custom_bg_color (NEW FIELD - may not exist at all)
         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_custom_background_color'
         ) THEN
           RAISE NOTICE '  Renaming appearance_custom_background_color to appearance_custom_bg_color';
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_custom_background_color TO appearance_custom_bg_color', tbl);
         ELSIF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_custom_bg_color'
         ) THEN
           RAISE NOTICE '  Creating appearance_custom_bg_color column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_custom_bg_color text', tbl);
         ELSE
           RAISE NOTICE '  appearance_custom_bg_color already exists';
         END IF;

         -- Handle appearance_text_color (NEW FIELD - may not exist at all)
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_text_color'
         ) THEN
           RAISE NOTICE '  Creating appearance_text_color column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_text_color text DEFAULT ''auto''', tbl);
         ELSE
           RAISE NOTICE '  appearance_text_color already exists';
         END IF;

         -- Handle appearance_pt
         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_padding_top'
         ) THEN
           RAISE NOTICE '  Renaming appearance_padding_top to appearance_pt';
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_padding_top TO appearance_pt', tbl);
         ELSIF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_pt'
         ) THEN
           RAISE NOTICE '  Creating appearance_pt column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_pt text DEFAULT ''default''', tbl);
         ELSE
           RAISE NOTICE '  appearance_pt already exists';
         END IF;

         -- Handle appearance_pb
         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_padding_bottom'
         ) THEN
           RAISE NOTICE '  Renaming appearance_padding_bottom to appearance_pb';
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_padding_bottom TO appearance_pb', tbl);
         ELSIF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_pb'
         ) THEN
           RAISE NOTICE '  Creating appearance_pb column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_pb text DEFAULT ''default''', tbl);
         ELSE
           RAISE NOTICE '  appearance_pb already exists';
         END IF;

       ELSE
         RAISE NOTICE 'Table % does not exist, skipping', tbl;
       END IF;
     END LOOP;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // This down migration reverts the changes
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_hero_basic',
       'pages_blocks_hero_with_stats',
       'pages_blocks_rich_text_section',
       'pages_blocks_columns',
       'pages_blocks_cta_full_width',
       'pages_blocks_card_grid',
       'pages_blocks_bento_grid',
       'pages_blocks_event_list',
       'pages_blocks_post_list',
       'pages_blocks_bulletin_list',
       'pages_blocks_media_list',
       'pages_blocks_testimonial',
       'pages_blocks_story_highlight',
       'pages_blocks_faq_accordion',
       'pages_blocks_video_embed',
       'pages_blocks_form_embed',
       'pages_blocks_divider',
       'pages_blocks_custom_code',
       '_pages_v_blocks_hero_basic',
       '_pages_v_blocks_hero_with_stats',
       '_pages_v_blocks_rich_text_section',
       '_pages_v_blocks_columns',
       '_pages_v_blocks_cta_full_width',
       '_pages_v_blocks_card_grid',
       '_pages_v_blocks_bento_grid',
       '_pages_v_blocks_event_list',
       '_pages_v_blocks_post_list',
       '_pages_v_blocks_bulletin_list',
       '_pages_v_blocks_media_list',
       '_pages_v_blocks_testimonial',
       '_pages_v_blocks_story_highlight',
       '_pages_v_blocks_faq_accordion',
       '_pages_v_blocks_video_embed',
       '_pages_v_blocks_form_embed',
       '_pages_v_blocks_divider',
       '_pages_v_blocks_custom_code'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         -- Revert the renames and drop new columns
         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_bg_variant'
         ) THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_bg_variant TO appearance_background_variant', tbl);
         END IF;

         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_custom_bg_color'
         ) THEN
           -- If this was a new column (not renamed), drop it; otherwise rename back
           EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS appearance_custom_bg_color', tbl);
         END IF;

         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_text_color'
         ) THEN
           EXECUTE format('ALTER TABLE %I DROP COLUMN appearance_text_color', tbl);
         END IF;

         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_pt'
         ) THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_pt TO appearance_padding_top', tbl);
         END IF;

         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_pb'
         ) THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_pb TO appearance_padding_bottom', tbl);
         END IF;
       END IF;
     END LOOP;
   END $$;
  `)
}
