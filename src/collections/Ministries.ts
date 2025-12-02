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

export const Ministries: CollectionConfig = {
  slug: 'ministries',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
  },
  admin: {
    defaultColumns: ['title', 'category', 'contactPerson', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the ministry (e.g., "Altar Servers", "St. Vincent de Paul")',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief description (200 chars max) for cards and listings',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full description of the ministry',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Worship & Liturgy', value: 'worship_liturgy' },
        { label: 'Care & Support', value: 'care_support' },
        { label: 'Service & Outreach', value: 'service_outreach' },
        { label: 'Formation & Learning', value: 'formation_learning' },
        { label: 'Kids & Teens', value: 'kids_teens' },
        { label: 'Community & Fellowship', value: 'community_fellowship' },
        { label: 'Music & Arts', value: 'music_arts' },
        { label: 'Administration', value: 'administration' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image for the ministry',
      },
    },
    {
      name: 'contactPerson',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Primary contact person for this ministry',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      admin: {
        description: 'Public contact email for this ministry',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      admin: {
        description: 'Public contact phone number',
      },
    },
    {
      name: 'meetingSchedule',
      type: 'textarea',
      admin: {
        description: 'e.g., "Meets every Tuesday at 7pm in the Parish Hall"',
      },
    },
    {
      name: 'howToJoin',
      type: 'richText',
      admin: {
        description: 'Instructions on how to get involved',
      },
    },
    {
      name: 'requirements',
      type: 'textarea',
      admin: {
        description: 'Any requirements or qualifications (e.g., training, background check)',
      },
    },
    {
      name: 'relatedPage',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description: 'Link to a dedicated page for this ministry',
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
        description: 'Target audience',
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
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Is this ministry currently active?',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this ministry prominently?',
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
