"use client"
import React, { useState } from 'react'

const Search = ({params}) => {

    const [SearchInput,setSearchInput ]=useState('')





  return (
    <div>
      searchinng :{params.slug}
      <input type='text' value={params.slug} placeholder='' onChange={(e)=>setSearchInput(e.target.value)}/>
    </div>
  )
}

export default Search
