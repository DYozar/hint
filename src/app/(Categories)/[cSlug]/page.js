import React from 'react'
import CategoryPage from '../../../components/LandingPage/CategoryPage'
import {GetCategories , getPostBySubcategory, getPostsByCategory, getSubBasedOnCat, GetSubCategories,GetTrendPostsByCat,GetGenre,GetItem } from '../../../GraphQl/Queries'

export const revalidate = 0

async function getPost(params) {
  const { cSlug } = params;
  const Post = await getPostsByCategory(cSlug);
  const subTitle = await getSubBasedOnCat(cSlug);
  return  {Post , subTitle };
}
async function getItem() {
  const Item = await GetItem();
  return  Item

}
export async function generateMetadata({ params }) {
  const {slug} = params;
  const { Post, subTitle }= await getPost(params)


  if (!subTitle || subTitle.length === 0) {
    return null;
  }

  return {
    title: !subTitle || subTitle.length === 0 ? 'NuttyNook ' : subTitle[0].Categories[0].title + ' - NuttyNook ',
    publisher: 'published by hintlr authors',
    openGraph: {
      images: [
        {
          
          url: Post?.[0]?.Categories?.[0]?.image?.[0]?.url , // Must be an absolute URL
          width: 2240,
          height: 1260,
          type:'image/jpeg'
        }],
    },
  }
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
const  GENRE = async ()=> {
  const Genre = await GetGenre();
  return Genre
};
const categoryPage = async ({ params }) => {

let Trend = await getTrendPost(params)
let {Post,subTitle } = await getPost(params)


let SubCat = await SubData()
let Genre = await GENRE()
let Item = await getItem()



const trend = Trend.map((article) => ({
  ID: article.id,
  Date:article.date,
  Title: article.title,
  Slug: article.slug,
  cTitle:article.Categories[0]?.title,
  cSlug:article.Categories[0]?.cSlug,
  date: article.date,
  image:article.image,

})).slice(0,5) ;

  return <CategoryPage  posts={Post}  subTitle={subTitle} Subcategories={SubCat}  TrendData={trend} Genre={Genre} params={params} item={Item}/>
}

export default categoryPage
