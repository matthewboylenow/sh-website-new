import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Create remaining patterns block tables (part 2)
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create patterns_blocks_bento_grid
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_bento_grid" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "subtitle" varchar,
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_bento_grid_order_idx" ON "patterns_blocks_bento_grid" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_bento_grid_parent_id_idx" ON "patterns_blocks_bento_grid" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_bento_grid_path_idx" ON "patterns_blocks_bento_grid" ("_path")`)

  // Create patterns_blocks_bento_grid_items
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_bento_grid_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "description" varchar,
      "image_id" integer,
      "url" varchar,
      "tag" varchar,
      "size" varchar DEFAULT 'normal',
      "image_style" varchar DEFAULT 'cover',
      "overlay_strength" numeric DEFAULT 40,
      "color_variant" varchar DEFAULT 'default',
      "link_type" varchar DEFAULT 'card',
      "link_text" varchar,
      "button_appearance" varchar DEFAULT 'default'
    )
  `)

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_bento_grid_items_order_idx" ON "patterns_blocks_bento_grid_items" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_bento_grid_items_parent_id_idx" ON "patterns_blocks_bento_grid_items" ("_parent_id")`)

  // Create patterns_blocks_event_list
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_event_list" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "subtitle" varchar,
      "mode" varchar DEFAULT 'upcoming',
      "start_date" timestamptz,
      "end_date" timestamptz,
      "limit" numeric DEFAULT 6,
      "layout" varchar DEFAULT 'grid',
      "show_categories" boolean DEFAULT true,
      "image_size" varchar DEFAULT 'md',
      "card_background_color" varchar,
      "card_title_color" varchar,
      "card_text_color" varchar,
      "card_category_color" varchar,
      "date_badge_color" varchar,
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_event_list_order_idx" ON "patterns_blocks_event_list" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_event_list_parent_id_idx" ON "patterns_blocks_event_list" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_event_list_path_idx" ON "patterns_blocks_event_list" ("_path")`)

  // Create patterns_blocks_event_list_category_filter
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_event_list_category_filter" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" varchar,
      "id" serial PRIMARY KEY
    )
  `)

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_event_list_category_filter_order_idx" ON "patterns_blocks_event_list_category_filter" ("order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_event_list_category_filter_parent_id_idx" ON "patterns_blocks_event_list_category_filter" ("parent_id")`)

  // Create patterns_blocks_post_list
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_post_list" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "subtitle" varchar,
      "limit" numeric DEFAULT 6,
      "layout" varchar DEFAULT 'grid',
      "show_categories" boolean DEFAULT true,
      "show_excerpt" boolean DEFAULT true,
      "show_author" boolean DEFAULT true,
      "show_date" boolean DEFAULT true,
      "image_size" varchar DEFAULT 'md',
      "card_background_color" varchar,
      "card_title_color" varchar,
      "card_text_color" varchar,
      "card_category_color" varchar,
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_post_list_order_idx" ON "patterns_blocks_post_list" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_post_list_parent_id_idx" ON "patterns_blocks_post_list" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_post_list_path_idx" ON "patterns_blocks_post_list" ("_path")`)

  // Create patterns_blocks_bulletin_list
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_bulletin_list" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "subtitle" varchar,
      "display_mode" varchar DEFAULT 'recent',
      "limit" numeric DEFAULT 4,
      "show_highlights" boolean DEFAULT true,
      "layout" varchar DEFAULT 'list',
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_bulletin_list_order_idx" ON "patterns_blocks_bulletin_list" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_bulletin_list_parent_id_idx" ON "patterns_blocks_bulletin_list" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_bulletin_list_path_idx" ON "patterns_blocks_bulletin_list" ("_path")`)

  // Create patterns_blocks_media_list
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_media_list" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "subtitle" varchar,
      "media_type" varchar DEFAULT 'all',
      "limit" numeric DEFAULT 6,
      "layout" varchar DEFAULT 'grid',
      "show_date" boolean DEFAULT true,
      "show_duration" boolean DEFAULT true,
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_media_list_order_idx" ON "patterns_blocks_media_list" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_media_list_parent_id_idx" ON "patterns_blocks_media_list" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_media_list_path_idx" ON "patterns_blocks_media_list" ("_path")`)

  // Create patterns_blocks_alert_banner
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_alert_banner" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "message" varchar,
      "type" varchar DEFAULT 'info',
      "link_label" varchar,
      "link_url" varchar,
      "dismissible" boolean DEFAULT true,
      "icon" varchar,
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_alert_banner_order_idx" ON "patterns_blocks_alert_banner" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_alert_banner_parent_id_idx" ON "patterns_blocks_alert_banner" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_alert_banner_path_idx" ON "patterns_blocks_alert_banner" ("_path")`)

  // Create patterns_blocks_story_highlight
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_story_highlight" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "body" jsonb,
      "image_id" integer,
      "url" varchar,
      "link_label" varchar,
      "tag" varchar,
      "image_position" varchar DEFAULT 'right',
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_story_highlight_order_idx" ON "patterns_blocks_story_highlight" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_story_highlight_parent_id_idx" ON "patterns_blocks_story_highlight" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_story_highlight_path_idx" ON "patterns_blocks_story_highlight" ("_path")`)

  // Create patterns_blocks_faq_accordion
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_faq_accordion" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "default_open" boolean DEFAULT false,
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_faq_accordion_order_idx" ON "patterns_blocks_faq_accordion" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_faq_accordion_parent_id_idx" ON "patterns_blocks_faq_accordion" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_faq_accordion_path_idx" ON "patterns_blocks_faq_accordion" ("_path")`)

  // Create patterns_blocks_faq_accordion_items
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_faq_accordion_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "question" varchar,
      "answer" jsonb
    )
  `)

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_faq_accordion_items_order_idx" ON "patterns_blocks_faq_accordion_items" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_faq_accordion_items_parent_id_idx" ON "patterns_blocks_faq_accordion_items" ("_parent_id")`)

  // Create patterns_blocks_faq_accordion_items_tags
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_faq_accordion_items_tags" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY,
      "tag" varchar
    )
  `)

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_faq_accordion_items_tags_order_idx" ON "patterns_blocks_faq_accordion_items_tags" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_faq_accordion_items_tags_parent_id_idx" ON "patterns_blocks_faq_accordion_items_tags" ("_parent_id")`)

  // Create patterns_blocks_video_embed
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_video_embed" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "embed_url" varchar,
      "poster_image_id" integer,
      "description" varchar,
      "aspect_ratio" varchar DEFAULT '16:9',
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_video_embed_order_idx" ON "patterns_blocks_video_embed" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_video_embed_parent_id_idx" ON "patterns_blocks_video_embed" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_video_embed_path_idx" ON "patterns_blocks_video_embed" ("_path")`)

  // Create patterns_blocks_form_embed
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_blocks_form_embed" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY,
      "title" varchar,
      "description" varchar,
      "embed_type" varchar DEFAULT 'iframe',
      "embed_code" varchar,
      "form_url" varchar,
      "height" numeric DEFAULT 600,
      "width_mode" varchar DEFAULT 'contained',
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

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_form_embed_order_idx" ON "patterns_blocks_form_embed" ("_order")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_form_embed_parent_id_idx" ON "patterns_blocks_form_embed" ("_parent_id")`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "patterns_blocks_form_embed_path_idx" ON "patterns_blocks_form_embed" ("_path")`)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // Rollback not implemented - tables are safe to leave
}
