import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const SearchItems: CollectionConfig = {
  slug: 'search-items',
  labels: {
    singular: 'Search Item',
    plural: 'Search Index',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'kind', 'audience', 'topics', 'priority', 'updatedAt'],
    useAsTitle: 'title',
    description: 'Searchable items for the assistant widget. These are auto-populated from other collections.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the searchable item',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Full URL path to this item',
      },
    },
    {
      name: 'kind',
      type: 'select',
      options: [
        { label: 'Page', value: 'page' },
        { label: 'Ministry', value: 'ministry' },
        { label: 'Event', value: 'event' },
        { label: 'Article/Post', value: 'article' },
        { label: 'LifeLine Group', value: 'lifeline' },
        { label: 'Resource', value: 'resource' },
        { label: 'External Link', value: 'external' },
      ],
      required: true,
      admin: {
        description: 'Type of content this search item represents',
      },
    },
    {
      name: 'audience',
      type: 'select',
      options: [
        { label: 'Visitors', value: 'visitor' },
        { label: 'Parishioners', value: 'parishioner' },
        { label: 'Both', value: 'both' },
      ],
      hasMany: true,
      defaultValue: ['both'],
      admin: {
        description: 'Target audience(s) for this item',
      },
    },
    {
      name: 'topics',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Mass Times', value: 'mass_times' },
        { label: 'Online Mass', value: 'online_mass' },
        { label: 'Volunteer', value: 'volunteer' },
        { label: 'Mental Health', value: 'mental_health' },
        { label: 'Counseling', value: 'counseling' },
        { label: 'Kids', value: 'kids' },
        { label: 'Teens', value: 'teens' },
        { label: 'Family', value: 'family' },
        { label: 'Marriage', value: 'marriage' },
        { label: 'Grief', value: 'grief' },
        { label: 'Support Groups', value: 'support_groups' },
        { label: 'Sacraments', value: 'sacraments' },
        { label: 'Baptism', value: 'baptism' },
        { label: 'Confession', value: 'confession' },
        { label: 'Confirmation', value: 'confirmation' },
        { label: 'Marriage Prep', value: 'marriage_prep' },
        { label: 'Giving', value: 'giving' },
        { label: 'LifeLines', value: 'lifelines' },
        { label: 'Community', value: 'community' },
        { label: 'Events', value: 'events' },
        { label: 'Social', value: 'social' },
        { label: 'Adult Formation', value: 'adult_formation' },
        { label: 'Bible Study', value: 'bible_study' },
        { label: 'Prayer', value: 'prayer' },
        { label: 'Adoration', value: 'adoration' },
        { label: 'Service', value: 'service' },
        { label: 'Outreach', value: 'outreach' },
        { label: 'Music', value: 'music' },
        { label: 'Liturgy', value: 'liturgy' },
        { label: 'Care', value: 'care' },
        { label: 'Help', value: 'help' },
      ],
      admin: {
        description: 'Topics this item relates to (used for intent matching)',
      },
    },
    {
      name: 'shortDescription',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief description (200 chars max) shown in search results',
      },
    },
    {
      name: 'priority',
      type: 'number',
      required: true,
      defaultValue: 5,
      min: 0,
      max: 10,
      admin: {
        description: 'Priority for search ranking (0-10, higher is more important)',
      },
    },
    {
      name: 'sourceCollection',
      type: 'text',
      required: true,
      admin: {
        description: 'Source collection slug (e.g., "pages", "events", "ministries")',
      },
    },
    {
      name: 'sourceId',
      type: 'text',
      required: true,
      admin: {
        description: 'ID of the source document',
      },
    },
    {
      name: 'lastSyncedAt',
      type: 'date',
      admin: {
        description: 'When this item was last synced from its source',
        readOnly: true,
      },
    },
  ],
  indexes: [
    {
      fields: ['sourceCollection', 'sourceId'],
      unique: true,
    },
  ],
}
