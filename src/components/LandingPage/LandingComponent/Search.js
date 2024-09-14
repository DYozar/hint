"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

const Search = ({params}) => {

    const [SearchInput,setSearchInput ]=useState('')
    const router = useRouter();



    const handleSubmit = (e) => {
      e.preventDefault();
  
      const searchUrl = `/searching/${SearchInput}`;
      try {
        // Redirect to the dynamic search results page with the SearchInput as the slug
        router.push(searchUrl);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
  let title = params.slug.replace(/%20/g, ' ')
  
  /* From Uiverse.io by satyamchaudharydev */ 

    

  return (
    <div>
      <h1 className='text-4xl font-extrabold my-10 text-center '> Search results for : {title}</h1>
      <form onSubmit={handleSubmit} className="groups  w-full" >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
          <g>
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
            ></path>
          </g>
        </svg>

        <input
          id="query"
          className="input"
          type="text"
          placeholder={`Insert At Least 3 Words to Search... `}
          name={"searchbar"}
          value={SearchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
    </form >

    </div>
  )
}

export default Search
