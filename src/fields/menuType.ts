import type { Field } from 'payload'

/**
 * Menu type field for controlling navigation menu behavior
 */
export const menuType = (): Field => ({
  type: 'select',
  name: 'menuType',
  label: 'Menu Type',
  defaultValue: 'simple',
  options: [
    {
      label: 'Simple Link',
      value: 'simple',
    },
    {
      label: 'Dropdown Menu',
      value: 'dropdown',
    },
    {
      label: 'Mega Menu',
      value: 'megamenu',
    },
  ],
  admin: {
    description: 'Choose how this menu item behaves',
  },
})
