'use client'

import React, { createContext, useContext } from 'react'
import type { Post } from '@/payload-types'

interface PostContextValue {
  posts: Post[]
}

const PostContext = createContext<PostContextValue | undefined>(undefined)

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}

export const PostProvider = ({ children, posts }: { children: React.ReactNode; posts: Post[] }) => {
  return <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>
}
