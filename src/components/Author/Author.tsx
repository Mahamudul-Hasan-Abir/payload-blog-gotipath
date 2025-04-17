import Image from 'next/image'
import avatar from '../../../public/avatar.jpg'

type TAuthor = {
  id: string
  name: string
  image: string
}
const Author = ({ authors }: { authors: TAuthor[] }) => {
  return (
    // <div className="max-w-md p-6">
    //   <h2 className="text-sm text-neutral-500 mb-4">Written by</h2>
    //   {authors.map((author, index) => (
    //     <div key={author.id || index} className="flex items-center gap-3 mb-4">
    //       <div className="relative size-9 rounded-full overflow-hidden">
    //         <Image
    //           src={author.image || avatar} // fallback image
    //           alt={author.name || 'Author'}
    //           fill
    //           className="rounded-full border-2 border-yellow-400 object-cover"
    //         />
    //       </div>
    //       <div>
    //         <h3 className="whitespace-nowrap text-sm font-medium text-neutral-700">
    //           {author.name || 'Unknown Author'}
    //         </h3>
    //         <p className="text-sm text-neutral-500">Content Marketer</p> {/* Optional subtitle */}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="bg-gray-50 p-6 rounded-lg max-w-md">
      <h2 className="text-sm text-neutral-500 py-5">Written by</h2>
      <div className="space-y-6">
        {authors.map((author) => (
          <div key={author.id} className="flex items-center">
            <div className="flex-shrink-0 relative w-10 h-10 overflow-hidden rounded-full">
              <Image src={author.image || avatar} alt={author.name} fill className="object-cover" />
            </div>
            <div className="ml-4">
              <h3 className="whitespace-nowrap text-sm font-medium text-neutral-700">
                {author.name}
              </h3>
              <p className="text-gray-500">Created at</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Author
