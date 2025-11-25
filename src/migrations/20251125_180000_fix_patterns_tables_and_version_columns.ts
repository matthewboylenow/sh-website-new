import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * FIX: Correct table naming and add missing columns
 *
 * Issues fixed:
 * 1. Patterns block tables use "patterns_layout_blocks_*" not "patterns_blocks_*"
 * 2. Missing card customization columns in version tables
 * 3. Missing most patterns block tables
 */

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // ===================================================================
  // PART 1: Add missing columns to version tables
  // ===================================================================

  // Fix EventList version table - add missing card customization columns
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_event_list"
    ADD COLUMN IF NOT EXISTS "show_categories" boolean DEFAULT true;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_event_list"
    ADD COLUMN IF NOT EXISTS "image_size" varchar DEFAULT 'default';
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_event_list"
    ADD COLUMN IF NOT EXISTS "card_background_color" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_event_list"
    ADD COLUMN IF NOT EXISTS "card_title_color" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_event_list"
    ADD COLUMN IF NOT EXISTS "card_text_color" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_event_list"
    ADD COLUMN IF NOT EXISTS "card_category_color" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_event_list"
    ADD COLUMN IF NOT EXISTS "date_badge_color" varchar;
  `)

  // Fix PostList version table
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_post_list"
    ADD COLUMN IF NOT EXISTS "show_categories" boolean DEFAULT true;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_post_list"
    ADD COLUMN IF NOT EXISTS "image_size" varchar DEFAULT 'default';
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_post_list"
    ADD COLUMN IF NOT EXISTS "card_background_color" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_post_list"
    ADD COLUMN IF NOT EXISTS "card_title_color" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_post_list"
    ADD COLUMN IF NOT EXISTS "card_text_color" varchar;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_post_list"
    ADD COLUMN IF NOT EXISTS "card_category_color" varchar;
  `)

  // Fix Columns version table
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_columns_columns"
    ADD COLUMN IF NOT EXISTS "custom_code" varchar;
  `)

  // ===================================================================
  // PART 2: Create missing patterns_layout_blocks_* tables
  // Note: Using CORRECT naming convention: patterns_layout_blocks_*
  // ===================================================================

  // HeroWithStats block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_hero_with_stats" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "eyebrow" varchar,
      "title" varchar,
      "subtitle" jsonb,
      "background_image_id" integer,
      "background_overlay" varchar DEFAULT 'medium',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_hero_with_stats_buttons" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_hero_with_stats_stats" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "value" varchar,
      "label" varchar
    );
  `)

  // RichTextSection block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_rich_text_section" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar,
      "body" jsonb,
      "max_width" varchar DEFAULT 'prose',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
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

  // Columns block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_columns" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "section_title" varchar,
      "layout" varchar DEFAULT 'equal',
      "column_gap" varchar DEFAULT 'default',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
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
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_columns_columns" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "content_type" varchar DEFAULT 'text',
      "title" varchar,
      "body" jsonb,
      "icon_id" integer,
      "image_id" integer,
      "video_id" integer,
      "video_poster_id" integer,
      "video_embed" varchar,
      "custom_code" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_columns_columns_links" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
  `)

  // CTAFullWidth block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_cta_full_width" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "eyebrow" varchar,
      "title" varchar,
      "body" jsonb,
      "background_image_id" integer,
      "background_overlay" varchar DEFAULT 'medium',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
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

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_cta_full_width_links" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
  `)

  // AlertBanner block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_alert_banner" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "message" varchar,
      "type" varchar DEFAULT 'info',
      "link_label" varchar,
      "link_url" varchar,
      "dismissible" boolean DEFAULT true,
      "icon" varchar DEFAULT 'auto',
      "block_name" varchar
    );
  `)

  // CardGrid block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_card_grid" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar,
      "subtitle" jsonb,
      "source_type" varchar DEFAULT 'manual',
      "collection_slug" varchar,
      "limit" numeric DEFAULT 6,
      "order_by" varchar DEFAULT 'createdAt_desc',
      "columns" varchar DEFAULT '3',
      "card_style" varchar DEFAULT 'bordered',
      "show_view_all_link" boolean DEFAULT false,
      "view_all_url" varchar,
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
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

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_card_grid_cards" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "title" varchar,
      "body" jsonb,
      "image_id" integer,
      "url" varchar,
      "badge" varchar
    );
  `)

  // BentoGrid block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_bento_grid" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar,
      "subtitle" jsonb,
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "appearance_text_color" varchar,
      "overlay_strength" numeric DEFAULT 50,
      "decor_pattern_enabled" boolean DEFAULT false,
      "decor_pattern_typ" varchar DEFAULT 'cross',
      "decor_pattern_text" varchar,
      "decor_pattern_opacity" numeric DEFAULT 10,
      "decor_pattern_sz" varchar DEFAULT 'medium',
      "decor_pattern_repeat_count" numeric DEFAULT 8,
      "decor_pattern_color" varchar DEFAULT 'gray',
      "decor_pattern_pos" varchar DEFAULT 'topRight',
      "decor_pattern_rotation" numeric DEFAULT 0,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_bento_grid_items" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "title" varchar,
      "description" varchar,
      "image_id" integer,
      "url" varchar,
      "tag" varchar,
      "size" varchar DEFAULT 'medium',
      "image_style" varchar DEFAULT 'icon'
    );
  `)

  // EventList block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_event_list" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar DEFAULT 'Upcoming Events',
      "subtitle" jsonb,
      "mode" varchar DEFAULT 'upcoming',
      "start_date" timestamp(3) with time zone,
      "end_date" timestamp(3) with time zone,
      "limit" numeric DEFAULT 6,
      "layout" varchar DEFAULT 'cards',
      "show_view_all_link" boolean DEFAULT false,
      "view_all_url" varchar DEFAULT '/events',
      "show_categories" boolean DEFAULT true,
      "image_size" varchar DEFAULT 'default',
      "card_background_color" varchar,
      "card_title_color" varchar,
      "card_text_color" varchar,
      "card_category_color" varchar,
      "date_badge_color" varchar,
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
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
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_event_list_category_filter" (
      "id" serial PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "value" varchar
    );
  `)

  // PostList block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_post_list" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar DEFAULT 'Recent Posts',
      "subtitle" jsonb,
      "limit" numeric DEFAULT 6,
      "layout" varchar DEFAULT 'cards',
      "show_excerpt" boolean DEFAULT true,
      "show_author" boolean DEFAULT true,
      "show_date" boolean DEFAULT true,
      "show_view_all_link" boolean DEFAULT false,
      "view_all_url" varchar DEFAULT '/blog',
      "show_categories" boolean DEFAULT true,
      "image_size" varchar DEFAULT 'default',
      "card_background_color" varchar,
      "card_title_color" varchar,
      "card_text_color" varchar,
      "card_category_color" varchar,
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
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
      "block_name" varchar
    );
  `)

  // BulletinList block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_bulletin_list" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar DEFAULT 'Weekly Bulletins',
      "subtitle" jsonb,
      "display_mode" varchar DEFAULT 'recent',
      "limit" numeric DEFAULT 4,
      "show_highlights" boolean DEFAULT false,
      "layout" varchar DEFAULT 'grid',
      "show_view_all_link" boolean DEFAULT false,
      "view_all_url" varchar DEFAULT '/bulletins',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // MediaList block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_media_list" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar,
      "subtitle" jsonb,
      "media_type" varchar DEFAULT 'podcast',
      "limit" numeric DEFAULT 6,
      "layout" varchar DEFAULT 'grid',
      "show_date" boolean DEFAULT true,
      "show_duration" boolean DEFAULT true,
      "view_all_url" varchar,
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // Testimonial block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_testimonial" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "quote" jsonb,
      "name" varchar,
      "role" varchar,
      "image_id" integer,
      "layout" varchar DEFAULT 'card',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
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

  // StoryHighlight block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_story_highlight" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar,
      "body" jsonb,
      "image_id" integer,
      "url" varchar,
      "link_label" varchar DEFAULT 'Read More',
      "tag" varchar,
      "image_position" varchar DEFAULT 'left',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // FAQAccordion block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_faq_accordion" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar,
      "default_open" varchar DEFAULT 'none',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_faq_accordion_items" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "question" varchar,
      "answer" jsonb
    );
  `)

  // VideoEmbed block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_video_embed" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar,
      "embed_url" varchar,
      "poster_image_id" integer,
      "description" jsonb,
      "aspect_ratio" varchar DEFAULT '16/9',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // FormEmbed block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_form_embed" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "title" varchar,
      "description" jsonb,
      "embed_type" varchar DEFAULT 'html',
      "embed_code" varchar,
      "form_url" varchar,
      "height" numeric DEFAULT 600,
      "width_mode" varchar DEFAULT 'centered',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // Spacer block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_spacer" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "size" varchar DEFAULT 'medium',
      "block_name" varchar
    );
  `)

  // Divider block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_divider" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "style" varchar DEFAULT 'line',
      "thickness" varchar DEFAULT 'normal',
      "width" varchar DEFAULT 'full',
      "appearance_background_variant" varchar DEFAULT 'light',
      "appearance_alignment" varchar DEFAULT 'left',
      "appearance_full_width" boolean DEFAULT false,
      "appearance_padding_top" varchar DEFAULT 'default',
      "appearance_padding_bottom" varchar DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // CustomCode block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_custom_code" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "code" varchar,
      "language" varchar DEFAULT 'html',
      "block_name" varchar
    );
  `)

  // CTA (CallToAction) block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_cta" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "rich_text" jsonb,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_cta_links" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
  `)

  // Content block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_content" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "block_name" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_content_columns" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "size" varchar DEFAULT 'oneThird',
      "rich_text" jsonb,
      "enable_link" boolean,
      "link_type" varchar DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" varchar DEFAULT 'default'
    );
  `)

  // MediaBlock
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_media_block" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "media_id" integer,
      "block_name" varchar
    );
  `)

  // Archive block
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_archive" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "intro_content" jsonb,
      "populate_by" varchar DEFAULT 'collection',
      "relation_to" varchar DEFAULT 'posts',
      "limit" numeric DEFAULT 10,
      "block_name" varchar
    );
  `)

  // FormBlock
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "patterns_layout_blocks_form_block" (
      "id" varchar PRIMARY KEY NOT NULL,
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" varchar NOT NULL,
      "form_id" integer,
      "enable_intro" boolean,
      "intro_content" jsonb,
      "block_name" varchar
    );
  `)

  await payload.logger.info('Migration complete: Fixed patterns table naming and added missing version columns')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove added columns from version tables
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_event_list" DROP COLUMN IF EXISTS "show_categories";
    ALTER TABLE "_pages_v_blocks_event_list" DROP COLUMN IF EXISTS "image_size";
    ALTER TABLE "_pages_v_blocks_event_list" DROP COLUMN IF EXISTS "card_background_color";
    ALTER TABLE "_pages_v_blocks_event_list" DROP COLUMN IF EXISTS "card_title_color";
    ALTER TABLE "_pages_v_blocks_event_list" DROP COLUMN IF EXISTS "card_text_color";
    ALTER TABLE "_pages_v_blocks_event_list" DROP COLUMN IF EXISTS "card_category_color";
    ALTER TABLE "_pages_v_blocks_event_list" DROP COLUMN IF EXISTS "date_badge_color";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_post_list" DROP COLUMN IF EXISTS "show_categories";
    ALTER TABLE "_pages_v_blocks_post_list" DROP COLUMN IF EXISTS "image_size";
    ALTER TABLE "_pages_v_blocks_post_list" DROP COLUMN IF EXISTS "card_background_color";
    ALTER TABLE "_pages_v_blocks_post_list" DROP COLUMN IF EXISTS "card_title_color";
    ALTER TABLE "_pages_v_blocks_post_list" DROP COLUMN IF EXISTS "card_text_color";
    ALTER TABLE "_pages_v_blocks_post_list" DROP COLUMN IF EXISTS "card_category_color";
  `)

  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_columns_columns" DROP COLUMN IF EXISTS "custom_code";
  `)

  // Drop patterns_layout_blocks tables
  await db.execute(sql`
    DROP TABLE IF EXISTS "patterns_layout_blocks_form_block";
    DROP TABLE IF EXISTS "patterns_layout_blocks_archive";
    DROP TABLE IF EXISTS "patterns_layout_blocks_media_block";
    DROP TABLE IF EXISTS "patterns_layout_blocks_content_columns";
    DROP TABLE IF EXISTS "patterns_layout_blocks_content";
    DROP TABLE IF EXISTS "patterns_layout_blocks_cta_links";
    DROP TABLE IF EXISTS "patterns_layout_blocks_cta";
    DROP TABLE IF EXISTS "patterns_layout_blocks_custom_code";
    DROP TABLE IF EXISTS "patterns_layout_blocks_divider";
    DROP TABLE IF EXISTS "patterns_layout_blocks_spacer";
    DROP TABLE IF EXISTS "patterns_layout_blocks_form_embed";
    DROP TABLE IF EXISTS "patterns_layout_blocks_video_embed";
    DROP TABLE IF EXISTS "patterns_layout_blocks_faq_accordion_items";
    DROP TABLE IF EXISTS "patterns_layout_blocks_faq_accordion";
    DROP TABLE IF EXISTS "patterns_layout_blocks_story_highlight";
    DROP TABLE IF EXISTS "patterns_layout_blocks_testimonial";
    DROP TABLE IF EXISTS "patterns_layout_blocks_media_list";
    DROP TABLE IF EXISTS "patterns_layout_blocks_bulletin_list";
    DROP TABLE IF EXISTS "patterns_layout_blocks_post_list";
    DROP TABLE IF EXISTS "patterns_layout_blocks_event_list_category_filter";
    DROP TABLE IF EXISTS "patterns_layout_blocks_event_list";
    DROP TABLE IF EXISTS "patterns_layout_blocks_bento_grid_items";
    DROP TABLE IF EXISTS "patterns_layout_blocks_bento_grid";
    DROP TABLE IF EXISTS "patterns_layout_blocks_card_grid_cards";
    DROP TABLE IF EXISTS "patterns_layout_blocks_card_grid";
    DROP TABLE IF EXISTS "patterns_layout_blocks_alert_banner";
    DROP TABLE IF EXISTS "patterns_layout_blocks_cta_full_width_links";
    DROP TABLE IF EXISTS "patterns_layout_blocks_cta_full_width";
    DROP TABLE IF EXISTS "patterns_layout_blocks_columns_columns_links";
    DROP TABLE IF EXISTS "patterns_layout_blocks_columns_columns";
    DROP TABLE IF EXISTS "patterns_layout_blocks_columns";
    DROP TABLE IF EXISTS "patterns_layout_blocks_rich_text_section";
    DROP TABLE IF EXISTS "patterns_layout_blocks_hero_with_stats_stats";
    DROP TABLE IF EXISTS "patterns_layout_blocks_hero_with_stats_buttons";
    DROP TABLE IF EXISTS "patterns_layout_blocks_hero_with_stats";
  `)
}
