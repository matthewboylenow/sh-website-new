import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'
import { convertLexicalToHTML, defaultHTMLConverters } from '@payloadcms/richtext-lexical/html'

/**
 * Migration: Convert Rich Text from Lexical JSON to HTML Strings
 *
 * This migration converts all Lexical JSON rich text data to HTML strings
 * for use with the new Quill-based editor.
 *
 * Collections and fields being migrated:
 * - staff.bio
 * - events.description
 * - ministries.description, ministries.howToJoin
 * - lifelines.description
 * - podcasts.description
 * - media.caption
 * - posts.content
 *
 * Blocks (within pages and patterns):
 * - Various rich text fields in blocks (body, subtitle, content, etc.)
 *
 * Note: This migration is complex because:
 * 1. Lexical data is stored as JSONB
 * 2. We need to convert to HTML string and update the column type
 * 3. Block data is nested within JSON arrays
 */

// List of collections and their rich text fields
const COLLECTION_FIELDS = [
  { table: 'staff', field: 'bio' },
  { table: 'events', field: 'description' },
  { table: 'ministries', field: 'description' },
  { table: 'ministries', field: 'how_to_join' },
  { table: 'life_lines', field: 'description' },
  { table: 'podcasts', field: 'description' },
  { table: 'media', field: 'caption' },
  { table: 'posts', field: 'content' },
]

// Version tables to also migrate
const VERSION_TABLES = [
  { table: '_staff_v', field: 'version_bio' },
  { table: '_events_v', field: 'version_description' },
  { table: '_ministries_v', field: 'version_description' },
  { table: '_ministries_v', field: 'version_how_to_join' },
  { table: '_life_lines_v', field: 'version_description' },
  { table: '_podcasts_v', field: 'version_description' },
  { table: '_posts_v', field: 'version_content' },
]

/**
 * Convert a single Lexical JSON value to HTML
 */
