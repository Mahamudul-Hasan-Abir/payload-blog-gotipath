'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function TableOfContent(post) {
  const richTextHeading = post?.post?.content?.root?.children || []
  const extractHeadingText = (tag) => {
    return tag?.children[0]?.text || tag?.children[0]?.children[0].text || 'Untitled Heading'
  }

  const contentTableText = richTextHeading
    .filter((tag) => tag?.type === 'heading')

    .map((tag, index) => {
      const text = extractHeadingText(tag)
      // const slug = text.toLowerCase().replace(/\s+/g, '-')
      //  const filterdT extractPropertyValues({ data: text, propertyName: 'text' })
      console.log('text i need', text)
      return text
    })

  console.log('consoling extraction')

  console.log('testing Table Text', contentTableText)

  const contentTableItems = richTextHeading
    .filter((tag) => tag?.type === 'heading')
    .map((tag, index) => {
      const text = extractHeadingText(tag)
      // Create a slug that matches the ID format used in the heading component
      const slug = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      return {
        text,
        slug,
      }
    })

  const [activeSlug, setActiveSlug] = useState(null)

  return (
    <div className="max-w-md p-6 rounded-lg">
      {/* Author section */}
      <div className="mb-10">
        <h2 className="text-sm text-neutral-500 mb-4">Written by</h2>
        <div className="flex items-center gap-3">
          <div className="relative size-9">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Arvind Kesh"
              fill
              className="rounded-full border-2 border-yellow-400"
            />
          </div>
          <div>
            <h3 className="whitespace-nowrap text-sm font-medium text-neutral-700">Arvind Kesh</h3>
            <p className="text-sm text-neutral-500">Content Marketer</p>
          </div>
        </div>
      </div>

      {/* Table of contents */}
      <div>
        <div className="flex items-center mb-6">
          <Menu className="text-neutral-500 mr-2" size={20} />
          <h2 className="text-neutral-500 text-sm">On this page</h2>
        </div>

        {/* <nav>
          <ul className="space-y-4">
            {contentTableItems.map((item) => (
              <li key={item.slug}>
                

                <a
                  href={`#${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(item.slug)
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      el.setAttribute('tabindex', '-1')
                      el.focus()
                    }
                    setActiveSlug(item.slug)
                  }}
                  className={`block text-sm pl-4 transition-colors border-l-2 ${
                    activeSlug === item.slug
                      ? 'border-neutral-800 text-gray-900 font-semibold'
                      : 'border-gray-200 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav> */}

        <nav>
          <ul className="">
            {contentTableItems.map((item) => (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById(item.slug)
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      el.setAttribute('tabindex', '-1')
                      el.focus()
                    }
                    setActiveSlug(item.slug)
                  }}
                  className={`block text-sm pl-4 py-2 transition-colors border-l-2 ${
                    activeSlug === item.slug
                      ? 'border-neutral-800 text-gray-900 font-semibold'
                      : 'border-gray-200 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
