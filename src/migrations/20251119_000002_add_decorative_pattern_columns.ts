import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add all decorative pattern columns to BentoGrid tables
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_bento_grid',
       '_pages_v_blocks_bento_grid'
     ];
     tbl TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       -- Check if table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         RAISE NOTICE 'Processing table: %', tbl;

         -- Add decorative_pattern_enabled column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_enabled'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_enabled column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_enabled boolean DEFAULT false', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_enabled already exists';
         END IF;

         -- Add decorative_pattern_type column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_type'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_type column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_type text DEFAULT ''text''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_type already exists';
         END IF;

         -- Add decorative_pattern_text column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_text'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_text column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_text text DEFAULT ''CHURCH''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_text already exists';
         END IF;

         -- Add decorative_pattern_opacity column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_opacity'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_opacity column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_opacity numeric DEFAULT 5', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_opacity already exists';
         END IF;

         -- Add decorative_pattern_size column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_size'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_size column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_size text DEFAULT ''large''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_size already exists';
         END IF;

         -- Add decorative_pattern_repeat_count column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_repeat_count'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_repeat_count column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_repeat_count numeric DEFAULT 3', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_repeat_count already exists';
         END IF;

         -- Add decorative_pattern_color column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_color'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_color column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_color text DEFAULT ''#20336b''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_color already exists';
         END IF;

         -- Add decorative_pattern_position column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_position'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_position column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_position text DEFAULT ''center''', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_position already exists';
         END IF;

         -- Add decorative_pattern_rotation column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decorative_pattern_rotation'
         ) THEN
           RAISE NOTICE '  Creating decorative_pattern_rotation column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decorative_pattern_rotation numeric DEFAULT 0', tbl);
         ELSE
           RAISE NOTICE '  decorative_pattern_rotation already exists';
         END IF;

       ELSE
         RAISE NOTICE 'Table % does not exist, skipping', tbl;
       END IF;
     END LOOP;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove all decorative pattern columns
  await db.execute(sql`
   DO $$
   DECLARE
     tables TEXT[] := ARRAY[
       'pages_blocks_bento_grid',
       '_pages_v_blocks_bento_grid'
     ];
     tbl TEXT;
     columns TEXT[] := ARRAY[
       'decorative_pattern_enabled',
       'decorative_pattern_type',
       'decorative_pattern_text',
       'decorative_pattern_opacity',
       'decorative_pattern_size',
       'decorative_pattern_repeat_count',
       'decorative_pattern_color',
       'decorative_pattern_position',
       'decorative_pattern_rotation'
     ];
     col TEXT;
   BEGIN
     FOREACH tbl IN ARRAY tables
     LOOP
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = tbl) THEN
         FOREACH col IN ARRAY columns
         LOOP
           IF EXISTS (
             SELECT 1 FROM information_schema.columns
             WHERE table_name = tbl AND column_name = col
           ) THEN
             EXECUTE format('ALTER TABLE %I DROP COLUMN %I', tbl, col);
           END IF;
         END LOOP;
       END IF;
     END LOOP;
   END $$;
  `)
}
