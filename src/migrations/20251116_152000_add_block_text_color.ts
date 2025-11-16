import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Create enum type for block text color
   DO $$ BEGIN
     CREATE TYPE "public"."text_color" AS ENUM('auto', 'light', 'dark', 'brand');
   EXCEPTION
     WHEN duplicate_object THEN null;
   END $$;

   -- Add appearance_text_color to all block tables
   ALTER TABLE "pages_blocks_hero_basic" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_hero_with_stats" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_rich_text_section" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_columns" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_cta_full_width" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_alert_banner" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_card_grid" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_bento_grid" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_event_list" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_post_list" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_bulletin_list" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_media_list" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_testimonial" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_story_highlight" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_faq_accordion" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_video_embed" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_form_embed" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_spacer" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_divider" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_custom_code" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_cta" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_content" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_media_block" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';

   -- Also add to _pages_v (version) tables
   ALTER TABLE "_pages_v_blocks_hero_basic" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_hero_with_stats" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_rich_text_section" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_columns" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_cta_full_width" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_alert_banner" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_card_grid" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_bento_grid" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_event_list" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_post_list" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_bulletin_list" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_media_list" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_testimonial" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_story_highlight" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_faq_accordion" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_video_embed" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_form_embed" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_spacer" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_divider" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_custom_code" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_content" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Remove appearance_text_color from all block tables
   ALTER TABLE "pages_blocks_hero_basic" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_hero_with_stats" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_rich_text_section" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_columns" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_cta_full_width" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_alert_banner" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_card_grid" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_bento_grid" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_event_list" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_post_list" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_bulletin_list" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_media_list" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_testimonial" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_story_highlight" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_faq_accordion" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_video_embed" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_form_embed" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_spacer" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_divider" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_custom_code" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_content" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_media_block" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "appearance_text_color";

   -- Remove from _pages_v (version) tables
   ALTER TABLE "_pages_v_blocks_hero_basic" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_hero_with_stats" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_rich_text_section" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_columns" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_cta_full_width" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_alert_banner" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_card_grid" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_bento_grid" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_event_list" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_post_list" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_bulletin_list" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_media_list" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_testimonial" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_story_highlight" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_faq_accordion" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_video_embed" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_form_embed" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_spacer" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_divider" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_custom_code" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_content" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "appearance_text_color";

   -- Drop enum type
   DROP TYPE IF EXISTS "public"."text_color";
  `)
}
