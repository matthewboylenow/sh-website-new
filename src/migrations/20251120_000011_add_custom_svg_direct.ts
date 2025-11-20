import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Direct approach: Try to add column, catch exception if it already exists
  // This avoids information_schema issues and is more reliable
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
     RAISE NOTICE 'Starting migration 000011 - adding custom_svg columns';

     FOREACH tbl IN ARRAY tables
     LOOP
       BEGIN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Try to add the column directly
         EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_custom_svg_id integer', tbl);

         RAISE NOTICE '  Successfully added column to: %', tbl;

         -- Add foreign key and index
         short_name := substring(md5(tbl) from 1 for 8);

         BEGIN
           EXECUTE format(
             'ALTER TABLE %I ADD CONSTRAINT decor_svg_fk_%s FOREIGN KEY (decor_pattern_custom_svg_id) REFERENCES media(id) ON DELETE SET NULL',
             tbl, short_name
           );
           RAISE NOTICE '  Added FK constraint: decor_svg_fk_%', short_name;
         EXCEPTION WHEN OTHERS THEN
           RAISE NOTICE '  FK constraint issue (skipping): %', SQLERRM;
         END;

         EXECUTE format(
           'CREATE INDEX decor_svg_idx_%s ON %I (decor_pattern_custom_svg_id)',
           short_name, tbl
         );
         RAISE NOTICE '  Created index: decor_svg_idx_%', short_name;

       EXCEPTION
         WHEN duplicate_column THEN
           RAISE NOTICE '  Column already exists in: %', tbl;
         WHEN undefined_table THEN
           RAISE NOTICE '  Table does not exist: %', tbl;
         WHEN OTHERS THEN
           RAISE NOTICE '  Error with table %: %', tbl, SQLERRM;
       END;
     END LOOP;

     RAISE NOTICE 'Migration 000011 completed';
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
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
       BEGIN
         short_name := substring(md5(tbl) from 1 for 8);
         EXECUTE format('ALTER TABLE %I DROP CONSTRAINT IF EXISTS decor_svg_fk_%s', tbl, short_name);
         EXECUTE format('DROP INDEX IF EXISTS decor_svg_idx_%s', short_name);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS decor_pattern_custom_svg_id', tbl);
       EXCEPTION WHEN OTHERS THEN
         NULL;
       END;
     END LOOP;
   END $$;
  `)
}
