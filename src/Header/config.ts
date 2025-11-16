import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { headerAppearance } from '@/fields/headerAppearance'
import { menuType } from '@/fields/menuType'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
              admin: {
                description: 'Upload a logo for the header. Recommended size: 200x80px',
              },
            },
            {
              name: 'logoHeight',
              type: 'number',
              label: 'Logo Height (in pixels)',
              defaultValue: 40,
              admin: {
                description: 'Height of the logo in pixels. Default is 40px.',
              },
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              fields: [
                menuType(),
                link({
                  appearances: false,
                }),
                {
                  name: 'submenu',
                  type: 'array',
                  label: 'Submenu Items',
                  admin: {
                    description: 'Add submenu items for dropdown or megamenu',
                    condition: (data: any) =>
                      data.menuType === 'dropdown' || data.menuType === 'megamenu',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Title',
                      admin: {
                        description: 'Optional group title (for megamenu organization)',
                      },
                    },
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Links',
                      fields: [
                        link({
                          appearances: false,
                        }),
                        {
                          name: 'description',
                          type: 'textarea',
                          label: 'Description',
                          admin: {
                            description: 'Optional description (shown in megamenu)',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
              maxRows: 8,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Header/RowLabel#RowLabel',
                },
              },
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [headerAppearance],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
