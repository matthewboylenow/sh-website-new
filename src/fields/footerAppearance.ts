import type { Field } from 'payload'

/**
 * Footer appearance field for controlling footer styling
 * Includes background and text colors for mobile and desktop
 */
export const footerAppearance: Field = {
  type: 'group',
  name: 'appearance',
  label: 'Footer Appearance',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'backgroundColorDesktop',
          label: 'Background Color (Desktop)',
          defaultValue: 'dark',
          options: [
            { label: 'Default (Light)', value: 'default' },
            { label: 'Dark', value: 'dark' },
            { label: 'Brand/Primary', value: 'brand' },
            { label: 'Surface (White)', value: 'surface' },
          ],
          admin: {
            description: 'Background color for desktop footer',
            width: '50%',
          },
        },
        {
          type: 'select',
          name: 'backgroundColorMobile',
          label: 'Background Color (Mobile)',
          defaultValue: 'dark',
          options: [
            { label: 'Default (Light)', value: 'default' },
            { label: 'Dark', value: 'dark' },
            { label: 'Brand/Primary', value: 'brand' },
            { label: 'Surface (White)', value: 'surface' },
          ],
          admin: {
            description: 'Background color for mobile footer',
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'textColorDesktop',
          label: 'Text Color (Desktop)',
          defaultValue: 'auto',
          options: [
            { label: 'Auto (based on background)', value: 'auto' },
            { label: 'Light/White', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
          admin: {
            description: 'Text color for desktop footer',
            width: '50%',
          },
        },
        {
          type: 'select',
          name: 'textColorMobile',
          label: 'Text Color (Mobile)',
          defaultValue: 'auto',
          options: [
            { label: 'Auto (based on background)', value: 'auto' },
            { label: 'Light/White', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
          admin: {
            description: 'Text color for mobile footer',
            width: '50%',
          },
        },
      ],
    },
  ],
}
