import * as migration_20251115_195449 from './20251115_195449';
import * as migration_20251115_224016_fix_hero_basic_welcome_buttons from './20251115_224016_fix_hero_basic_welcome_buttons';

export const migrations = [
  {
    up: migration_20251115_195449.up,
    down: migration_20251115_195449.down,
    name: '20251115_195449',
  },
  {
    up: migration_20251115_224016_fix_hero_basic_welcome_buttons.up,
    down: migration_20251115_224016_fix_hero_basic_welcome_buttons.down,
    name: '20251115_224016_fix_hero_basic_welcome_buttons'
  },
];
