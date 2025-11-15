import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_basic_min_height" AS ENUM('small', 'default', 'large', 'fullscreen', 'auto');
  CREATE TYPE "public"."enum_pages_blocks_hero_basic_typography_font_family" AS ENUM('default', 'heading', 'body', 'mono');
  CREATE TYPE "public"."enum_pages_blocks_hero_basic_typography_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_hero_with_stats_min_height" AS ENUM('small', 'default', 'large', 'fullscreen', 'auto');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_section_typography_font_family" AS ENUM('default', 'heading', 'body', 'mono');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_section_typography_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_min_height" AS ENUM('small', 'default', 'large', 'fullscreen', 'auto');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_typography_font_family" AS ENUM('default', 'heading', 'body', 'mono');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_typography_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_with_stats_min_height" AS ENUM('small', 'default', 'large', 'fullscreen', 'auto');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_section_typography_font_family" AS ENUM('default', 'heading', 'body', 'mono');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_section_typography_alignment" AS ENUM('left', 'center', 'right');
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "min_height" "enum_pages_blocks_hero_basic_min_height" DEFAULT 'default';
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "typography_font_family" "enum_pages_blocks_hero_basic_typography_font_family" DEFAULT 'default';
  ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN "typography_alignment" "enum_pages_blocks_hero_basic_typography_alignment" DEFAULT 'left';
  ALTER TABLE "pages_blocks_hero_with_stats" ADD COLUMN "min_height" "enum_pages_blocks_hero_with_stats_min_height" DEFAULT 'default';
  ALTER TABLE "pages_blocks_rich_text_section" ADD COLUMN "typography_font_family" "enum_pages_blocks_rich_text_section_typography_font_family" DEFAULT 'default';
  ALTER TABLE "pages_blocks_rich_text_section" ADD COLUMN "typography_alignment" "enum_pages_blocks_rich_text_section_typography_alignment" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "min_height" "enum__pages_v_blocks_hero_basic_min_height" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "typography_font_family" "enum__pages_v_blocks_hero_basic_typography_font_family" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN "typography_alignment" "enum__pages_v_blocks_hero_basic_typography_alignment" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD COLUMN "min_height" "enum__pages_v_blocks_hero_with_stats_min_height" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_rich_text_section" ADD COLUMN "typography_font_family" "enum__pages_v_blocks_rich_text_section_typography_font_family" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_rich_text_section" ADD COLUMN "typography_alignment" "enum__pages_v_blocks_rich_text_section_typography_alignment" DEFAULT 'left';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "min_height";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "typography_font_family";
  ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN "typography_alignment";
  ALTER TABLE "pages_blocks_hero_with_stats" DROP COLUMN "min_height";
  ALTER TABLE "pages_blocks_rich_text_section" DROP COLUMN "typography_font_family";
  ALTER TABLE "pages_blocks_rich_text_section" DROP COLUMN "typography_alignment";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "min_height";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "typography_font_family";
  ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN "typography_alignment";
  ALTER TABLE "_pages_v_blocks_hero_with_stats" DROP COLUMN "min_height";
  ALTER TABLE "_pages_v_blocks_rich_text_section" DROP COLUMN "typography_font_family";
  ALTER TABLE "_pages_v_blocks_rich_text_section" DROP COLUMN "typography_alignment";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_min_height";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_typography_font_family";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_typography_alignment";
  DROP TYPE "public"."enum_pages_blocks_hero_with_stats_min_height";
  DROP TYPE "public"."enum_pages_blocks_rich_text_section_typography_font_family";
  DROP TYPE "public"."enum_pages_blocks_rich_text_section_typography_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_min_height";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_typography_font_family";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_typography_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_with_stats_min_height";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_section_typography_font_family";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_section_typography_alignment";`)
}
