import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { quillRichText } from '@/fields/quillRichText'

export const LifeLines: CollectionConfig = {
  slug: 'lifelines',
  labels: {
    singular: 'LifeLine Group',
    plural: 'LifeLine Groups',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    type: true,
    meetingDay: true,
  },
  admin: {
    defaultColumns: ['title', 'type', 'meetingDay', 'leader', 'isAcceptingMembers', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the LifeLine group (e.g., "Young Professionals", "Moms Connect")',
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
    quillRichText({
      name: 'description',
      label: 'Description',
      required: true,
      admin: {
        description: 'Full description of the group',
      },
    }),
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Men\'s Group', value: 'mens' },
        { label: 'Women\'s Group', value: 'womens' },
        { label: 'Couples', value: 'couples' },
        { label: 'Young Adults', value: 'young_adults' },
        { label: 'Parents & Families', value: 'parents_families' },
        { label: 'Seniors', value: 'seniors' },
        { label: 'Bible Study', value: 'bible_study' },
        { label: 'Prayer Group', value: 'prayer' },
        { label: 'Support Group', value: 'support' },
        { label: 'Mixed/General', value: 'mixed' },
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
        description: 'Image representing this group',
      },
    },
    {
      name: 'meetingDay',
      type: 'select',
      options: [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
        { label: 'Varies', value: 'varies' },
      ],
      admin: {
        description: 'Primary meeting day',
      },
    },
    {
      name: 'meetingTime',
      type: 'text',
      admin: {
        description: 'e.g., "7:00 PM - 8:30 PM"',
        placeholder: '7:00 PM - 8:30 PM',
      },
    },
    {
      name: 'meetingFrequency',
      type: 'select',
      options: [
        { label: 'Weekly', value: 'weekly' },
        { label: 'Bi-weekly', value: 'biweekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Varies', value: 'varies' },
      ],
      defaultValue: 'weekly',
      admin: {
        description: 'How often does this group meet?',
      },
    },
    {
      name: 'meetingLocation',
      type: 'text',
      admin: {
        description: 'e.g., "Parish Hall", "Member homes", "Online via Zoom"',
      },
    },
    {
      name: 'leader',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the group leader/facilitator',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Contact email for inquiries about this group',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      admin: {
        description: 'Optional contact phone number',
      },
    },
    {
      name: 'isAcceptingMembers',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Is this group currently accepting new members?',
      },
    },
    {
      name: 'maxSize',
      type: 'number',
      admin: {
        description: 'Maximum group size (optional)',
      },
    },
    {
      name: 'currentSize',
      type: 'number',
      admin: {
        description: 'Current number of active members',
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'When does this group start/started?',
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'For seasonal groups, when does it end?',
      },
    },
    {
      name: 'childcare',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Is childcare provided?',
      },
    },
    {
      name: 'audience',
      type: 'select',
      options: [
        {
          label: 'Open to Visitors',
          value: 'visitor',
        },
        {
          label: 'Parishioners Only',
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
        description: 'Who can join this group?',
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
        description: 'Feature this group prominently?',
      },
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
