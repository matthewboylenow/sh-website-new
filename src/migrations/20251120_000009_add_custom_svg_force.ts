import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Force add the column without checking - let PostgreSQL handle errors
  // This avoids the information_schema casing issues
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
         RAISE NOTICE 'Attempting to add column to: %', tbl;

         -- Try to add the column - will fail gracefully if table doesn't exist or column exists
         EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS decor_pattern_custom_svg_id integer', tbl);

         -- Add foreign key and index
         short_name := substring(md5(tbl) from 1 for 8);

         -- Try to add FK constraint (will fail if already exists, which is fine)
         BEGIN
           EXECUTE format('ALTER TABLE %I ADD CONSTRAINT decor_svg_fk_%s FOREIGN KEY (decor_pattern_custom_svg_id) REFERENCES media(id) ON DELETE SET NULL',
             tbl, short_name);
           RAISE NOTICE '  Added FK constraint: decor_svg_fk_%', short_name;
         EXCEPTION
           WHEN duplicate_object THEN
             RAISE NOTICE '  FK constraint already exists: decor_svg_fk_%', short_name;
           WHEN others THEN
             RAISE NOTICE '  Could not add FK constraint: %', SQLERRM;
         END;

         -- Create index
         EXECUTE format('CREATE INDEX IF NOT EXISTS decor_svg_idx_%s ON %I (decor_pattern_custom_svg_id)',
           short_name, tbl);

         RAISE NOTICE '  Successfully processed table: %', tbl;

       EXCEPTION
         WHEN undefined_table THEN
           RAISE NOTICE '  Table does not exist: %', tbl;
         WHEN others THEN
           RAISE NOTICE '  Error processing table %: %', tbl, SQLERRM;
       END;
     END LOOP;
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
       BEGIN
         short_name := substring(md5(tbl) from 1 for 8);
         EXECUTE format('ALTER TABLE %I DROP CONSTRAINT IF EXISTS decor_svg_fk_%s', tbl, short_name);
         EXECUTE format('DROP INDEX IF EXISTS decor_svg_idx_%s', short_name);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS decor_pattern_custom_svg_id', tbl);
       EXCEPTION
         WHEN undefined_table THEN
           NULL; -- Ignore if table doesn't exist
       END;
     END LOOP;
   END $$;
  `)
}
