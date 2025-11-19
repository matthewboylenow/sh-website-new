import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add missing overlay_strength column to bento grid items tables
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_bento_grid_items',
       '_pages_v_blocks_bento_grid_items'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Add overlay_strength column if it doesn't exist
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'overlay_strength'
         ) THEN
           RAISE NOTICE '  Creating overlay_strength column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN overlay_strength text DEFAULT ''medium''', tbl);
         ELSE
           RAISE NOTICE '  overlay_strength already exists';
         END IF;

       ELSE
         RAISE NOTICE 'Table % does not exist, skipping', tbl;
       END IF;
     END LOOP;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove overlay_strength column
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_bento_grid_items',
       '_pages_v_blocks_bento_grid_items'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         IF EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'overlay_strength'
         ) THEN
           EXECUTE format('ALTER TABLE %I DROP COLUMN overlay_strength', tbl);
         END IF;
       END IF;
     END LOOP;
   END $$;
  `)
}
