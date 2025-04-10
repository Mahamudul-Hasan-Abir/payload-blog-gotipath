import { Post } from '@/payload-types'
import React from 'react'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Media } from '@/components/Media'
import Image from 'next/image'

const DubHero: React.FC<{ post: Post }> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post
  console.log('hero image', heroImage)
  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  return (
    <div>
      <div>
        <div className="flex items-center gap-5">
          <div>
            <Button className="bg-[#fafafa] text-black rounded-lg border-[1px] border-gray-200 hover:border-gray-300 hover:bg-[#fafafa]">
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  const titleToUse = categoryTitle || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <React.Fragment key={index}>
                      {titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </Button>
          </div>

          {publishedAt && (
            <div className="flex flex-col gap-1 text-[#737373]">
              <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            </div>
          )}
        </div>

        <h1 className="text-4xl mt-5 text-[#111827] font-medium">{title}</h1>
        <div className="min-h-[60vh] relative rounded-xl overflow-hidden mt-14">
          {heroImage && typeof heroImage !== 'string' && heroImage.url && heroImage.alt && (
            <Image src={heroImage.url} alt={heroImage.alt} fill priority className="object-cover" />
          )}
        </div>
      </div>
    </div>
  )
}

export default DubHero
