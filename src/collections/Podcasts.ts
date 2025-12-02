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

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    publishedAt: true,
    type: true,
  },
  admin: {
    defaultColumns: ['title', 'type', 'speaker', 'publishedAt', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Homily', value: 'homily' },
        { label: 'Podcast Episode', value: 'podcast' },
        { label: 'Teaching', value: 'teaching' },
        { label: 'Testimony', value: 'testimony' },
        { label: 'Special Message', value: 'special' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'speaker',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., Fr. [Name], [Speaker Name]',
      },
    },
    {
      name: 'speakerBio',
      type: 'textarea',
      admin: {
        description: 'Optional short bio of the speaker',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Thumbnail or cover art',
      },
    },
    {
      name: 'audioUrl',
      type: 'text',
      admin: {
        description: 'URL to audio file (e.g., from YouTube, Buzzsprout, etc.)',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'URL to video (e.g., YouTube embed URL)',
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'e.g., "25:30" or "1:15:00"',
        placeholder: 'mm:ss or h:mm:ss',
      },
    },
    {
      name: 'series',
      type: 'text',
      admin: {
        description: 'Optional series name (e.g., "Advent 2025", "Faith Foundations")',
      },
    },
    {
      name: 'scripture',
      type: 'text',
      admin: {
        description: 'Scripture references (e.g., "John 3:16-21, Romans 8:1-11")',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
        description: 'Date this media was originally published/recorded',
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
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this on homepage?',
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
        // Auto-populate publishedAt when published if not set
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
