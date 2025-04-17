// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { ChevronDown, Menu } from 'lucide-react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/utilities/ui'
// import { Logo } from '../Logo/Logo'
// import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

// type NavChild = {
//   text: string
//   link: string
// }

// export type NavItem = {
//   type: 'single' | 'group'
//   text: string
//   link?: string
//   children?: NavChild[]
// }

// export type AuthItem = {
//   text: string
//   link: string
// }

// export default function HeroHeader({
//   navItem,
//   authItem,
//   logoUrl,
// }: {
//   navItem: NavItem[]
//   authItem: AuthItem[]
//   logoUrl?: string
// }) {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center">
//         {/* Logo */}
//         <Link href="/" className="mr-4 flex items-center space-x-2">
//           {logoUrl ? (
//             <Image
//               src={logoUrl}
//               alt="Logo"
//               width={120}
//               height={40}
//               className="h-10 object-contain"
//             />
//           ) : (
//             <span className="text-lg font-bold">LOGO</span>
//           )}
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden flex-1 justify-center md:flex">
//           <nav className="flex items-center space-x-8">
//             {navItem.map((item) =>
//               item.type === 'single' ? (
//                 <Link
//                   key={item.text}
//                   href={item.link || '#'}
//                   className="text-sm font-medium hover:text-primary"
//                 >
//                   {item.text}
//                 </Link>
//               ) : (
//                 <div key={item.text} className="relative group">
//                   <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary">
//                     <span>{item.text}</span>
//                     <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
//                   </button>
//                   <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border bg-background shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                     <div className="py-1">
//                       {item.children?.map((child) => (
//                         <Link
//                           key={child.text}
//                           href={child.link}
//                           className="block px-4 py-2 text-sm hover:bg-accent"
//                         >
//                           {child.text}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ),
//             )}
//           </nav>
//         </div>

//         {/* Auth Buttons (Desktop) */}
//         <div className="hidden md:flex items-center gap-2 mr-2">
//           {authItem.map((auth) => (
//             <Link key={auth.text} href={auth.link}>
//               <Button
//                 variant={auth.text.toLowerCase().includes('sign up') ? 'default' : 'outline'}
//                 size="sm"
//               >
//                 {auth.text}
//               </Button>
//             </Link>
//           ))}
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="flex flex-col">
//               <div className="px-2 py-6">
//                 <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
//                   <span className="text-xl font-bold">LOGO</span>
//                 </Link>
//               </div>

//               {/* Mobile Auth Buttons */}
//               <div className="flex flex-col gap-2 px-2 mb-4">
//                 {authItem.map((auth) => (
//                   <Link key={auth.text} href={auth.link}>
//                     <Button
//                       variant={auth.text.toLowerCase().includes('sign up') ? 'default' : 'outline'}
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {auth.text}
//                     </Button>
//                   </Link>
//                 ))}
//               </div>

//               {/* Mobile Nav */}
//               <div className="flex flex-col space-y-3 px-2">
//                 {navItem.map((item) =>
//                   item.type === 'single' ? (
//                     <Link
//                       key={item.text}
//                       href={item.link || '#'}
//                       className="py-2 text-lg"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {item.text}
//                     </Link>
//                   ) : (
//                     <MobileDropdown
//                       key={item.text}
//                       title={item.text}
//                       items={item.children || []}
//                       onItemClick={() => setIsOpen(false)}
//                     />
//                   ),
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   )
// }

// // Mobile dropdown component
// function MobileDropdown({
//   title,
//   items,
//   onItemClick,
// }: {
//   title: string
//   items: { text: string; link: string }[]
//   onItemClick: () => void
// }) {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <div className="py-1">
//       <button
//         className="flex w-full items-center justify-between py-2 text-lg"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {title}
//         <ChevronDown
//           className={cn('h-5 w-5 transition-transform duration-200', isOpen && 'rotate-180')}
//         />
//       </button>
//       {isOpen && (
//         <div className="ml-4 mt-1 flex flex-col space-y-2 border-l pl-4">
//           {items.map((item) => (
//             <Link
//               key={item.text}
//               href={item.link}
//               className="py-1 text-muted-foreground hover:text-foreground"
//               onClick={onItemClick}
//             >
//               {item.text}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

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
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-4 flex items-center space-x-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Logo"
              width={120}
              height={40}
              className="h-10 object-contain"
            />
          ) : (
            <Logo />
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
                  className="text-sm font-medium hover:text-primary"
                >
                  {item.text}
                </Link>
              ) : (
                <div key={item.text} className="relative group">
                  <button className="flex items-center space-x-1 text-sm font-medium hover:text-primary">
                    <span>{item.text}</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border bg-background shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.text}
                          href={child.link}
                          className="block px-4 py-2 text-sm hover:bg-accent"
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
        <div className="hidden md:flex items-center gap-2 mr-2">
          {authItem.map((auth) => (
            <Link key={auth.text} href={auth.link}>
              <Button
                variant={auth.text.toLowerCase().includes('sign up') ? 'default' : 'outline'}
                size="sm"
              >
                {auth.text}
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="px-2 py-6">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <span className="text-xl font-bold">LOGO</span>
                </Link>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-2 px-2 mb-4">
                {authItem.map((auth) => (
                  <Link key={auth.text} href={auth.link}>
                    <Button
                      variant={auth.text.toLowerCase().includes('sign up') ? 'default' : 'outline'}
                      onClick={() => setIsOpen(false)}
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
