import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { CollectionArchive } from '@/components/CollectionArchive'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const [postsRes, categoriesRes] = await Promise.all([
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 100,
      overrideAccess: false,
      pagination: true,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    }),
    payload.find({
      collection: 'categories',
      limit: 100,
      pagination: false,
    }),
  ])

  const posts = postsRes.docs
  const categories = categoriesRes.docs

  return (
    <div className="pb-24">
      <PageClient />
      <svg
        className="pointer-events-none max-w-5xl mx-auto absolute inset-[unset] left-1/2 top-0 h-80 w-full -translate-x-1/2 text-neutral-300/50 [mask-image:radial-gradient(70%_60%_at_50%_60%,black_30%,transparent)] max-sm:opacity-50"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="grid-«R5drminb»"
            x="35"
            y="43"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="1"
            ></path>
          </pattern>
        </defs>
        <rect fill="url(#grid-«R5drminb»)" width="100%" height="100%"></rect>
      </svg>
      {/* <div className=" mb-16 relative">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Introducing Gotipath Integrations</h1>
          <p className="mt-5 text-neutral-500 sm:text-lg">Latest news and updates from Gotipath</p>
        </div>
      </div> */}

      <div className="lg:mb-16 md:mb-6 mb-4 relative max-w-5xl mx-auto">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Introducing Gotipath Integrations
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-neutral-500">
            Latest news and updates from Gotipath
          </p>{' '}
        </div>
      </div>

      <div className=" lg:mb-8 mb-2 max-w-5xl mx-auto">
        <PageRange
          collection="posts"
          currentPage={postsRes.page}
          limit={postsRes.limit}
          totalDocs={postsRes.totalDocs}
        />
      </div>
      <div className=" min-h-[50vh] border-t  border-neutral-200 bg-gradient-to-b from-neutral-50">
        <CollectionArchive posts={posts} categories={categories} />

        <div className="container mt-12 max-w-5xl mx-auto">
          {postsRes.totalPages > 1 && postsRes.page && (
            <Pagination page={postsRes.page} totalPages={postsRes.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
