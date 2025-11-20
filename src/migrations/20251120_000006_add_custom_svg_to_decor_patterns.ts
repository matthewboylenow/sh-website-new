import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add customSvg field to all block tables that have decorPattern
  // This allows users to upload custom SVG patterns
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
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Add decor_pattern_custom_svg_id column if it doesn't exist
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_custom_svg_id'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_custom_svg_id column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_custom_svg_id integer', tbl);

           -- Add foreign key constraint to media table if it exists
           IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'media') THEN
             EXECUTE format('ALTER TABLE %I ADD CONSTRAINT %I FOREIGN KEY (decor_pattern_custom_svg_id) REFERENCES media(id) ON DELETE SET NULL',
               tbl,
               tbl || '_decor_pattern_custom_svg_fk'
             );
             EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (decor_pattern_custom_svg_id)',
               tbl || '_decor_pattern_custom_svg_idx',
               tbl
             );
           END IF;
         ELSE
           RAISE NOTICE '  decor_pattern_custom_svg_id already exists';
         END IF;

       ELSE
         RAISE NOTICE 'Table % does not exist, skipping', tbl;
       END IF;
     END LOOP;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove customSvg field from all block tables
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
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Reverting table: %', tbl;

         -- Drop foreign key constraint and index
         EXECUTE format('ALTER TABLE %I DROP CONSTRAINT IF EXISTS %I', tbl, tbl || '_decor_pattern_custom_svg_fk');
         EXECUTE format('DROP INDEX IF EXISTS %I', tbl || '_decor_pattern_custom_svg_idx');

         -- Drop column
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS decor_pattern_custom_svg_id', tbl);
       END IF;
     END LOOP;
   END $$;
  `)
}
