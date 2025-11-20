import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Phase 7 Page Builder UX Polish Migration
 *
 * Adds Phase 7 features to blocks:
 * - Welcome card width control for HeroBasic
 * - Visibility settings (device + audience targeting)
 * - Animation settings (entrance animations)
 *
 * Blocks affected:
 * - HeroBasic
 * - RichTextSection
 * - CTAFullWidth
 * - CardGrid
 * - Testimonial
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add welcomeCardWidth to HeroBasic
    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS welcome_card_width varchar;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS welcome_card_width varchar;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility settings to HeroBasic
    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add animation settings to HeroBasic
    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility settings to _pages_v_blocks_hero_basic
    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add animation settings to _pages_v_blocks_hero_basic
    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility + animation to RichTextSection
    DO $$ BEGIN
      ALTER TABLE pages_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility + animation to _pages_v_blocks_rich_text_section
    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility + animation to CTAFullWidth
    DO $$ BEGIN
      ALTER TABLE pages_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility + animation to _pages_v_blocks_cta_full_width
    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility + animation to CardGrid
    DO $$ BEGIN
      ALTER TABLE pages_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility + animation to _pages_v_blocks_card_grid
    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility + animation to Testimonial
    DO $$ BEGIN
      ALTER TABLE pages_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE pages_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    -- Add visibility + animation to _pages_v_blocks_testimonial
    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE _pages_v_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
    END $$;
  `)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // Rollback not implemented - Phase 7 columns are optional and safe to leave
}
