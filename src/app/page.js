
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





export const revalidate =10
export default async function Home() {
 const Posts = await PostData()
 const Trend = await TrendData()
 const Categories =  await CategoryData()


 const categoryPosts = Categories.map(category =>
  category.map(article => ({
    ID: article.id,
    Title: article.title,
    Slug: article.slug,
    imgUrl:article.imgUrl,
    cTitle: article.Categories[0].title, 
    cSlug: article.Categories[0].cSlug, 
    })).slice(0,3)
);

const trend = Trend.map((article) => ({
  Title: article.title,
  Slug: article.slug,
  imgUrl:article.imgUrl,

})).slice(0,5) ;

const POSTS = Posts.map((article) => ({
  ID: article.id,
  Title: article.title,
  Slug: article.slug,
  imgUrl:article.imgUrl,
  cTitle: article.Categories[0].title, 
  cSlug: article.Categories[0].cSlug, 

}));
  














 
 //console.log( "POSTS",POSTS)

  return (
    <>
    <Landing  PostData={POSTS} CategoryData={categoryPosts} TrendData={trend}/>
    </>
    
  );
}
