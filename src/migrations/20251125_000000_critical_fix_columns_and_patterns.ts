import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * CRITICAL FIX: Add missing columns and create Patterns table
 *
 * This migration fixes two critical production issues:
 * 1. Missing custom_code column in columns blocks (version table)
 * 2. Missing Patterns collection tables entirely
 */

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // ===================================================================
  // PART 1: Fix missing custom_code column in Columns block
  // ===================================================================
  await db.execute(sql`
    DO $$
    BEGIN
      -- Main table
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'pages_blocks_columns_columns' AND column_name = 'custom_code'
      ) THEN
        ALTER TABLE "pages_blocks_columns_columns" ADD COLUMN "custom_code" varchar;
      END IF;

      -- Version table (THIS WAS MISSING AND CAUSING THE ERROR)
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = '_pages_v_blocks_columns_columns' AND column_name = 'custom_code'
      ) THEN
        ALTER TABLE "_pages_v_blocks_columns_columns" ADD COLUMN "custom_code" varchar;
      END IF;
    END $$;
  `)

  // ===================================================================
  // PART 2: Create Patterns collection tables
  // ===================================================================

  // Create main patterns table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "description" varchar,
      "category" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)

  // Create patterns_rels table for relationships
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer,
      "posts_id" integer,
      "categories_id" integer
    );
  `)

  // Create patterns_texts table for text search
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_texts" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "text" varchar
    );
  `)

  // Create all pattern block tables - HeroBasic
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_hero_basic" (
      "id" serial PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_path" varchar NOT NULL,
      "_uuid" varchar,
      "_parent_id" integer NOT NULL,
      "eyebrow" varchar,
      "title" varchar,
      "subtitle" varchar,
      "background_type" varchar DEFAULT 'image',
      "background_image_id" integer,
      "background_video_id" integer,
      "poster_image_id" integer,
      "background_overlay" varchar DEFAULT 'dark',
      "show_mission_statement" boolean DEFAULT false,
      "mission_animation_mode" varchar DEFAULT 'fadeIn',
      "show_welcome_card" boolean DEFAULT false,
      "welcome_card_width" varchar,
      "welcome_eyebrow" varchar,
      "welcome_title" varchar,
      "welcome_subtitle" varchar,
      "min_height" varchar DEFAULT '60vh',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_alignment" varchar DEFAULT 'center',
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_pt" varchar DEFAULT 'default',
      "appearance_pb" varchar DEFAULT 'default',
      "appearance_bg_variant" varchar DEFAULT 'none',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'cross',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'medium',
      "decor_pattern_repeat_count" numeric DEFAULT 8,
      "decor_pattern_color" varchar DEFAULT 'gray',
      "decor_pattern_pos" varchar DEFAULT 'topRight',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_show_on_tablet" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_audience" varchar DEFAULT 'all',
      "animation_preset" varchar DEFAULT 'none',
      "animation_delay" numeric DEFAULT 0,
      "animation_duration" numeric DEFAULT 600,
      "animation_once" boolean DEFAULT true,
      "block_name" varchar
    );
  `)

  // Create patterns hero basic links table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_hero_basic_links" (
      "id" serial PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_uuid" varchar,
      "_parent_id" integer NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'primary'
    );
  `)

  // Create patterns hero basic welcome buttons table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_hero_basic_welcome_buttons" (
      "id" serial PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_uuid" varchar,
      "_parent_id" integer NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'primary'
    );
  `)

  // Logging statement to track migration execution
  await payload.logger.info('Successfully created Patterns collection tables and fixed Columns custom_code column')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove custom_code column
  await db.execute(sql`
    ALTER TABLE "pages_blocks_columns_columns" DROP COLUMN IF EXISTS "custom_code";
    ALTER TABLE "_pages_v_blocks_columns_columns" DROP COLUMN IF EXISTS "custom_code";
  `)

  // Drop Patterns tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "patterns_layout_blocks_hero_basic_welcome_buttons";
    DROP TABLE IF EXISTS "patterns_layout_blocks_hero_basic_links";
    DROP TABLE IF EXISTS "patterns_layout_blocks_hero_basic";
    DROP TABLE IF EXISTS "patterns_texts";
    DROP TABLE IF EXISTS "patterns_rels";
    DROP TABLE IF EXISTS "patterns";
  `)
}
