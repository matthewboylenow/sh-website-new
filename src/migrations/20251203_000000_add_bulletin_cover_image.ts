import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add cover_image_id column to bulletins table
  await db.execute(sql`
    ALTER TABLE "bulletins"
    ADD COLUMN IF NOT EXISTS "cover_image_id" integer
  `)

  // Add foreign key constraint
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'bulletins_cover_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "bulletins"
        ADD CONSTRAINT "bulletins_cover_image_id_media_id_fk"
        FOREIGN KEY ("cover_image_id") REFERENCES "media"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
      END IF;
    END $$
  `)

  // Create index for the foreign key
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "bulletins_cover_image_idx"
    ON "bulletins" ("cover_image_id")
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop index
  await db.execute(sql`
    DROP INDEX IF EXISTS "bulletins_cover_image_idx"
  `)

  // Drop foreign key constraint
  await db.execute(sql`
    ALTER TABLE "bulletins"
    DROP CONSTRAINT IF EXISTS "bulletins_cover_image_id_media_id_fk"
  `)

  // Drop column
  await db.execute(sql`
    ALTER TABLE "bulletins"
    DROP COLUMN IF EXISTS "cover_image_id"
  `)
}
