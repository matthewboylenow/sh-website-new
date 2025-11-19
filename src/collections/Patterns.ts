import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

// Import all the blocks that Pages uses
import { Archive } from '../blocks/ArchiveBlock/config'
import { CallToAction } from '../blocks/CallToAction/config'
import { Content } from '../blocks/Content/config'
import { FormBlock } from '../blocks/Form/config'
import { MediaBlock } from '../blocks/MediaBlock/config'

// Saint Helen custom blocks
import { HeroBasic } from '../blocks/HeroBasic/config'
import { HeroWithStats } from '../blocks/HeroWithStats/config'
import { RichTextSection } from '../blocks/RichTextSection/config'
import { Columns } from '../blocks/Columns/config'
import { CTAFullWidth } from '../blocks/CTAFullWidth/config'
import { CardGrid } from '../blocks/CardGrid/config'
import { BentoGrid } from '../blocks/BentoGrid/config'
import { EventList } from '../blocks/EventList/config'
import { PostList } from '../blocks/PostList/config'
import { BulletinList } from '../blocks/BulletinList/config'
import { MediaList } from '../blocks/MediaList/config'
import { AlertBanner } from '../blocks/AlertBanner/config'
import { Testimonial } from '../blocks/Testimonial/config'
import { StoryHighlight } from '../blocks/StoryHighlight/config'
import { FAQAccordion } from '../blocks/FAQAccordion/config'
import { VideoEmbed } from '../blocks/VideoEmbed/config'
import { FormEmbed } from '../blocks/FormEmbed/config'
import { Spacer } from '../blocks/Spacer/config'
import { Divider } from '../blocks/Divider/config'
import { CustomCode } from '../blocks/CustomCode/config'

/**
 * Patterns Collection
 *
 * Allows editors to save reusable page layouts and insert them into pages.
 * Similar to WordPress Block Patterns or Breakdance templates.
 *
 * Example patterns:
 * - Standard Ministry Page (Hero + RichText + CardGrid)
 * - Event Landing Page (Hero + EventList + CTAFullWidth)
 * - About Page Template (Hero + Testimonials + Staff List)
 */
export const Patterns: CollectionConfig = {
  slug: 'patterns',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'description', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Content',
    description: 'Reusable page layouts that can be inserted into pages',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Pattern Name',
      admin: {
        description: 'Descriptive name for this pattern (e.g., "Standard Ministry Page")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'What is this pattern for? When should editors use it?',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Pattern Layout',
      required: true,
      blocks: [
        // Saint Helen blocks - Hero variants
        HeroBasic,
        HeroWithStats,
        // Saint Helen blocks - Content
        RichTextSection,
        Columns,
        CTAFullWidth,
        AlertBanner,
        // Saint Helen blocks - Cards & Grids
        CardGrid,
        BentoGrid,
        // Saint Helen blocks - Lists & Feeds
        EventList,
        PostList,
        BulletinList,
        MediaList,
        // Saint Helen blocks - Story & Testimony
        Testimonial,
        StoryHighlight,
        // Saint Helen blocks - Interactive
        FAQAccordion,
        VideoEmbed,
        FormEmbed,
        // Saint Helen blocks - Layout Utilities
        Spacer,
        Divider,
        // Saint Helen blocks - Custom Code
        CustomCode,
        // Original template blocks (keep for compatibility)
        CallToAction,
        Content,
        MediaBlock,
        Archive,
        FormBlock,
      ],
      admin: {
        description: 'Build a reusable layout using blocks (same as page content)',
        initCollapsed: true,
      },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Pattern Category',
      options: [
        { label: 'Ministry Pages', value: 'ministry' },
        { label: 'Event Pages', value: 'event' },
        { label: 'About/Info Pages', value: 'about' },
        { label: 'Landing Pages', value: 'landing' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Categorize this pattern to help editors find it',
      },
    },
  ],
}

// TODO: Add Patterns to payload.config.ts collections array
// TODO: run "npx payload migration:generate 'add-patterns-collection'" after deploying
