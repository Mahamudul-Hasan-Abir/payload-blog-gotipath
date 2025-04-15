import React, { Fragment } from 'react'
import { VideoMedia } from '../Media/VideoMedia'
import { ImageMedia } from '../Media/ImageMedia'
import { Props } from '../Media/types'
import { ImageMediaCard } from './ImageMediaCard'

export const MediaCard: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMediaCard {...props} />}
    </Tag>
  )
}
