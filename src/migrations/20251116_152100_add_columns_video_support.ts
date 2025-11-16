import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Create enum type for column content type
   DO $$ BEGIN
     CREATE TYPE "public"."enum_pages_blocks_columns_columns_content_type" AS ENUM('text', 'image', 'video');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_content_type" AS ENUM('text', 'image', 'video');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Add new columns to pages_blocks_columns_columns table
   ALTER TABLE "pages_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "content_type" "enum_pages_blocks_columns_columns_content_type" DEFAULT 'text';
   ALTER TABLE "pages_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "image_id" integer;
   ALTER TABLE "pages_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "video_id" integer;
   ALTER TABLE "pages_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "video_poster_id" integer;
   ALTER TABLE "pages_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "video_embed" varchar;

   -- Add foreign key constraints
   DO $$ BEGIN
     ALTER TABLE "pages_blocks_columns_columns" ADD CONSTRAINT "pages_blocks_columns_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "pages_blocks_columns_columns" ADD CONSTRAINT "pages_blocks_columns_columns_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "pages_blocks_columns_columns" ADD CONSTRAINT "pages_blocks_columns_columns_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Add to version tables
   ALTER TABLE "_pages_v_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "content_type" "enum__pages_v_blocks_columns_columns_content_type" DEFAULT 'text';
   ALTER TABLE "_pages_v_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "image_id" integer;
   ALTER TABLE "_pages_v_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "video_id" integer;
   ALTER TABLE "_pages_v_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "video_poster_id" integer;
   ALTER TABLE "_pages_v_blocks_columns_columns" ADD COLUMN IF NOT EXISTS "video_embed" varchar;

   -- Add foreign key constraints for version tables
   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_columns_columns" ADD CONSTRAINT "_pages_v_blocks_columns_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_columns_columns" ADD CONSTRAINT "_pages_v_blocks_columns_columns_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TABLE "_pages_v_blocks_columns_columns" ADD CONSTRAINT "_pages_v_blocks_columns_columns_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Remove foreign key constraints
   ALTER TABLE "pages_blocks_columns_columns" DROP CONSTRAINT IF EXISTS "pages_blocks_columns_columns_image_id_media_id_fk";
   ALTER TABLE "pages_blocks_columns_columns" DROP CONSTRAINT IF EXISTS "pages_blocks_columns_columns_video_id_media_id_fk";
   ALTER TABLE "pages_blocks_columns_columns" DROP CONSTRAINT IF EXISTS "pages_blocks_columns_columns_video_poster_id_media_id_fk";

   -- Remove columns from main table
   ALTER TABLE "pages_blocks_columns_columns" DROP COLUMN IF EXISTS "content_type";
   ALTER TABLE "pages_blocks_columns_columns" DROP COLUMN IF EXISTS "image_id";
   ALTER TABLE "pages_blocks_columns_columns" DROP COLUMN IF EXISTS "video_id";
   ALTER TABLE "pages_blocks_columns_columns" DROP COLUMN IF EXISTS "video_poster_id";
   ALTER TABLE "pages_blocks_columns_columns" DROP COLUMN IF EXISTS "video_embed";

   -- Remove foreign key constraints from version tables
   ALTER TABLE "_pages_v_blocks_columns_columns" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_columns_columns_image_id_media_id_fk";
   ALTER TABLE "_pages_v_blocks_columns_columns" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_columns_columns_video_id_media_id_fk";
   ALTER TABLE "_pages_v_blocks_columns_columns" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_columns_columns_video_poster_id_media_id_fk";

   -- Remove columns from version tables
   ALTER TABLE "_pages_v_blocks_columns_columns" DROP COLUMN IF EXISTS "content_type";
   ALTER TABLE "_pages_v_blocks_columns_columns" DROP COLUMN IF EXISTS "image_id";
   ALTER TABLE "_pages_v_blocks_columns_columns" DROP COLUMN IF EXISTS "video_id";
   ALTER TABLE "_pages_v_blocks_columns_columns" DROP COLUMN IF EXISTS "video_poster_id";
   ALTER TABLE "_pages_v_blocks_columns_columns" DROP COLUMN IF EXISTS "video_embed";

   -- Drop enum types
   DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_columns_columns_content_type";
   DROP TYPE IF EXISTS "public"."enum_pages_blocks_columns_columns_content_type";
  `)
}
