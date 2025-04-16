import React, { JSX } from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }): JSX.Element => {
    const text: string = nodesToJSX({ nodes: node.children }).join('')

    // Generate ID for all heading types
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    // Use React.createElement to create the heading with the id attribute
    return React.createElement(node.tag, { id }, text)
  },
}
