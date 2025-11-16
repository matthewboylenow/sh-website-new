import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Create enum types for header appearance (only if they don't exist)
   DO $$ BEGIN
     CREATE TYPE "public"."enum_header_appearance_style" AS ENUM('solid', 'transparent', 'transparentScroll');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum_header_appearance_background_color" AS ENUM('default', 'dark', 'brand', 'transparent');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum_header_nav_items_menu_type" AS ENUM('simple', 'dropdown', 'megamenu');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum_header_nav_items_submenu_items_link_type" AS ENUM('reference', 'custom');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Add new columns to header table (only if they don't exist)
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "logo_id" integer;
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "logo_height" numeric DEFAULT 40;
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "appearance_style" "enum_header_appearance_style" DEFAULT 'solid';
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "appearance_background_color" "enum_header_appearance_background_color" DEFAULT 'default';
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "appearance_sticky_header" boolean DEFAULT true;

   -- Add menu_type to existing header_nav_items table (only if it doesn't exist)
   ALTER TABLE "header_nav_items" ADD COLUMN IF NOT EXISTS "menu_type" "enum_header_nav_items_menu_type" DEFAULT 'simple';

   -- Create submenu table
   CREATE TABLE IF NOT EXISTS "header_nav_items_submenu" (
     "_order" integer NOT NULL,
     "_parent_id" varchar NOT NULL,
     "id" varchar PRIMARY KEY NOT NULL,
     "title" varchar
   );

   -- Create submenu items table
   CREATE TABLE IF NOT EXISTS "header_nav_items_submenu_items" (
     "_order" integer NOT NULL,
     "_parent_id" varchar NOT NULL,
     "id" varchar PRIMARY KEY NOT NULL,
     "link_type" "enum_header_nav_items_submenu_items_link_type" DEFAULT 'reference',
     "link_new_tab" boolean,
     "link_url" varchar,
     "link_label" varchar NOT NULL,
     "description" varchar
   );

   -- Add foreign key constraints (only if they don't exist)
   DO $$ BEGIN
     ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "header_nav_items_submenu" ADD CONSTRAINT "header_nav_items_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "header_nav_items_submenu_items" ADD CONSTRAINT "header_nav_items_submenu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "header_nav_items_submenu"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Create indexes
   CREATE INDEX IF NOT EXISTS "header_logo_idx" ON "header" USING btree ("logo_id");
   CREATE INDEX IF NOT EXISTS "header_nav_items_submenu_order_idx" ON "header_nav_items_submenu" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "header_nav_items_submenu_parent_idx" ON "header_nav_items_submenu" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "header_nav_items_submenu_items_order_idx" ON "header_nav_items_submenu_items" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "header_nav_items_submenu_items_parent_idx" ON "header_nav_items_submenu_items" USING btree ("_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Drop indexes
   DROP INDEX IF EXISTS "header_logo_idx";
   DROP INDEX IF EXISTS "header_nav_items_submenu_order_idx";
   DROP INDEX IF EXISTS "header_nav_items_submenu_parent_idx";
   DROP INDEX IF EXISTS "header_nav_items_submenu_items_order_idx";
   DROP INDEX IF EXISTS "header_nav_items_submenu_items_parent_idx";

   -- Drop foreign key constraints
   ALTER TABLE "header" DROP CONSTRAINT IF EXISTS "header_logo_id_media_id_fk";
   ALTER TABLE "header_nav_items_submenu" DROP CONSTRAINT IF EXISTS "header_nav_items_submenu_parent_id_fk";
   ALTER TABLE "header_nav_items_submenu_items" DROP CONSTRAINT IF EXISTS "header_nav_items_submenu_items_parent_id_fk";

   -- Drop tables
   DROP TABLE IF EXISTS "header_nav_items_submenu_items";
   DROP TABLE IF EXISTS "header_nav_items_submenu";

   -- Remove columns from header table
   ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "menu_type";
   ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_id";
   ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_height";
   ALTER TABLE "header" DROP COLUMN IF EXISTS "appearance_style";
   ALTER TABLE "header" DROP COLUMN IF EXISTS "appearance_background_color";
   ALTER TABLE "header" DROP COLUMN IF EXISTS "appearance_sticky_header";

   -- Drop enum types
   DROP TYPE IF EXISTS "public"."enum_header_nav_items_submenu_items_link_type";
   DROP TYPE IF EXISTS "public"."enum_header_nav_items_link_type";
   DROP TYPE IF EXISTS "public"."enum_header_nav_items_menu_type";
   DROP TYPE IF EXISTS "public"."enum_header_appearance_background_color";
   DROP TYPE IF EXISTS "public"."enum_header_appearance_style";
  `)
}
