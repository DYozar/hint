import React from 'react'
import CategoryPage from '../../../components/LandingPage/CategoryPage'
import {GetCategories , getPostBySubcategory, getPostsByCategory, getSubBasedOnCat, GetSubCategories,GetTrendPostsByCat } from '../../../GraphQl/Queries'






export const revalidate = 0

async function getPost(params) {
  const { cSlug } = params;
  const Post = await getPostsByCategory(cSlug);
  const subTitle = await getSubBasedOnCat(cSlug);


  

  return  {Post , subTitle };

}


async function getTrendPost(params) {
  const { cSlug } = params;
  const trend = await GetTrendPostsByCat(cSlug);






  
  return  trend
}



const  SubData = async ()=> {
  const SubCategory = await GetSubCategories();

  return Promise.all(
    SubCategory.map(async (s) => {
      const SubcategorySlug = s.sSlug;
      const SubcategoryPosts = await getPostBySubcategory(SubcategorySlug);
      return SubcategoryPosts
      
    })
  );
};

const categoryPage = async ({ params }) => {



  
let Trend = await getTrendPost(params)
let {Post,subTitle } = await getPost(params)


let SubCat = await SubData()



const trend = Trend.map((article) => ({
  ID: article.id,
  Date:article.date,
  Title: article.title,
  Slug: article.slug,
  cTitle:article.Categories[0]?.title,
  cSlug:article.Categories[0]?.cSlug,
  date: article.date,
  imgUrl:article.imgUrl,

})).slice(0,5) ;

console.log("Trend",Trend)
  return <CategoryPage  posts={Post}  subTitle={subTitle} Subcategories={SubCat}  TrendData={trend} params={params}/>
}

export default categoryPage
