import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // This migration handles the field name changes for appearance fields
  // It will rename columns if they exist with old names, create new columns if missing

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
     has_new_bg_variant BOOLEAN;
     has_old_custom_bg BOOLEAN;
     has_new_custom_bg BOOLEAN;
     has_old_pt BOOLEAN;
     has_new_pt BOOLEAN;
     has_old_pb BOOLEAN;
     has_new_pb BOOLEAN;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN

         -- Check for old and new column names
         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_background_variant'
         ) INTO has_old_bg_variant;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_bg_variant'
         ) INTO has_new_bg_variant;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_custom_background_color'
         ) INTO has_old_custom_bg;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_custom_bg_color'
         ) INTO has_new_custom_bg;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_padding_top'
         ) INTO has_old_pt;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_pt'
         ) INTO has_new_pt;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_padding_bottom'
         ) INTO has_old_pb;

         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_pb'
         ) INTO has_new_pb;

         -- Handle appearance_bg_variant
         IF has_old_bg_variant THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_background_variant TO appearance_bg_variant', tbl);
         ELSIF NOT has_new_bg_variant THEN
           -- Column doesn't exist at all, create it
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_bg_variant text', tbl);
         END IF;

         -- Handle appearance_custom_bg_color
         IF has_old_custom_bg THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_custom_background_color TO appearance_custom_bg_color', tbl);
         ELSIF NOT has_new_custom_bg THEN
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_custom_bg_color text', tbl);
         END IF;

         -- Handle appearance_pt
         IF has_old_pt THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_padding_top TO appearance_pt', tbl);
         ELSIF NOT has_new_pt THEN
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_pt text', tbl);
         END IF;

         -- Handle appearance_pb
         IF has_old_pb THEN
           EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_padding_bottom TO appearance_pb', tbl);
         ELSIF NOT has_new_pb THEN
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_pb text', tbl);
         END IF;
       END IF;
     END LOOP;
   END $$;
  `)
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
