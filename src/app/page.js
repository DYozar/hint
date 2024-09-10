
import {GetCategories ,GetPostsByCslug , GetPosts ,GetTrendPosts} from '../GraphQl/Queries'
import DynamicLink from '../components/MultiUse/DynamicLink';
import Landing from '../components/LandingPage/Landing'



const PostData = async ()=>{
 return await GetPosts();

}
const TrendData = async ()=>{
  return await GetTrendPosts();
 
 }
 
const  CategoryData = async ()=> {
  const Category = await GetCategories();

  return Promise.all(
    Category.map(async (category) => {
      const categorySlug = category.cSlug;
      const categoryPosts = await GetPostsByCslug(categorySlug);
      return categoryPosts
      
    })
  );
};





export const revalidate =0
export default async function Home() {
 const Posts = await PostData()
 const Trend = await TrendData()
 const Categories =  await CategoryData()


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




 
 //console.log( "POSTS",POSTS)

  return (
    <>
    <Landing  PostData={Posts} CategoryData={Categories} TrendData={trend}/>
    
    </>
    
  );
}
