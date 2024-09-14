import React from 'react'
import Search from '../../../components/LandingPage/LandingComponent/Search'
import {GetSearchingPosts} from '../../../GraphQl/Queries'
import Link from 'next/link'
import moment, { tz } from 'moment-timezone';
import Image from 'next/image';




const getSearch = async ( title )=>{
  
return await GetSearchingPosts(title)

}

const SearchPage = async ({ params }) => {
  const slug = params.slug
 const search = await getSearch(slug)

 const date = moment(search.date);
 const isMoreThanADay = moment().diff(date, "days") >= 1;

  return (
    <div className='w-[85%] lg:w-1/2 mx-auto my-20'>
      <Search params={params} />
      <div>
        {search.length > 0 ? (
            search.map((post , ide) => {
              
              const date = moment(post.date);
              const isMoreThanADay = moment().diff(date, "days") >= 1;
             
              
              
              
              return(
              
              <div className="cardS bg-[#242824] my-4 py-4 "key={post.ide}>
              <Image
                src="https://i.postimg.cc/C5rqnSYp/6206720.jpg"
                width={1000}
                height={1000}
                alt="Picture of the author"
                className="img h-full w-full object-cover"
                priority={true}
                as="image"
              />
              <div className="textBox">
                <div className="textContent">
                  <p className="h1 text-2xl hover:underline bold"><Link href={ `http://localhost:3000/post/${post.slug}`}>{post.title}</Link> </p>
                  <p className="text-xs px-2 text-red-400 font-normal">
                    <time dateTime={post.date}>
                      {isMoreThanADay
                        ? date.tz('Europe/Berlin').format('ha yy z')
                        : date.fromNow()}
                    </time> 
                  </p>
                </div>
                <p className="p whitespace-nowrap w-fit rounded-full bg-[#9147ff] px-2.5 text-[#fff] py-0.5 text-xs"><Link href={ `http://localhost:3000/${post.Categories[0].cSlug}`}>{post.Categories[0].title}</Link></p>
              <div>
            </div></div></div>
            )})
        ) : (
            <p className='text-2xl font-extrabold my-10 text-center'>No results found.</p>
        )}
    </div>
    </div>
  )
}

export default SearchPage
