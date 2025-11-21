import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add new fields to footer table
  await db.execute(sql`
   DO $$
   BEGIN
     -- Add logo_id column if it doesn't exist
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'footer' AND column_name = 'logo_id'
     ) THEN
       ALTER TABLE "footer" ADD COLUMN "logo_id" integer;
       CREATE INDEX IF NOT EXISTS "footer_logo_idx" ON "footer" USING btree ("logo_id");

       -- Add foreign key constraint to media table
       ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_media_fk"
         FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
     END IF;

     -- Add copyright_text column if it doesn't exist
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'footer' AND column_name = 'copyright_text'
     ) THEN
       ALTER TABLE "footer" ADD COLUMN "copyright_text" varchar;
     END IF;
   END $$;
  `)

  // Add new fields to global_settings table
  await db.execute(sql`
   DO $$
   BEGIN
     -- Add website_name column if it doesn't exist
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'global_settings' AND column_name = 'website_name'
     ) THEN
       ALTER TABLE "global_settings" ADD COLUMN "website_name" varchar DEFAULT 'Saint Helen' NOT NULL;
     END IF;

     -- Add favicon_id column if it doesn't exist
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'global_settings' AND column_name = 'favicon_id'
     ) THEN
       ALTER TABLE "global_settings" ADD COLUMN "favicon_id" integer;
       CREATE INDEX IF NOT EXISTS "global_settings_favicon_idx" ON "global_settings" USING btree ("favicon_id");

       -- Add foreign key constraint to media table
       ALTER TABLE "global_settings" ADD CONSTRAINT "global_settings_favicon_media_fk"
         FOREIGN KEY ("favicon_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
     END IF;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove fields from footer table
  await db.execute(sql`
   DO $$
   BEGIN
     ALTER TABLE "footer" DROP CONSTRAINT IF EXISTS "footer_logo_media_fk";
     DROP INDEX IF EXISTS "footer_logo_idx";
     ALTER TABLE "footer" DROP COLUMN IF EXISTS "logo_id";
     ALTER TABLE "footer" DROP COLUMN IF EXISTS "copyright_text";
   END $$;
  `)

  // Remove fields from global_settings table
  await db.execute(sql`
   DO $$
   BEGIN
     ALTER TABLE "global_settings" DROP CONSTRAINT IF EXISTS "global_settings_favicon_media_fk";
     DROP INDEX IF EXISTS "global_settings_favicon_idx";
     ALTER TABLE "global_settings" DROP COLUMN IF EXISTS "favicon_id";
     ALTER TABLE "global_settings" DROP COLUMN IF EXISTS "website_name";
   END $$;
  `)
}
