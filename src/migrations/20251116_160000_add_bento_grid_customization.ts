import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Create enum types for bento grid item customization
   DO $$ BEGIN
     CREATE TYPE "public"."enum_pages_blocks_bento_grid_items_color_variant" AS ENUM('default', 'brand', 'gold', 'dark', 'gradientBlue', 'gradientGold');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum_pages_blocks_bento_grid_items_link_type" AS ENUM('text', 'button');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_bento_grid_items_color_variant" AS ENUM('default', 'brand', 'gold', 'dark', 'gradientBlue', 'gradientGold');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_bento_grid_items_link_type" AS ENUM('text', 'button');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Add new columns to bento grid items table
   ALTER TABLE "pages_blocks_bento_grid_items" ADD COLUMN IF NOT EXISTS "color_variant" "enum_pages_blocks_bento_grid_items_color_variant" DEFAULT 'default';
   ALTER TABLE "pages_blocks_bento_grid_items" ADD COLUMN IF NOT EXISTS "link_type" "enum_pages_blocks_bento_grid_items_link_type" DEFAULT 'text';
   ALTER TABLE "pages_blocks_bento_grid_items" ADD COLUMN IF NOT EXISTS "link_text" varchar DEFAULT 'Learn more';
   ALTER TABLE "pages_blocks_bento_grid_items" ADD COLUMN IF NOT EXISTS "button_appearance" varchar DEFAULT 'default';

   -- Add to version tables
   ALTER TABLE "_pages_v_blocks_bento_grid_items" ADD COLUMN IF NOT EXISTS "color_variant" "enum__pages_v_blocks_bento_grid_items_color_variant" DEFAULT 'default';
   ALTER TABLE "_pages_v_blocks_bento_grid_items" ADD COLUMN IF NOT EXISTS "link_type" "enum__pages_v_blocks_bento_grid_items_link_type" DEFAULT 'text';
   ALTER TABLE "_pages_v_blocks_bento_grid_items" ADD COLUMN IF NOT EXISTS "link_text" varchar DEFAULT 'Learn more';
   ALTER TABLE "_pages_v_blocks_bento_grid_items" ADD COLUMN IF NOT EXISTS "button_appearance" varchar DEFAULT 'default';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Remove columns
   ALTER TABLE "pages_blocks_bento_grid_items" DROP COLUMN IF EXISTS "color_variant";
   ALTER TABLE "pages_blocks_bento_grid_items" DROP COLUMN IF EXISTS "link_type";
   ALTER TABLE "pages_blocks_bento_grid_items" DROP COLUMN IF EXISTS "link_text";
   ALTER TABLE "pages_blocks_bento_grid_items" DROP COLUMN IF EXISTS "button_appearance";

   ALTER TABLE "_pages_v_blocks_bento_grid_items" DROP COLUMN IF EXISTS "color_variant";
   ALTER TABLE "_pages_v_blocks_bento_grid_items" DROP COLUMN IF EXISTS "link_type";
   ALTER TABLE "_pages_v_blocks_bento_grid_items" DROP COLUMN IF EXISTS "link_text";
   ALTER TABLE "_pages_v_blocks_bento_grid_items" DROP COLUMN IF EXISTS "button_appearance";

   -- Drop enum types
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_bento_grid_items_link_type";
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_bento_grid_items_color_variant";
   DROP TYPE IF EXISTS "public"."enum_pages_blocks_bento_grid_items_link_type";
   DROP TYPE IF EXISTS "public"."enum_pages_blocks_bento_grid_items_color_variant";
  `)
}
