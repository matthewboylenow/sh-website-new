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
];
