import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Bulletins: CollectionConfig = {
  slug: 'bulletins',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    date: true,
    file: true,
  },
  admin: {
    defaultColumns: ['title', 'date', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., "Weekly Bulletin - November 15, 2025"',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Date of the bulletin (typically the Sunday it covers)',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'PDF file of the bulletin',
      },
    },
    {
      name: 'highlights',
      type: 'textarea',
      admin: {
        description: 'Optional brief summary or key highlights from this bulletin',
      },
    },
    {
      name: 'liturgicalSeason',
      type: 'select',
      options: [
        { label: 'Ordinary Time', value: 'ordinary' },
        { label: 'Advent', value: 'advent' },
        { label: 'Christmas', value: 'christmas' },
        { label: 'Lent', value: 'lent' },
        { label: 'Easter', value: 'easter' },
        { label: 'Special Feast', value: 'special' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Current liturgical season',
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Is this the current week\'s bulletin?',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // If this bulletin is marked as current, unmark all others
        if (data.isCurrent && operation === 'update') {
          try {
            const { docs } = await req.payload.find({
              collection: 'bulletins',
              where: {
                isCurrent: {
                  equals: true,
                },
              },
            })

            // Update all current bulletins to not current
            for (const doc of docs) {
              if (doc.id !== data.id) {
                await req.payload.update({
                  collection: 'bulletins',
                  id: doc.id,
                  data: {
                    isCurrent: false,
                  },
                })
              }
            }
          } catch (error) {
            // Log error but don't fail the update
            console.error('Error updating current bulletin:', error)
          }
        }

        return data
      },
    ],
  },
}
