'use client'

import { useState } from 'react'

import Link from 'next/link'
import { cn } from '@/utilities/ui'

const TableOfContent = () => {
  const [activeSection, setActiveSection] = useState('day-1')

  const tableOfContents = [
    { id: 'day-1', title: 'Day 1: Introducing Dub Conversions' },
    { id: 'day-2', title: 'Day 2: Introducing Webhooks' },
    { id: 'day-3', title: 'Day 3: Unveiling our new About page' },
    { id: 'celebrating', title: 'Celebrating 1 year of Dub' },
  ]
  return (
    <div className="sticky top-10 mt-[30vh] self-start">
      <div className="flex items-center gap-2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-list"
        >
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3" y1="6" y2="6" />
          <line x1="3" x2="3" y1="12" y2="12" />
          <line x1="3" x2="3" y1="18" y2="18" />
        </svg>
        <h3 className="text-xl font-normal">On this page</h3>
      </div>

      <nav className="border-l border-gray-200 pl-4 mt-5">
        <ul className="space-y-4">
          {tableOfContents.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={cn(
                  'block text-lg transition-colors',
                  activeSection === item.id
                    ? 'font-medium text-gray-900'
                    : 'text-gray-500 hover:text-gray-700',
                )}
                onClick={() => setActiveSection(item.id)}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContent
