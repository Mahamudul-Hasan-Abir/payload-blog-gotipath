import { Menu } from 'lucide-react'
import Image from 'next/image'

export default function TableOfContent(post) {
  const richTextHeading = post?.post?.content?.root?.children || []
  const extractHeadingText = (tag) => {
    return tag?.children[0]?.text || 'Untitled Heading'
  }

  return (
    <div className="max-w-md p-6  rounded-lg ">
      {/* Author section */}
      <div className="mb-10">
        <h2 className="text-sm text-neutral-500 mb-4">Written by</h2>
        <div className="flex items-center gap-3">
          <div className="relative size-9 ">
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

        <nav className="border-l border-gray-200">
          <ul className="space-y-4">
            {/* {richTextHeading.map((tag, index) => {
              if (tag.type === 'heading') {
                const text = tag?.children[0]?.text || ''
                console.log('consoling the text of table of content', text)
                const headingText =
                  tag.children?.[0]?.text ||
                  tag.children?.[0]?.children?.[0]?.text ||
                  'No table of Content'
                const slug = headingText.toLowerCase().replace(/\s+/g, '-')

                return (
                  <li key={index} className="pl-4 border-l-4 border-gray-800 -ml-[1px]">
                    <a href={`#${slug}`} className="text-gray-800 font-base block text-sm">
                      {text}
                    </a>
                  </li>
                )
              }
              return null
            })} */}

            {richTextHeading
              .filter((tag) => tag?.type === 'heading')
              .map((tag, index) => {
                const text = extractHeadingText(tag)
                const slug = text.toLowerCase().replace(/\s+/g, '-')
                console.log(tag)

                return (
                  <li key={index} className="pl-4 border-l-4 border-gray-800 -ml-[1px]">
                    <a href={`#${slug}`} className="text-gray-800 font-base block text-sm">
                      {text}
                    </a>
                  </li>
                )
              })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
