import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_basic_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_basic_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_basic_background_overlay" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."bg_var" AS ENUM('light', 'brand', 'dark', 'transparent');
  CREATE TYPE "public"."align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."pad_top" AS ENUM('none', 'tight', 'default', 'loose');
  CREATE TYPE "public"."pad_btm" AS ENUM('none', 'tight', 'default', 'loose');
  CREATE TYPE "public"."enum_pages_blocks_hero_with_stats_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_with_stats_buttons_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_with_stats_background_overlay" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_section_max_width" AS ENUM('prose', 'medium', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_columns_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_columns_layout" AS ENUM('equal', 'oneThirdLeft', 'oneThirdRight');
  CREATE TYPE "public"."enum_pages_blocks_columns_column_gap" AS ENUM('small', 'default', 'large');
  CREATE TYPE "public"."enum_pages_blocks_cta_full_width_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_full_width_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_full_width_background_overlay" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_alert_banner_type" AS ENUM('info', 'warning', 'urgent', 'success');
  CREATE TYPE "public"."enum_pages_blocks_alert_banner_icon" AS ENUM('auto', 'megaphone', 'bell', 'exclamation', 'check', 'none');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_source_type" AS ENUM('manual', 'collection');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_collection_slug" AS ENUM('posts', 'events', 'ministries', 'lifelines');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_order_by" AS ENUM('createdAt_desc', 'createdAt_asc', 'title_asc', 'title_desc');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_card_style" AS ENUM('bordered', 'elevated', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_bento_grid_items_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_bento_grid_items_image_style" AS ENUM('icon', 'background');
  CREATE TYPE "public"."enum_pages_blocks_event_list_category_filter" AS ENUM('mass_worship', 'lifelines_community', 'kids_teens', 'formation_learning', 'service_outreach', 'social_fellowship', 'sacraments', 'special_events');
  CREATE TYPE "public"."enum_pages_blocks_event_list_mode" AS ENUM('upcoming', 'dateRange', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_event_list_layout" AS ENUM('cards', 'list', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_post_list_layout" AS ENUM('cards', 'list', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_bulletin_list_display_mode" AS ENUM('recent', 'current');
  CREATE TYPE "public"."enum_pages_blocks_bulletin_list_layout" AS ENUM('grid', 'list', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_media_list_media_type" AS ENUM('podcast', 'sermon', 'all');
  CREATE TYPE "public"."enum_pages_blocks_media_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_layout" AS ENUM('card', 'inline', 'featured');
  CREATE TYPE "public"."enum_pages_blocks_story_highlight_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_faq_accordion_default_open" AS ENUM('none', 'first', 'all');
  CREATE TYPE "public"."enum_pages_blocks_video_embed_aspect_ratio" AS ENUM('16/9', '4/3', '21/9', '1/1');
  CREATE TYPE "public"."enum_pages_blocks_form_embed_embed_type" AS ENUM('html', 'url');
  CREATE TYPE "public"."enum_pages_blocks_form_embed_width_mode" AS ENUM('full', 'centered');
  CREATE TYPE "public"."enum_pages_blocks_spacer_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_divider_style" AS ENUM('line', 'space', 'decorative');
  CREATE TYPE "public"."enum_pages_blocks_divider_thickness" AS ENUM('thin', 'normal', 'thick');
  CREATE TYPE "public"."enum_pages_blocks_divider_width" AS ENUM('full', 'narrow', 'short');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum_pages_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_basic_background_overlay" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_with_stats_buttons_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_with_stats_buttons_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_with_stats_background_overlay" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_section_max_width" AS ENUM('prose', 'medium', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_columns_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_layout" AS ENUM('equal', 'oneThirdLeft', 'oneThirdRight');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_column_gap" AS ENUM('small', 'default', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_full_width_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_full_width_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_full_width_background_overlay" AS ENUM('none', 'light', 'medium', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_alert_banner_type" AS ENUM('info', 'warning', 'urgent', 'success');
  CREATE TYPE "public"."enum__pages_v_blocks_alert_banner_icon" AS ENUM('auto', 'megaphone', 'bell', 'exclamation', 'check', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_source_type" AS ENUM('manual', 'collection');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_collection_slug" AS ENUM('posts', 'events', 'ministries', 'lifelines');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_order_by" AS ENUM('createdAt_desc', 'createdAt_asc', 'title_asc', 'title_desc');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_card_style" AS ENUM('bordered', 'elevated', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_grid_items_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_grid_items_image_style" AS ENUM('icon', 'background');
  CREATE TYPE "public"."enum__pages_v_blocks_event_list_category_filter" AS ENUM('mass_worship', 'lifelines_community', 'kids_teens', 'formation_learning', 'service_outreach', 'social_fellowship', 'sacraments', 'special_events');
  CREATE TYPE "public"."enum__pages_v_blocks_event_list_mode" AS ENUM('upcoming', 'dateRange', 'featured');
  CREATE TYPE "public"."enum__pages_v_blocks_event_list_layout" AS ENUM('cards', 'list', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_post_list_layout" AS ENUM('cards', 'list', 'featured');
  CREATE TYPE "public"."enum__pages_v_blocks_bulletin_list_display_mode" AS ENUM('recent', 'current');
  CREATE TYPE "public"."enum__pages_v_blocks_bulletin_list_layout" AS ENUM('grid', 'list', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_media_list_media_type" AS ENUM('podcast', 'sermon', 'all');
  CREATE TYPE "public"."enum__pages_v_blocks_media_list_layout" AS ENUM('grid', 'list', 'featured');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonial_layout" AS ENUM('card', 'inline', 'featured');
  CREATE TYPE "public"."enum__pages_v_blocks_story_highlight_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_faq_accordion_default_open" AS ENUM('none', 'first', 'all');
  CREATE TYPE "public"."enum__pages_v_blocks_video_embed_aspect_ratio" AS ENUM('16/9', '4/3', '21/9', '1/1');
  CREATE TYPE "public"."enum__pages_v_blocks_form_embed_embed_type" AS ENUM('html', 'url');
  CREATE TYPE "public"."enum__pages_v_blocks_form_embed_width_mode" AS ENUM('full', 'centered');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_style" AS ENUM('line', 'space', 'decorative');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_thickness" AS ENUM('thin', 'normal', 'thick');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_width" AS ENUM('full', 'narrow', 'short');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__pages_v_version_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_category" AS ENUM('mass_worship', 'lifelines_community', 'kids_teens', 'formation_learning', 'service_outreach', 'social_fellowship', 'sacraments', 'special_events', 'other');
  CREATE TYPE "public"."enum_events_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_category" AS ENUM('mass_worship', 'lifelines_community', 'kids_teens', 'formation_learning', 'service_outreach', 'social_fellowship', 'sacraments', 'special_events', 'other');
  CREATE TYPE "public"."enum__events_v_version_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_podcasts_type" AS ENUM('homily', 'podcast', 'teaching', 'testimony', 'special');
  CREATE TYPE "public"."enum_podcasts_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum_podcasts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__podcasts_v_version_type" AS ENUM('homily', 'podcast', 'teaching', 'testimony', 'special');
  CREATE TYPE "public"."enum__podcasts_v_version_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum__podcasts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_bulletins_liturgical_season" AS ENUM('ordinary', 'advent', 'christmas', 'lent', 'easter', 'special');
  CREATE TYPE "public"."enum_ministries_category" AS ENUM('worship_liturgy', 'care_support', 'service_outreach', 'formation_learning', 'kids_teens', 'community_fellowship', 'music_arts', 'administration');
  CREATE TYPE "public"."enum_ministries_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum_ministries_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ministries_v_version_category" AS ENUM('worship_liturgy', 'care_support', 'service_outreach', 'formation_learning', 'kids_teens', 'community_fellowship', 'music_arts', 'administration');
  CREATE TYPE "public"."enum__ministries_v_version_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum__ministries_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_lifelines_type" AS ENUM('mens', 'womens', 'couples', 'young_adults', 'parents_families', 'seniors', 'bible_study', 'prayer', 'support', 'mixed');
  CREATE TYPE "public"."enum_lifelines_meeting_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'varies');
  CREATE TYPE "public"."enum_lifelines_meeting_frequency" AS ENUM('weekly', 'biweekly', 'monthly', 'seasonal', 'varies');
  CREATE TYPE "public"."enum_lifelines_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum_lifelines_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__lifelines_v_version_type" AS ENUM('mens', 'womens', 'couples', 'young_adults', 'parents_families', 'seniors', 'bible_study', 'prayer', 'support', 'mixed');
  CREATE TYPE "public"."enum__lifelines_v_version_meeting_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'varies');
  CREATE TYPE "public"."enum__lifelines_v_version_meeting_frequency" AS ENUM('weekly', 'biweekly', 'monthly', 'seasonal', 'varies');
  CREATE TYPE "public"."enum__lifelines_v_version_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum__lifelines_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_staff_department" AS ENUM('clergy', 'administration', 'religious_education', 'youth_ministry', 'music_liturgy', 'facilities', 'care_counseling', 'communications', 'other');
  CREATE TYPE "public"."enum_search_items_audience" AS ENUM('visitor', 'parishioner', 'both');
  CREATE TYPE "public"."enum_search_items_topics" AS ENUM('mass_times', 'online_mass', 'volunteer', 'mental_health', 'counseling', 'kids', 'teens', 'family', 'marriage', 'grief', 'support_groups', 'sacraments', 'baptism', 'confession', 'confirmation', 'marriage_prep', 'giving', 'lifelines', 'community', 'events', 'social', 'adult_formation', 'bible_study', 'prayer', 'adoration', 'service', 'outreach', 'music', 'liturgy', 'care', 'help');
  CREATE TYPE "public"."enum_search_items_kind" AS ENUM('page', 'ministry', 'event', 'article', 'lifeline', 'resource', 'external');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_global_settings_weekend_masses_day" AS ENUM('saturday', 'sunday');
  CREATE TYPE "public"."enum_global_settings_weekend_masses_language" AS ENUM('english', 'spanish', 'latin', 'bilingual');
  CREATE TYPE "public"."enum_global_settings_confession_times_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum_global_settings_global_alert_type" AS ENUM('info', 'warning', 'urgent');
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_hero_basic_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_basic_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_basic_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_hero_basic" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" jsonb,
  	"background_image_id" integer,
  	"background_overlay" "enum_pages_blocks_hero_basic_background_overlay" DEFAULT 'medium',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_with_stats_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_with_stats_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_hero_with_stats_buttons_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_hero_with_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_with_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" jsonb,
  	"background_image_id" integer,
  	"background_overlay" "enum_pages_blocks_hero_with_stats_background_overlay" DEFAULT 'medium',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"max_width" "enum_pages_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_columns_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_columns_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_columns_columns_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"layout" "enum_pages_blocks_columns_layout" DEFAULT 'equal',
  	"column_gap" "enum_pages_blocks_columns_column_gap" DEFAULT 'default',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_full_width_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_full_width_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_full_width_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta_full_width" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"background_image_id" integer,
  	"background_overlay" "enum_pages_blocks_cta_full_width_background_overlay" DEFAULT 'medium',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_alert_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" varchar,
  	"type" "enum_pages_blocks_alert_banner_type" DEFAULT 'info',
  	"link_label" varchar,
  	"link_url" varchar,
  	"dismissible" boolean DEFAULT true,
  	"icon" "enum_pages_blocks_alert_banner_icon" DEFAULT 'auto',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"url" varchar,
  	"badge" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"source_type" "enum_pages_blocks_card_grid_source_type" DEFAULT 'manual',
  	"collection_slug" "enum_pages_blocks_card_grid_collection_slug",
  	"limit" numeric DEFAULT 6,
  	"order_by" "enum_pages_blocks_card_grid_order_by" DEFAULT 'createdAt_desc',
  	"columns" "enum_pages_blocks_card_grid_columns" DEFAULT '3',
  	"card_style" "enum_pages_blocks_card_grid_card_style" DEFAULT 'bordered',
  	"show_view_all_link" boolean DEFAULT false,
  	"view_all_url" varchar,
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_bento_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"url" varchar,
  	"tag" varchar,
  	"size" "enum_pages_blocks_bento_grid_items_size" DEFAULT 'medium',
  	"image_style" "enum_pages_blocks_bento_grid_items_image_style" DEFAULT 'icon'
  );
  
  CREATE TABLE "pages_blocks_bento_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_event_list_category_filter" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_pages_blocks_event_list_category_filter",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_event_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Upcoming Events',
  	"subtitle" jsonb,
  	"mode" "enum_pages_blocks_event_list_mode" DEFAULT 'upcoming',
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_event_list_layout" DEFAULT 'cards',
  	"show_view_all_link" boolean DEFAULT false,
  	"view_all_url" varchar DEFAULT '/events',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_post_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Recent Posts',
  	"subtitle" jsonb,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_post_list_layout" DEFAULT 'cards',
  	"show_excerpt" boolean DEFAULT true,
  	"show_author" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_view_all_link" boolean DEFAULT false,
  	"view_all_url" varchar DEFAULT '/blog',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_bulletin_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Weekly Bulletins',
  	"subtitle" jsonb,
  	"display_mode" "enum_pages_blocks_bulletin_list_display_mode" DEFAULT 'recent',
  	"limit" numeric DEFAULT 4,
  	"show_highlights" boolean DEFAULT false,
  	"layout" "enum_pages_blocks_bulletin_list_layout" DEFAULT 'grid',
  	"show_view_all_link" boolean DEFAULT false,
  	"view_all_url" varchar DEFAULT '/bulletins',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"media_type" "enum_pages_blocks_media_list_media_type" DEFAULT 'podcast',
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_media_list_layout" DEFAULT 'grid',
  	"show_date" boolean DEFAULT true,
  	"show_duration" boolean DEFAULT true,
  	"view_all_url" varchar,
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"name" varchar,
  	"role" varchar,
  	"image_id" integer,
  	"layout" "enum_pages_blocks_testimonial_layout" DEFAULT 'card',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_story_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"url" varchar,
  	"link_label" varchar DEFAULT 'Read More',
  	"tag" varchar,
  	"image_position" "enum_pages_blocks_story_highlight_image_position" DEFAULT 'left',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_items_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"default_open" "enum_pages_blocks_faq_accordion_default_open" DEFAULT 'none',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"embed_url" varchar,
  	"poster_image_id" integer,
  	"description" jsonb,
  	"aspect_ratio" "enum_pages_blocks_video_embed_aspect_ratio" DEFAULT '16/9',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"embed_type" "enum_pages_blocks_form_embed_embed_type" DEFAULT 'html',
  	"embed_code" varchar,
  	"form_url" varchar,
  	"height" numeric DEFAULT 600,
  	"width_mode" "enum_pages_blocks_form_embed_width_mode" DEFAULT 'centered',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_spacer_size" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_divider_style" DEFAULT 'line',
  	"thickness" "enum_pages_blocks_divider_thickness" DEFAULT 'normal',
  	"width" "enum_pages_blocks_divider_width" DEFAULT 'full',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"audience" "enum_pages_audience" DEFAULT 'both',
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_basic_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_basic_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_basic_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_basic" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" jsonb,
  	"background_image_id" integer,
  	"background_overlay" "enum__pages_v_blocks_hero_basic_background_overlay" DEFAULT 'medium',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_with_stats_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_with_stats_buttons_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_with_stats_buttons_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_with_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_with_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" jsonb,
  	"background_image_id" integer,
  	"background_overlay" "enum__pages_v_blocks_hero_with_stats_background_overlay" DEFAULT 'medium',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"max_width" "enum__pages_v_blocks_rich_text_section_max_width" DEFAULT 'prose',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_columns_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_columns_columns_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"layout" "enum__pages_v_blocks_columns_layout" DEFAULT 'equal',
  	"column_gap" "enum__pages_v_blocks_columns_column_gap" DEFAULT 'default',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_full_width_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_full_width_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_full_width_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_full_width" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" jsonb,
  	"background_image_id" integer,
  	"background_overlay" "enum__pages_v_blocks_cta_full_width_background_overlay" DEFAULT 'medium',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_alert_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" varchar,
  	"type" "enum__pages_v_blocks_alert_banner_type" DEFAULT 'info',
  	"link_label" varchar,
  	"link_url" varchar,
  	"dismissible" boolean DEFAULT true,
  	"icon" "enum__pages_v_blocks_alert_banner_icon" DEFAULT 'auto',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"url" varchar,
  	"badge" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"source_type" "enum__pages_v_blocks_card_grid_source_type" DEFAULT 'manual',
  	"collection_slug" "enum__pages_v_blocks_card_grid_collection_slug",
  	"limit" numeric DEFAULT 6,
  	"order_by" "enum__pages_v_blocks_card_grid_order_by" DEFAULT 'createdAt_desc',
  	"columns" "enum__pages_v_blocks_card_grid_columns" DEFAULT '3',
  	"card_style" "enum__pages_v_blocks_card_grid_card_style" DEFAULT 'bordered',
  	"show_view_all_link" boolean DEFAULT false,
  	"view_all_url" varchar,
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bento_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"url" varchar,
  	"tag" varchar,
  	"size" "enum__pages_v_blocks_bento_grid_items_size" DEFAULT 'medium',
  	"image_style" "enum__pages_v_blocks_bento_grid_items_image_style" DEFAULT 'icon',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bento_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_list_category_filter" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__pages_v_blocks_event_list_category_filter",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_event_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Upcoming Events',
  	"subtitle" jsonb,
  	"mode" "enum__pages_v_blocks_event_list_mode" DEFAULT 'upcoming',
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__pages_v_blocks_event_list_layout" DEFAULT 'cards',
  	"show_view_all_link" boolean DEFAULT false,
  	"view_all_url" varchar DEFAULT '/events',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_post_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Recent Posts',
  	"subtitle" jsonb,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__pages_v_blocks_post_list_layout" DEFAULT 'cards',
  	"show_excerpt" boolean DEFAULT true,
  	"show_author" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_view_all_link" boolean DEFAULT false,
  	"view_all_url" varchar DEFAULT '/blog',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bulletin_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Weekly Bulletins',
  	"subtitle" jsonb,
  	"display_mode" "enum__pages_v_blocks_bulletin_list_display_mode" DEFAULT 'recent',
  	"limit" numeric DEFAULT 4,
  	"show_highlights" boolean DEFAULT false,
  	"layout" "enum__pages_v_blocks_bulletin_list_layout" DEFAULT 'grid',
  	"show_view_all_link" boolean DEFAULT false,
  	"view_all_url" varchar DEFAULT '/bulletins',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" jsonb,
  	"media_type" "enum__pages_v_blocks_media_list_media_type" DEFAULT 'podcast',
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__pages_v_blocks_media_list_layout" DEFAULT 'grid',
  	"show_date" boolean DEFAULT true,
  	"show_duration" boolean DEFAULT true,
  	"view_all_url" varchar,
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" jsonb,
  	"name" varchar,
  	"role" varchar,
  	"image_id" integer,
  	"layout" "enum__pages_v_blocks_testimonial_layout" DEFAULT 'card',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" jsonb,
  	"image_id" integer,
  	"url" varchar,
  	"link_label" varchar DEFAULT 'Read More',
  	"tag" varchar,
  	"image_position" "enum__pages_v_blocks_story_highlight_image_position" DEFAULT 'left',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion_items_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"default_open" "enum__pages_v_blocks_faq_accordion_default_open" DEFAULT 'none',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"embed_url" varchar,
  	"poster_image_id" integer,
  	"description" jsonb,
  	"aspect_ratio" "enum__pages_v_blocks_video_embed_aspect_ratio" DEFAULT '16/9',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"embed_type" "enum__pages_v_blocks_form_embed_embed_type" DEFAULT 'html',
  	"embed_code" varchar,
  	"form_url" varchar,
  	"height" numeric DEFAULT 600,
  	"width_mode" "enum__pages_v_blocks_form_embed_width_mode" DEFAULT 'centered',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_spacer_size" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_divider_style" DEFAULT 'line',
  	"thickness" "enum__pages_v_blocks_divider_thickness" DEFAULT 'normal',
  	"width" "enum__pages_v_blocks_divider_width" DEFAULT 'full',
  	"appearance_background_variant" "bg_var" DEFAULT 'light',
  	"appearance_alignment" "align" DEFAULT 'left',
  	"appearance_full_width" boolean DEFAULT false,
  	"appearance_padding_top" "pad_top" DEFAULT 'default',
  	"appearance_padding_bottom" "pad_btm" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_audience" "enum__pages_v_version_audience" DEFAULT 'both',
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"audience" "enum_posts_audience" DEFAULT 'both',
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_audience" "enum__posts_v_version_audience" DEFAULT 'both',
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"description" jsonb,
  	"location" varchar,
  	"featured_image_id" integer,
  	"category" "enum_events_category",
  	"audience" "enum_events_audience" DEFAULT 'both',
  	"registration_required" boolean DEFAULT false,
  	"registration_url" varchar,
  	"contact_person_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_description" jsonb,
  	"version_location" varchar,
  	"version_featured_image_id" integer,
  	"version_category" "enum__events_v_version_category",
  	"version_audience" "enum__events_v_version_audience" DEFAULT 'both',
  	"version_registration_required" boolean DEFAULT false,
  	"version_registration_url" varchar,
  	"version_contact_person_id" integer,
  	"version_is_featured" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_events_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "podcasts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"type" "enum_podcasts_type",
  	"description" jsonb,
  	"speaker" varchar,
  	"speaker_bio" varchar,
  	"featured_image_id" integer,
  	"audio_url" varchar,
  	"video_url" varchar,
  	"duration" varchar,
  	"series" varchar,
  	"scripture" varchar,
  	"published_at" timestamp(3) with time zone,
  	"audience" "enum_podcasts_audience" DEFAULT 'both',
  	"is_featured" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_podcasts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "podcasts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_podcasts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_type" "enum__podcasts_v_version_type",
  	"version_description" jsonb,
  	"version_speaker" varchar,
  	"version_speaker_bio" varchar,
  	"version_featured_image_id" integer,
  	"version_audio_url" varchar,
  	"version_video_url" varchar,
  	"version_duration" varchar,
  	"version_series" varchar,
  	"version_scripture" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_audience" "enum__podcasts_v_version_audience" DEFAULT 'both',
  	"version_is_featured" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__podcasts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_podcasts_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "bulletins" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"file_id" integer NOT NULL,
  	"highlights" varchar,
  	"liturgical_season" "enum_bulletins_liturgical_season",
  	"is_current" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ministries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"category" "enum_ministries_category",
  	"featured_image_id" integer,
  	"contact_person_id" integer,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"meeting_schedule" varchar,
  	"how_to_join" jsonb,
  	"requirements" varchar,
  	"related_page_id" integer,
  	"audience" "enum_ministries_audience" DEFAULT 'both',
  	"is_active" boolean DEFAULT true,
  	"is_featured" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_ministries_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "ministries_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_ministries_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_category" "enum__ministries_v_version_category",
  	"version_featured_image_id" integer,
  	"version_contact_person_id" integer,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_meeting_schedule" varchar,
  	"version_how_to_join" jsonb,
  	"version_requirements" varchar,
  	"version_related_page_id" integer,
  	"version_audience" "enum__ministries_v_version_audience" DEFAULT 'both',
  	"version_is_active" boolean DEFAULT true,
  	"version_is_featured" boolean DEFAULT false,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__ministries_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_ministries_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "lifelines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"short_description" varchar,
  	"description" jsonb,
  	"type" "enum_lifelines_type",
  	"featured_image_id" integer,
  	"meeting_day" "enum_lifelines_meeting_day",
  	"meeting_time" varchar,
  	"meeting_frequency" "enum_lifelines_meeting_frequency" DEFAULT 'weekly',
  	"meeting_location" varchar,
  	"leader" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"is_accepting_members" boolean DEFAULT true,
  	"max_size" numeric,
  	"current_size" numeric,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"childcare" boolean DEFAULT false,
  	"audience" "enum_lifelines_audience" DEFAULT 'both',
  	"is_featured" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_lifelines_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "lifelines_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_lifelines_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_type" "enum__lifelines_v_version_type",
  	"version_featured_image_id" integer,
  	"version_meeting_day" "enum__lifelines_v_version_meeting_day",
  	"version_meeting_time" varchar,
  	"version_meeting_frequency" "enum__lifelines_v_version_meeting_frequency" DEFAULT 'weekly',
  	"version_meeting_location" varchar,
  	"version_leader" varchar,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_is_accepting_members" boolean DEFAULT true,
  	"version_max_size" numeric,
  	"version_current_size" numeric,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_childcare" boolean DEFAULT false,
  	"version_audience" "enum__lifelines_v_version_audience" DEFAULT 'both',
  	"version_is_featured" boolean DEFAULT false,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__lifelines_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_lifelines_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "staff" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"department" "enum_staff_department" NOT NULL,
  	"photo_id" integer,
  	"bio" jsonb,
  	"email" varchar,
  	"phone" varchar,
  	"office_location" varchar,
  	"office_hours" varchar,
  	"order" numeric DEFAULT 100 NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"show_on_website" boolean DEFAULT true,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "staff_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"ministries_id" integer
  );
  
  CREATE TABLE "search_items_audience" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_search_items_audience",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "search_items_topics" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_search_items_topics",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "search_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"kind" "enum_search_items_kind" NOT NULL,
  	"short_description" varchar NOT NULL,
  	"priority" numeric DEFAULT 5 NOT NULL,
  	"source_collection" varchar NOT NULL,
  	"source_id" varchar NOT NULL,
  	"last_synced_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"events_id" integer,
  	"podcasts_id" integer,
  	"bulletins_id" integer,
  	"ministries_id" integer,
  	"lifelines_id" integer,
  	"staff_id" integer,
  	"search_items_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "global_settings_weekend_masses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_global_settings_weekend_masses_day" NOT NULL,
  	"time" varchar NOT NULL,
  	"language" "enum_global_settings_weekend_masses_language" DEFAULT 'english',
  	"notes" varchar
  );
  
  CREATE TABLE "global_settings_daily_masses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar NOT NULL,
  	"time" varchar NOT NULL,
  	"notes" varchar
  );
  
  CREATE TABLE "global_settings_confession_times" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_global_settings_confession_times_day" NOT NULL,
  	"time" varchar NOT NULL,
  	"notes" varchar
  );
  
  CREATE TABLE "global_settings_external_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"description" varchar,
  	"icon" varchar
  );
  
  CREATE TABLE "global_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parish_name" varchar DEFAULT 'Saint Helen Catholic Church' NOT NULL,
  	"address_street" varchar NOT NULL,
  	"address_city" varchar NOT NULL,
  	"address_state" varchar NOT NULL,
  	"address_zip" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"fax" varchar,
  	"email" varchar NOT NULL,
  	"office_hours" varchar NOT NULL,
  	"holy_day_schedule" varchar,
  	"adoration_schedule" varchar,
  	"social_media_facebook" varchar,
  	"social_media_instagram" varchar,
  	"social_media_youtube" varchar,
  	"social_media_twitter" varchar,
  	"global_alert_enabled" boolean DEFAULT false,
  	"global_alert_message" varchar,
  	"global_alert_type" "enum_global_settings_global_alert_type" DEFAULT 'info',
  	"global_alert_link_text" varchar,
  	"global_alert_link_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_basic_links" ADD CONSTRAINT "pages_blocks_hero_basic_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_basic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_basic" ADD CONSTRAINT "pages_blocks_hero_basic_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_basic" ADD CONSTRAINT "pages_blocks_hero_basic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_stats_buttons" ADD CONSTRAINT "pages_blocks_hero_with_stats_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_with_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_stats_stats" ADD CONSTRAINT "pages_blocks_hero_with_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_with_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_stats" ADD CONSTRAINT "pages_blocks_hero_with_stats_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_with_stats" ADD CONSTRAINT "pages_blocks_hero_with_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_section" ADD CONSTRAINT "pages_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_columns_links" ADD CONSTRAINT "pages_blocks_columns_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_columns" ADD CONSTRAINT "pages_blocks_columns_columns_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_columns" ADD CONSTRAINT "pages_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns" ADD CONSTRAINT "pages_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_full_width_links" ADD CONSTRAINT "pages_blocks_cta_full_width_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_full_width"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_full_width" ADD CONSTRAINT "pages_blocks_cta_full_width_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_full_width" ADD CONSTRAINT "pages_blocks_cta_full_width_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_alert_banner" ADD CONSTRAINT "pages_blocks_alert_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bento_grid_items" ADD CONSTRAINT "pages_blocks_bento_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_bento_grid_items" ADD CONSTRAINT "pages_blocks_bento_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bento_grid" ADD CONSTRAINT "pages_blocks_bento_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_list_category_filter" ADD CONSTRAINT "pages_blocks_event_list_category_filter_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages_blocks_event_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_list" ADD CONSTRAINT "pages_blocks_event_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_post_list" ADD CONSTRAINT "pages_blocks_post_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bulletin_list" ADD CONSTRAINT "pages_blocks_bulletin_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_list" ADD CONSTRAINT "pages_blocks_media_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_highlight" ADD CONSTRAINT "pages_blocks_story_highlight_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_highlight" ADD CONSTRAINT "pages_blocks_story_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items_tags" ADD CONSTRAINT "pages_blocks_faq_accordion_items_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items" ADD CONSTRAINT "pages_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed" ADD CONSTRAINT "pages_blocks_video_embed_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed" ADD CONSTRAINT "pages_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_embed" ADD CONSTRAINT "pages_blocks_form_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer" ADD CONSTRAINT "pages_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_divider" ADD CONSTRAINT "pages_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_texts" ADD CONSTRAINT "pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_basic_links" ADD CONSTRAINT "_pages_v_blocks_hero_basic_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_basic"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD CONSTRAINT "_pages_v_blocks_hero_basic_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_basic" ADD CONSTRAINT "_pages_v_blocks_hero_basic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_stats_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_with_stats_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_with_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_stats_stats" ADD CONSTRAINT "_pages_v_blocks_hero_with_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_with_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD CONSTRAINT "_pages_v_blocks_hero_with_stats_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD CONSTRAINT "_pages_v_blocks_hero_with_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_section" ADD CONSTRAINT "_pages_v_blocks_rich_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_columns_links" ADD CONSTRAINT "_pages_v_blocks_columns_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_columns_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_columns" ADD CONSTRAINT "_pages_v_blocks_columns_columns_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_columns" ADD CONSTRAINT "_pages_v_blocks_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns" ADD CONSTRAINT "_pages_v_blocks_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_full_width_links" ADD CONSTRAINT "_pages_v_blocks_cta_full_width_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_full_width"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_full_width" ADD CONSTRAINT "_pages_v_blocks_cta_full_width_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_full_width" ADD CONSTRAINT "_pages_v_blocks_cta_full_width_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_alert_banner" ADD CONSTRAINT "_pages_v_blocks_alert_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_grid_items" ADD CONSTRAINT "_pages_v_blocks_bento_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_grid_items" ADD CONSTRAINT "_pages_v_blocks_bento_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_grid" ADD CONSTRAINT "_pages_v_blocks_bento_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_list_category_filter" ADD CONSTRAINT "_pages_v_blocks_event_list_category_filter_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v_blocks_event_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_list" ADD CONSTRAINT "_pages_v_blocks_event_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_post_list" ADD CONSTRAINT "_pages_v_blocks_post_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bulletin_list" ADD CONSTRAINT "_pages_v_blocks_bulletin_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_list" ADD CONSTRAINT "_pages_v_blocks_media_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_highlight" ADD CONSTRAINT "_pages_v_blocks_story_highlight_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_highlight" ADD CONSTRAINT "_pages_v_blocks_story_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_items_tags" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_items_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_items" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD CONSTRAINT "_pages_v_blocks_video_embed_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD CONSTRAINT "_pages_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_embed" ADD CONSTRAINT "_pages_v_blocks_form_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer" ADD CONSTRAINT "_pages_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_divider" ADD CONSTRAINT "_pages_v_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_texts" ADD CONSTRAINT "_pages_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_texts" ADD CONSTRAINT "_posts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_contact_person_id_users_id_fk" FOREIGN KEY ("contact_person_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_texts" ADD CONSTRAINT "events_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_contact_person_id_users_id_fk" FOREIGN KEY ("version_contact_person_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_texts" ADD CONSTRAINT "_events_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "podcasts" ADD CONSTRAINT "podcasts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "podcasts_texts" ADD CONSTRAINT "podcasts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."podcasts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_podcasts_v" ADD CONSTRAINT "_podcasts_v_parent_id_podcasts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."podcasts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_podcasts_v" ADD CONSTRAINT "_podcasts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_podcasts_v" ADD CONSTRAINT "_podcasts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_podcasts_v_texts" ADD CONSTRAINT "_podcasts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_podcasts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bulletins" ADD CONSTRAINT "bulletins_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ministries" ADD CONSTRAINT "ministries_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ministries" ADD CONSTRAINT "ministries_contact_person_id_users_id_fk" FOREIGN KEY ("contact_person_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ministries" ADD CONSTRAINT "ministries_related_page_id_pages_id_fk" FOREIGN KEY ("related_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ministries" ADD CONSTRAINT "ministries_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ministries_texts" ADD CONSTRAINT "ministries_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ministries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ministries_v" ADD CONSTRAINT "_ministries_v_parent_id_ministries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ministries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ministries_v" ADD CONSTRAINT "_ministries_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ministries_v" ADD CONSTRAINT "_ministries_v_version_contact_person_id_users_id_fk" FOREIGN KEY ("version_contact_person_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ministries_v" ADD CONSTRAINT "_ministries_v_version_related_page_id_pages_id_fk" FOREIGN KEY ("version_related_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ministries_v" ADD CONSTRAINT "_ministries_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ministries_v_texts" ADD CONSTRAINT "_ministries_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_ministries_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lifelines" ADD CONSTRAINT "lifelines_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lifelines_texts" ADD CONSTRAINT "lifelines_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lifelines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lifelines_v" ADD CONSTRAINT "_lifelines_v_parent_id_lifelines_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lifelines"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lifelines_v" ADD CONSTRAINT "_lifelines_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lifelines_v_texts" ADD CONSTRAINT "_lifelines_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_lifelines_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff_rels" ADD CONSTRAINT "staff_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staff_rels" ADD CONSTRAINT "staff_rels_ministries_fk" FOREIGN KEY ("ministries_id") REFERENCES "public"."ministries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_items_audience" ADD CONSTRAINT "search_items_audience_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_items_topics" ADD CONSTRAINT "search_items_topics_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_podcasts_fk" FOREIGN KEY ("podcasts_id") REFERENCES "public"."podcasts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bulletins_fk" FOREIGN KEY ("bulletins_id") REFERENCES "public"."bulletins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ministries_fk" FOREIGN KEY ("ministries_id") REFERENCES "public"."ministries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lifelines_fk" FOREIGN KEY ("lifelines_id") REFERENCES "public"."lifelines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_staff_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_items_fk" FOREIGN KEY ("search_items_id") REFERENCES "public"."search_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_settings_weekend_masses" ADD CONSTRAINT "global_settings_weekend_masses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_settings_daily_masses" ADD CONSTRAINT "global_settings_daily_masses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_settings_confession_times" ADD CONSTRAINT "global_settings_confession_times_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_settings_external_resources" ADD CONSTRAINT "global_settings_external_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_basic_links_order_idx" ON "pages_blocks_hero_basic_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_basic_links_parent_id_idx" ON "pages_blocks_hero_basic_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_basic_order_idx" ON "pages_blocks_hero_basic" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_basic_parent_id_idx" ON "pages_blocks_hero_basic" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_basic_path_idx" ON "pages_blocks_hero_basic" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_basic_background_image_idx" ON "pages_blocks_hero_basic" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_hero_with_stats_buttons_order_idx" ON "pages_blocks_hero_with_stats_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_with_stats_buttons_parent_id_idx" ON "pages_blocks_hero_with_stats_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_with_stats_stats_order_idx" ON "pages_blocks_hero_with_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_with_stats_stats_parent_id_idx" ON "pages_blocks_hero_with_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_with_stats_order_idx" ON "pages_blocks_hero_with_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_with_stats_parent_id_idx" ON "pages_blocks_hero_with_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_with_stats_path_idx" ON "pages_blocks_hero_with_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_with_stats_background_image_idx" ON "pages_blocks_hero_with_stats" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_rich_text_section_order_idx" ON "pages_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_section_parent_id_idx" ON "pages_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_section_path_idx" ON "pages_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_columns_columns_links_order_idx" ON "pages_blocks_columns_columns_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_columns_links_parent_id_idx" ON "pages_blocks_columns_columns_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_columns_order_idx" ON "pages_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_columns_parent_id_idx" ON "pages_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_columns_icon_idx" ON "pages_blocks_columns_columns" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_columns_order_idx" ON "pages_blocks_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_parent_id_idx" ON "pages_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_path_idx" ON "pages_blocks_columns" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_full_width_links_order_idx" ON "pages_blocks_cta_full_width_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_full_width_links_parent_id_idx" ON "pages_blocks_cta_full_width_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_full_width_order_idx" ON "pages_blocks_cta_full_width" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_full_width_parent_id_idx" ON "pages_blocks_cta_full_width" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_full_width_path_idx" ON "pages_blocks_cta_full_width" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_full_width_background_image_idx" ON "pages_blocks_cta_full_width" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_alert_banner_order_idx" ON "pages_blocks_alert_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_alert_banner_parent_id_idx" ON "pages_blocks_alert_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_alert_banner_path_idx" ON "pages_blocks_alert_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_image_idx" ON "pages_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_bento_grid_items_order_idx" ON "pages_blocks_bento_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_bento_grid_items_parent_id_idx" ON "pages_blocks_bento_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bento_grid_items_image_idx" ON "pages_blocks_bento_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_bento_grid_order_idx" ON "pages_blocks_bento_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_bento_grid_parent_id_idx" ON "pages_blocks_bento_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bento_grid_path_idx" ON "pages_blocks_bento_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_event_list_category_filter_order_idx" ON "pages_blocks_event_list_category_filter" USING btree ("order");
  CREATE INDEX "pages_blocks_event_list_category_filter_parent_idx" ON "pages_blocks_event_list_category_filter" USING btree ("parent_id");
  CREATE INDEX "pages_blocks_event_list_order_idx" ON "pages_blocks_event_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_list_parent_id_idx" ON "pages_blocks_event_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_list_path_idx" ON "pages_blocks_event_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_post_list_order_idx" ON "pages_blocks_post_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_post_list_parent_id_idx" ON "pages_blocks_post_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_post_list_path_idx" ON "pages_blocks_post_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_bulletin_list_order_idx" ON "pages_blocks_bulletin_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_bulletin_list_parent_id_idx" ON "pages_blocks_bulletin_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bulletin_list_path_idx" ON "pages_blocks_bulletin_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_list_order_idx" ON "pages_blocks_media_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_list_parent_id_idx" ON "pages_blocks_media_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_list_path_idx" ON "pages_blocks_media_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_order_idx" ON "pages_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_parent_id_idx" ON "pages_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_path_idx" ON "pages_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_image_idx" ON "pages_blocks_testimonial" USING btree ("image_id");
  CREATE INDEX "pages_blocks_story_highlight_order_idx" ON "pages_blocks_story_highlight" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_highlight_parent_id_idx" ON "pages_blocks_story_highlight" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_highlight_path_idx" ON "pages_blocks_story_highlight" USING btree ("_path");
  CREATE INDEX "pages_blocks_story_highlight_image_idx" ON "pages_blocks_story_highlight" USING btree ("image_id");
  CREATE INDEX "pages_blocks_faq_accordion_items_tags_order_idx" ON "pages_blocks_faq_accordion_items_tags" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_items_tags_parent_id_idx" ON "pages_blocks_faq_accordion_items_tags" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_items_order_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_items_parent_id_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_embed_order_idx" ON "pages_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_embed_parent_id_idx" ON "pages_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_path_idx" ON "pages_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_embed_poster_image_idx" ON "pages_blocks_video_embed" USING btree ("poster_image_id");
  CREATE INDEX "pages_blocks_form_embed_order_idx" ON "pages_blocks_form_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_embed_parent_id_idx" ON "pages_blocks_form_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_embed_path_idx" ON "pages_blocks_form_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_order_idx" ON "pages_blocks_spacer" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_parent_id_idx" ON "pages_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_path_idx" ON "pages_blocks_spacer" USING btree ("_path");
  CREATE INDEX "pages_blocks_divider_order_idx" ON "pages_blocks_divider" USING btree ("_order");
  CREATE INDEX "pages_blocks_divider_parent_id_idx" ON "pages_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_divider_path_idx" ON "pages_blocks_divider" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_texts_order_parent" ON "pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_basic_links_order_idx" ON "_pages_v_blocks_hero_basic_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_basic_links_parent_id_idx" ON "_pages_v_blocks_hero_basic_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_basic_order_idx" ON "_pages_v_blocks_hero_basic" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_basic_parent_id_idx" ON "_pages_v_blocks_hero_basic" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_basic_path_idx" ON "_pages_v_blocks_hero_basic" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_basic_background_image_idx" ON "_pages_v_blocks_hero_basic" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_buttons_order_idx" ON "_pages_v_blocks_hero_with_stats_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_buttons_parent_id_idx" ON "_pages_v_blocks_hero_with_stats_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_stats_order_idx" ON "_pages_v_blocks_hero_with_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_stats_parent_id_idx" ON "_pages_v_blocks_hero_with_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_order_idx" ON "_pages_v_blocks_hero_with_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_parent_id_idx" ON "_pages_v_blocks_hero_with_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_path_idx" ON "_pages_v_blocks_hero_with_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_with_stats_background_image_idx" ON "_pages_v_blocks_hero_with_stats" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_section_order_idx" ON "_pages_v_blocks_rich_text_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_section_parent_id_idx" ON "_pages_v_blocks_rich_text_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_section_path_idx" ON "_pages_v_blocks_rich_text_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_columns_columns_links_order_idx" ON "_pages_v_blocks_columns_columns_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_columns_links_parent_id_idx" ON "_pages_v_blocks_columns_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_columns_order_idx" ON "_pages_v_blocks_columns_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_columns_parent_id_idx" ON "_pages_v_blocks_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_columns_icon_idx" ON "_pages_v_blocks_columns_columns" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_columns_order_idx" ON "_pages_v_blocks_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_parent_id_idx" ON "_pages_v_blocks_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_path_idx" ON "_pages_v_blocks_columns" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_full_width_links_order_idx" ON "_pages_v_blocks_cta_full_width_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_full_width_links_parent_id_idx" ON "_pages_v_blocks_cta_full_width_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_full_width_order_idx" ON "_pages_v_blocks_cta_full_width" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_full_width_parent_id_idx" ON "_pages_v_blocks_cta_full_width" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_full_width_path_idx" ON "_pages_v_blocks_cta_full_width" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_full_width_background_image_idx" ON "_pages_v_blocks_cta_full_width" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_alert_banner_order_idx" ON "_pages_v_blocks_alert_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_alert_banner_parent_id_idx" ON "_pages_v_blocks_alert_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_alert_banner_path_idx" ON "_pages_v_blocks_alert_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_image_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_bento_grid_items_order_idx" ON "_pages_v_blocks_bento_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bento_grid_items_parent_id_idx" ON "_pages_v_blocks_bento_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bento_grid_items_image_idx" ON "_pages_v_blocks_bento_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_bento_grid_order_idx" ON "_pages_v_blocks_bento_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bento_grid_parent_id_idx" ON "_pages_v_blocks_bento_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bento_grid_path_idx" ON "_pages_v_blocks_bento_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_event_list_category_filter_order_idx" ON "_pages_v_blocks_event_list_category_filter" USING btree ("order");
  CREATE INDEX "_pages_v_blocks_event_list_category_filter_parent_idx" ON "_pages_v_blocks_event_list_category_filter" USING btree ("parent_id");
  CREATE INDEX "_pages_v_blocks_event_list_order_idx" ON "_pages_v_blocks_event_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_list_parent_id_idx" ON "_pages_v_blocks_event_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_list_path_idx" ON "_pages_v_blocks_event_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_post_list_order_idx" ON "_pages_v_blocks_post_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_post_list_parent_id_idx" ON "_pages_v_blocks_post_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_post_list_path_idx" ON "_pages_v_blocks_post_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_bulletin_list_order_idx" ON "_pages_v_blocks_bulletin_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bulletin_list_parent_id_idx" ON "_pages_v_blocks_bulletin_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bulletin_list_path_idx" ON "_pages_v_blocks_bulletin_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_list_order_idx" ON "_pages_v_blocks_media_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_list_parent_id_idx" ON "_pages_v_blocks_media_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_list_path_idx" ON "_pages_v_blocks_media_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_order_idx" ON "_pages_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_parent_id_idx" ON "_pages_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_path_idx" ON "_pages_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_image_idx" ON "_pages_v_blocks_testimonial" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_story_highlight_order_idx" ON "_pages_v_blocks_story_highlight" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_highlight_parent_id_idx" ON "_pages_v_blocks_story_highlight" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_highlight_path_idx" ON "_pages_v_blocks_story_highlight" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_story_highlight_image_idx" ON "_pages_v_blocks_story_highlight" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_tags_order_idx" ON "_pages_v_blocks_faq_accordion_items_tags" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_tags_parent_id_idx" ON "_pages_v_blocks_faq_accordion_items_tags" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_order_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_parent_id_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_order_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_parent_id_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_path_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_embed_order_idx" ON "_pages_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_embed_parent_id_idx" ON "_pages_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_path_idx" ON "_pages_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_embed_poster_image_idx" ON "_pages_v_blocks_video_embed" USING btree ("poster_image_id");
  CREATE INDEX "_pages_v_blocks_form_embed_order_idx" ON "_pages_v_blocks_form_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_embed_parent_id_idx" ON "_pages_v_blocks_form_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_embed_path_idx" ON "_pages_v_blocks_form_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_order_idx" ON "_pages_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_parent_id_idx" ON "_pages_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_path_idx" ON "_pages_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_divider_order_idx" ON "_pages_v_blocks_divider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_divider_parent_id_idx" ON "_pages_v_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_divider_path_idx" ON "_pages_v_blocks_divider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_texts_order_parent" ON "_pages_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_texts_order_parent" ON "posts_texts" USING btree ("order","parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_texts_order_parent" ON "_posts_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "events_featured_image_idx" ON "events" USING btree ("featured_image_id");
  CREATE INDEX "events_contact_person_idx" ON "events" USING btree ("contact_person_id");
  CREATE INDEX "events_meta_meta_image_idx" ON "events" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_texts_order_parent" ON "events_texts" USING btree ("order","parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_featured_image_idx" ON "_events_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_events_v_version_version_contact_person_idx" ON "_events_v" USING btree ("version_contact_person_id");
  CREATE INDEX "_events_v_version_meta_version_meta_image_idx" ON "_events_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE INDEX "_events_v_texts_order_parent" ON "_events_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "podcasts_featured_image_idx" ON "podcasts" USING btree ("featured_image_id");
  CREATE INDEX "podcasts_meta_meta_image_idx" ON "podcasts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "podcasts_slug_idx" ON "podcasts" USING btree ("slug");
  CREATE INDEX "podcasts_updated_at_idx" ON "podcasts" USING btree ("updated_at");
  CREATE INDEX "podcasts_created_at_idx" ON "podcasts" USING btree ("created_at");
  CREATE INDEX "podcasts__status_idx" ON "podcasts" USING btree ("_status");
  CREATE INDEX "podcasts_texts_order_parent" ON "podcasts_texts" USING btree ("order","parent_id");
  CREATE INDEX "_podcasts_v_parent_idx" ON "_podcasts_v" USING btree ("parent_id");
  CREATE INDEX "_podcasts_v_version_version_featured_image_idx" ON "_podcasts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_podcasts_v_version_meta_version_meta_image_idx" ON "_podcasts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_podcasts_v_version_version_slug_idx" ON "_podcasts_v" USING btree ("version_slug");
  CREATE INDEX "_podcasts_v_version_version_updated_at_idx" ON "_podcasts_v" USING btree ("version_updated_at");
  CREATE INDEX "_podcasts_v_version_version_created_at_idx" ON "_podcasts_v" USING btree ("version_created_at");
  CREATE INDEX "_podcasts_v_version_version__status_idx" ON "_podcasts_v" USING btree ("version__status");
  CREATE INDEX "_podcasts_v_created_at_idx" ON "_podcasts_v" USING btree ("created_at");
  CREATE INDEX "_podcasts_v_updated_at_idx" ON "_podcasts_v" USING btree ("updated_at");
  CREATE INDEX "_podcasts_v_latest_idx" ON "_podcasts_v" USING btree ("latest");
  CREATE INDEX "_podcasts_v_autosave_idx" ON "_podcasts_v" USING btree ("autosave");
  CREATE INDEX "_podcasts_v_texts_order_parent" ON "_podcasts_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "bulletins_file_idx" ON "bulletins" USING btree ("file_id");
  CREATE INDEX "bulletins_updated_at_idx" ON "bulletins" USING btree ("updated_at");
  CREATE INDEX "bulletins_created_at_idx" ON "bulletins" USING btree ("created_at");
  CREATE INDEX "ministries_featured_image_idx" ON "ministries" USING btree ("featured_image_id");
  CREATE INDEX "ministries_contact_person_idx" ON "ministries" USING btree ("contact_person_id");
  CREATE INDEX "ministries_related_page_idx" ON "ministries" USING btree ("related_page_id");
  CREATE INDEX "ministries_meta_meta_image_idx" ON "ministries" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "ministries_slug_idx" ON "ministries" USING btree ("slug");
  CREATE INDEX "ministries_updated_at_idx" ON "ministries" USING btree ("updated_at");
  CREATE INDEX "ministries_created_at_idx" ON "ministries" USING btree ("created_at");
  CREATE INDEX "ministries__status_idx" ON "ministries" USING btree ("_status");
  CREATE INDEX "ministries_texts_order_parent" ON "ministries_texts" USING btree ("order","parent_id");
  CREATE INDEX "_ministries_v_parent_idx" ON "_ministries_v" USING btree ("parent_id");
  CREATE INDEX "_ministries_v_version_version_featured_image_idx" ON "_ministries_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_ministries_v_version_version_contact_person_idx" ON "_ministries_v" USING btree ("version_contact_person_id");
  CREATE INDEX "_ministries_v_version_version_related_page_idx" ON "_ministries_v" USING btree ("version_related_page_id");
  CREATE INDEX "_ministries_v_version_meta_version_meta_image_idx" ON "_ministries_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_ministries_v_version_version_slug_idx" ON "_ministries_v" USING btree ("version_slug");
  CREATE INDEX "_ministries_v_version_version_updated_at_idx" ON "_ministries_v" USING btree ("version_updated_at");
  CREATE INDEX "_ministries_v_version_version_created_at_idx" ON "_ministries_v" USING btree ("version_created_at");
  CREATE INDEX "_ministries_v_version_version__status_idx" ON "_ministries_v" USING btree ("version__status");
  CREATE INDEX "_ministries_v_created_at_idx" ON "_ministries_v" USING btree ("created_at");
  CREATE INDEX "_ministries_v_updated_at_idx" ON "_ministries_v" USING btree ("updated_at");
  CREATE INDEX "_ministries_v_latest_idx" ON "_ministries_v" USING btree ("latest");
  CREATE INDEX "_ministries_v_autosave_idx" ON "_ministries_v" USING btree ("autosave");
  CREATE INDEX "_ministries_v_texts_order_parent" ON "_ministries_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "lifelines_featured_image_idx" ON "lifelines" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "lifelines_slug_idx" ON "lifelines" USING btree ("slug");
  CREATE INDEX "lifelines_updated_at_idx" ON "lifelines" USING btree ("updated_at");
  CREATE INDEX "lifelines_created_at_idx" ON "lifelines" USING btree ("created_at");
  CREATE INDEX "lifelines__status_idx" ON "lifelines" USING btree ("_status");
  CREATE INDEX "lifelines_texts_order_parent" ON "lifelines_texts" USING btree ("order","parent_id");
  CREATE INDEX "_lifelines_v_parent_idx" ON "_lifelines_v" USING btree ("parent_id");
  CREATE INDEX "_lifelines_v_version_version_featured_image_idx" ON "_lifelines_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_lifelines_v_version_version_slug_idx" ON "_lifelines_v" USING btree ("version_slug");
  CREATE INDEX "_lifelines_v_version_version_updated_at_idx" ON "_lifelines_v" USING btree ("version_updated_at");
  CREATE INDEX "_lifelines_v_version_version_created_at_idx" ON "_lifelines_v" USING btree ("version_created_at");
  CREATE INDEX "_lifelines_v_version_version__status_idx" ON "_lifelines_v" USING btree ("version__status");
  CREATE INDEX "_lifelines_v_created_at_idx" ON "_lifelines_v" USING btree ("created_at");
  CREATE INDEX "_lifelines_v_updated_at_idx" ON "_lifelines_v" USING btree ("updated_at");
  CREATE INDEX "_lifelines_v_latest_idx" ON "_lifelines_v" USING btree ("latest");
  CREATE INDEX "_lifelines_v_autosave_idx" ON "_lifelines_v" USING btree ("autosave");
  CREATE INDEX "_lifelines_v_texts_order_parent" ON "_lifelines_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "staff_photo_idx" ON "staff" USING btree ("photo_id");
  CREATE UNIQUE INDEX "staff_slug_idx" ON "staff" USING btree ("slug");
  CREATE INDEX "staff_updated_at_idx" ON "staff" USING btree ("updated_at");
  CREATE INDEX "staff_created_at_idx" ON "staff" USING btree ("created_at");
  CREATE INDEX "staff_rels_order_idx" ON "staff_rels" USING btree ("order");
  CREATE INDEX "staff_rels_parent_idx" ON "staff_rels" USING btree ("parent_id");
  CREATE INDEX "staff_rels_path_idx" ON "staff_rels" USING btree ("path");
  CREATE INDEX "staff_rels_ministries_id_idx" ON "staff_rels" USING btree ("ministries_id");
  CREATE INDEX "search_items_audience_order_idx" ON "search_items_audience" USING btree ("order");
  CREATE INDEX "search_items_audience_parent_idx" ON "search_items_audience" USING btree ("parent_id");
  CREATE INDEX "search_items_topics_order_idx" ON "search_items_topics" USING btree ("order");
  CREATE INDEX "search_items_topics_parent_idx" ON "search_items_topics" USING btree ("parent_id");
  CREATE INDEX "search_items_updated_at_idx" ON "search_items" USING btree ("updated_at");
  CREATE INDEX "search_items_created_at_idx" ON "search_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "sourceCollection_sourceId_idx" ON "search_items" USING btree ("source_collection","source_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_podcasts_id_idx" ON "payload_locked_documents_rels" USING btree ("podcasts_id");
  CREATE INDEX "payload_locked_documents_rels_bulletins_id_idx" ON "payload_locked_documents_rels" USING btree ("bulletins_id");
  CREATE INDEX "payload_locked_documents_rels_ministries_id_idx" ON "payload_locked_documents_rels" USING btree ("ministries_id");
  CREATE INDEX "payload_locked_documents_rels_lifelines_id_idx" ON "payload_locked_documents_rels" USING btree ("lifelines_id");
  CREATE INDEX "payload_locked_documents_rels_staff_id_idx" ON "payload_locked_documents_rels" USING btree ("staff_id");
  CREATE INDEX "payload_locked_documents_rels_search_items_id_idx" ON "payload_locked_documents_rels" USING btree ("search_items_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "global_settings_weekend_masses_order_idx" ON "global_settings_weekend_masses" USING btree ("_order");
  CREATE INDEX "global_settings_weekend_masses_parent_id_idx" ON "global_settings_weekend_masses" USING btree ("_parent_id");
  CREATE INDEX "global_settings_daily_masses_order_idx" ON "global_settings_daily_masses" USING btree ("_order");
  CREATE INDEX "global_settings_daily_masses_parent_id_idx" ON "global_settings_daily_masses" USING btree ("_parent_id");
  CREATE INDEX "global_settings_confession_times_order_idx" ON "global_settings_confession_times" USING btree ("_order");
  CREATE INDEX "global_settings_confession_times_parent_id_idx" ON "global_settings_confession_times" USING btree ("_parent_id");
  CREATE INDEX "global_settings_external_resources_order_idx" ON "global_settings_external_resources" USING btree ("_order");
  CREATE INDEX "global_settings_external_resources_parent_id_idx" ON "global_settings_external_resources" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero_basic_links" CASCADE;
  DROP TABLE "pages_blocks_hero_basic" CASCADE;
  DROP TABLE "pages_blocks_hero_with_stats_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero_with_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_hero_with_stats" CASCADE;
  DROP TABLE "pages_blocks_rich_text_section" CASCADE;
  DROP TABLE "pages_blocks_columns_columns_links" CASCADE;
  DROP TABLE "pages_blocks_columns_columns" CASCADE;
  DROP TABLE "pages_blocks_columns" CASCADE;
  DROP TABLE "pages_blocks_cta_full_width_links" CASCADE;
  DROP TABLE "pages_blocks_cta_full_width" CASCADE;
  DROP TABLE "pages_blocks_alert_banner" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_bento_grid_items" CASCADE;
  DROP TABLE "pages_blocks_bento_grid" CASCADE;
  DROP TABLE "pages_blocks_event_list_category_filter" CASCADE;
  DROP TABLE "pages_blocks_event_list" CASCADE;
  DROP TABLE "pages_blocks_post_list" CASCADE;
  DROP TABLE "pages_blocks_bulletin_list" CASCADE;
  DROP TABLE "pages_blocks_media_list" CASCADE;
  DROP TABLE "pages_blocks_testimonial" CASCADE;
  DROP TABLE "pages_blocks_story_highlight" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items_tags" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
  DROP TABLE "pages_blocks_video_embed" CASCADE;
  DROP TABLE "pages_blocks_form_embed" CASCADE;
  DROP TABLE "pages_blocks_spacer" CASCADE;
  DROP TABLE "pages_blocks_divider" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_texts" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_basic_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_basic" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_with_stats_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_with_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_with_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_section" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_columns_links" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_full_width_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_full_width" CASCADE;
  DROP TABLE "_pages_v_blocks_alert_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_event_list_category_filter" CASCADE;
  DROP TABLE "_pages_v_blocks_event_list" CASCADE;
  DROP TABLE "_pages_v_blocks_post_list" CASCADE;
  DROP TABLE "_pages_v_blocks_bulletin_list" CASCADE;
  DROP TABLE "_pages_v_blocks_media_list" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial" CASCADE;
  DROP TABLE "_pages_v_blocks_story_highlight" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_items_tags" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_form_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer" CASCADE;
  DROP TABLE "_pages_v_blocks_divider" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_texts" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_texts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_texts" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_texts" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_texts" CASCADE;
  DROP TABLE "podcasts" CASCADE;
  DROP TABLE "podcasts_texts" CASCADE;
  DROP TABLE "_podcasts_v" CASCADE;
  DROP TABLE "_podcasts_v_texts" CASCADE;
  DROP TABLE "bulletins" CASCADE;
  DROP TABLE "ministries" CASCADE;
  DROP TABLE "ministries_texts" CASCADE;
  DROP TABLE "_ministries_v" CASCADE;
  DROP TABLE "_ministries_v_texts" CASCADE;
  DROP TABLE "lifelines" CASCADE;
  DROP TABLE "lifelines_texts" CASCADE;
  DROP TABLE "_lifelines_v" CASCADE;
  DROP TABLE "_lifelines_v_texts" CASCADE;
  DROP TABLE "staff" CASCADE;
  DROP TABLE "staff_rels" CASCADE;
  DROP TABLE "search_items_audience" CASCADE;
  DROP TABLE "search_items_topics" CASCADE;
  DROP TABLE "search_items" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "global_settings_weekend_masses" CASCADE;
  DROP TABLE "global_settings_daily_masses" CASCADE;
  DROP TABLE "global_settings_confession_times" CASCADE;
  DROP TABLE "global_settings_external_resources" CASCADE;
  DROP TABLE "global_settings" CASCADE;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_basic_background_overlay";
  DROP TYPE "public"."bg_var";
  DROP TYPE "public"."align";
  DROP TYPE "public"."pad_top";
  DROP TYPE "public"."pad_btm";
  DROP TYPE "public"."enum_pages_blocks_hero_with_stats_buttons_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_with_stats_buttons_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_with_stats_background_overlay";
  DROP TYPE "public"."enum_pages_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_columns_columns_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_columns_layout";
  DROP TYPE "public"."enum_pages_blocks_columns_column_gap";
  DROP TYPE "public"."enum_pages_blocks_cta_full_width_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_full_width_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_full_width_background_overlay";
  DROP TYPE "public"."enum_pages_blocks_alert_banner_type";
  DROP TYPE "public"."enum_pages_blocks_alert_banner_icon";
  DROP TYPE "public"."enum_pages_blocks_card_grid_source_type";
  DROP TYPE "public"."enum_pages_blocks_card_grid_collection_slug";
  DROP TYPE "public"."enum_pages_blocks_card_grid_order_by";
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_card_grid_card_style";
  DROP TYPE "public"."enum_pages_blocks_bento_grid_items_size";
  DROP TYPE "public"."enum_pages_blocks_bento_grid_items_image_style";
  DROP TYPE "public"."enum_pages_blocks_event_list_category_filter";
  DROP TYPE "public"."enum_pages_blocks_event_list_mode";
  DROP TYPE "public"."enum_pages_blocks_event_list_layout";
  DROP TYPE "public"."enum_pages_blocks_post_list_layout";
  DROP TYPE "public"."enum_pages_blocks_bulletin_list_display_mode";
  DROP TYPE "public"."enum_pages_blocks_bulletin_list_layout";
  DROP TYPE "public"."enum_pages_blocks_media_list_media_type";
  DROP TYPE "public"."enum_pages_blocks_media_list_layout";
  DROP TYPE "public"."enum_pages_blocks_testimonial_layout";
  DROP TYPE "public"."enum_pages_blocks_story_highlight_image_position";
  DROP TYPE "public"."enum_pages_blocks_faq_accordion_default_open";
  DROP TYPE "public"."enum_pages_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_form_embed_embed_type";
  DROP TYPE "public"."enum_pages_blocks_form_embed_width_mode";
  DROP TYPE "public"."enum_pages_blocks_spacer_size";
  DROP TYPE "public"."enum_pages_blocks_divider_style";
  DROP TYPE "public"."enum_pages_blocks_divider_thickness";
  DROP TYPE "public"."enum_pages_blocks_divider_width";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_audience";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_basic_background_overlay";
  DROP TYPE "public"."enum__pages_v_blocks_hero_with_stats_buttons_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_with_stats_buttons_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_with_stats_background_overlay";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_section_max_width";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_columns_columns_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_columns_layout";
  DROP TYPE "public"."enum__pages_v_blocks_columns_column_gap";
  DROP TYPE "public"."enum__pages_v_blocks_cta_full_width_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_full_width_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_full_width_background_overlay";
  DROP TYPE "public"."enum__pages_v_blocks_alert_banner_type";
  DROP TYPE "public"."enum__pages_v_blocks_alert_banner_icon";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_source_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_collection_slug";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_order_by";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_bento_grid_items_size";
  DROP TYPE "public"."enum__pages_v_blocks_bento_grid_items_image_style";
  DROP TYPE "public"."enum__pages_v_blocks_event_list_category_filter";
  DROP TYPE "public"."enum__pages_v_blocks_event_list_mode";
  DROP TYPE "public"."enum__pages_v_blocks_event_list_layout";
  DROP TYPE "public"."enum__pages_v_blocks_post_list_layout";
  DROP TYPE "public"."enum__pages_v_blocks_bulletin_list_display_mode";
  DROP TYPE "public"."enum__pages_v_blocks_bulletin_list_layout";
  DROP TYPE "public"."enum__pages_v_blocks_media_list_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_list_layout";
  DROP TYPE "public"."enum__pages_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__pages_v_blocks_story_highlight_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_faq_accordion_default_open";
  DROP TYPE "public"."enum__pages_v_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_form_embed_embed_type";
  DROP TYPE "public"."enum__pages_v_blocks_form_embed_width_mode";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_size";
  DROP TYPE "public"."enum__pages_v_blocks_divider_style";
  DROP TYPE "public"."enum__pages_v_blocks_divider_thickness";
  DROP TYPE "public"."enum__pages_v_blocks_divider_width";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_audience";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_audience";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_audience";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_events_category";
  DROP TYPE "public"."enum_events_audience";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_category";
  DROP TYPE "public"."enum__events_v_version_audience";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_podcasts_type";
  DROP TYPE "public"."enum_podcasts_audience";
  DROP TYPE "public"."enum_podcasts_status";
  DROP TYPE "public"."enum__podcasts_v_version_type";
  DROP TYPE "public"."enum__podcasts_v_version_audience";
  DROP TYPE "public"."enum__podcasts_v_version_status";
  DROP TYPE "public"."enum_bulletins_liturgical_season";
  DROP TYPE "public"."enum_ministries_category";
  DROP TYPE "public"."enum_ministries_audience";
  DROP TYPE "public"."enum_ministries_status";
  DROP TYPE "public"."enum__ministries_v_version_category";
  DROP TYPE "public"."enum__ministries_v_version_audience";
  DROP TYPE "public"."enum__ministries_v_version_status";
  DROP TYPE "public"."enum_lifelines_type";
  DROP TYPE "public"."enum_lifelines_meeting_day";
  DROP TYPE "public"."enum_lifelines_meeting_frequency";
  DROP TYPE "public"."enum_lifelines_audience";
  DROP TYPE "public"."enum_lifelines_status";
  DROP TYPE "public"."enum__lifelines_v_version_type";
  DROP TYPE "public"."enum__lifelines_v_version_meeting_day";
  DROP TYPE "public"."enum__lifelines_v_version_meeting_frequency";
  DROP TYPE "public"."enum__lifelines_v_version_audience";
  DROP TYPE "public"."enum__lifelines_v_version_status";
  DROP TYPE "public"."enum_staff_department";
  DROP TYPE "public"."enum_search_items_audience";
  DROP TYPE "public"."enum_search_items_topics";
  DROP TYPE "public"."enum_search_items_kind";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_global_settings_weekend_masses_day";
  DROP TYPE "public"."enum_global_settings_weekend_masses_language";
  DROP TYPE "public"."enum_global_settings_confession_times_day";
  DROP TYPE "public"."enum_global_settings_global_alert_type";`)
}
