import {
    GetCategories,
    GetPosts,
  } from "../GraphQl/Queries";
  
  const PostData = async () => {
    return await GetPosts();
  };
  
  const CategoriesData = async () => {
    return await GetCategories();
  };
  
  export default async function sitemap() {
    const Posts = await PostData();
    const Categories = await CategoriesData();
  
    // Generate sitemap entries for categories
    const categoryEntries = Categories.map((category) => ({
      url: `https://nuttynook.com/category/${category.cSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5
    }));
  
    // Generate sitemap entries for posts, including images
  const postEntries = Posts.map((post) => ({

    url: `https://nuttynook.com/post/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    image: post?.image?.url // Add post image if available
  }));
    // Add homepage to the sitemap
    const homePageEntry = {
      url: `https://nuttynook.com/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5
    };
  
    // Combine all entries
    return [homePageEntry, ...categoryEntries, ...postEntries];
  }
  