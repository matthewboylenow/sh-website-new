import type { GlobalConfig } from 'payload'

export const GlobalSettings: GlobalConfig = {
  slug: 'global-settings',
  label: 'Global Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Parish Information',
          fields: [
            {
              name: 'parishName',
              type: 'text',
              required: true,
              defaultValue: 'Saint Helen Catholic Church',
              admin: {
                description: 'Full name of the parish',
              },
            },
            {
              name: 'websiteName',
              type: 'text',
              required: true,
              defaultValue: 'Saint Helen',
              admin: {
                description: 'Website name used in page titles, meta tags, and SEO (e.g., "Saint Helen")',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Website Favicon',
              admin: {
                description: 'Upload a custom favicon (recommended: ICO, PNG, or SVG, 32x32px or larger)',
              },
            },
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'state',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'zip',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'phone',
              type: 'text',
              required: true,
              admin: {
                description: 'Main office phone number',
              },
            },
            {
              name: 'fax',
              type: 'text',
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              admin: {
                description: 'Main office email',
              },
            },
            {
              name: 'officeHours',
              type: 'textarea',
              required: true,
              admin: {
                description: 'e.g., "Monday-Friday, 9:00 AM - 5:00 PM"',
              },
            },
          ],
        },
        {
          label: 'Mass Times',
          fields: [
            {
              name: 'weekendMasses',
              type: 'array',
              label: 'Weekend Masses',
              required: true,
              fields: [
                {
                  name: 'day',
                  type: 'select',
                  options: [
                    { label: 'Saturday (Vigil)', value: 'saturday' },
                    { label: 'Sunday', value: 'sunday' },
                  ],
                  required: true,
                },
                {
                  name: 'time',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "5:00 PM" or "8:00 AM"',
                  },
                },
                {
                  name: 'language',
                  type: 'select',
                  options: [
                    { label: 'English', value: 'english' },
                    { label: 'Spanish', value: 'spanish' },
                    { label: 'Latin (Traditional)', value: 'latin' },
                    { label: 'Bilingual', value: 'bilingual' },
                  ],
                  defaultValue: 'english',
                },
                {
                  name: 'notes',
                  type: 'text',
                  admin: {
                    description: 'e.g., "Family Mass" or "Youth Choir"',
                  },
                },
              ],
            },
            {
              name: 'dailyMasses',
              type: 'array',
              label: 'Daily Masses',
              fields: [
                {
                  name: 'days',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "Monday-Friday" or "Tuesday & Thursday"',
                  },
                },
                {
                  name: 'time',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'notes',
                  type: 'text',
                },
              ],
            },
            {
              name: 'holyDaySchedule',
              type: 'textarea',
              admin: {
                description: 'General information about Holy Day Mass schedules',
              },
            },
            {
              name: 'confessionTimes',
              type: 'array',
              label: 'Confession Times',
              fields: [
                {
                  name: 'day',
                  type: 'select',
                  options: [
                    { label: 'Monday', value: 'monday' },
                    { label: 'Tuesday', value: 'tuesday' },
                    { label: 'Wednesday', value: 'wednesday' },
                    { label: 'Thursday', value: 'thursday' },
                    { label: 'Friday', value: 'friday' },
                    { label: 'Saturday', value: 'saturday' },
                    { label: 'Sunday', value: 'sunday' },
                  ],
                  required: true,
                },
                {
                  name: 'time',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'notes',
                  type: 'text',
                  admin: {
                    description: 'e.g., "Or by appointment"',
                  },
                },
              ],
            },
            {
              name: 'adorationSchedule',
              type: 'textarea',
              label: 'Adoration Schedule',
              admin: {
                description: 'Details about Eucharistic Adoration times',
              },
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialMedia',
              type: 'group',
              fields: [
                {
                  name: 'facebook',
                  type: 'text',
                  admin: {
                    description: 'Full Facebook URL',
                  },
                },
                {
                  name: 'instagram',
                  type: 'text',
                  admin: {
                    description: 'Full Instagram URL',
                  },
                },
                {
                  name: 'youtube',
                  type: 'text',
                  admin: {
                    description: 'Full YouTube channel URL',
                  },
                },
                {
                  name: 'twitter',
                  type: 'text',
                  admin: {
                    description: 'Full Twitter/X URL',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Alerts & Notices',
          fields: [
            {
              name: 'globalAlert',
              type: 'group',
              label: 'Global Alert Banner',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Show alert banner at top of site?',
                  },
                },
                {
                  name: 'message',
                  type: 'textarea',
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled === true,
                    description: 'Alert message to display',
                  },
                },
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'Info', value: 'info' },
                    { label: 'Warning', value: 'warning' },
                    { label: 'Urgent', value: 'urgent' },
                  ],
                  defaultValue: 'info',
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled === true,
                  },
                },
                {
                  name: 'linkText',
                  type: 'text',
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled === true,
                    description: 'Optional link text (e.g., "Learn More")',
                  },
                },
                {
                  name: 'linkUrl',
                  type: 'text',
                  admin: {
                    condition: (data, siblingData) => siblingData?.enabled === true,
                    description: 'URL for the link',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Resources',
          fields: [
            {
              name: 'externalResources',
              type: 'array',
              label: 'External Resources',
              admin: {
                description: 'Links to external resources like Formed, Daily Readings, etc.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: 'Optional icon name or emoji',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
