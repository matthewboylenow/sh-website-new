import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from 'payload'
import { quillRichText } from '@/fields/quillRichText'

export const Staff: CollectionConfig = {
  slug: 'staff',
  labels: {
    singular: 'Staff Member',
    plural: 'Staff & Clergy',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    role: true,
    department: true,
  },
  admin: {
    defaultColumns: ['name', 'role', 'department', 'order', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name (e.g., "Fr. John Smith", "Jane Doe")',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or role (e.g., "Pastor", "Director of Religious Education")',
      },
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Clergy', value: 'clergy' },
        { label: 'Administration', value: 'administration' },
        { label: 'Religious Education', value: 'religious_education' },
        { label: 'Youth Ministry', value: 'youth_ministry' },
        { label: 'Music & Liturgy', value: 'music_liturgy' },
        { label: 'Facilities', value: 'facilities' },
        { label: 'Care & Counseling', value: 'care_counseling' },
        { label: 'Communications', value: 'communications' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Professional headshot or photo',
      },
    },
    quillRichText({
      name: 'bio',
      label: 'Biography',
      required: false,
      admin: {
        description: 'Biography or description of this person',
      },
    }),
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Public contact email (leave empty if you don\'t want to display)',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Public contact phone (optional)',
      },
    },
    {
      name: 'officeLocation',
      type: 'text',
      admin: {
        description: 'e.g., "Parish Office, Room 101"',
      },
    },
    {
      name: 'officeHours',
      type: 'textarea',
      admin: {
        description: 'e.g., "Monday-Friday, 9am-5pm" or "By appointment"',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Order in which this person appears in listings (lower numbers first)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Is this person currently active staff?',
      },
    },
    {
      name: 'showOnWebsite',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Display this person on the public website?',
      },
    },
    {
      name: 'ministries',
      type: 'relationship',
      relationTo: 'ministries',
      hasMany: true,
      admin: {
        description: 'Ministries this person leads or is involved with',
      },
    },
    slugField(),
  ],
}
