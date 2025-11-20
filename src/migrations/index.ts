import * as migration_20251115_195449 from './20251115_195449';
import * as migration_20251115_224016_fix_hero_basic_welcome_buttons from './20251115_224016_fix_hero_basic_welcome_buttons';
import * as migration_20251115_231215_add_block_names_minheight_typography from './20251115_231215_add_block_names_minheight_typography';
import * as migration_20251116_001100_add_header_customization from './20251116_001100_add_header_customization';
import * as migration_20251116_002000_add_mobile_desktop_colors from './20251116_002000_add_mobile_desktop_colors';
import * as migration_20251116_152000_add_block_text_color from './20251116_152000_add_block_text_color';
import * as migration_20251116_152100_add_columns_video_support from './20251116_152100_add_columns_video_support';
import * as migration_20251116_153000_add_missing_text_color_columns from './20251116_153000_add_missing_text_color_columns';
import * as migration_20251116_160000_add_bento_grid_customization from './20251116_160000_add_bento_grid_customization';
import * as migration_20251116_161000_expand_link_appearance_enums from './20251116_161000_expand_link_appearance_enums';
import * as migration_20251117_201500_fix_appearance_field_names from './20251117_201500_fix_appearance_field_names';
import * as migration_20251119_000000_add_all_missing_appearance_columns from './20251119_000000_add_all_missing_appearance_columns';
import * as migration_20251119_000001_add_bento_grid_overlay_strength from './20251119_000001_add_bento_grid_overlay_strength';
import * as migration_20251119_000002_add_decorative_pattern_columns from './20251119_000002_add_decorative_pattern_columns';
import * as migration_20251119_235000_add_phase_7_features from './20251119_235000_add_phase_7_features';
import * as migration_20251120_000000_add_phase_7_to_patterns from './20251120_000000_add_phase_7_to_patterns';
import * as migration_20251120_000001_add_decorative_patterns_to_all_blocks from './20251120_000001_add_decorative_patterns_to_all_blocks';
import * as migration_20251120_000002_fix_decorative_pattern_table_names from './20251120_000002_fix_decorative_pattern_table_names';
import * as migration_20251120_000003_add_decorative_patterns_correct_tables from './20251120_000003_add_decorative_patterns_correct_tables';
import * as migration_20251120_000004_add_appearance_to_cta_block from './20251120_000004_add_appearance_to_cta_block';
import * as migration_20251120_000005_add_patterns_to_locked_docs_rels from './20251120_000005_add_patterns_to_locked_docs_rels';
import * as migration_20251120_000009_add_custom_svg_force from './20251120_000009_add_custom_svg_force';
import * as migration_20251120_000010_fix_custom_svg_column from './20251120_000010_fix_custom_svg_column';
import * as migration_20251120_000011_add_custom_svg_direct from './20251120_000011_add_custom_svg_direct';

