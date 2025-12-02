import type { Block } from 'payload'
import { blockName } from '@/fields/blockName'
import { decorativePattern } from '@/fields/decorativePattern'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'

export const AlertBanner: Block = {
  slug: 'alertBanner',
  interfaceName: 'AlertBannerBlock',
  labels: {
    singular: 'Alert Banner',
    plural: 'Alert Banners',
  },
  fields: [
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Alert Message',
      admin: {
        description: 'The alert message to display',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'Success', value: 'success' },
      ],
      admin: {
        description: 'Type of alert determines color and icon',
      },
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Link Text',
      admin: {
        description: 'Optional: Text for a link button',
      },
    },
    {
      name: 'linkUrl',
      type: 'text',
      label: 'Link URL',
      admin: {
        condition: (data, siblingData) => Boolean(siblingData?.linkLabel),
        description: 'URL for the link button',
      },
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      defaultValue: true,
      label: 'Allow Dismissal',
      admin: {
        description: 'Can users close/dismiss this alert?',
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (based on type)', value: 'auto' },
        { label: 'Megaphone', value: 'megaphone' },
        { label: 'Bell', value: 'bell' },
        { label: 'Exclamation', value: 'exclamation' },
        { label: 'Check', value: 'check' },
        { label: 'None', value: 'none' },
      ],
    },
    decorativePattern({ enablePatterns: true }),
    visibilitySettings({
      deviceVisibility: true,
      audienceTargeting: true,
      seasonalDisplay: true, // Alerts may be seasonal
    }),
    animationSettings({
      presets: true,
      timing: true,
      behavior: true,
    }),
    blockName,
  ],
}
