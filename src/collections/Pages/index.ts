import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'

// Saint Helen custom blocks
import { HeroBasic } from '../../blocks/HeroBasic/config'
import { HeroWithStats } from '../../blocks/HeroWithStats/config'
import { RichTextSection } from '../../blocks/RichTextSection/config'
import { Columns } from '../../blocks/Columns/config'
import { CTAFullWidth } from '../../blocks/CTAFullWidth/config'
import { CardGrid } from '../../blocks/CardGrid/config'
import { BentoGrid } from '../../blocks/BentoGrid/config'
import { EventList } from '../../blocks/EventList/config'
import { PostList } from '../../blocks/PostList/config'
import { BulletinList } from '../../blocks/BulletinList/config'
import { MediaList } from '../../blocks/MediaList/config'
import { AlertBanner } from '../../blocks/AlertBanner/config'
import { Testimonial } from '../../blocks/Testimonial/config'
import { StoryHighlight } from '../../blocks/StoryHighlight/config'
import { FAQAccordion } from '../../blocks/FAQAccordion/config'
import { VideoEmbed } from '../../blocks/VideoEmbed/config'
import { FormEmbed } from '../../blocks/FormEmbed/config'
import { Spacer } from '../../blocks/Spacer/config'
import { Divider } from '../../blocks/Divider/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
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
                // Original template blocks (keep for compatibility)
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
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
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
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
        description: 'Target audience for this page (used by assistant widget)',
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
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
