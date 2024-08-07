import React from 'react'
import Search from '../../../components/LandingPage/LandingComponent/Search'
import {GetSearchingPosts} from '../../../GraphQl/Queries'




const getSearch = async ( title )=>{
  
return await GetSearchingPosts(title)

}

const SearchPage = async ({ params }) => {
  const slug = params.slug
 const search = await getSearch(slug)
 
console.log("searching...", search)
  return (
    <div>
      <Search params={params} />
      <div>
        {search.length > 0 ? (
            search.map((post) => (
              <div key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.slug}</p>
              </div>
            ))
        ) : (
            <p>No results found.</p>
        )}
    </div>
    </div>
  )
}

export default SearchPage
