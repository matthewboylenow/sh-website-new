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

         -- Add decor_pattern_enabled column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_enabled'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_enabled column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_enabled boolean DEFAULT false', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_enabled already exists';
         END IF;

         -- Add decor_pattern_typ column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_typ'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_typ column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_typ text DEFAULT ''text''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_typ already exists';
         END IF;

         -- Add decor_pattern_text column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_text'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_text column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_text text DEFAULT ''CHURCH''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_text already exists';
         END IF;

         -- Add decor_pattern_opacity column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_opacity'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_opacity column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_opacity numeric DEFAULT 5', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_opacity already exists';
         END IF;

         -- Add decor_pattern_sz column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_sz'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_sz column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_sz text DEFAULT ''large''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_sz already exists';
         END IF;

         -- Add decor_pattern_repeat_count column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_repeat_count'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_repeat_count column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_repeat_count numeric DEFAULT 3', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_repeat_count already exists';
         END IF;

         -- Add decor_pattern_color column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_color'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_color column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_color text DEFAULT ''#20336b''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_color already exists';
         END IF;

         -- Add decor_pattern_pos column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_pos'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_pos column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_pos text DEFAULT ''center''', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_pos already exists';
         END IF;

         -- Add decor_pattern_rotation column
         IF NOT EXISTS (
           SELECT 1 FROM information_schema.columns
           WHERE table_name = tbl AND column_name = 'decor_pattern_rotation'
         ) THEN
           RAISE NOTICE '  Creating decor_pattern_rotation column';
           EXECUTE format('ALTER TABLE %I ADD COLUMN decor_pattern_rotation numeric DEFAULT 0', tbl);
         ELSE
           RAISE NOTICE '  decor_pattern_rotation already exists';
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
       'decor_pattern_enabled',
       'decor_pattern_typ',
       'decor_pattern_text',
       'decor_pattern_opacity',
       'decor_pattern_sz',
       'decor_pattern_repeat_count',
       'decor_pattern_color',
       'decor_pattern_pos',
       'decor_pattern_rotation'
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