export const migrations = [
  {
    up: migration_20251115_195449.up,
    down: migration_20251115_195449.down,
    name: '20251115_195449',
  },
  {
    up: migration_20251115_224016_fix_hero_basic_welcome_buttons.up,
    down: migration_20251115_224016_fix_hero_basic_welcome_buttons.down,
    name: '20251115_224016_fix_hero_basic_welcome_buttons',
  },
  {
    up: migration_20251115_231215_add_block_names_minheight_typography.up,
    down: migration_20251115_231215_add_block_names_minheight_typography.down,
    name: '20251115_231215_add_block_names_minheight_typography'
  },
  {
    up: migration_20251116_001100_add_header_customization.up,
    down: migration_20251116_001100_add_header_customization.down,
    name: '20251116_001100_add_header_customization'
  },
  {
    up: migration_20251116_002000_add_mobile_desktop_colors.up,
    down: migration_20251116_002000_add_mobile_desktop_colors.down,
    name: '20251116_002000_add_mobile_desktop_colors'
  },
  {
    up: migration_20251116_152000_add_block_text_color.up,
    down: migration_20251116_152000_add_block_text_color.down,
    name: '20251116_152000_add_block_text_color'
  },
  {
    up: migration_20251116_152100_add_columns_video_support.up,
    down: migration_20251116_152100_add_columns_video_support.down,
    name: '20251116_152100_add_columns_video_support'
  },
  {
    up: migration_20251116_153000_add_missing_text_color_columns.up,
    down: migration_20251116_153000_add_missing_text_color_columns.down,
    name: '20251116_153000_add_missing_text_color_columns'
  },
  {
    up: migration_20251116_160000_add_bento_grid_customization.up,
    down: migration_20251116_160000_add_bento_grid_customization.down,
    name: '20251116_160000_add_bento_grid_customization'
  },
  {
    up: migration_20251116_161000_expand_link_appearance_enums.up,
    down: migration_20251116_161000_expand_link_appearance_enums.down,
    name: '20251116_161000_expand_link_appearance_enums'
  },
  {
    up: migration_20251117_201500_fix_appearance_field_names.up,
    down: migration_20251117_201500_fix_appearance_field_names.down,
    name: '20251117_201500_fix_appearance_field_names'
  },
  {
    up: migration_20251119_000000_add_all_missing_appearance_columns.up,
    down: migration_20251119_000000_add_all_missing_appearance_columns.down,
    name: '20251119_000000_add_all_missing_appearance_columns'
  },
  {
    up: migration_20251119_000001_add_bento_grid_overlay_strength.up,
    down: migration_20251119_000001_add_bento_grid_overlay_strength.down,
    name: '20251119_000001_add_bento_grid_overlay_strength'
  },
  {
    up: migration_20251119_000002_add_decorative_pattern_columns.up,
    down: migration_20251119_000002_add_decorative_pattern_columns.down,
    name: '20251119_000002_add_decorative_pattern_columns'
  },
  {
    up: migration_20251119_235000_add_phase_7_features.up,
    down: migration_20251119_235000_add_phase_7_features.down,
    name: '20251119_235000_add_phase_7_features'
  },
  {
    up: migration_20251120_000000_add_phase_7_to_patterns.up,
    down: migration_20251120_000000_add_phase_7_to_patterns.down,
    name: '20251120_000000_add_phase_7_to_patterns'
  },
  {
    up: migration_20251120_000001_add_decorative_patterns_to_all_blocks.up,
    down: migration_20251120_000001_add_decorative_patterns_to_all_blocks.down,
    name: '20251120_000001_add_decorative_patterns_to_all_blocks'
  },
  {
    up: migration_20251120_000002_fix_decorative_pattern_table_names.up,
    down: migration_20251120_000002_fix_decorative_pattern_table_names.down,
    name: '20251120_000002_fix_decorative_pattern_table_names'
  },
  {
    up: migration_20251120_000003_add_decorative_patterns_correct_tables.up,
    down: migration_20251120_000003_add_decorative_patterns_correct_tables.down,
    name: '20251120_000003_add_decorative_patterns_correct_tables'
  },
  {
    up: migration_20251120_000004_add_appearance_to_cta_block.up,
    down: migration_20251120_000004_add_appearance_to_cta_block.down,
    name: '20251120_000004_add_appearance_to_cta_block'
  },
  {
    up: migration_20251120_000005_add_patterns_to_locked_docs_rels.up,
    down: migration_20251120_000005_add_patterns_to_locked_docs_rels.down,
    name: '20251120_000005_add_patterns_to_locked_docs_rels'
  },
  {
    up: migration_20251120_000009_add_custom_svg_force.up,
    down: migration_20251120_000009_add_custom_svg_force.down,
    name: '20251120_000009_add_custom_svg_force'
  },
  {
    up: migration_20251120_000010_fix_custom_svg_column.up,
    down: migration_20251120_000010_fix_custom_svg_column.down,
    name: '20251120_000010_fix_custom_svg_column'
  },
  {
    up: migration_20251120_000011_add_custom_svg_direct.up,
    down: migration_20251120_000011_add_custom_svg_direct.down,
    name: '20251120_000011_add_custom_svg_direct'
  },
];
