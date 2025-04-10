import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import DubHero from '@/heros/DubHero/DubHero'
import TableOfContent from '@/components/TableOfContent/TableOfContent'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })
  // console.log('consolingSlug', slug)
  console.log('RichText', post?.content)

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16 relative overflow-hidden">
      <div className="absolute -z-10 top-[70vh] h-[calc(100%-13rem)] w-full border-t border-neutral-200 bg-gradient-to-b from-neutral-50"></div>
      <div className="max-w-7xl mx-auto px-3">
        <div>
          {/* <PageClient /> */}

          {/* Allows redirects for valid pages too */}
          <PayloadRedirects disableNotFound url={url} />

          {draft && <LivePreviewListener />}

          <DubHero post={post} />

          {/* <PostHero post={post} /> */}

          <div className="flex flex-col items-center gap-4 pt-8">
            <div>
              <RichText data={post.content} enableGutter={false} />
            </div>
          </div>
        </div>

        <div className="w-full">
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 w-full"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
        {/* Div for Table of Content */}
      </div>
      {/* <div className="flex flex-col items-center gap-4 pt-8">
        <div>
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div> */}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
