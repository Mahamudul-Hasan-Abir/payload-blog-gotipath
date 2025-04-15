import { Menu } from 'lucide-react'
import Image from 'next/image'

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

  console.log(
    'consoling extraction',
    extractPropertyValues({ data: post?.post?.content?.root, propertyName: 'text' }),
  )

  console.log('testing Table Text', contentTableText)
  function extractPropertyValues({ data, propertyName }) {
    const values = []

    // Recursive function to traverse the nested structure
    function traverse(obj) {
      if (!obj || typeof obj !== 'object') return

      // Check if current object has the specified property
      if (obj[propertyName] !== undefined) {
        values.push(obj[propertyName])
      }

      // Traverse children if they exist
      if (obj.children) {
        traverse(obj.children)
      }

      // If it's an array, traverse each item
      if (Array.isArray(obj)) {
        obj.forEach((item) => traverse(item))
      }

      // Traverse all other properties that might be objects
      Object.keys(obj).forEach((key) => {
        if (key !== propertyName && key !== 'children' && typeof obj[key] === 'object') {
          traverse(obj[key])
        }
      })
    }

    traverse(data)
    return values
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
            {contentTableText.map((content, index) => (
              <li key={index} className="pl-4 border-l-4 border-gray-800 -ml-[1px]">
                <a className="text-gray-800 font-base block text-sm">{content}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
