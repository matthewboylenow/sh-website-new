import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Phase 7 - Add visibility and animation settings to ALL remaining blocks
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Pages block tables
  const pagesBlockTables = [
    'pages_blocks_hero_with_stats',
    'pages_blocks_columns',
    'pages_blocks_bento_grid',
    'pages_blocks_story_highlight',
    'pages_blocks_event_list',
    'pages_blocks_post_list',
    'pages_blocks_bulletin_list',
    'pages_blocks_media_list',
    'pages_blocks_faq_accordion',
    'pages_blocks_video_embed',
    'pages_blocks_form_embed',
    'pages_blocks_alert_banner',
  ]

  // Version tables
  const versionTables = [
    '_pages_v_blocks_hero_with_stats',
    '_pages_v_blocks_columns',
    '_pages_v_blocks_bento_grid',
    '_pages_v_blocks_story_highlight',
    '_pages_v_blocks_event_list',
    '_pages_v_blocks_post_list',
    '_pages_v_blocks_bulletin_list',
    '_pages_v_blocks_media_list',
    '_pages_v_blocks_faq_accordion',
    '_pages_v_blocks_video_embed',
    '_pages_v_blocks_form_embed',
    '_pages_v_blocks_alert_banner',
  ]

  // Patterns block tables
  const patternsBlockTables = [
    'patterns_layout_blocks_hero_with_stats',
    'patterns_layout_blocks_columns',
    'patterns_layout_blocks_bento_grid',
    'patterns_layout_blocks_story_highlight',
    'patterns_layout_blocks_event_list',
    'patterns_layout_blocks_post_list',
    'patterns_layout_blocks_bulletin_list',
    'patterns_layout_blocks_media_list',
    'patterns_layout_blocks_faq_accordion',
    'patterns_layout_blocks_video_embed',
    'patterns_layout_blocks_form_embed',
    'patterns_layout_blocks_alert_banner',
  ]

  // Patterns version tables
  const patternsVersionTables = [
    '_patterns_v_layout_blocks_hero_with_stats',
    '_patterns_v_layout_blocks_columns',
    '_patterns_v_layout_blocks_bento_grid',
    '_patterns_v_layout_blocks_story_highlight',
    '_patterns_v_layout_blocks_event_list',
    '_patterns_v_layout_blocks_post_list',
    '_patterns_v_layout_blocks_bulletin_list',
    '_patterns_v_layout_blocks_media_list',
    '_patterns_v_layout_blocks_faq_accordion',
    '_patterns_v_layout_blocks_video_embed',
    '_patterns_v_layout_blocks_form_embed',
    '_patterns_v_layout_blocks_alert_banner',
  ]

  const allTables = [...pagesBlockTables, ...versionTables, ...patternsBlockTables, ...patternsVersionTables]

  // Add visibility and animation columns to each table one at a time
  for (const table of allTables) {
    // Visibility columns
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS visibility_show_on_mobile boolean DEFAULT true
    `)
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS visibility_show_on_tablet boolean DEFAULT true
    `)
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS visibility_show_on_desktop boolean DEFAULT true
    `)
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS visibility_audience varchar DEFAULT 'all'
    `)
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS visibility_start_date timestamptz
    `)
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS visibility_end_date timestamptz
    `)

    // Animation columns
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS animation_preset varchar DEFAULT 'none'
    `)
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS animation_delay numeric DEFAULT 0
    `)
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS animation_duration numeric DEFAULT 600
    `)
    await db.execute(sql`
      ALTER TABLE IF EXISTS ${sql.raw(table)} ADD COLUMN IF NOT EXISTS animation_once boolean DEFAULT true
    `)
  }

  // Create InsertPattern block tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS pages_blocks_insert_pattern (
      _order integer NOT NULL,
      _parent_id integer NOT NULL,
      _path text NOT NULL,
      id serial PRIMARY KEY,
      pattern_id integer,
      block_name varchar
    )
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS _pages_v_blocks_insert_pattern (
      _order integer NOT NULL,
      _parent_id integer NOT NULL,
      _path text NOT NULL,
      id serial PRIMARY KEY,
      pattern_id integer,
      block_name varchar,
      _uuid varchar
    )
  `)

  // Create indexes for InsertPattern
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS pages_blocks_insert_pattern_order_idx ON pages_blocks_insert_pattern (_order)
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS pages_blocks_insert_pattern_parent_id_idx ON pages_blocks_insert_pattern (_parent_id)
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS pages_blocks_insert_pattern_path_idx ON pages_blocks_insert_pattern (_path)
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS pages_blocks_insert_pattern_pattern_idx ON pages_blocks_insert_pattern (pattern_id)
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS _pages_v_blocks_insert_pattern_order_idx ON _pages_v_blocks_insert_pattern (_order)
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS _pages_v_blocks_insert_pattern_parent_id_idx ON _pages_v_blocks_insert_pattern (_parent_id)
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS _pages_v_blocks_insert_pattern_path_idx ON _pages_v_blocks_insert_pattern (_path)
  `)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // Rollback not implemented - columns are optional and safe to leave
}
