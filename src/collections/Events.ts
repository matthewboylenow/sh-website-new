import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    startDate: true,
    endDate: true,
  },
  admin: {
    defaultColumns: ['title', 'startDate', 'endDate', 'category', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Event start date and time',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Event end date and time (optional)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: false,
      admin: {
        description: 'e.g., Parish Hall, Church, Online, etc.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image for the event',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Mass & Worship', value: 'mass_worship' },
        { label: 'LifeLines & Community', value: 'lifelines_community' },
        { label: 'Kids & Teens', value: 'kids_teens' },
        { label: 'Formation & Learning', value: 'formation_learning' },
        { label: 'Service & Outreach', value: 'service_outreach' },
        { label: 'Social & Fellowship', value: 'social_fellowship' },
        { label: 'Sacraments', value: 'sacraments' },
        { label: 'Special Events', value: 'special_events' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'audience',
      type: 'select',
      options: [
        {
          label: 'Visitors',
          value: 'visitor',
        },
        {
          label: 'Parishioners',
          value: 'parishioner',
        },
        {
          label: 'Both',
          value: 'both',
        },
      ],
      defaultValue: 'both',
      admin: {
        position: 'sidebar',
        description: 'Target audience for this event',
      },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Tags for categorization and search',
      },
    },
    {
      name: 'registrationRequired',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Does this event require registration?',
      },
    },
    {
      name: 'registrationUrl',
      type: 'text',
      admin: {
        condition: (data) => data.registrationRequired === true,
        description: 'URL to registration form or page',
      },
    },
    {
      name: 'contactPerson',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Contact person for this event',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this event on homepage?',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-populate publishedAt when published
        if (data._status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date()
        }
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
