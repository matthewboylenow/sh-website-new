import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Add missing appearance_text_color columns to blocks that were missed in the previous migration
   ALTER TABLE "pages_blocks_spacer" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_divider" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_custom_code" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';

   -- Add to version tables
   ALTER TABLE "_pages_v_blocks_spacer" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_divider" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_custom_code" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
   ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "appearance_text_color" "text_color" DEFAULT 'auto';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Remove the columns
   ALTER TABLE "pages_blocks_spacer" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_divider" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_custom_code" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_archive" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "pages_blocks_form_block" DROP COLUMN IF EXISTS "appearance_text_color";

   ALTER TABLE "_pages_v_blocks_spacer" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_divider" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_custom_code" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN IF EXISTS "appearance_text_color";
   ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN IF EXISTS "appearance_text_color";
  `)
}
