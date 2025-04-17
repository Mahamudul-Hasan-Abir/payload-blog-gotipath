import HeroHeader from './HeroHeader'
import { getPayload } from 'payload'
import config from '@payload-config'

type RawNavItem = {
  type: 'single' | 'group'
  text: string
  link?: string | null
  children?: { text: string; link: string; id?: string | null }[] | null
  id?: string | null
}

type RawAuthItem = {
  text: string
  link: string
}

const GlobalHeader = async () => {
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header' })

  // Sanitize nav items
  const rawNavItems: RawNavItem[] = header?.nav || []
  const navItems = rawNavItems.map((item) => ({
    type: item.type,
    text: item.text,
    link: item.link ?? undefined,
    children:
      item.children?.map((child) => ({
        text: child.text,
        link: child.link,
      })) ?? undefined,
  }))

  // Sanitize auth items
  const authItems: RawAuthItem[] = header?.auth || []

  const logoUrl = typeof header?.logo === 'object' && header.logo?.url ? header.logo.url : undefined

  return <HeroHeader navItem={navItems} authItem={authItems} logoUrl={logoUrl} />
}

export default GlobalHeader
