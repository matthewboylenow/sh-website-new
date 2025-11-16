import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Add new button appearance values to all link_appearance enum types
   -- We need to add: secondary, brandOutline, light, ghost

   -- Main table enums
   DO $$ BEGIN
     ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum_pages_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum_pages_blocks_hero_basic_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum_pages_blocks_hero_basic_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum_pages_blocks_hero_basic_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum_pages_blocks_hero_basic_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum_pages_blocks_hero_basic_welcome_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum_pages_blocks_hero_basic_welcome_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum_pages_blocks_hero_basic_welcome_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum_pages_blocks_hero_basic_welcome_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum_pages_blocks_hero_with_stats_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum_pages_blocks_hero_with_stats_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum_pages_blocks_hero_with_stats_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum_pages_blocks_hero_with_stats_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum_pages_blocks_columns_columns_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum_pages_blocks_columns_columns_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum_pages_blocks_columns_columns_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum_pages_blocks_columns_columns_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum_pages_blocks_cta_full_width_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum_pages_blocks_cta_full_width_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum_pages_blocks_cta_full_width_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum_pages_blocks_cta_full_width_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum_pages_blocks_cta_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum_pages_blocks_content_columns_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   -- Version table enums
   DO $$ BEGIN
     ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum__pages_v_version_hero_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum__pages_v_blocks_hero_basic_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_basic_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_basic_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_basic_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum__pages_v_blocks_hero_basic_welcome_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_basic_welcome_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_basic_welcome_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_basic_welcome_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum__pages_v_blocks_hero_with_stats_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_with_stats_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_with_stats_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum__pages_v_blocks_hero_with_stats_buttons_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum__pages_v_blocks_columns_columns_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum__pages_v_blocks_columns_columns_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum__pages_v_blocks_columns_columns_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum__pages_v_blocks_columns_columns_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum__pages_v_blocks_cta_full_width_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum__pages_v_blocks_cta_full_width_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum__pages_v_blocks_cta_full_width_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum__pages_v_blocks_cta_full_width_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;

   DO $$ BEGIN
     ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE IF NOT EXISTS 'secondary';
     ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE IF NOT EXISTS 'brandOutline';
     ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE IF NOT EXISTS 'light';
     ALTER TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" ADD VALUE IF NOT EXISTS 'ghost';
   EXCEPTION
     WHEN others THEN null;
   END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: PostgreSQL doesn't support removing enum values easily
  // This would require recreating the enum types and migrating data
  // For now, we'll leave the enum values in place as they won't cause issues
  await db.execute(sql`
   -- Removing enum values is not straightforward in PostgreSQL
   -- Would require recreating enums and migrating data
   -- Leaving values in place is safe
   SELECT 1;
  `)
}
