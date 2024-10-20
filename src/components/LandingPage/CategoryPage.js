"use client";
import React, { useEffect, useState } from "react";
import { PostCard, FirstPostCard } from "../MultiUse/PostCard";
import HeroSection from "./LandingComponent/HeroSection";
import TrendSect from "./LandingComponent/TrendSection";
import CategorySect from "./LandingComponent/CatSection";
import { useSearchParams } from "next/navigation";
import { getItemsByGenre } from "../../GraphQl/Queries";

const CategoryPage = ({
  posts,
  subTitle,
  Subcategories,
  Genre,
  TrendData,
  index,
  item
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredItem, setFilteredItem] = useState(item);
  const [filteredPost, setFilteredPost] = useState(posts);
  const searchParams = useSearchParams();
  const subcategory = searchParams.get("subcategory");
  const genre = searchParams.get("genre");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedItemFilters, setSelectedItemFilters] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [CategorySize, setCategorySize] = useState(2);

  useEffect(() => {
    // Update selectedSubcategory and selectedGenre based on the URL

    if (subcategory) {
      setSelectedFilters([subcategory]);

      setSelectedSubcategory(subcategory);
      const filtered = posts.filter((post) =>
        post.SubCategories.some(
          (subCategory) => subCategory.sSlug === subcategory
        )
      );
      setFilteredPost(filtered);
    } else {
      setSelectedSubcategory(null);
      setFilteredPost(posts); // Reset to all posts if no subcategory
      setSelectedFilters([]);
    }

    // Set selected genre based on the URL
    if (genre) {
      setSelectedGenre(genre);

      setSelectedItemFilters(genre);
      const filtered = item.filter((i) =>
        i.genres.some((g) => g.genre === genre)
      );
      setFilteredItem(filtered);
    } else {
      setSelectedGenre(null);
      setFilteredItem(item); // Reset to all posts if no subcategory
      setSelectedItemFilters([]);
    }
  }, [subcategory, genre, posts]);

  const handleCategoryClick = (category) => {
    const newUrl = new URL(window.location);

    // If the same category is clicked, remove it
    if (selectedSubcategory === category.slug) {
      newUrl.searchParams.delete("subcategory");
      setSelectedSubcategory(null);
    } else {
      newUrl.searchParams.set("subcategory", category.slug);
      setSelectedSubcategory(category.slug);
    }

    // Clear the genre selection when changing category
    newUrl.searchParams.delete("genre");
    setSelectedGenre(null);

    window.history.pushState({}, "", newUrl);
  };

  const handleGenreClick = (genre) => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("genre", genre.genre);
    setSelectedGenre(genre.genre); // Update the selected genre
    window.history.pushState({}, "", newUrl);
  };
  const handleFilterAll = () => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("subcategory");
    newUrl.searchParams.delete("genre");

    window.history.pushState({}, "", newUrl);
  };
  const handleFilterAllItem = () => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("genre");

    window.history.pushState({}, "", newUrl);
  };
  const Title = subTitle.map((t) => ({
    title: t.title,
    slug: t.sSlug,
    isGenre: t.isGenre,
    postTitle: t.Posts.map((post) => ({
      title: post.title
    }))
  }));

  const filters = Title;
  const resultSub = Subcategories.slice(0, CategorySize);

  const Post = filteredPost.slice(0, pageSize);
  const Item = filteredItem;

  const articlesData = Post;
  const numberOfCategories = Math.ceil(articlesData.length / 10);
  const combinedData = [];

  for (let index = 0; index < numberOfCategories; index++) {
    const start = index * 10;
    const end = start + 10;
    const SubcategoryData = resultSub[index];

    combinedData.push({
      SubcategoryData,
      postData: articlesData.slice(start, end)
    });
  }


  return (
    <div >
      {/* Category filter buttons */}
      <div className="mt-16 mb-8">
       {selectedSubcategory >0&& <button
            onClick={handleFilterAll}
            className={`button text-black dark:text-white ${
              selectedFilters.length === 0 ? "active" : ""
            }`}
          >
            All
        </button>}
        {filters.map((category, idx) => (
          
          <button
            onClick={() => handleCategoryClick(category)}
            className={`button text-black dark:text-white ${
              selectedSubcategory === category.slug ? "active" : ""
            }`}
            key={`filters-${idx}`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Show genres under the selected subcategory if it has genres */}
      {filters.map((category ,idx) => {
        if (
          selectedSubcategory &&
          category.slug === selectedSubcategory &&
          category.isGenre === true
        ) {
          return (
            <div key={idx}>
              <div key={category.id} className="my-6">
                <h2 className="text-xl  font-bold">{category.title}:</h2>
                <button
                  onClick={handleFilterAllItem}
                  className={`button text-black dark:text-white ${
                    selectedItemFilters.length === 0 ? "active" : ""
                  }`}
                >
                  All
                </button>
                {Genre.map((genre, idx) => (
                  <button
                    key={`genre-${idx}`}
                    className={`button text-black dark:text-white ${
                      selectedGenre === genre.genre ? "active" : ""
                    }`}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre.title}
                  </button>
                ))}
              </div>
                {Item.length > 0 ? (
                  Item.map((item ,idx) => <div key={idx}>{item.name}</div>)
                ) : (
                  <div>No items found for this category and genre.</div>
                )}
            </div>
          );
        } else if (category.isGenre === true ) {
          return (
            <div key={idx}> 
              <div className="lg:flex mb-[100px]">
                <div
                  key={combinedData[0]?.postData[0]?.id}
                  className="lg:w-[55%] relative mx-auto lg:min-h-[750px] lg:pr-30"
                >
                  <HeroSection combinedData={combinedData} index={index} />
                </div>
                <div className="lg:w-[30%] mb-20 mx-auto">
                  <TrendSect data={TrendData} />
                </div>
              </div>

              {combinedData.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="relative bottom-1 lg:flex justify-between"
                >
                  <div className="lg:w-[55%]">
                    {group.postData.map((post, postIndex) => {
                      let content;
                      if (postIndex > 0 && postIndex === 1) {
                        return (
                          <FirstPostCard
                            key={postIndex}
                            post={post}
                            index={postIndex}
                          />
                        );
                      } else if (postIndex > 1) {
                        return (
                          <PostCard
                            key={postIndex}
                            post={post}
                            index={postIndex}
                          />
                        );
                      }
                    })}
                  </div>

                  <div className="lg:w-[30%]">
                    {group.SubcategoryData && (
                      <h2 className="lg:sticky top-[20%]">
                        <CategorySect
                          key={groupIndex}
                          data={group.SubcategoryData}
                          i={groupIndex}
                        />
                      </h2>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default CategoryPage;
