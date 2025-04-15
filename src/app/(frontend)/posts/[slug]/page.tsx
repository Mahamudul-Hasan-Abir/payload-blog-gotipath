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
import { formatAuthors } from '@/utilities/formatAuthors'
import Image from 'next/image'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Button } from '@/components/ui/button'
import TryAd from '@/components/TryAd/TryAd'
import Marketing from '@/components/Marketing/Marketing'

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
  // console.log('RichText', post?.content.root.children)
  // const richTextHeading = post?.content.root.children
  // richTextHeading?.map((tags) => {
  //   if (tags.tag == 'h2') {
  //     console.log('this one is table component element', tags.tag)
  //   }
  // })
  /* Creating headings */
  const headings =
    post?.content?.root?.children
      ?.filter((block: any) => block.tag === 'h2')
      ?.map((block: any) => {
        const text = block.children?.map((c: any) => c.text).join('') || ''
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
        return { id, text }
      }) || []

  /* Creating headings */

  if (!post) return <PayloadRedirects url={url} />
  /* Extra for Dub Hero */
  const { categories, heroImage, populatedAuthors, publishedAt, title, subTitle } = post
  // console.log('consoling post for subtitle', post)
  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  /* Extra for Dub Hero */
  return (
    <article className="pt-16 relative overflow-hidden  lg:mx-0 ">
      <div>
        {/* Main div */}
        <div className="bg-white max-w-5xl mx-auto pb-52 ">
          <div className="flex gap-5 items-center  md:mx-7 mx-5 lg:mx-0">
            <Button className="rounded-[0.375rem] border border-neutral-200 bg-white  px-4 py-1.5 text-sm font-semibold text-neutral-700 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-neutral-300 hover:bg-white/50">
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

          <div className="lg:mx-0 md:mx-7 mx-5">
            <h1 className="mt-5 font-display font text-4xl  text-neutral-900 text-left sm:text-4xl sm:leading-[1.25]">
              {title}
            </h1>
          </div>
          <div className="lg:w-2/3 w-full lg:mx-0 md:mx-7 md:px-0 px-5">
            <p className="mt-5 text-neutral-500 sm:text-lg">{subTitle}</p>
          </div>
          <svg
            className="pointer-events-none lg:block hidden absolute inset-[unset] left-1/2 top-0 h-80 w-full -translate-x-1/2 text-neutral-300/50 [mask-image:radial-gradient(70%_60%_at_50%_60%,black_30%,transparent)] max-sm:opacity-50"
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
        </div>

        <div className="bg-neutral-50 border-t-[1px] border-neutral-200 mt-5">
          <div className="grid grid-cols-4 gap-5 max-w-5xl mx-auto">
            <div className=" -mb-52 col-span-4 lg:col-span-3  ">
              {/* Natural div */}
              <div className="max-w-5xl mx-auto -translate-y-52 border-[1px] border-neutral-200 lg:rounded-2xl overflow-hidden bg-white pb-10 mb-10">
                <div className="relative ">
                  <div className="aspect-[1200/630] overflow-hidden sm:rounded-t-xl">
                    {heroImage &&
                      typeof heroImage !== 'string' &&
                      heroImage.url &&
                      heroImage.alt && (
                        <Image
                          src={heroImage.url}
                          alt={heroImage.alt}
                          fill
                          className="object-cover blur-0"
                          priority
                          sizes="100vw"
                        />
                      )}
                  </div>
                </div>

                <div className="items-center gap-4 pt-8 lg:mx-10 md:mx-7 md:mb-10 my-7 mx-5">
                  <div>
                    <RichText data={post.content} enableGutter={false} />
                  </div>
                </div>
                <div className="border-t border-neutral-200 bg-gradient-to-b from-white/50 to-transparent p-10 backdrop-blur-lg">
                  <p className="py-2 font-display text-xl font-medium">Read More</p>
                  {post.relatedPosts && post.relatedPosts.length > 0 && (
                    <RelatedPosts
                      className="mt-4 w-full"
                      docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 hidden lg:block sticky ">
              <TableOfContent post={post}></TableOfContent>
              <TryAd></TryAd>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-20">
        <Marketing></Marketing>
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
