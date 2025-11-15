import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_basic_welcome_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_basic_welcome_buttons_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_basic_background_type" AS ENUM('none', 'image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_hero_basic_mission_animation_mode" AS ENUM('rotating', 'lineByLine');
  CREATE TYPE "public"."enum_pages_blocks_hero_with_stats_background_type" AS ENUM('none', 'image', 'video');
  CREATE TYPE "public"."enum_pages_blocks_custom_code_language" AS ENUM('html', 'css', 'javascript');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_welcome_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_welcome_buttons_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_background_type" AS ENUM('none', 'image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_mission_animation_mode" AS ENUM('rotating', 'lineByLine');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_with_stats_background_type" AS ENUM('none', 'image', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_code_language" AS ENUM('html', 'css', 'javascript');
  CREATE TABLE "pages_blocks_hero_basic_welcome_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_basic_welcome_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_basic_welcome_buttons_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_custom_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"language" "enum_pages_blocks_custom_code_language" DEFAULT 'html',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_basic_welcome_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_basic_welcome_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_basic_welcome_buttons_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"language" "enum__pages_v_blocks_custom_code_language" DEFAULT 'html',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "background_type" "enum_pages_blocks_hero_basic_background_type" DEFAULT 'none';
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "background_video_id" integer;
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "poster_image_id" integer;
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "show_mission_statement" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "mission_animation_mode" "enum_pages_blocks_hero_basic_mission_animation_mode" DEFAULT 'rotating';
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "show_welcome_card" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "welcome_eyebrow" varchar DEFAULT 'WELCOME';
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "welcome_title" varchar DEFAULT 'We''re glad you''re here.';
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "welcome_subtitle" varchar;
  ALTER TABLE "pages_blocks_hero_with_stats" ADD COLUMN "background_type" "enum_pages_blocks_hero_with_stats_background_type" DEFAULT 'none';
  ALTER TABLE "pages_blocks_hero_with_stats" ADD COLUMN "background_video_id" integer;
  ALTER TABLE "pages_blocks_hero_with_stats" ADD COLUMN "poster_image_id" integer;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "background_type" "enum__pages_v_blocks_hero_basic_background_type" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "background_video_id" integer;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "poster_image_id" integer;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "show_mission_statement" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "mission_animation_mode" "enum__pages_v_blocks_hero_basic_mission_animation_mode" DEFAULT 'rotating';
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "show_welcome_card" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "welcome_eyebrow" varchar DEFAULT 'WELCOME';
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "welcome_title" varchar DEFAULT 'We''re glad you''re here.';
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "welcome_subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD COLUMN "background_type" "enum__pages_v_blocks_hero_with_stats_background_type" DEFAULT 'none';
  ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD COLUMN "background_video_id" integer;
  ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD COLUMN "poster_image_id" integer;
  ALTER TABLE "pages_blocks_hero_basic_welcome_buttons" ADD CONSTRAINT "pages_blocks_hero_basic_welcome_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_basic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_code" ADD CONSTRAINT "pages_blocks_custom_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_basic_welcome_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_basic_welcome_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_basic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_code" ADD CONSTRAINT "_pages_v_blocks_custom_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_basic_welcome_buttons_order_idx" ON "pages_blocks_hero_basic_welcome_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_basic_welcome_buttons_parent_id_idx" ON "pages_blocks_hero_basic_welcome_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_code_order_idx" ON "pages_blocks_custom_code" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_code_parent_id_idx" ON "pages_blocks_custom_code" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_code_path_idx" ON "pages_blocks_custom_code" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_basic_welcome_buttons_order_idx" ON "_pages_v_blocks_hero_basic_welcome_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_basic_welcome_buttons_parent_id_idx" ON "_pages_v_blocks_hero_basic_welcome_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_code_order_idx" ON "_pages_v_blocks_custom_code" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_code_parent_id_idx" ON "_pages_v_blocks_custom_code" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_code_path_idx" ON "_pages_v_blocks_custom_code" USING btree ("_path");
  ALTER TABLE "pages_blocks_hero_basic" ADD CONSTRAINT "pages_blocks_hero_basic_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_basic" ADD CONSTRAINT "pages_blocks_hero_basic_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_stats" ADD CONSTRAINT "pages_blocks_hero_with_stats_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_stats" ADD CONSTRAINT "pages_blocks_hero_with_stats_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD CONSTRAINT "_pages_v_blocks_hero_basic_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD CONSTRAINT "_pages_v_blocks_hero_basic_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD CONSTRAINT "_pages_v_blocks_hero_with_stats_background_video_id_media_id_fk" FOREIGN KEY ("background_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD CONSTRAINT "_pages_v_blocks_hero_with_stats_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_basic_background_video_idx" ON "pages_blocks_hero_basic" USING btree ("background_video_id");
  CREATE INDEX "pages_blocks_hero_basic_poster_image_idx" ON "pages_blocks_hero_basic" USING btree ("poster_image_id");
  CREATE INDEX "pages_blocks_hero_with_stats_background_video_idx" ON "pages_blocks_hero_with_stats" USING btree ("background_video_id");
  CREATE INDEX "pages_blocks_hero_with_stats_poster_image_idx" ON "pages_blocks_hero_with_stats" USING btree ("poster_image_id");
  CREATE INDEX "_pages_v_blocks_hero_basic_background_video_idx" ON "_pages_v_blocks_hero_basic" USING btree ("background_video_id");
  CREATE INDEX "_pages_v_blocks_hero_basic_poster_image_idx" ON "_pages_v_blocks_hero_basic" USING btree ("poster_image_id");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_background_video_idx" ON "_pages_v_blocks_hero_with_stats" USING btree ("background_video_id");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_poster_image_idx" ON "_pages_v_blocks_hero_with_stats" USING btree ("poster_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_basic_welcome_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_custom_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_basic_welcome_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_custom_code" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_basic_welcome_buttons" CASCADE;
  DROP TABLE "pages_blocks_custom_code" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_basic_welcome_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_code" CASCADE;
  ALTER TABLE "pages_blocks_hero_basic" DROP CONSTRAINT "pages_blocks_hero_basic_background_video_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_hero_basic" DROP CONSTRAINT "pages_blocks_hero_basic_poster_image_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_hero_with_stats" DROP CONSTRAINT "pages_blocks_hero_with_stats_background_video_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_hero_with_stats" DROP CONSTRAINT "pages_blocks_hero_with_stats_poster_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP CONSTRAINT "_pages_v_blocks_hero_basic_background_video_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP CONSTRAINT "_pages_v_blocks_hero_basic_poster_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_with_stats" DROP CONSTRAINT "_pages_v_blocks_hero_with_stats_background_video_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_with_stats" DROP CONSTRAINT "_pages_v_blocks_hero_with_stats_poster_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_basic_background_video_idx";
  DROP INDEX "pages_blocks_hero_basic_poster_image_idx";
  DROP INDEX "pages_blocks_hero_with_stats_background_video_idx";
  DROP INDEX "pages_blocks_hero_with_stats_poster_image_idx";
  DROP INDEX "_pages_v_blocks_hero_basic_background_video_idx";
  DROP INDEX "_pages_v_blocks_hero_basic_poster_image_idx";
  DROP INDEX "_pages_v_blocks_hero_with_stats_background_video_idx";
  DROP INDEX "_pages_v_blocks_hero_with_stats_poster_image_idx";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "background_type";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "background_video_id";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "poster_image_id";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "show_mission_statement";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "mission_animation_mode";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "show_welcome_card";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "welcome_eyebrow";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "welcome_title";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "welcome_subtitle";
  ALTER TABLE "pages_blocks_hero_with_stats" DROP COLUMN "background_type";
  ALTER TABLE "pages_blocks_hero_with_stats" DROP COLUMN "background_video_id";
  ALTER TABLE "pages_blocks_hero_with_stats" DROP COLUMN "poster_image_id";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "background_type";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "background_video_id";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "poster_image_id";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "show_mission_statement";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "mission_animation_mode";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "show_welcome_card";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "welcome_eyebrow";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "welcome_title";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "welcome_subtitle";
  ALTER TABLE "_pages_v_blocks_hero_with_stats" DROP COLUMN "background_type";
  ALTER TABLE "_pages_v_blocks_hero_with_stats" DROP COLUMN "background_video_id";
  ALTER TABLE "_pages_v_blocks_hero_with_stats" DROP COLUMN "poster_image_id";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_welcome_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_welcome_buttons_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_background_type";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_mission_animation_mode";
  DROP TYPE "public"."enum_pages_blocks_hero_with_stats_background_type";
  DROP TYPE "public"."enum_pages_blocks_custom_code_language";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_welcome_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_welcome_buttons_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_mission_animation_mode";
  DROP TYPE "public"."enum__pages_v_blocks_hero_with_stats_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_custom_code_language";`)
}
