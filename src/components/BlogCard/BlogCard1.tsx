'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { MediaCard } from '../MediaCard'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const BlogCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const createdAt = doc?.meta?.image?.createdAt

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  // const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`
  const rawDescription = description ? description.replace(/\s/g, ' ') : ''
  const sanitizedDescription =
    rawDescription.length > 150 ? rawDescription.slice(0, 150) + '...' : rawDescription

  // console.log('props', props)

  return (
    <article
      className={cn(
        'border border-border rounded-xl overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <MediaCard resource={metaImage} size="33vw" />
        )}
      </div>
      <div className="p-6">
        {titleToUse && (
          <div className="prose">
            <h3 className="line-clamp-2 font-display text-lg font-bold text-neutral-900">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">
            {description && (
              <p className="line-clamp-2 text-sm text-neutral-500">{sanitizedDescription}</p>
            )}
          </div>
        )}

        <div className="flex items-center mt-auto">
          {/* Author and Date Section - Fixed Layout */}
          <div className="flex items-center mt-4">
            <Avatar className="h-8 w-8 md:h-10 md:w-10 mr-3 bg-gray-200">
              <AvatarImage src="/avatar.jpg" alt="Author" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>

            {createdAt && (
              <span className="text-gray-500 text-sm md:text-base">
                <time
                  dateTime={createdAt}
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-800"
                >
                  {formatDateTime(createdAt)}
                </time>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
