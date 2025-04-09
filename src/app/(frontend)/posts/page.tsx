// import type { Metadata } from 'next/types'

// import { CollectionArchive } from '@/components/CollectionArchive'
// import { PageRange } from '@/components/PageRange'
// import { Pagination } from '@/components/Pagination'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import React from 'react'
// import PageClient from './page.client'

// export const dynamic = 'force-static'
// export const revalidate = 600

// export default async function Page() {
//   const payload = await getPayload({ config: configPromise })

//   const posts = await payload.find({
//     collection: 'posts',
//     depth: 1,
//     limit: 12,
//     overrideAccess: false,
//     select: {
//       title: true,
//       slug: true,
//       categories: true,
//       meta: true,
//     },
//   })

//   return (
//     <div className=" pb-24">
//       <PageClient />
//       <div className="container mb-16">
//         <div className="prose dark:prose-invert max-w-none">
//           <h1>Introducing Gotipath Integrations</h1>
//           <p className="mt-5 text-neutral-500 sm:text-lg">Latest news and updates from Gotipath</p>
//         </div>
//       </div>
//       <div className="container mb-8">
//         <PageRange
//           collection="posts"
//           currentPage={posts.page}
//           limit={12}
//           totalDocs={posts.totalDocs}
//         />
//       </div>
//       <CollectionArchive posts={posts.docs} />

//       <div className="container">
//         {posts.totalPages > 1 && posts.page && (
//           <Pagination page={posts.page} totalPages={posts.totalPages} />
//         )}
//       </div>
//     </div>
//   )
// }

// export function generateMetadata(): Metadata {
//   return {
//     title: `Payload Website Template Posts`,
//   }
// }

// -----------

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

      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Introducing Gotipath Integrations</h1>
          <p className="mt-5 text-neutral-500 sm:text-lg">Latest news and updates from Gotipath</p>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={postsRes.page}
          limit={postsRes.limit}
          totalDocs={postsRes.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts} categories={categories} />

      <div className="container mt-12">
        {postsRes.totalPages > 1 && postsRes.page && (
          <Pagination page={postsRes.page} totalPages={postsRes.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
