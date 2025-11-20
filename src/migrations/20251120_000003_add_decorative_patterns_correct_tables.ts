import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add decorative pattern columns using ACTUAL table names (single underscore, snake_case)
  // These match the CREATE TABLE statements in the initial migration
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_hero_basic',
       '_pages_v_blocks_hero_basic',
       'pages_blocks_hero_with_stats',
       '_pages_v_blocks_hero_with_stats',
       'pages_blocks_rich_text_section',
       '_pages_v_blocks_rich_text_section',
       'pages_blocks_columns',
       '_pages_v_blocks_columns',
       'pages_blocks_cta_full_width',
       '_pages_v_blocks_cta_full_width',
       'pages_blocks_alert_banner',
       '_pages_v_blocks_alert_banner',
       'pages_blocks_card_grid',
       '_pages_v_blocks_card_grid',
       'pages_blocks_bento_grid',
       '_pages_v_blocks_bento_grid',
       'pages_blocks_event_list',
       '_pages_v_blocks_event_list',
       'pages_blocks_post_list',
       '_pages_v_blocks_post_list',
       'pages_blocks_bulletin_list',
       '_pages_v_blocks_bulletin_list',
       'pages_blocks_media_list',
       '_pages_v_blocks_media_list',
       'pages_blocks_testimonial',
       '_pages_v_blocks_testimonial',
       'pages_blocks_story_highlight',
       '_pages_v_blocks_story_highlight',
       'pages_blocks_faq_accordion',
       '_pages_v_blocks_faq_accordion',
       'pages_blocks_video_embed',
       '_pages_v_blocks_video_embed',
       'pages_blocks_form_embed',
       '_pages_v_blocks_form_embed',
       'pages_blocks_cta',
       '_pages_v_blocks_cta'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Add decor_pattern_enabled column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_enabled'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_enabled column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_enabled boolean DEFAULT false', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_enabled already exists';
         END IF;

         -- Add decor_pattern_typ column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_typ'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_typ column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_typ text DEFAULT ''text''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_typ already exists';
         END IF;

         -- Add decor_pattern_text column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_text'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_text column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_text text DEFAULT ''CHURCH''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_text already exists';
         END IF;

         -- Add decor_pattern_opacity column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_opacity'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_opacity column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_opacity numeric DEFAULT 5', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_opacity already exists';
         END IF;

         -- Add decor_pattern_sz column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_sz'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_sz column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_sz text DEFAULT ''large''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_sz already exists';
         END IF;

         -- Add decor_pattern_repeat_count column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_repeat_count'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_repeat_count column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_repeat_count numeric DEFAULT 3', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_repeat_count already exists';
         END IF;

         -- Add decor_pattern_color column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_color'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_color column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_color text DEFAULT ''#20336b''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_color already exists';
         END IF;

         -- Add decor_pattern_pos column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_pos'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_pos column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_pos text DEFAULT ''center''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_pos already exists';
         END IF;

         -- Add decor_pattern_rotation column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_rotation'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_rotation column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_rotation numeric DEFAULT 0', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_rotation already exists';
         END IF;

       ELSE
         RAISE NOTICE 'Table % does not exist, skipping', tbl;
       END IF;
     END LOOP;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove all decorative pattern columns
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_hero_basic',
       '_pages_v_blocks_hero_basic',
       'pages_blocks_hero_with_stats',
       '_pages_v_blocks_hero_with_stats',
       'pages_blocks_rich_text_section',
       '_pages_v_blocks_rich_text_section',
       'pages_blocks_columns',
       '_pages_v_blocks_columns',
       'pages_blocks_cta_full_width',
       '_pages_v_blocks_cta_full_width',
       'pages_blocks_alert_banner',
       '_pages_v_blocks_alert_banner',
       'pages_blocks_card_grid',
       '_pages_v_blocks_card_grid',
       'pages_blocks_bento_grid',
       '_pages_v_blocks_bento_grid',
       'pages_blocks_event_list',
       '_pages_v_blocks_event_list',
       'pages_blocks_post_list',
       '_pages_v_blocks_post_list',
       'pages_blocks_bulletin_list',
       '_pages_v_blocks_bulletin_list',
       'pages_blocks_media_list',
       '_pages_v_blocks_media_list',
       'pages_blocks_testimonial',
       '_pages_v_blocks_testimonial',
       'pages_blocks_story_highlight',
       '_pages_v_blocks_story_highlight',
       'pages_blocks_faq_accordion',
       '_pages_v_blocks_faq_accordion',
       'pages_blocks_video_embed',
       '_pages_v_blocks_video_embed',
       'pages_blocks_form_embed',
       '_pages_v_blocks_form_embed',
       'pages_blocks_cta',
       '_pages_v_blocks_cta'
     ];
     tbl TEXT;
     columns TEXT[] := ARRAY[
       'decor_pattern_enabled',
       'decor_pattern_typ',
       'decor_pattern_text',
       'decor_pattern_opacity',
       'decor_pattern_sz',
       'decor_pattern_repeat_count',
       'decor_pattern_color',
       'decor_pattern_pos',
       'decor_pattern_rotation'
     ];
     col TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         FOREACH col IN ARRAY columns
         LOOP
           IF EXISTS (
             SELECT 1 FROM information_schema.columns
             WHERE table_name = tbl AND column_name = col
           ) THEN
             EXECUTE format('ALTER TABLE %I DROP COLUMN %I', tbl, col);
           END IF;
         END LOOP;
       END IF;
     END LOOP;
   END $$;
  `)
}
