import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Create all missing patterns block tables
 * The Patterns collection was added but the block tables were never created
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create patterns_blocks_hero_basic
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_hero_basic" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "eyebrow" varchar,
      "title" varchar,
      "subtitle" varchar,
      "background_type" varchar DEFAULT 'image',
      "background_image_id" integer,
      "background_video_id" integer,
      "poster_image_id" integer,
      "background_overlay" numeric DEFAULT 40,
      "show_mission_statement" boolean DEFAULT false,
      "mission_animation_mode" varchar DEFAULT 'static',
      "show_welcome_card" boolean DEFAULT false,
      "welcome_card_width" varchar DEFAULT 'md',
      "welcome_eyebrow" varchar,
      "welcome_title" varchar,
      "welcome_subtitle" varchar,
      "min_height" varchar DEFAULT 'screen',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_alignment" varchar DEFAULT 'center',
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_pt" varchar DEFAULT 'lg',
      "appearance_pb" varchar DEFAULT 'lg',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'dots',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'md',
      "decor_pattern_repeat_count" numeric DEFAULT 3,
      "decor_pattern_color" varchar DEFAULT 'primary',
      "decor_pattern_pos" varchar DEFAULT 'top-right',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_show_on_tablet" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_audience" varchar DEFAULT 'all',
      "visibility_start_date" timestamptz,
      "visibility_end_date" timestamptz,
      "animation_preset" varchar DEFAULT 'none',
      "animation_delay" numeric DEFAULT 0,
      "animation_duration" numeric DEFAULT 600,
      "animation_once" boolean DEFAULT true,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_basic_order_idx" ON "patterns_blocks_hero_basic" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_basic_parent_id_idx" ON "patterns_blocks_hero_basic" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_basic_path_idx" ON "patterns_blocks_hero_basic" ("_path")
  `)

  // Create patterns_blocks_hero_basic_links
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_hero_basic_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_basic_links_order_idx" ON "patterns_blocks_hero_basic_links" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_basic_links_parent_id_idx" ON "patterns_blocks_hero_basic_links" ("_parent_id")
  `)

  // Create patterns_blocks_hero_basic_welcome_buttons
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_hero_basic_welcome_buttons" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_basic_welcome_buttons_order_idx" ON "patterns_blocks_hero_basic_welcome_buttons" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_basic_welcome_buttons_parent_id_idx" ON "patterns_blocks_hero_basic_welcome_buttons" ("_parent_id")
  `)

  // Create patterns_blocks_hero_with_stats
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_hero_with_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "eyebrow" varchar,
      "title" varchar,
      "subtitle" varchar,
      "background_type" varchar DEFAULT 'image',
      "background_image_id" integer,
      "background_video_id" integer,
      "poster_image_id" integer,
      "background_overlay" numeric DEFAULT 40,
      "min_height" varchar DEFAULT 'screen',
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_pt" varchar DEFAULT 'lg',
      "appearance_pb" varchar DEFAULT 'lg',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'dots',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'md',
      "decor_pattern_repeat_count" numeric DEFAULT 3,
      "decor_pattern_color" varchar DEFAULT 'primary',
      "decor_pattern_pos" varchar DEFAULT 'top-right',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_show_on_tablet" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_audience" varchar DEFAULT 'all',
      "visibility_start_date" timestamptz,
      "visibility_end_date" timestamptz,
      "animation_preset" varchar DEFAULT 'none',
      "animation_delay" numeric DEFAULT 0,
      "animation_duration" numeric DEFAULT 600,
      "animation_once" boolean DEFAULT true,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_with_stats_order_idx" ON "patterns_blocks_hero_with_stats" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_with_stats_parent_id_idx" ON "patterns_blocks_hero_with_stats" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_with_stats_path_idx" ON "patterns_blocks_hero_with_stats" ("_path")
  `)

  // Create patterns_blocks_hero_with_stats_buttons
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_hero_with_stats_buttons" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_with_stats_buttons_order_idx" ON "patterns_blocks_hero_with_stats_buttons" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_with_stats_buttons_parent_id_idx" ON "patterns_blocks_hero_with_stats_buttons" ("_parent_id")
  `)

  // Create patterns_blocks_hero_with_stats_stats
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_hero_with_stats_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "value" varchar,
      "label" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_with_stats_stats_order_idx" ON "patterns_blocks_hero_with_stats_stats" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_hero_with_stats_stats_parent_id_idx" ON "patterns_blocks_hero_with_stats_stats" ("_parent_id")
  `)

  // Create patterns_blocks_rich_text_section
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_rich_text_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "body" jsonb,
      "max_width" varchar DEFAULT 'prose',
      "typography_font_family" varchar DEFAULT 'default',
      "typography_alignment" varchar DEFAULT 'left',
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_pt" varchar DEFAULT 'lg',
      "appearance_pb" varchar DEFAULT 'lg',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'dots',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'md',
      "decor_pattern_repeat_count" numeric DEFAULT 3,
      "decor_pattern_color" varchar DEFAULT 'primary',
      "decor_pattern_pos" varchar DEFAULT 'top-right',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_show_on_tablet" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_audience" varchar DEFAULT 'all',
      "visibility_start_date" timestamptz,
      "visibility_end_date" timestamptz,
      "animation_preset" varchar DEFAULT 'none',
      "animation_delay" numeric DEFAULT 0,
      "animation_duration" numeric DEFAULT 600,
      "animation_once" boolean DEFAULT true,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_rich_text_section_order_idx" ON "patterns_blocks_rich_text_section" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_rich_text_section_parent_id_idx" ON "patterns_blocks_rich_text_section" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_rich_text_section_path_idx" ON "patterns_blocks_rich_text_section" ("_path")
  `)

  // Create patterns_blocks_columns
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "section_title" varchar,
      "layout" varchar DEFAULT '2-col',
      "column_gap" varchar DEFAULT 'md',
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_pt" varchar DEFAULT 'lg',
      "appearance_pb" varchar DEFAULT 'lg',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'dots',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'md',
      "decor_pattern_repeat_count" numeric DEFAULT 3,
      "decor_pattern_color" varchar DEFAULT 'primary',
      "decor_pattern_pos" varchar DEFAULT 'top-right',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_show_on_tablet" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_audience" varchar DEFAULT 'all',
      "visibility_start_date" timestamptz,
      "visibility_end_date" timestamptz,
      "animation_preset" varchar DEFAULT 'none',
      "animation_delay" numeric DEFAULT 0,
      "animation_duration" numeric DEFAULT 600,
      "animation_once" boolean DEFAULT true,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_columns_order_idx" ON "patterns_blocks_columns" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_columns_parent_id_idx" ON "patterns_blocks_columns" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_columns_path_idx" ON "patterns_blocks_columns" ("_path")
  `)

  // Create patterns_blocks_columns_columns
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_columns_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "content_type" varchar DEFAULT 'text',
      "title" varchar,
      "body" jsonb,
      "icon_id" integer,
      "image_id" integer,
      "video_id" integer,
      "video_poster_id" integer,
      "video_embed" varchar,
      "custom_code" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_columns_columns_order_idx" ON "patterns_blocks_columns_columns" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_columns_columns_parent_id_idx" ON "patterns_blocks_columns_columns" ("_parent_id")
  `)

  // Create patterns_blocks_columns_columns_links
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_columns_columns_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_columns_columns_links_order_idx" ON "patterns_blocks_columns_columns_links" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_columns_columns_links_parent_id_idx" ON "patterns_blocks_columns_columns_links" ("_parent_id")
  `)

  // Create patterns_blocks_cta_full_width
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_cta_full_width" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "eyebrow" varchar,
      "title" varchar,
      "body" jsonb,
      "background_image_id" integer,
      "background_overlay" numeric DEFAULT 40,
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_full_width" boolean DEFAULT true,
      "appearance_pt" varchar DEFAULT 'lg',
      "appearance_pb" varchar DEFAULT 'lg',
      "appearance_bg_variant" varchar DEFAULT 'primary',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'dots',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'md',
      "decor_pattern_repeat_count" numeric DEFAULT 3,
      "decor_pattern_color" varchar DEFAULT 'primary',
      "decor_pattern_pos" varchar DEFAULT 'top-right',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_show_on_tablet" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_audience" varchar DEFAULT 'all',
      "visibility_start_date" timestamptz,
      "visibility_end_date" timestamptz,
      "animation_preset" varchar DEFAULT 'none',
      "animation_delay" numeric DEFAULT 0,
      "animation_duration" numeric DEFAULT 600,
      "animation_once" boolean DEFAULT true,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_full_width_order_idx" ON "patterns_blocks_cta_full_width" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_full_width_parent_id_idx" ON "patterns_blocks_cta_full_width" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_full_width_path_idx" ON "patterns_blocks_cta_full_width" ("_path")
  `)

  // Create patterns_blocks_cta_full_width_links
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_cta_full_width_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_full_width_links_order_idx" ON "patterns_blocks_cta_full_width_links" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_full_width_links_parent_id_idx" ON "patterns_blocks_cta_full_width_links" ("_parent_id")
  `)

  // Create patterns_blocks_card_grid
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_card_grid" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "subtitle" varchar,
      "source_type" varchar DEFAULT 'manual',
      "collection_slug" varchar,
      "limit" numeric DEFAULT 6,
      "order_by" varchar DEFAULT 'createdAt',
      "columns" numeric DEFAULT 3,
      "card_style" varchar DEFAULT 'default',
      "show_view_all_link" boolean DEFAULT false,
      "view_all_url" varchar,
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_pt" varchar DEFAULT 'lg',
      "appearance_pb" varchar DEFAULT 'lg',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'dots',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'md',
      "decor_pattern_repeat_count" numeric DEFAULT 3,
      "decor_pattern_color" varchar DEFAULT 'primary',
      "decor_pattern_pos" varchar DEFAULT 'top-right',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_show_on_tablet" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_audience" varchar DEFAULT 'all',
      "visibility_start_date" timestamptz,
      "visibility_end_date" timestamptz,
      "animation_preset" varchar DEFAULT 'none',
      "animation_delay" numeric DEFAULT 0,
      "animation_duration" numeric DEFAULT 600,
      "animation_once" boolean DEFAULT true,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_card_grid_order_idx" ON "patterns_blocks_card_grid" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_card_grid_parent_id_idx" ON "patterns_blocks_card_grid" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_card_grid_path_idx" ON "patterns_blocks_card_grid" ("_path")
  `)

  // Create patterns_blocks_card_grid_cards
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_card_grid_cards" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "body" varchar,
      "image_id" integer,
      "url" varchar,
      "badge" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_card_grid_cards_order_idx" ON "patterns_blocks_card_grid_cards" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_card_grid_cards_parent_id_idx" ON "patterns_blocks_card_grid_cards" ("_parent_id")
  `)

  // Create patterns_blocks_testimonial
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_testimonial" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "quote" varchar,
      "name" varchar,
      "role" varchar,
      "image_id" integer,
      "layout" varchar DEFAULT 'centered',
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_pt" varchar DEFAULT 'lg',
      "appearance_pb" varchar DEFAULT 'lg',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'dots',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'md',
      "decor_pattern_repeat_count" numeric DEFAULT 3,
      "decor_pattern_color" varchar DEFAULT 'primary',
      "decor_pattern_pos" varchar DEFAULT 'top-right',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "visibility_show_on_mobile" boolean DEFAULT true,
      "visibility_show_on_tablet" boolean DEFAULT true,
      "visibility_show_on_desktop" boolean DEFAULT true,
      "visibility_audience" varchar DEFAULT 'all',
      "visibility_start_date" timestamptz,
      "visibility_end_date" timestamptz,
      "animation_preset" varchar DEFAULT 'none',
      "animation_delay" numeric DEFAULT 0,
      "animation_duration" numeric DEFAULT 600,
      "animation_once" boolean DEFAULT true,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_testimonial_order_idx" ON "patterns_blocks_testimonial" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_testimonial_parent_id_idx" ON "patterns_blocks_testimonial" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_testimonial_path_idx" ON "patterns_blocks_testimonial" ("_path")
  `)

  // Create patterns_blocks_spacer
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_spacer" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "size" varchar DEFAULT 'md',
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_spacer_order_idx" ON "patterns_blocks_spacer" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_spacer_parent_id_idx" ON "patterns_blocks_spacer" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_spacer_path_idx" ON "patterns_blocks_spacer" ("_path")
  `)

  // Create patterns_blocks_divider
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_divider" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "style" varchar DEFAULT 'solid',
      "thickness" varchar DEFAULT 'thin',
      "width" varchar DEFAULT 'full',
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_pt" varchar DEFAULT 'md',
      "appearance_pb" varchar DEFAULT 'md',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_divider_order_idx" ON "patterns_blocks_divider" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_divider_parent_id_idx" ON "patterns_blocks_divider" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_divider_path_idx" ON "patterns_blocks_divider" ("_path")
  `)

  // Create patterns_blocks_custom_code
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_custom_code" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "code" varchar,
      "language" varchar DEFAULT 'html',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_pt" varchar DEFAULT 'md',
      "appearance_pb" varchar DEFAULT 'md',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_custom_code_order_idx" ON "patterns_blocks_custom_code" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_custom_code_parent_id_idx" ON "patterns_blocks_custom_code" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_custom_code_path_idx" ON "patterns_blocks_custom_code" ("_path")
  `)

  // Create patterns_blocks_cta (CallToAction)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_cta" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "rich_text" jsonb,
      "appearance_alignment" varchar DEFAULT 'center',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_pt" varchar DEFAULT 'lg',
      "appearance_pb" varchar DEFAULT 'lg',
      "appearance_bg_variant" varchar DEFAULT 'default',
      "appearance_custom_bg_color" varchar,
      "appearance_text_color" varchar,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'dots',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'md',
      "decor_pattern_repeat_count" numeric DEFAULT 3,
      "decor_pattern_color" varchar DEFAULT 'primary',
      "decor_pattern_pos" varchar DEFAULT 'top-right',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_order_idx" ON "patterns_blocks_cta" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_parent_id_idx" ON "patterns_blocks_cta" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_path_idx" ON "patterns_blocks_cta" ("_path")
  `)

  // Create patterns_blocks_cta_links
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_cta_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_links_order_idx" ON "patterns_blocks_cta_links" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_cta_links_parent_id_idx" ON "patterns_blocks_cta_links" ("_parent_id")
  `)

  // Create patterns_blocks_content
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_content" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_content_order_idx" ON "patterns_blocks_content" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_content_parent_id_idx" ON "patterns_blocks_content" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_content_path_idx" ON "patterns_blocks_content" ("_path")
  `)

  // Create patterns_blocks_content_columns
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_content_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "size" varchar DEFAULT 'oneThird',
      "rich_text" jsonb,
      "enable_link" boolean DEFAULT false,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_content_columns_order_idx" ON "patterns_blocks_content_columns" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_content_columns_parent_id_idx" ON "patterns_blocks_content_columns" ("_parent_id")
  `)

  // Create patterns_blocks_media_block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_media_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "media_id" integer,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_media_block_order_idx" ON "patterns_blocks_media_block" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_media_block_parent_id_idx" ON "patterns_blocks_media_block" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_media_block_path_idx" ON "patterns_blocks_media_block" ("_path")
  `)

  // Create patterns_blocks_archive
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_archive" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "intro_content" jsonb,
      "populate_by" varchar DEFAULT 'collection',
      "relation_to" varchar DEFAULT 'posts',
      "limit" numeric DEFAULT 10,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_archive_order_idx" ON "patterns_blocks_archive" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_archive_parent_id_idx" ON "patterns_blocks_archive" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_archive_path_idx" ON "patterns_blocks_archive" ("_path")
  `)

  // Create patterns_blocks_form_block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_form_block" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "form_id" integer,
      "enable_intro" boolean DEFAULT false,
      "intro_content" jsonb,
      "block_name" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_form_block_order_idx" ON "patterns_blocks_form_block" ("_order")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_form_block_parent_id_idx" ON "patterns_blocks_form_block" ("_parent_id")
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_blocks_form_block_path_idx" ON "patterns_blocks_form_block" ("_path")
  `)

  // Create patterns_texts (for text search)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_texts" (
      "id" serial PRIMARY KEY,
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "text" varchar
    )
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "patterns_texts_order_parent_idx" ON "patterns_texts" ("order", "parent_id")
  `)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // Rollback not implemented - tables are safe to leave
}
