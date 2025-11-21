import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add customCode field to Columns block
  await db.execute(sql`
   DO $$
   BEGIN
     -- Add custom_code column to pages__blocks_columns_columns
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_columns_columns' AND column_name = 'custom_code'
     ) THEN
       ALTER TABLE "pages__blocks_columns_columns" ADD COLUMN "custom_code" varchar;
     END IF;
   END $$;
  `)

  // Add card customization fields to PostList block
  await db.execute(sql`
   DO $$
   BEGIN
     -- Add show_categories column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_postList' AND column_name = 'show_categories'
     ) THEN
       ALTER TABLE "pages__blocks_postList" ADD COLUMN "show_categories" boolean DEFAULT true;
     END IF;

     -- Add image_size column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_postList' AND column_name = 'image_size'
     ) THEN
       ALTER TABLE "pages__blocks_postList" ADD COLUMN "image_size" varchar DEFAULT 'default';
     END IF;

     -- Add card_background_color column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_postList' AND column_name = 'card_background_color'
     ) THEN
       ALTER TABLE "pages__blocks_postList" ADD COLUMN "card_background_color" varchar;
     END IF;

     -- Add card_title_color column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_postList' AND column_name = 'card_title_color'
     ) THEN
       ALTER TABLE "pages__blocks_postList" ADD COLUMN "card_title_color" varchar;
     END IF;

     -- Add card_text_color column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_postList' AND column_name = 'card_text_color'
     ) THEN
       ALTER TABLE "pages__blocks_postList" ADD COLUMN "card_text_color" varchar;
     END IF;

     -- Add card_category_color column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_postList' AND column_name = 'card_category_color'
     ) THEN
       ALTER TABLE "pages__blocks_postList" ADD COLUMN "card_category_color" varchar;
     END IF;
   END $$;
  `)

  // Add card customization fields to EventList block
  await db.execute(sql`
   DO $$
   BEGIN
     -- Add show_categories column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_eventList' AND column_name = 'show_categories'
     ) THEN
       ALTER TABLE "pages__blocks_eventList" ADD COLUMN "show_categories" boolean DEFAULT true;
     END IF;

     -- Add image_size column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_eventList' AND column_name = 'image_size'
     ) THEN
       ALTER TABLE "pages__blocks_eventList" ADD COLUMN "image_size" varchar DEFAULT 'default';
     END IF;

     -- Add card_background_color column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_eventList' AND column_name = 'card_background_color'
     ) THEN
       ALTER TABLE "pages__blocks_eventList" ADD COLUMN "card_background_color" varchar;
     END IF;

     -- Add card_title_color column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_eventList' AND column_name = 'card_title_color'
     ) THEN
       ALTER TABLE "pages__blocks_eventList" ADD COLUMN "card_title_color" varchar;
     END IF;

     -- Add card_text_color column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_eventList' AND column_name = 'card_text_color'
     ) THEN
       ALTER TABLE "pages__blocks_eventList" ADD COLUMN "card_text_color" varchar;
     END IF;

     -- Add card_category_color column
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_eventList' AND column_name = 'card_category_color'
     ) THEN
       ALTER TABLE "pages__blocks_eventList" ADD COLUMN "card_category_color" varchar;
     END IF;

     -- Add date_badge_color column (specific to EventList)
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'pages__blocks_eventList' AND column_name = 'date_badge_color'
     ) THEN
       ALTER TABLE "pages__blocks_eventList" ADD COLUMN "date_badge_color" varchar;
     END IF;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove customCode field from Columns block
  await db.execute(sql`
   DO $$
   BEGIN
     ALTER TABLE "pages__blocks_columns_columns" DROP COLUMN IF EXISTS "custom_code";
   END $$;
  `)

  // Remove card customization fields from PostList block
  await db.execute(sql`
   DO $$
   BEGIN
     ALTER TABLE "pages__blocks_postList" DROP COLUMN IF EXISTS "show_categories";
     ALTER TABLE "pages__blocks_postList" DROP COLUMN IF EXISTS "image_size";
     ALTER TABLE "pages__blocks_postList" DROP COLUMN IF EXISTS "card_background_color";
     ALTER TABLE "pages__blocks_postList" DROP COLUMN IF EXISTS "card_title_color";
     ALTER TABLE "pages__blocks_postList" DROP COLUMN IF EXISTS "card_text_color";
     ALTER TABLE "pages__blocks_postList" DROP COLUMN IF EXISTS "card_category_color";
   END $$;
  `)

  // Remove card customization fields from EventList block
  await db.execute(sql`
   DO $$
   BEGIN
     ALTER TABLE "pages__blocks_eventList" DROP COLUMN IF EXISTS "show_categories";
     ALTER TABLE "pages__blocks_eventList" DROP COLUMN IF EXISTS "image_size";
     ALTER TABLE "pages__blocks_eventList" DROP COLUMN IF EXISTS "card_background_color";
     ALTER TABLE "pages__blocks_eventList" DROP COLUMN IF EXISTS "card_title_color";
     ALTER TABLE "pages__blocks_eventList" DROP COLUMN IF EXISTS "card_text_color";
     ALTER TABLE "pages__blocks_eventList" DROP COLUMN IF EXISTS "card_category_color";
     ALTER TABLE "pages__blocks_eventList" DROP COLUMN IF EXISTS "date_badge_color";
   END $$;
  `)
}
