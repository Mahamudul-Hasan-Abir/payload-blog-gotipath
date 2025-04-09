'use client'

import { cn } from '@/utilities/ui'
import type React from 'react'
import { useState } from 'react'
import { Card, type CardPostData } from '@/components/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export type Category = {
  id: string
  title: string
}

export type Props = {
  posts: CardPostData[]
  categories: Category[]
  title?: string
  description?: string
}

export const CollectionArchive: React.FC<Props> = ({ posts, categories, title, description }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredPosts =
    selectedCategory === 'all'
      ? posts
      : posts.filter((post) =>
          post.categories?.some((cat) => typeof cat === 'object' && cat?.id === selectedCategory),
        )

  return (
    <div className={cn('w-full py-12')}>
      <div className={cn('container px-4 md:px-6')}>
        {title && <h1 className="text-5xl font-bold tracking-tight mb-3">{title}</h1>}
        {description && <p className="text-xl text-muted-foreground mb-8">{description}</p>}

        <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full">
          <div className="border rounded-2xl  overflow-hidden mb-8">
            <TabsList className="w-full justify-start p-0 h-auto bg-background overflow-x-auto">
              <TabsTrigger
                value="all"
                className="px-3 py-3 mx-2 my-2 rounded-xl data-[state=active]:bg-black data-[state=active]:text-white whitespace-nowrap"
              >
                All
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="mx-2 my-2 py-3 px-3 rounded-xl data-[state=active]:bg-black data-[state=active]:text-white whitespace-nowrap"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
              {posts?.map((post, index) => (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={post} relationTo="posts" showCategories />
                </div>
              ))}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
                {filteredPosts?.map((post, index) => (
                  <div className="col-span-4" key={index}>
                    <Card className="h-full" doc={post} relationTo="posts" showCategories />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