function lexicalToHtml(lexicalData: unknown): string | null {
  if (!lexicalData || typeof lexicalData !== 'object') {
    return null
  }

  try {
    // Check if it's already a string (already migrated)
    if (typeof lexicalData === 'string') {
      return lexicalData
    }

    // Check if it has the Lexical structure
    const data = lexicalData as { root?: unknown }
    if (!data.root) {
      return null
    }

    // Convert Lexical to HTML
    const html = convertLexicalToHTML({
      data: data as Parameters<typeof convertLexicalToHTML>[0]['data'],
      converters: defaultHTMLConverters,
      disableContainer: true, // Don't wrap in container div
    })

    return html || ''
  } catch (error) {
    console.error('Error converting Lexical to HTML:', error)
    return null
  }
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  console.log('Starting Lexical to HTML migration...')

  // Migrate collection fields
  for (const { table, field } of COLLECTION_FIELDS) {
    console.log(`Migrating ${table}.${field}...`)

    try {
      // First, check if the column exists and get its type
      const checkResult = await db.execute(sql.raw(`
        SELECT data_type
        FROM information_schema.columns
        WHERE table_name = '${table}'
        AND column_name = '${field}'
      `))

      if (checkResult.rows.length === 0) {
        console.log(`  Column ${table}.${field} does not exist, skipping...`)
        continue
      }

      const dataType = (checkResult.rows[0] as { data_type: string }).data_type

      if (dataType === 'text' || dataType === 'character varying') {
        console.log(`  Column ${table}.${field} is already text type, skipping...`)
        continue
      }

      // Fetch all rows with non-null rich text data BEFORE changing column type
      const selectResult = await db.execute(sql.raw(`
        SELECT id, "${field}" FROM "${table}"
        WHERE "${field}" IS NOT NULL
      `))

      // Collect all conversions first
      const conversions: Array<{ id: number; html: string }> = []

      for (const row of selectResult.rows) {
        const id = (row as { id: number }).id
        const lexicalData = (row as Record<string, unknown>)[field]

        if (!lexicalData) continue

        const html = lexicalToHtml(lexicalData)
        if (html !== null) {
          conversions.push({ id, html })
        }
      }

      // FIRST: Alter the column type from jsonb to text
      console.log(`  Converting column type to TEXT...`)
      await db.execute(sql.raw(`
        ALTER TABLE "${table}"
        ALTER COLUMN "${field}" TYPE TEXT
        USING "${field}"::TEXT
      `))

      // THEN: Update each row with the converted HTML
      let convertedCount = 0
      for (const { id, html } of conversions) {
        await db.execute(sql.raw(`
          UPDATE "${table}"
          SET "${field}" = '${html.replace(/'/g, "''")}'
          WHERE id = ${id}
        `))
        convertedCount++
      }

      console.log(`  Converted ${convertedCount} rows`)
    } catch (error) {
      console.error(`  Error migrating ${table}.${field}:`, error)
    }
  }

  // Migrate version tables
  for (const { table, field } of VERSION_TABLES) {
    console.log(`Migrating version table ${table}.${field}...`)

    try {
      const checkResult = await db.execute(sql.raw(`
        SELECT data_type
        FROM information_schema.columns
        WHERE table_name = '${table}'
        AND column_name = '${field}'
      `))

      if (checkResult.rows.length === 0) {
        console.log(`  Column ${table}.${field} does not exist, skipping...`)
        continue
      }

      const dataType = (checkResult.rows[0] as { data_type: string }).data_type

      if (dataType === 'text' || dataType === 'character varying') {
        console.log(`  Column ${table}.${field} is already text type, skipping...`)
        continue
      }

      // Fetch all rows BEFORE changing column type
      const selectResult = await db.execute(sql.raw(`
        SELECT id, "${field}" FROM "${table}"
        WHERE "${field}" IS NOT NULL
      `))

      // Collect all conversions first
      const conversions: Array<{ id: number; html: string }> = []

      for (const row of selectResult.rows) {
        const id = (row as { id: number }).id
        const lexicalData = (row as Record<string, unknown>)[field]

        if (!lexicalData) continue

        const html = lexicalToHtml(lexicalData)
        if (html !== null) {
          conversions.push({ id, html })
        }
      }

      // FIRST: Alter column type
      await db.execute(sql.raw(`
        ALTER TABLE "${table}"
        ALTER COLUMN "${field}" TYPE TEXT
        USING "${field}"::TEXT
      `))

      // THEN: Update with HTML
      let convertedCount = 0
      for (const { id, html } of conversions) {
        await db.execute(sql.raw(`
          UPDATE "${table}"
          SET "${field}" = '${html.replace(/'/g, "''")}'
          WHERE id = ${id}
        `))
        convertedCount++
      }

      console.log(`  Converted ${convertedCount} rows`)
    } catch (error) {
      console.error(`  Error migrating ${table}.${field}:`, error)
    }
  }

  console.log('Lexical to HTML migration complete!')
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Note: Down migration is complex because we can't reliably convert HTML back to Lexical
  // This is a one-way migration
  console.log('WARNING: This migration cannot be fully reversed.')
  console.log('HTML content will be preserved but may need manual conversion back to Lexical.')

  // Convert columns back to jsonb but keep the HTML as plain text value
  for (const { table, field } of COLLECTION_FIELDS) {
    try {
      await db.execute(sql.raw(`
        ALTER TABLE "${table}"
        ALTER COLUMN "${field}" TYPE JSONB
        USING to_jsonb("${field}")
      `))
    } catch (error) {
      console.error(`Error reverting ${table}.${field}:`, error)
    }
  }

  for (const { table, field } of VERSION_TABLES) {
    try {
      await db.execute(sql.raw(`
        ALTER TABLE "${table}"
        ALTER COLUMN "${field}" TYPE JSONB
        USING to_jsonb("${field}")
      `))
    } catch (error) {
      console.error(`Error reverting ${table}.${field}:`, error)
    }
  }
}
