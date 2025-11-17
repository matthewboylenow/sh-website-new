import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // This migration handles the field name changes for appearance fields
  // It will rename columns if they exist with old names, or skip if already using new names

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
     has_old_bg_variant BOOLEAN;
     has_old_custom_bg BOOLEAN;
     has_old_pt BOOLEAN;
     has_old_pb BOOLEAN;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN

         -- Check for old column names
         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_background_variant'
         ) INTO has_old_bg_variant;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_custom_background_color'
         ) INTO has_old_custom_bg;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_padding_top'
         ) INTO has_old_pt;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_padding_bottom'
         ) INTO has_old_pb;

         -- Rename columns if old names exist
         IF has_old_bg_variant THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_background_variant TO appearance_bg_variant', tbl);
         END IF;

         IF has_old_custom_bg THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_custom_background_color TO appearance_custom_bg_color', tbl);
         END IF;

         IF has_old_pt THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_padding_top TO appearance_pt', tbl);
         END IF;

         IF has_old_pb THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_padding_bottom TO appearance_pb', tbl);
         END IF;
       END IF;
     END LOOP;
   END $$;
  `)

  // Now let Payload's schema builder create any missing columns via the normal sync process
  // This happens automatically after migrations run
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
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
         -- Revert the renames
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
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_custom_bg_color TO appearance_custom_background_color', tbl);
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
