'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Logo } from '../Logo/Logo'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

type NavChild = {
  text: string
  link: string
}

export type NavItem = {
  type: 'single' | 'group'
  text: string
  link?: string
  children?: NavChild[]
}

export type AuthItem = {
  text: string
  link: string
}

export default function HeroHeader({
  navItem,
  authItem,
  logoUrl,
}: {
  navItem: NavItem[]
  authItem: AuthItem[]
  logoUrl?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white z-10 ">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto px-4 md:px-20 h-14">
        {/* Logo - Now with responsive sizing */}
        <Link href="/" className="flex items-center">
          {logoUrl ? (
            <div className="relative w-36 h-8 sm:w-[100px] sm:h-[35px] md:w-[120px] md:h-[40px]">
              <Image
                src={logoUrl || '/placeholder.svg'}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="scale-75 sm:scale-90 md:scale-100">
              <Logo />
            </div>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden flex-1 justify-center md:flex">
          <nav className="flex items-center space-x-8">
            {navItem.map((item) =>
              item.type === 'single' ? (
                <Link
                  key={item.text}
                  href={item.link || '#'}
                  className="text-sm font-medium hover:bg-[#f4f4f4] p-3  rounded-lg text-primary hover:text-primary"
                >
                  {item.text}
                </Link>
              ) : (
                <div
                  key={item.text}
                  className="relative group hover:bg-[#f4f4f4] px-3 py-3 rounded-lg"
                >
                  <button className="flex items-center space-x-1 text-sm text-primary font-medium hover:text-primary">
                    <span>{item.text}</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-[6px] border bg-background shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.text}
                          href={child.link}
                          className="block px-3 py-3 text-sm hover:bg-[#f4f4f4]"
                        >
                          {child.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            )}
          </nav>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {authItem.map((auth) => (
            <Link key={auth.text} href={auth.link}>
              <button className="text-sm font-medium p-3 border border-[#E9EAEB] border-1 rounded-lg  text-primary hover:bg-[#E9EAEB]  hover:shadow-sm hover:ring-2 hover:ring-[#E9EAEB]">
                {auth.text}
              </button>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button - Now positioned at the right */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="flex items-center justify-between px-2 py-6">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  {logoUrl ? (
                    <div className="relative w-[90px] h-[30px]">
                      <Image
                        src={logoUrl || '/placeholder.svg'}
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-xl font-bold">LOGO</span>
                  )}
                </Link>
                {/* <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </Button> */}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2 px-2 mb-4">
                {authItem.map((auth) => (
                  <Link key={auth.text} href={auth.link}>
                    <Button
                      variant={auth.text.toLowerCase().includes('sign up') ? 'default' : 'outline'}
                      onClick={() => setIsOpen(false)}
                      className="w-full"
                    >
                      {auth.text}
                    </Button>
                  </Link>
                ))}
              </div>

              {/* Mobile Nav */}
              <div className="flex flex-col space-y-3 px-2">
                {navItem.map((item) =>
                  item.type === 'single' ? (
                    <Link
                      key={item.text}
                      href={item.link || '#'}
                      className="py-2 text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <MobileDropdown
                      key={item.text}
                      title={item.text}
                      items={item.children || []}
                      onItemClick={() => setIsOpen(false)}
                    />
                  ),
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

// Mobile dropdown component
function MobileDropdown({
  title,
  items,
  onItemClick,
}: {
  title: string
  items: { text: string; link: string }[]
  onItemClick: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="py-1">
      <button
        className="flex w-full items-center justify-between py-2 text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          className={cn('h-5 w-5 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 flex flex-col space-y-2 border-l pl-4">
          {items.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className="py-1 text-muted-foreground hover:text-foreground"
              onClick={onItemClick}
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
