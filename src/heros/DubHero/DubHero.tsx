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
            <Button className="rounded-md border border-neutral-200 bg-white px-4 py-1.5 text-sm font-semibold text-neutral-700 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-neutral-300 hover:bg-white/50">
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
              <time
                dateTime={publishedAt}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-800"
              >
                {formatDateTime(publishedAt)}
              </time>
            </div>
          )}
        </div>

        <h1 className="mt-5 font-display text-4xl font-medium text-neutral-900 text-left sm:text-4xl sm:leading-[1.25]">
          {title}
        </h1>
        <div className="relative mt-10 sm:rounded-xl  sm:border sm:border-neutral-200 ">
          <div className="bg-white w-[80%] h-full aspect-[1200/630]   sm:rounded-t-xl">
            {heroImage && typeof heroImage !== 'string' && heroImage.url && heroImage.alt && (
              <Image
                src={heroImage.url}
                alt={heroImage.alt}
                fill
                priority
                className="blur-0 overflow-hidden object-cover sm:rounded-t-xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DubHero
