import { DotsHorizontal } from 'icons/Icon'
import Image from 'next/image'

export default function Trending({ result }) {
  return (
    <div className='flex cursor-pointer items-start justify-between py-3 px-4 text-[15px] transition duration-300 ease-out hover:bg-white-base hover:bg-opacity-[0.03]'>
      <div className='w-2/3 space-y-0.5 xl:w-3/4'>
        <p className='text-[13px] text-gray-light'>{result.heading}</p>
        <h6 className='text-[15px] font-bold'>{result.description}</h6>
        <p className='text-[13px] text-gray-light'>
          Trending with{' '}
          {result.tags &&
            result.tags.map((tag, index) => (
              <span key={index} className='text-blue-base'>
                {tag}
              </span>
            ))}
        </p>
      </div>
      {result.img ? (
        <Image
          src={result.img}
          width={68}
          height={68}
          objectFit='cover'
          className='rounded-2xl'
        />
      ) : (
        <div className='icon group -mt-1'>
          <DotsHorizontal className='h-5 w-5 text-gray-light' />
        </div>
      )}
    </div>
  )
}
