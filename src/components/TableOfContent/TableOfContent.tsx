'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function TableOfContent(post) {
  const richTextHeading = post?.post?.content?.root?.children || []

  const extractHeadingText = (tag) => {
    return tag?.children[0]?.text || tag?.children[0]?.children[0].text || 'Untitled Heading'
  }

  const contentTableItems = richTextHeading
    .filter((tag) => tag?.tag === 'h2')
    .map((tag, index) => {
      const text = extractHeadingText(tag)
      const slug = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      return {
        text,
        slug,
      }
    })

  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [userClicked, setUserClicked] = useState(false) // To track if the user clicked on an item

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !userClicked) {
            setActiveSlug(entry.target.id)
          }
        }
      },
      {
        rootMargin: '0% 0% -70% 0%', // triggers when heading is 30% from top
        threshold: 0.1, // triggers when 10% of the element is in view
      },
    )

    contentTableItems.forEach(({ slug }) => {
      const el = document.getElementById(slug)
      if (el) observer.observe(el)
    })

    return () => {
      contentTableItems.forEach(({ slug }) => {
        const el = document.getElementById(slug)
        if (el) observer.unobserve(el)
      })
    }
  }, [contentTableItems, userClicked]) // Add userClicked as a dependency

  const handleClick = (slug) => {
    setUserClicked(true) // Mark that user clicked an item
    setActiveSlug(slug) // Manually set active slug

    // Reset the userClicked state after 500ms to re-enable intersection observation
    setTimeout(() => {
      setUserClicked(false)
    }, 500)
  }

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

        <nav>
          <ul>
            {contentTableItems.map((item) => (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(item.slug) // Set activeSlug on click
                    const el = document.getElementById(item.slug)
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      el.setAttribute('tabindex', '-1')
                      el.focus()
                    }
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
