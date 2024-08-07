"use client"


import Link from 'next/link'
import React, { useState } from 'react'
import useColor from '../useColor';
import PostCard from '../MultiUse/Card';



const CategorySect = ({data,index }) => {

const title  =data[0].cTitle
const slug =data[0].cSlug
  console.log( "CategorySect",title)
  const { bgColor, textColor, complementaryTextColor } = useColor();
  const neomorphismStyle = {
    backgroundColor: `${bgColor}`, // Set your desired background color
    border: `1px solid ${textColor}`,
    padding: `8px`,
    borderRadius: '10px', // Adjust the border radius as needed
    boxShadow: `6px 6px 0px 0px ${complementaryTextColor}`, // Neomorphic box shadow
  };

  const CATEGORY = data.map( (item,index) =>{

    let content;
    if(index === 0){
      content = <div style={{color: textColor , } } className=''><PostCard post={item} index={index}  bordeColor={complementaryTextColor} bgGrnd={bgColor} txtColor={textColor}/></div>;
    }else{
      content = <div className='my-[12px] '><div className='flex'> <span style={{color:complementaryTextColor }} className="bullet  flex items-start mt-[-5px] " /> <h1 style={{color: textColor  , textDecorationColor:complementaryTextColor} } className='  text-[12px]   font-[500] hover:underline underline-offset-4 decoration-[2.5px]  '><Link href={`/Article/${item.Slug}`}>{item.Title}</Link></h1></div></div>
    }
    return (
      <div key={index}   style={{ borderTopColor: complementaryTextColor }} className={`  my-2  ${index === 0 ? ' ' : index >= 1 ? 'border-t-[0.25px]' :''} `}>
        {content}
      </div>
    );
  })  

  return (
    <div style={ neomorphismStyle} className='z-0 lg:sticky top-0 ' >
      <div className=" flex justify-between text-[12px] mb-5">
        <Link href={`/${slug}`} style={{color: textColor } } className=" flex items-center   font-[100px] ">
          see all {title} 
        </Link>
      </div>
      {CATEGORY}
    </div>
  )
}



const TrendSect = ({data,index }) => {
console.log( "TrendSect",  data)

const neomorphismStyle = {
  backgroundColor: `#FED15B`, // Set your desired background color
  border: `1px solid #FFFFFC`,
  padding: `10px`,
  borderRadius: '8px', // Adjust the border radius as needed
  boxShadow: `6px 6px 0px 0px #2660A4`, // Neomorphic box shadow
};

  const Trend = data.map( (item,index) =>{

    return (        
        <li  className="  px-5 font-[700] py-[10px] flex text-[#FFFFFC] gap-5 items-center" key={index}>
            <span className=' rounded-full h-[25px] w-[25px]  flex items-center  text-center  max-lg:text-[12px] p-2  bg-[#2660A4] '>{index +1}</span>
            <Link href={`/Article/${item.Slug}`} className=" ">
              <h1 className="lg:py-1  hover:underline underline-offset-4 decoration-[2px] ">{item.Title}</h1>
            </Link>
        </li>     
  )})  
  return (
    <div style={neomorphismStyle} className="bg-gradient-to-t lg:sticky  top-20 py-[30px] ">
      <ol>
        {Trend}
      </ol>
    </div>
  )
}






const Landing = ({PostData , CategoryData , TrendData }) => { 
  const filteredCategories = CategoryData.filter(category => category && category.length > 0)



  //console.log("filteredCategories", filteredCategories)

  const [pageSize, setPageSize] = useState(30);
  const [CategorySize, setCategorySize] = useState(3);

  const loadMore = () => {
    setPageSize(prevPageSize => prevPageSize + 10);
    setCategorySize(prevPageSize => prevPageSize + 1);

  }

  const results = PostData.slice(0, pageSize);
  const resultCat = filteredCategories.slice(0, CategorySize);

  const articlesData = results;
  const numberOfCategories = Math.ceil(articlesData.length / 8);
  const combinedData = [];



  for (let index = 0; index < numberOfCategories; index++) {
    const start = index * 8;
    const end = start + 8;
    const categoryData = resultCat[index]; // Access category data
    
    combinedData.push({
      categoryData ,
      postData: articlesData.slice(start, end), // Slice posts for the current category
    });
  }

  
 

  return (
    <div className=' text-[16px] font-roboto  font-bold'>
     {combinedData.map((group, groupIndex) => (

          <div key={groupIndex} className=" relative border bottom-1 border-emerald-800  lg:flex justify-between">
            <div className=" lg:w-[55%]">
              
  
              {group.postData.map((post, postIndex) => {

                console.log( "post" ,post)

                return (
                  <div key={postIndex} className="mx-5">
                    <h1>Title: {post.Title}</h1>
                    <p>Slug: {post.Slug}</p>
                    <a href='https://postimg.cc/WD66Mr5W' target='_blank'><img src='https://i.postimg.cc/WD66Mr5W/Finance.png' border='0' alt='Finance'/></a>
                  </div>
                );
              })}
            </div>
            <div className="lg:w-[40%] top-0 lg:mx-4">
              {groupIndex === 0 && (
                  <TrendSect data={TrendData} />
              )
              }

              {group.categoryData && groupIndex > 0 && ( 
                  <h2 className="lg:sticky top-16 ">
                     {
                        <CategorySect data={group.categoryData} />
                     }
                  </h2>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Landing
