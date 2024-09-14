'use client';

import React, { useEffect, useState } from 'react';
import CatCard from '../MultiUse/Card';
import {PostCard , FirstPostCard} from '../MultiUse/PostCard';
import moment from 'moment';
import HeroSection from './LandingComponent/HeroSection';
import TrendSect from './LandingComponent/TrendSection';
import CategorySect from './LandingComponent/CatSection';
import { useSearchParams } from 'next/navigation';

const CategoryPage = ({ posts, subTitle, Subcategories, TrendData ,index }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(posts);
  const [pageSize, setPageSize] = useState(10);
  const [CategorySize, setCategorySize] = useState(2);
  
  const searchParams = useSearchParams();
  const subcategory  = searchParams.get('subcategory');

  useEffect(() => {
    // Update selectedFilters based on the subcategory  from the URL
    if (subcategory ) {
      setSelectedFilters([subcategory ]);
    } else {
      setSelectedFilters([]);
    }

    // Filter items based on the current subcategory 
    if (subcategory ) {
      const filtered = posts.filter((post) =>
        post.SubCategories.some((subCategory) => subCategory.sSlug === subcategory )
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(posts); // Reset to all posts if no subcategory 
    }
  }, [subcategory , posts]);

  const handleFilterButtonClick = (selectedCategory) => {
    const currentFilter = searchParams.get('subcategory');
    const newUrl = new URL(window.location);

    if (currentFilter === selectedCategory) {
      // Remove subcategory  if the same category is clicked
      newUrl.searchParams.delete('subcategory');
    } else {
      // Set the new subcategory 
      newUrl.searchParams.set('subcategory', selectedCategory);
    }

    window.history.pushState({}, '', newUrl);
  };

  const handleFilterAll = () => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.delete('subcategory');
    window.history.pushState({},'', newUrl);
  };

  const Title = subTitle.map((t) =>( {
   title: t.title,
   slug:t.sSlug,
    postTitle: t.Posts.map((t) =>( {
      title: t.title,
     
     }))
  
  }));
  const filters = [Title];
  const resultSub = Subcategories.slice(0, CategorySize);
  
  const Post = filteredItems.slice(0, pageSize);
  const articlesData = Post;
  const numberOfCategories = Math.ceil(articlesData.length / 10);
  const combinedData = [];

  for (let index = 0; index < numberOfCategories; index++) {
    const start = index * 10;
    const end = start + 10;
    const SubcategoryData = resultSub[index];

    combinedData.push({
      SubcategoryData,
      postData: articlesData.slice(start, end),
    });
  }
  return (
    <div>
      <div className="py-5 px-2">
        <button
          onClick={handleFilterAll}
          className={`button text-black dark:text-white ${selectedFilters.length === 0 ? 'active' : ''}`}
        >
          All
        </button>
        {filters.flat().map((category, idx) => (
          <button
            onClick={() => handleFilterButtonClick(category.slug)}
            className={`button text-black dark:text-white ${selectedFilters.includes(category.slug) ? 'active' : ''}`}
            key={`filters-${idx}`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="lg:flex mb-[100px]">
        <div
          key={combinedData[0]?.postData[0]?.id}
          className="lg:w-[55%] relative mx-auto pt-28 lg:min-h-[750px] lg:pr-30"
        >
          <HeroSection combinedData={combinedData} index={index} />
        </div>
        <div className="lg:w-[30%] pt-28 mb-20 mx-auto">
          <TrendSect data={TrendData} />
        </div>
      </div>

      {combinedData.map((group, groupIndex) => (
        <div key={groupIndex} className="relative bottom-1 lg:flex justify-between">
          <div className="lg:w-[55%]">
          {group.postData.map((post, postIndex) => {
              let content;
              if (postIndex > 0 && postIndex === 1 ) {
                return <FirstPostCard  key={postIndex} post={post} index={postIndex} />
              }else if(postIndex > 1 )  {
                return (
                 <PostCard key={postIndex} post={post} index={postIndex} />
                );
              }
            })}
          </div>
          <div className="lg:w-[30%]">
            {group.SubcategoryData && (
              <h2 className="lg:sticky top-[20%]">
                <CategorySect key={groupIndex} data={group.SubcategoryData} i={groupIndex} />
              </h2>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
