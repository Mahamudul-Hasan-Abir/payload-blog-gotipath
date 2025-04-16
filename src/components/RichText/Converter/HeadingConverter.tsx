// import React, { JSX } from 'react'
// import { JSXConverters } from '@payloadcms/richtext-lexical/react'
// import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

// export const headingConverter: JSXConverters<SerializedHeadingNode> = {
//   heading: ({ node, nodesToJSX }): JSX.Element => {
//     const text: string = nodesToJSX({ nodes: node.children }).join('')

//     // Generate ID for all heading types
//     const id = text
//       .toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^a-z0-9-]/g, '')

//     // Use React.createElement to create the heading with the id attribute
//     return React.createElement(node.tag, { id }, text)
//   },
// }

import React, { JSX } from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }): JSX.Element => {
    const text: string = nodesToJSX({ nodes: node.children }).join('')

    // Only add IDs to h1 and h2 elements
    if (node.tag === 'h1' || node.tag === 'h2') {
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      return React.createElement(node.tag, { id }, text)
    } else {
      // For h3, h4, h5 - don't add an ID
      const tag = node.tag as 'h3' | 'h4' | 'h5'
      return React.createElement(tag, {}, text)
    }
  },
}
