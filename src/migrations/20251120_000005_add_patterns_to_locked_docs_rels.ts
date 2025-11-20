import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add patterns_id column to payload_locked_documents_rels table
  // This is needed because the Patterns collection was added but the locked documents
  // relationship table wasn't updated
  // Note: We only add the column and index, not the foreign key constraint,
  // because the patterns table may not exist yet
  await db.execute(sql`
   DO $$
   BEGIN
     -- Add patterns_id column if it doesn't exist
     IF NOT EXISTS (
       SELECT 1 FROM information_schema.columns
       WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'patterns_id'
     ) THEN
       ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "patterns_id" integer;
       CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_patterns_id_idx" ON "payload_locked_documents_rels" USING btree ("patterns_id");

       -- Add foreign key constraint only if patterns table exists
       IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'patterns') THEN
         ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_patterns_fk"
           FOREIGN KEY ("patterns_id") REFERENCES "patterns"("id") ON DELETE cascade ON UPDATE no action;
       END IF;
     END IF;
   END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove patterns_id column from payload_locked_documents_rels table
  await db.execute(sql`
   DO $$
   BEGIN
     -- Drop the foreign key constraint, index, and column
     ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_patterns_fk";
     DROP INDEX IF EXISTS "payload_locked_documents_rels_patterns_id_idx";
     ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "patterns_id";
   END $$;
  `)
}
