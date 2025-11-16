import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Create enum types for text colors
   DO $$ BEGIN
     CREATE TYPE "public"."enum_header_appearance_text_color" AS ENUM('auto', 'light', 'dark');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum_footer_appearance_background_color" AS ENUM('default', 'dark', 'brand', 'surface');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum_footer_appearance_text_color" AS ENUM('auto', 'light', 'dark');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Migrate existing backgroundColor to backgroundColorDesktop (for backward compatibility)
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "appearance_background_color_desktop" "enum_header_appearance_background_color";
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "appearance_background_color_mobile" "enum_header_appearance_background_color";
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "appearance_text_color_desktop" "enum_header_appearance_text_color" DEFAULT 'auto';
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "appearance_text_color_mobile" "enum_header_appearance_text_color" DEFAULT 'auto';

   -- Copy existing backgroundColor value to new desktop/mobile fields if they exist
   UPDATE "header"
   SET "appearance_background_color_desktop" = "appearance_background_color",
       "appearance_background_color_mobile" = "appearance_background_color"
   WHERE "appearance_background_color" IS NOT NULL
     AND "appearance_background_color_desktop" IS NULL;

   -- Set defaults for new fields if backgroundColor doesn't exist
   UPDATE "header"
   SET "appearance_background_color_desktop" = 'default',
       "appearance_background_color_mobile" = 'default'
   WHERE "appearance_background_color_desktop" IS NULL;

   -- Add appearance fields to footer table
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "appearance_background_color_desktop" "enum_footer_appearance_background_color" DEFAULT 'dark';
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "appearance_background_color_mobile" "enum_footer_appearance_background_color" DEFAULT 'dark';
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "appearance_text_color_desktop" "enum_footer_appearance_text_color" DEFAULT 'auto';
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "appearance_text_color_mobile" "enum_footer_appearance_text_color" DEFAULT 'auto';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Remove appearance columns from footer table
   ALTER TABLE "footer" DROP COLUMN IF EXISTS "appearance_background_color_desktop";
   ALTER TABLE "footer" DROP COLUMN IF EXISTS "appearance_background_color_mobile";
   ALTER TABLE "footer" DROP COLUMN IF EXISTS "appearance_text_color_desktop";
   ALTER TABLE "footer" DROP COLUMN IF EXISTS "appearance_text_color_mobile";

   -- Remove new header columns
   ALTER TABLE "header" DROP COLUMN IF EXISTS "appearance_background_color_desktop";
   ALTER TABLE "header" DROP COLUMN IF EXISTS "appearance_background_color_mobile";
   ALTER TABLE "header" DROP COLUMN IF EXISTS "appearance_text_color_desktop";
   ALTER TABLE "header" DROP COLUMN IF EXISTS "appearance_text_color_mobile";

   -- Drop enum types
   DROP TYPE IF EXISTS "public"."enum_footer_appearance_text_color";
   DROP TYPE IF EXISTS "public"."enum_footer_appearance_background_color";
   DROP TYPE IF EXISTS "public"."enum_header_appearance_text_color";
  `)
}
