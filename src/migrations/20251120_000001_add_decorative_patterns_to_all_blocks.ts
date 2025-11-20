import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add decorative pattern columns to all eligible blocks
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_hero_basic',
       '_pages_v_blocks_hero_basic',
       'pages_blocks_card_grid',
       '_pages_v_blocks_card_grid',
       'pages_blocks_cta',
       '_pages_v_blocks_cta',
       'pages_blocks_cta_full_width',
       '_pages_v_blocks_cta_full_width',
       'pages_blocks_rich_text_section',
       '_pages_v_blocks_rich_text_section',
       'pages_blocks_hero_with_stats',
       '_pages_v_blocks_hero_with_stats',
       'pages_blocks_testimonial',
       '_pages_v_blocks_testimonial',
       'pages_blocks_alert_banner',
       '_pages_v_blocks_alert_banner',
       'pages_blocks_faq_accordion',
       '_pages_v_blocks_faq_accordion',
       'pages_blocks_story_highlight',
       '_pages_v_blocks_story_highlight',
       'pages_blocks_event_list',
       '_pages_v_blocks_event_list',
       'pages_blocks_post_list',
       '_pages_v_blocks_post_list',
       'pages_blocks_bulletin_list',
       '_pages_v_blocks_bulletin_list',
       'pages_blocks_columns',
       '_pages_v_blocks_columns',
       'pages_blocks_media_list',
       '_pages_v_blocks_media_list',
       'pages_blocks_video_embed',
       '_pages_v_blocks_video_embed',
       'pages_blocks_form_embed',
       '_pages_v_blocks_form_embed'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Add decorative_pattern_enabled column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_enabled'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_enabled column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_enabled boolean DEFAULT false', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_enabled already exists';
         END IF;

         -- Add decorative_pattern_type column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_type'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_type column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_type text DEFAULT ''text''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_type already exists';
         END IF;

         -- Add decorative_pattern_text column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_text'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_text column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_text text DEFAULT ''CHURCH''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_text already exists';
         END IF;

         -- Add decorative_pattern_opacity column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_opacity'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_opacity column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_opacity numeric DEFAULT 5', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_opacity already exists';
         END IF;

         -- Add decorative_pattern_size column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_size'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_size column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_size text DEFAULT ''large''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_size already exists';
         END IF;

         -- Add decorative_pattern_repeat_count column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_repeat_count'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_repeat_count column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_repeat_count numeric DEFAULT 3', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_repeat_count already exists';
         END IF;

         -- Add decorative_pattern_color column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_color'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_color column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_color text DEFAULT ''#20336b''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_color already exists';
         END IF;

         -- Add decorative_pattern_position column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_position'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_position column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_position text DEFAULT ''center''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_position already exists';
         END IF;

         -- Add decorative_pattern_rotation column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_rotation'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_rotation column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_rotation numeric DEFAULT 0', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_rotation already exists';
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
       'pages_blocks_card_grid',
       '_pages_v_blocks_card_grid',
       'pages_blocks_cta',
       '_pages_v_blocks_cta',
       'pages_blocks_cta_full_width',
       '_pages_v_blocks_cta_full_width',
       'pages_blocks_rich_text_section',
       '_pages_v_blocks_rich_text_section',
       'pages_blocks_hero_with_stats',
       '_pages_v_blocks_hero_with_stats',
       'pages_blocks_testimonial',
       '_pages_v_blocks_testimonial',
       'pages_blocks_alert_banner',
       '_pages_v_blocks_alert_banner',
       'pages_blocks_faq_accordion',
       '_pages_v_blocks_faq_accordion',
       'pages_blocks_story_highlight',
       '_pages_v_blocks_story_highlight',
       'pages_blocks_event_list',
       '_pages_v_blocks_event_list',
       'pages_blocks_post_list',
       '_pages_v_blocks_post_list',
       'pages_blocks_bulletin_list',
       '_pages_v_blocks_bulletin_list',
       'pages_blocks_columns',
       '_pages_v_blocks_columns',
       'pages_blocks_media_list',
       '_pages_v_blocks_media_list',
       'pages_blocks_video_embed',
       '_pages_v_blocks_video_embed',
       'pages_blocks_form_embed',
       '_pages_v_blocks_form_embed'
     ];
     tbl TEXT;
     columns TEXT[] := ARRAY[
       'decorative_pattern_enabled',
       'decorative_pattern_type',
       'decorative_pattern_text',
       'decorative_pattern_opacity',
       'decorative_pattern_size',
       'decorative_pattern_repeat_count',
       'decorative_pattern_color',
       'decorative_pattern_position',
       'decorative_pattern_rotation'
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
