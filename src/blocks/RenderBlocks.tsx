import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

// Saint Helen custom blocks
import { HeroBasicBlock } from '@/blocks/HeroBasic/Component'
import { HeroWithStatsBlock } from '@/blocks/HeroWithStats/Component'
import { RichTextSectionBlock } from '@/blocks/RichTextSection/Component'
import { ColumnsBlock } from '@/blocks/Columns/Component'
import { CTAFullWidthBlock } from '@/blocks/CTAFullWidth/Component'
import { CardGridBlock } from '@/blocks/CardGrid/Component'
import { BentoGridBlock } from '@/blocks/BentoGrid/Component'
import { EventListBlock } from '@/blocks/EventList/Component'
import { PostListBlock } from '@/blocks/PostList/Component'
import { BulletinListBlock } from '@/blocks/BulletinList/Component'
import { MediaListBlock } from '@/blocks/MediaList/Component'
import { AlertBannerBlock } from '@/blocks/AlertBanner/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'
import { StoryHighlightBlock } from '@/blocks/StoryHighlight/Component'
import { FAQAccordionBlock } from '@/blocks/FAQAccordion/Component'
import { VideoEmbedBlock } from '@/blocks/VideoEmbed/Component'
import { FormEmbedBlock } from '@/blocks/FormEmbed/Component'
import { SpacerBlock } from '@/blocks/Spacer/Component'
import { DividerBlock } from '@/blocks/Divider/Component'
import { CustomCodeBlock } from '@/blocks/CustomCode/Component'
import { InsertPatternBlock } from '@/blocks/InsertPattern/Component'

// Visibility utilities
import {
  shouldRenderBlock,
  getDeviceVisibilityClasses,
  type VisibilityContext,
} from '@/utilities/shouldRenderBlock'
import { cn } from '@/utilities/ui'

const blockComponents = {
  // Saint Helen blocks - Hero variants
  heroBasic: HeroBasicBlock,
  heroWithStats: HeroWithStatsBlock,
  // Saint Helen blocks - Content
  richTextSection: RichTextSectionBlock,
  columns: ColumnsBlock,
  ctaFullWidth: CTAFullWidthBlock,
  alertBanner: AlertBannerBlock,
  // Saint Helen blocks - Cards & Grids
  cardGrid: CardGridBlock,
  bentoGrid: BentoGridBlock,
  // Saint Helen blocks - Lists & Feeds
  eventList: EventListBlock,
  postList: PostListBlock,
  bulletinList: BulletinListBlock,
  mediaList: MediaListBlock,
  // Saint Helen blocks - Story & Testimony
  testimonial: TestimonialBlock,
  storyHighlight: StoryHighlightBlock,
  // Saint Helen blocks - Interactive
  faqAccordion: FAQAccordionBlock,
  videoEmbed: VideoEmbedBlock,
  formEmbed: FormEmbedBlock,
  // Saint Helen blocks - Layout Utilities
  spacer: SpacerBlock,
  divider: DividerBlock,
  // Saint Helen blocks - Custom Code
  customCode: CustomCodeBlock,
  // Saint Helen blocks - Patterns (editor-only)
  insertPattern: InsertPatternBlock,
  // Original template blocks
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

export interface RenderBlocksProps {
  blocks: Page['layout'][0][]
  /** Visibility context for audience/date filtering */
  visibilityContext?: VisibilityContext
}

/**
 * RenderBlocks Component
 *
 * Renders an array of blocks from the page layout, handling:
 * - Block type mapping to components
 * - Visibility filtering (audience, seasonal display)
 * - Device visibility CSS classes
 *
 * @param blocks - Array of blocks from the page layout
 * @param visibilityContext - Optional context for visibility filtering
 */
export const RenderBlocks: React.FC<RenderBlocksProps> = (props) => {
  const { blocks, visibilityContext } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Check visibility settings if they exist on the block
              const visibility = 'visibility' in block ? (block as any).visibility : undefined

              // Skip rendering if block should be hidden based on audience/date
              if (!shouldRenderBlock(visibility, visibilityContext)) {
                return null
              }

              // Get device visibility CSS classes
              const deviceClasses = getDeviceVisibilityClasses(visibility)

              return (
                <div key={index} className={cn(deviceClasses)}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
