import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add appearance columns to CTA block tables that were missed in previous migrations
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_cta',
       '_pages_v_blocks_cta'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Add appearance_alignment
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_alignment'
         ) THEN
           RAISE NOTICE '  Creating appearance_alignment column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_alignment text DEFAULT ''left''', tbl);
         ELSE
           RAISE NOTICE '  appearance_alignment already exists';
         END IF;

         -- Add appearance_full_width
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_full_width'
         ) THEN
           RAISE NOTICE '  Creating appearance_full_width column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_full_width boolean DEFAULT false', tbl);
         ELSE
           RAISE NOTICE '  appearance_full_width already exists';
         END IF;

         -- Add appearance_pt
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_pt'
         ) THEN
           RAISE NOTICE '  Creating appearance_pt column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_pt text DEFAULT ''default''', tbl);
         ELSE
           RAISE NOTICE '  appearance_pt already exists';
         END IF;

         -- Add appearance_pb
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_pb'
         ) THEN
           RAISE NOTICE '  Creating appearance_pb column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_pb text DEFAULT ''default''', tbl);
         ELSE
           RAISE NOTICE '  appearance_pb already exists';
         END IF;

         -- Add appearance_bg_variant
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_bg_variant'
         ) THEN
           RAISE NOTICE '  Creating appearance_bg_variant column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_bg_variant text DEFAULT ''light''', tbl);
         ELSE
           RAISE NOTICE '  appearance_bg_variant already exists';
         END IF;

         -- Add appearance_custom_bg_color
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_custom_bg_color'
         ) THEN
           RAISE NOTICE '  Creating appearance_custom_bg_color column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_custom_bg_color text', tbl);
         ELSE
           RAISE NOTICE '  appearance_custom_bg_color already exists';
         END IF;

         -- Add appearance_text_color
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'appearance_text_color'
         ) THEN
           RAISE NOTICE '  Creating appearance_text_color column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN appearance_text_color text DEFAULT ''auto''', tbl);
         ELSE
           RAISE NOTICE '  appearance_text_color already exists';
         END IF;

       ELSE
         RAISE NOTICE 'Table % does not exist, skipping', tbl;
       END IF;
     END LOOP;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove appearance columns from CTA block tables
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_cta',
       '_pages_v_blocks_cta'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Reverting table: %', tbl;

         -- Drop all appearance columns
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS appearance_alignment', tbl);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS appearance_full_width', tbl);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS appearance_pt', tbl);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS appearance_pb', tbl);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS appearance_bg_variant', tbl);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS appearance_custom_bg_color', tbl);
         EXECUTE format('ALTER TABLE %I DROP COLUMN IF EXISTS appearance_text_color', tbl);
       END IF;
     END LOOP;
   END $$;
  `)
}
