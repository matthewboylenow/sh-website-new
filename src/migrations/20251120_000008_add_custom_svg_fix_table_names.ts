import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add customSvg field - using LOWERCASE table names for information_schema checks
  // PostgreSQL stores unquoted identifiers in lowercase in information_schema
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages__blocks_herobasic',
       '_pages_v__blocks_herobasic',
       'pages__blocks_herowithstats',
       '_pages_v__blocks_herowithstats',
       'pages__blocks_richtextsection',
       '_pages_v__blocks_richtextsection',
       'pages__blocks_columns',
       '_pages_v__blocks_columns',
       'pages__blocks_ctafullwidth',
       '_pages_v__blocks_ctafullwidth',
       'pages__blocks_alertbanner',
       '_pages_v__blocks_alertbanner',
       'pages__blocks_cardgrid',
       '_pages_v__blocks_cardgrid',
       'pages__blocks_bentogrid',
       '_pages_v__blocks_bentogrid',
       'pages__blocks_eventlist',
       '_pages_v__blocks_eventlist',
       'pages__blocks_postlist',
       '_pages_v__blocks_postlist',
       'pages__blocks_bulletinlist',
       '_pages_v__blocks_bulletinlist',
       'pages__blocks_medialist',
       '_pages_v__blocks_medialist',
       'pages__blocks_testimonial',
       '_pages_v__blocks_testimonial',
       'pages__blocks_storyhighlight',
       '_pages_v__blocks_storyhighlight',
       'pages__blocks_faqaccordion',
       '_pages_v__blocks_faqaccordion',
       'pages__blocks_videoembed',
       '_pages_v__blocks_videoembed',
       'pages__blocks_formembed',
       '_pages_v__blocks_formembed',
       'pages__blocks_cta',
       '_pages_v__blocks_cta'
     ];
     tbl TEXT;
     short_name TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists (using lowercase for information_schema)
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = lower(tbl)) THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Add decor_pattern_custom_svg_id column if it doesn't exist
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = lower(tbl) AND column_name = 'decor_pattern_custom_svg_id'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_custom_svg_id column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_custom_svg_id integer', tbl);

           -- Add foreign key constraint to media table with shortened name
           IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'media') THEN
             -- Use a shorter, hashed constraint name to avoid PostgreSQL 63 char limit
             short_name := substring(md5(tbl) from 1 for 8);
             EXECUTE format('ALTER TABLE %I ADD CONSTRAINT decor_svg_fk_%s FOREIGN KEY (decor_pattern_custom_svg_id) REFERENCES media(id) ON DELETE SET NULL',
               tbl,
               short_name
             );
             EXECUTE format('CREATE INDEX IF NOT EXISTS decor_svg_idx_%s ON %I (decor_pattern_custom_svg_id)',
               short_name,
               tbl
             );
             RAISE NOTICE '  Added FK constraint and index: decor_svg_fk_%', short_name;
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
       'pages__blocks_herobasic',
       '_pages_v__blocks_herobasic',
       'pages__blocks_herowithstats',
       '_pages_v__blocks_herowithstats',
       'pages__blocks_richtextsection',
       '_pages_v__blocks_richtextsection',
       'pages__blocks_columns',
       '_pages_v__blocks_columns',
       'pages__blocks_ctafullwidth',
       '_pages_v__blocks_ctafullwidth',
       'pages__blocks_alertbanner',
       '_pages_v__blocks_alertbanner',
       'pages__blocks_cardgrid',
       '_pages_v__blocks_cardgrid',
       'pages__blocks_bentogrid',
       '_pages_v__blocks_bentogrid',
       'pages__blocks_eventlist',
       '_pages_v__blocks_eventlist',
       'pages__blocks_postlist',
       '_pages_v__blocks_postlist',
       'pages__blocks_bulletinlist',
       '_pages_v__blocks_bulletinlist',
       'pages__blocks_medialist',
       '_pages_v__blocks_medialist',
       'pages__blocks_testimonial',
       '_pages_v__blocks_testimonial',
       'pages__blocks_storyhighlight',
       '_pages_v__blocks_storyhighlight',
       'pages__blocks_faqaccordion',
       '_pages_v__blocks_faqaccordion',
       'pages__blocks_videoembed',
       '_pages_v__blocks_videoembed',
       'pages__blocks_formembed',
       '_pages_v__blocks_formembed',
       'pages__blocks_cta',
       '_pages_v__blocks_cta'
     ];
     tbl TEXT;
     short_name TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = lower(tbl)) THEN
         RAISE NOTICE 'Reverting table: %', tbl;

         short_name := substring(md5(tbl) from 1 for 8);

         -- Drop foreign key constraint and index
         EXECUTE format('ALTER TABLE %I DROP CONSTRAINT IF EXISTS decor_svg_fk_%s', tbl, short_name);
         EXECUTE format('DROP INDEX IF EXISTS decor_svg_idx_%s', short_name);

         -- Drop column
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS decor_pattern_custom_svg_id', tbl);
       END IF;
     END LOOP;
   END $$;
  `)
}
