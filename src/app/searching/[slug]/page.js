import React from 'react'
import Search from '../../../components/LandingPage/LandingComponent/Search'
import {GetSearchingPosts} from '../../../GraphQl/Queries'
import Link from 'next/link'




const getSearch = async ( title )=>{
  
return await GetSearchingPosts(title)

}

const SearchPage = async ({ params }) => {
  const slug = params.slug
 const search = await getSearch(slug)
 
  return (
    <div className='w-1/2 mx-auto my-20'>
      <Search params={params} />
      <div>
        {search.length > 0 ? (
            search.map((post , ide) => (
              <div className="cardS my-4 py-4 "key={post.ide}>
              <div className="img"></div>
              <div className="textBox">
                <div className="textContent">
                  <p className="h1 text-2xl bold"><Link href={ `http://localhost:3000/post/${post.slug}`}>{post.title}</Link> </p>
                  <span className="span">{post.date}</span>
                </div>
                <p className="p"><Link href={ `http://localhost:3000/${post.Categories[0].cSlug}`}>{post.Categories[0].title}</Link></p>
              <div>
            </div></div></div>
            ))
        ) : (
            <p>No results found.</p>
        )}
    </div>
    </div>
  )
}

export default SearchPage
