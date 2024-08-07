import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ post,index  , bordeColor , bgGrnd , txtColor}) => {
  return (
    <div key={index} className='cursor-pointer '>
              
              <Link href={`/Article/${post.Slug}`}>
                <h3   style={{borderColor:bordeColor, textDecorationColor:bordeColor }  } className="mt-5  lg:leading-[22.5px] lg:tracking-[2px]  border-l-[10px]  px-5 hover:underline underline-offset-2 decoration-[5px]   font-[900]">{post.Title}</h3>
              </Link>
              <div className="p-4">
                <div className='flex gap-5 items-center'>
                    <Link  href={`/[CategorySlug]`} as={`/${post.cSlug}`}>
                      <div className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5     lg:text-xs text-purple-600">
                        {post.cTitle}
                      </div>
                    </Link>
                  {/* <div className="flex items-center gap-1   font-[300] ">
                    <p className="text-[8px] lg:text-xs "> 
                      <time dateTime={post.publishedAt}>
                        {moment(post.publishedAt).fromNow()}
                      </time>
                    </p>
                  </div> */}
                </div>

              </div>
              <Link href={`/Article/${post.Slug}`} className='group max-lg:hidden'><Image  src="https://i.postimg.cc/C5rqnSYp/6206720.jpg"  width={750}  height={750}  alt='Picture of the author' className="lg:max-h-64 max-h-full  lg:w-full object-cover sm:h-80 lg:h-96   "  priority= {true}  as="image"/></Link>
            </div>
  )
}

export default Card
