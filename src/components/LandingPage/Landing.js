"use client";

import React, { useState } from "react";
import {PostCard , FirstPostCard} from "../MultiUse/PostCard";
import moment from "moment";
import CategorySect from './LandingComponent/CatSection'
import TrendSect from './LandingComponent/TrendSection'
import HeroSection from './LandingComponent/HeroSection'

const Landing = ({ PostData, CategoryData, TrendData }) => {
  const filteredCategories = CategoryData.filter(
    (category) => category && category.length > 0
  );

  const [pageSize, setPageSize] = useState(11);
  const [CategorySize, setCategorySize] = useState(1);

  const loadMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 10);
    setCategorySize((prevPageSize) => prevPageSize + 1);
  };

  const results = PostData.slice(0, pageSize);
  const resultCat = filteredCategories.slice(0, CategorySize);
  const maxResults= PostData.length-1

  const articlesData = results;
  const numberOfCategories = Math.ceil(articlesData.length / 11);
  const combinedData = [];

  for (let index = 0; index < numberOfCategories; index++) {
    const start = index * 10;
    const end = start + 10;
    const categoryData = resultCat[index]; // Access category data

    combinedData.push({
      categoryData,
      postData: articlesData.slice(start, end ) // Slice posts for the current category
    });
  }

  const date = moment(combinedData[0]?.postData[0]?.date);
  const isMoreThanADay = moment().diff(date, "days") >= 1;

  return (
    <div className="text-[16px] font-roboto font-bold">
      <div className="lg:flex">
        <div
          key={combinedData[0]?.postData[0]?.id}
          className=" lg:w-[55%]  relative mx-auto pt-16 lg:pt-20   lg:mb-0 lg:min-h-[750px] lg:pr-30"
        >
          <HeroSection combinedData={combinedData} />
        </div>
        <div className="lg:w-[30%] pt-8 lg:pt-20  mx-auto">
          {" "}
          <TrendSect data={TrendData} />
        </div>
      </div>

      {combinedData.map((group, groupIndex) => (
        <div key={groupIndex} className="relative mx-auto">
          <div
            key={groupIndex}
            className="relative  lg:flex my-10  justify-between"
          >
            <div className="lg:w-[55%] divide-y divide-[#9147ff]/30">
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
            <div className="lg:w-[30%] w-[75%]  my-10 mx-auto">
              {group.categoryData && (
                <h2 className="lg:sticky top-[10%]">
                  <CategorySect key={groupIndex} i={groupIndex} data={group.categoryData} />
                </h2>
              )}
            </div>
          </div>
          {/* <h1>hello</h1>  */}
        </div>
      ))}

      {results.length > 0 && results.length < maxResults ?
          <div className="group mt-5  rounded-full bg-gradient-to-r  from-red-400  to-[#9147ff] p-[2px] hover:   focus:outline-none active:text-opacity-75  w-[50%] mx-auto " onClick={loadMore}>
            <button
              className="block rounded-full w-full text-[#191716] hover:text-white bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent outline-none"
            >
              Load More
            </button>
          </div> : null
      }
    </div>
  );
};

export default Landing;
