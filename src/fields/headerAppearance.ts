import type { Field } from 'payload'

/**
 * Header appearance field for controlling header styling
 * Includes transparency, background colors, and positioning options
 */
export const headerAppearance: Field = {
  type: 'group',
  name: 'appearance',
  label: 'Header Appearance',
  fields: [
    {
      type: 'select',
      name: 'style',
      label: 'Header Style',
      defaultValue: 'solid',
      options: [
        {
          label: 'Solid (Default)',
          value: 'solid',
        },
        {
          label: 'Transparent Overlay (overlaps hero)',
          value: 'transparent',
        },
        {
          label: 'Transparent with Scroll (becomes solid on scroll)',
          value: 'transparentScroll',
        },
      ],
      admin: {
        description: 'Choose how the header appears on the page',
      },
    },
    {
      type: 'select',
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: 'default',
      options: [
        { label: 'Default (Light)', value: 'default' },
        { label: 'Dark', value: 'dark' },
        { label: 'Brand/Primary', value: 'brand' },
        { label: 'Transparent', value: 'transparent' },
      ],
      admin: {
        description: 'Background color for solid header style',
        condition: (data: any) => data.appearance?.style === 'solid',
      },
    },
    {
      type: 'checkbox',
      name: 'stickyHeader',
      label: 'Sticky Header',
      defaultValue: true,
      admin: {
        description: 'Keep header fixed at top when scrolling',
      },
    },
  ],
}
