import Image from 'next/image'
import blogimage from '../../../public/dub card image.jpg'

const TryAd = () => {
  return (
    <div className="group relative ms-6 block rounded-xl border border-neutral-200 bg-white p-4">
      <div className="absolute right-2 top-2 z-10 rounded-full border border-neutral-200 bg-gradient-to-b from-white/50 to-transparent p-2.5 opacity-0 backdrop-blur-lg transition-opacity hover:bg-neutral-50 group-hover:opacity-100"></div>
      <Image
        src={blogimage}
        className="blur-0 rounded-lg border border-neutral-100 "
        alt="Next Image"
      ></Image>
      <p className="mt-4 font-display text-lg font-bold">Try Dub for free</p>
      <p className="mt-1 text-sm text-neutral-500 underline-offset-4 group-hover:underline">
        Supercharge your marketing with Dub`&apos;`s link management platform
      </p>
    </div>
  )
}

export default TryAd
