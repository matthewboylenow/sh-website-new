import React from 'react'
import type { ColumnsBlock as ColumnsProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

export const ColumnsBlock: React.FC<ColumnsProps> = ({
  sectionTitle,
  layout = 'equal',
  columns,
  columnGap = 'default',
  appearance,
}) => {
  const gapClasses = cn(
    columnGap === 'small' && 'gap-4 md:gap-6',
    columnGap === 'default' && 'gap-6 md:gap-8',
    columnGap === 'large' && 'gap-8 md:gap-12',
  )

  const layoutClasses = cn(
    'grid',
    gapClasses,
    // Equal columns based on count
    layout === 'equal' && columns?.length === 2 && 'md:grid-cols-2',
    layout === 'equal' && columns?.length === 3 && 'md:grid-cols-3',
    layout === 'equal' && columns?.length === 4 && 'md:grid-cols-2 lg:grid-cols-4',
    // Asymmetric layouts
    layout === 'oneThirdLeft' && 'md:grid-cols-3',
    layout === 'oneThirdRight' && 'md:grid-cols-3',
  )

  return (
    <section className={blockAppearanceToClasses(appearance)}>
      <div className={getContainerClasses(appearance?.fullWidth)}>
        {sectionTitle && (
          <h2 className="text-h2 font-heading font-semibold mb-8">
            {sectionTitle}
          </h2>
        )}

        <div className={layoutClasses}>
          {columns?.map((column, index) => {
            const columnClasses = cn(
              'flex flex-col',
              // Special column spans for asymmetric layouts
              layout === 'oneThirdLeft' && index === 0 && 'md:col-span-1',
              layout === 'oneThirdLeft' && index === 1 && 'md:col-span-2',
              layout === 'oneThirdRight' && index === 0 && 'md:col-span-2',
              layout === 'oneThirdRight' && index === 1 && 'md:col-span-1',
            )

            return (
              <div key={index} className={columnClasses}>
                {column.icon && typeof column.icon === 'object' && (
                  <div className="mb-4">
                    <Media
                      resource={column.icon}
                      className="w-16 h-16 object-contain"
                      imgClassName="w-full h-full object-contain"
                    />
                  </div>
                )}

                {column.title && (
                  <h3 className="text-h3 font-heading font-semibold mb-4">
                    {column.title}
                  </h3>
                )}

                {column.body && (
                  <div className="mb-4 flex-grow">
                    <RichText
                      data={column.body}
                      enableGutter={false}
                      className={cn(
                        'prose',
                        appearance?.backgroundVariant === 'dark' && 'prose-invert',
                        appearance?.backgroundVariant === 'brand' && 'prose-invert',
                      )}
                    />
                  </div>
                )}

                {column.links && column.links.length > 0 && (
                  <div className="flex flex-col gap-3 mt-auto">
                    {column.links.map(({ link }, linkIndex) => (
                      <CMSLink key={linkIndex} {...link} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
