import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Rename appearance columns in all block tables to match new shortened field names
   -- Note: Fields inside groups don't support dbName, so we use shorter actual field names

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
       -- Rename customBackgroundColor to customBgColor
       IF EXISTS (
         SELECT 1 FROM information_schema.columns
         WHERE table_name = tbl
         AND column_name = 'appearance_custom_background_color'
       ) THEN
         EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_custom_background_color TO appearance_custom_bg_color', tbl);
       END IF;

       -- Rename backgroundVariant to bgVariant
       IF EXISTS (
         SELECT 1 FROM information_schema.columns
         WHERE table_name = tbl
         AND column_name = 'appearance_background_variant'
       ) THEN
         EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_background_variant TO appearance_bg_variant', tbl);
       END IF;

       -- Rename paddingTop to pt
       IF EXISTS (
         SELECT 1 FROM information_schema.columns
         WHERE table_name = tbl
         AND column_name = 'appearance_padding_top'
       ) THEN
         EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_padding_top TO appearance_pt', tbl);
       END IF;

       -- Rename paddingBottom to pb
       IF EXISTS (
         SELECT 1 FROM information_schema.columns
         WHERE table_name = tbl
         AND column_name = 'appearance_padding_bottom'
       ) THEN
         EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_padding_bottom TO appearance_pb', tbl);
       END IF;
     END LOOP;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Revert column renames

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
       -- Revert custom_bg_color to customBackgroundColor
       IF EXISTS (
         SELECT 1 FROM information_schema.columns
         WHERE table_name = tbl
         AND column_name = 'appearance_custom_bg_color'
       ) THEN
         EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_custom_bg_color TO appearance_custom_background_color', tbl);
       END IF;

       -- Revert bg_variant to background_variant
       IF EXISTS (
         SELECT 1 FROM information_schema.columns
         WHERE table_name = tbl
         AND column_name = 'appearance_bg_variant'
       ) THEN
         EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_bg_variant TO appearance_background_variant', tbl);
       END IF;

       -- Revert pt to padding_top
       IF EXISTS (
         SELECT 1 FROM information_schema.columns
         WHERE table_name = tbl
         AND column_name = 'appearance_pt'
       ) THEN
         EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_pt TO appearance_padding_top', tbl);
       END IF;

       -- Revert pb to padding_bottom
       IF EXISTS (
         SELECT 1 FROM information_schema.columns
         WHERE table_name = tbl
         AND column_name = 'appearance_pb'
       ) THEN
         EXECUTE format('ALTER TABLE %I RENAME COLUMN appearance_pb TO appearance_padding_bottom', tbl);
       END IF;
     END LOOP;
   END $$;
  `)
}
