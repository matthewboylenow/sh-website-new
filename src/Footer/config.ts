import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { footerAppearance } from '@/fields/footerAppearance'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                }),
              ],
              maxRows: 6,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Footer/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
        {
          label: 'Branding',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Footer Logo',
              admin: {
                description: 'Upload a custom logo for the footer (recommended: SVG or PNG with transparent background)',
              },
            },
            {
              name: 'copyrightText',
              type: 'text',
              label: 'Copyright Text',
              admin: {
                description: 'Custom copyright text. Leave blank to use default format: "© [Year] [Parish Name]. All rights reserved."',
                placeholder: 'e.g., "© 2025 Saint Helen Catholic Church. All rights reserved."',
              },
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [footerAppearance],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
