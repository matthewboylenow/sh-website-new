import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // This migration fixes the custom_svg column that may not have been created properly
  // Uses explicit column existence checks before attempting to add
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages__blocks_heroBasic',
       '_pages_v__blocks_heroBasic',
       'pages__blocks_heroWithStats',
       '_pages_v__blocks_heroWithStats',
       'pages__blocks_richTextSection',
       '_pages_v__blocks_richTextSection',
       'pages__blocks_columns',
       '_pages_v__blocks_columns',
       'pages__blocks_ctaFullWidth',
       '_pages_v__blocks_ctaFullWidth',
       'pages__blocks_alertBanner',
       '_pages_v__blocks_alertBanner',
       'pages__blocks_cardGrid',
       '_pages_v__blocks_cardGrid',
       'pages__blocks_bentoGrid',
       '_pages_v__blocks_bentoGrid',
       'pages__blocks_eventList',
       '_pages_v__blocks_eventList',
       'pages__blocks_postList',
       '_pages_v__blocks_postList',
       'pages__blocks_bulletinList',
       '_pages_v__blocks_bulletinList',
       'pages__blocks_mediaList',
       '_pages_v__blocks_mediaList',
       'pages__blocks_testimonial',
       '_pages_v__blocks_testimonial',
       'pages__blocks_storyHighlight',
       '_pages_v__blocks_storyHighlight',
       'pages__blocks_faqAccordion',
       '_pages_v__blocks_faqAccordion',
       'pages__blocks_videoEmbed',
       '_pages_v__blocks_videoEmbed',
       'pages__blocks_formEmbed',
       '_pages_v__blocks_formEmbed',
       'pages__blocks_cta',
       '_pages_v__blocks_cta'
     ];
     tbl TEXT;
     short_name TEXT;
     col_exists BOOLEAN;
     tbl_exists BOOLEAN;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists (case-insensitive)
       SELECT EXISTS (
         SELECT 1 FROM information_schema.tables
         WHERE LOWER(table_name) = LOWER(tbl)
         AND table_schema = 'public'
       ) INTO tbl_exists;

       IF tbl_exists THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Check if column exists (case-insensitive)
         SELECT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE LOWER(table_name) = LOWER(tbl)
           AND LOWER(column_name) = 'decor_pattern_custom_svg_id'
           AND table_schema = 'public'
         ) INTO col_exists;

         IF NOT col_exists THEN
           RAISE NOTICE '  Adding decor_pattern_custom_svg_id column';

           -- Add the column
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_custom_svg_id integer', tbl);

           -- Create a short unique identifier for constraint names
           short_name := substring(md5(tbl) from 1 for 8);

           -- Add foreign key constraint if media table exists
           IF EXISTS (SELECT 1 FROM information_schema.tables WHERE LOWER(table_name) = 'media' AND table_schema = 'public') THEN
             BEGIN
               EXECUTE format(
                 'ALTER TABLE %I ADD CONSTRAINT decor_svg_fk_%s FOREIGN KEY (decor_pattern_custom_svg_id) REFERENCES media(id) ON DELETE SET NULL',
                 tbl, short_name
               );
               RAISE NOTICE '  Added FK constraint: decor_svg_fk_%', short_name;
             EXCEPTION WHEN duplicate_object THEN
               RAISE NOTICE '  FK constraint already exists: decor_svg_fk_%', short_name;
             END;
           END IF;

           -- Create index
           EXECUTE format(
             'CREATE INDEX decor_svg_idx_%s ON %I (decor_pattern_custom_svg_id)',
             short_name, tbl
           );
           RAISE NOTICE '  Created index: decor_svg_idx_%', short_name;

           RAISE NOTICE '  Successfully added column to: %', tbl;
         ELSE
           RAISE NOTICE '  Column already exists in: %', tbl;
         END IF;
       ELSE
         RAISE NOTICE 'Table does not exist: %', tbl;
       END IF;
     END LOOP;

     RAISE NOTICE 'Migration 000010 completed successfully';
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove the column
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages__blocks_heroBasic',
       '_pages_v__blocks_heroBasic',
       'pages__blocks_heroWithStats',
       '_pages_v__blocks_heroWithStats',
       'pages__blocks_richTextSection',
       '_pages_v__blocks_richTextSection',
       'pages__blocks_columns',
       '_pages_v__blocks_columns',
       'pages__blocks_ctaFullWidth',
       '_pages_v__blocks_ctaFullWidth',
       'pages__blocks_alertBanner',
       '_pages_v__blocks_alertBanner',
       'pages__blocks_cardGrid',
       '_pages_v__blocks_cardGrid',
       'pages__blocks_bentoGrid',
       '_pages_v__blocks_bentoGrid',
       'pages__blocks_eventList',
       '_pages_v__blocks_eventList',
       'pages__blocks_postList',
       '_pages_v__blocks_postList',
       'pages__blocks_bulletinList',
       '_pages_v__blocks_bulletinList',
       'pages__blocks_mediaList',
       '_pages_v__blocks_mediaList',
       'pages__blocks_testimonial',
       '_pages_v__blocks_testimonial',
       'pages__blocks_storyHighlight',
       '_pages_v__blocks_storyHighlight',
       'pages__blocks_faqAccordion',
       '_pages_v__blocks_faqAccordion',
       'pages__blocks_videoEmbed',
       '_pages_v__blocks_videoEmbed',
       'pages__blocks_formEmbed',
       '_pages_v__blocks_formEmbed',
       'pages__blocks_cta',
       '_pages_v__blocks_cta'
     ];
     tbl TEXT;
     short_name TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE LOWER(table_name) = LOWER(tbl) AND table_schema = 'public') THEN
         short_name := substring(md5(tbl) from 1 for 8);
         EXECUTE format('ALTER TABLE %I DROP CONSTRAINT IF EXISTS decor_svg_fk_%s', tbl, short_name);
         EXECUTE format('DROP INDEX IF EXISTS decor_svg_idx_%s', short_name);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS decor_pattern_custom_svg_id', tbl);
       END IF;
     END LOOP;
   END $$;
  `)
}
