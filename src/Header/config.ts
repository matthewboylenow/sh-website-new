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
                    description:
                      'Add submenu items here. For dropdown menus, add multiple groups with links. For megamenus, each group becomes a column.',
                    condition: (data: any, siblingData: any) => {
                      // Check siblingData first (within the same array item)
                      const menuTypeValue = siblingData?.menuType || data?.menuType
                      return menuTypeValue === 'dropdown' || menuTypeValue === 'megamenu'
                    },
                    initCollapsed: false,
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Group Title',
                      admin: {
                        description:
                          'Optional title for this group. For megamenus, this appears as a column heading. For dropdowns, you can leave this empty.',
                      },
                    },
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Links',
                      required: true,
                      admin: {
                        description: 'Add the links that appear in this submenu group',
                        initCollapsed: false,
                      },
                      fields: [
                        link({
                          appearances: false,
                        }),
                        {
                          name: 'description',
                          type: 'textarea',
                          label: 'Link Description',
                          admin: {
                            description:
                              'Optional description text shown below the link (megamenus only)',
                            rows: 2,
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
