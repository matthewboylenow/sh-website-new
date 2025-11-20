import type { Block } from 'payload'
import { blockAppearance } from '@/fields/blockAppearance'
import { blockName } from '@/fields/blockName'
import { linkGroup } from '@/fields/linkGroup'
import { typography } from '@/fields/typography'
import { defaultLexical } from '@/fields/defaultLexical'
import { visibilitySettings } from '@/fields/visibilitySettings'
import { animationSettings } from '@/fields/animationSettings'
import { decorativePattern } from '@/fields/decorativePattern'

export const HeroBasic: Block = {
  slug: 'heroBasic',
  interfaceName: 'HeroBasicBlock',
  labels: {
    singular: 'Hero - Basic',
    plural: 'Heroes - Basic',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      admin: {
        description: 'Optional small text above the title (e.g., "Welcome" or "Join Us")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'Main hero heading (e.g., "We\'re glad you\'re here.")',
      },
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle',
      editor: defaultLexical,
      admin: {
        description: '1-2 sentences of welcoming text',
      },
    },
    {
      name: 'backgroundType',
      type: 'radio',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      admin: {
        description: 'Choose background type for the hero',
        layout: 'horizontal',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'image',
        description: 'Background image for the hero',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Video',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'video',
        description: 'Background video for the hero (MP4 format recommended)',
      },
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Video Poster Image',
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType === 'video',
        description: 'Fallback image shown while video loads',
      },
    },
    {
      name: 'backgroundOverlay',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Light', value: 'light' },
        { label: 'Medium', value: 'medium' },
        { label: 'Dark', value: 'dark' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.backgroundType !== 'none',
        description: 'Overlay darkness for better text readability',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 3,
        admin: {
          description: 'Primary and secondary call-to-action buttons',
        },
      },
    }),
    {
      type: 'collapsible',
      label: 'Mission Statement Animation',
      admin: {
        description: 'Configure the animated mission statement that appears above the welcome card',
      },
      fields: [
        {
          name: 'showMissionStatement',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Mission Statement',
          admin: {
            description: 'Display the animated mission statement in the hero',
          },
        },
        {
          name: 'missionAnimationMode',
          type: 'radio',
          defaultValue: 'rotating',
          options: [
            {
              label: 'Rotating Words',
              value: 'rotating',
            },
            {
              label: 'Line by Line',
              value: 'lineByLine',
            },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.showMissionStatement,
            description:
              'Rotating: "We are a community" + cycling phrases. Line by Line: All three phrases appear sequentially.',
            layout: 'horizontal',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Welcome Card (Frosted Glass)',
      admin: {
        description: 'Configure the floating frosted-glass welcome card at the bottom of the hero',
      },
      fields: [
        {
          name: 'showWelcomeCard',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Welcome Card',
          admin: {
            description: 'Display the frosted glass welcome card',
          },
        },
        {
          name: 'welcomeCardWidth',
          type: 'select',
          label: 'Welcome Card Width',
          defaultValue: 'page',
          options: [
            {
              label: 'Narrow (60%)',
              value: 'narrow',
            },
            {
              label: 'Page Width (Container)',
              value: 'page',
            },
            {
              label: 'Medium (85%)',
              value: 'medium',
            },
            {
              label: 'Wide (95%)',
              value: 'wide',
            },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.showWelcomeCard,
            description: 'Control the width of the welcome card (default: page width matches logo to Give button)',
          },
        },
        {
          name: 'welcomeEyebrow',
          type: 'text',
          defaultValue: 'WELCOME',
          label: 'Welcome Eyebrow',
          admin: {
            condition: (data, siblingData) => siblingData?.showWelcomeCard,
            description: 'Small text above the welcome title (e.g., "WELCOME")',
          },
        },
        {
          name: 'welcomeTitle',
          type: 'text',
          defaultValue: "We're glad you're here.",
          label: 'Welcome Title',
          admin: {
            condition: (data, siblingData) => siblingData?.showWelcomeCard,
            description: 'Main welcome heading',
          },
        },
        {
          name: 'welcomeSubtitle',
          type: 'text',
          label: 'Welcome Subtitle',
          admin: {
            condition: (data, siblingData) => siblingData?.showWelcomeCard,
            description: 'Optional one-sentence supporting copy',
          },
        },
        linkGroup({
          overrides: {
            name: 'welcomeButtons',
            label: 'Welcome Card Buttons',
            maxRows: 2,
            admin: {
              condition: (data, siblingData) => siblingData?.showWelcomeCard,
              description: 'CTAs for the welcome card (e.g., "Plan Your Visit", "This Sunday")',
            },
          },
        }),
      ],
    },
    {
      name: 'minHeight',
      type: 'select',
      label: 'Minimum Height',
      defaultValue: 'default',
      options: [
        { label: 'Small (50vh)', value: 'small' },
        { label: 'Default (60vh / 70vh)', value: 'default' },
        { label: 'Large (80vh)', value: 'large' },
        { label: 'Full Screen (100vh)', value: 'fullscreen' },
        { label: 'Auto (Fit Content)', value: 'auto' },
      ],
      admin: {
        description: 'Control the vertical height of the hero section',
      },
    },
    typography({
      fontFamily: true,
      alignment: true,
    }),
    blockAppearance({
      backgroundVariant: true,
      alignment: true,
      fullWidth: false,
      padding: true,
    }),
    decorativePattern({
      enablePatterns: true,
    }),
    visibilitySettings({
      deviceVisibility: true,
      audienceTargeting: true,
      seasonalDisplay: false,
    }),
    animationSettings({
      presets: true,
      timing: true,
      behavior: true,
    }),
    blockName,
  ],
}
