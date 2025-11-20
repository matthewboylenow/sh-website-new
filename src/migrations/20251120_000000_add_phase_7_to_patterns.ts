import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Phase 7 Features for Patterns Collection
 *
 * Adds the same Phase 7 fields to Patterns collection block tables
 * that were added to Pages collection in migration 20251119_235000.
 *
 * The Patterns collection uses the same blocks as Pages, so it needs
 * the same columns for visibility and animation settings.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add welcomeCardWidth + visibility + animation to patterns_layout_blocks_hero_basic
    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS welcome_card_width varchar;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_hero_basic ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    -- Add visibility + animation to patterns_layout_blocks_rich_text_section
    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_rich_text_section ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_rich_text_section ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    -- Add visibility + animation to patterns_layout_blocks_cta_full_width
    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_cta_full_width ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_cta_full_width ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    -- Add visibility + animation to patterns_layout_blocks_card_grid
    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_card_grid ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_card_grid ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    -- Add visibility + animation to patterns_layout_blocks_testimonial
    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_testimonial ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none';
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE patterns_layout_blocks_testimonial ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true;
    EXCEPTION
      WHEN duplicate_column THEN NULL;
      WHEN undefined_table THEN NULL;
    END $$;
  `)
}

export async function down({ _db }: MigrateDownArgs): Promise<void> {
  // Rollback not implemented - Phase 7 columns are optional and safe to leave
}
