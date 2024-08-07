import React from 'react'
import {GetCategories} from '../../GraphQl/Queries'
import Menu from './LandingComponent/Menu'



export const revalidate = 0

const  CategoryData = async ()=> {
    return await GetCategories()
   }

const Header = async () => {

    let Categories = await CategoryData() 

  return (
      <Menu Categories={Categories} />
  )
}

export default Header
