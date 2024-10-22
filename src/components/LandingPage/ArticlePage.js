"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import parse from "html-react-parser";
import moment from "moment";

import Link from "next/link";
import { SocialShareButtons, Social } from "../MultiUse/socialShare";


const ArticlePage = ({ detail, relatedPosts, currentUrl }) => {
  const date = moment(detail.date);
  const isMoreThanADay = moment().diff(date, "days") >= 1;

  useEffect(() => {
    const adjustIframes = () => {
      const iframes = document.querySelectorAll("iframe.ql-video");
      iframes.forEach((iframe) => {
        const aspectRatio = 9 / 16; // 16:9 aspect ratio for videos
        const width = iframe.clientWidth;
        iframe.style.height = `${width * aspectRatio}px`;
      });
    };

    // Adjust on initial load
    adjustIframes();

    // Adjust on window resize
    window.addEventListener("resize", adjustIframes);

    // Optional: Observe changes in the DOM (e.g., if Quill adds new content)
    const observer = new MutationObserver(adjustIframes);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", adjustIframes);
      observer.disconnect();
    };
  }, []);

  const Article = () => {
    const Detail = detail.map((item, index) => {
      const date = moment(item.date);
      const isMoreThanADay = moment().diff(date, "days") >= 1;
      const imageUrl =
        item.image?.url ||
        "/asset/postbanner.png";

      return (
        <div key={index} className=" ">
          <div className="lg:w-[85%] mx-auto">
            <span className="  lg:flex items-center  my-10 ">
              <h1 className="lg:w-[75%] mx-auto  py-4 text-4xl lg:text-5xl font-[900]  overflow-hidden  first-line:tracking-widest">
                {item.title}
              </h1>
              <span className="lg:w-[20%] text-start  items-center   ">
                <p>post created by platform staff&nbsp;&nbsp;&nbsp;</p>
                <time className="text-red-400" dateTime={item.date}>
                  {isMoreThanADay
                    ? date.format("MMM D YYYY , hh:mm A ")
                    : date.fromNow()}
                </time>
                {/* <span className=' text-xl flex max-md:text-3xl space-x-2 my-2 '>
                        <FaSquareFacebook />
                        <FaSquareInstagram />
                        <FaSquareWhatsapp />
                        <FaSquareXTwitter />
                        <FaSquareThreads />
                        <FaSquarePinterest />
                        <FaSquareYoutube/>
                        <FaTiktok/>
                      </span> */}
                <SocialShareButtons url={currentUrl} />
              </span>
            </span>
            <div class="relative">
            <Image
              src={imageUrl}
              width={1000} /* Set a width that ensures full width */
              height={500} /* Set a proportional height (you can adjust this) */
              alt="Picture of the author"
              className="  a mx-auto object-cover w-full  md:h-[650px]  " /* Add w-full to make it full width */
              quality={75} 
              sizes="(max-width: 768px) 480px, (max-width: 1200px) 780px, 1000px"
              decoding="async" 
              loading="eager" 
              fetchPriority="high"

            />
            <div
          className="absolute inset-0   rounded-tl-lg border-[12px] border-transparent"
          style={{
            borderImage:"linear-gradient(45deg, rgba(252, 129, 129, 0.75), rgba(145, 71, 255, 0.75)) 1",   borderRadius: "20px", zIndex:1 // Border radius
          }}
        ></div>
        </div>
            <p className="text-center my-2">
              &nbsp;&nbsp;&nbsp; picture credit by {item.imgAuthor}
            </p>
          </div>
          <div className="relative flex my-10 flex-col  md:flex-row  md:space-x-4">
            {/* {item.Categories.map((c)=>{ return <div key={index}>{c.title}</div>})} */}

            <div className="markdown-content  lg:w-[50%] mx-auto  first-letter:text-5xl text-[18px]  first-line:tracking-widest mt-10 ">
              {parse(item.content)}
              {item.items.map((item, i) => {
                return (
                  <div key={i} className={``}>
                    <div className="">
                      {item.media?.url && (
                        <div
                          className={`py-3 border-y-[1px] border-red-400 my-4`} //${ i % 2 === 0 ? "float-right" : "float-left"}
                        >
                          <Image
                            src={item.media.url}
                            width={150}
                            height={150}
                            alt={item.name}
                            className="w-full h-auto object-cover rounded-md max-h-[500px]"
                          />
                          <h3 className="">{item.name}</h3>
                          <p className="text-sm font-extralight ">
                            {item.description}
                          </p>
                          <div className=" mx-auto px-4 w-2/3 flex-wrap justify-center items-center text-center     ">
                            {item.links.map((link, i) => {
                              return (
                                <Link className="p-[10px] m-[10px] " key={i} href={link.url}>
                                  <button
                                    className="bg-[#9147FE] text-[14px] text-white p-[10px] m-[10px] rounded-md"
                                    aria-label={`Navigate to ${link.name}`}
                                  >
                                    {link.name}
                                  </button>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="">{parse(item.content)}</div>
                    </div>

                    {/* Image Section (if applicable) */}
                  </div>
                );
              })}
            </div>
            <div className="w-full h-fit p-2 max-md:px-20 rounded-2xl   bg-white sticky top-20 md:w-[75%] lg:w-[12%] mx-auto lg:text-center my-6">
              <h1 className=" text-black text-center py-2">follow Us</h1>
              <Social />
            </div>
          </div>
        </div>
      );
    });

    return Detail;
  };

  const Related = () => {
    const Post = relatedPosts.map((item, index) => {
      return (
        <Link
          key={index}
          href={item.slug}
          className="flex p-4  hover:bg-black/5 dark:hover:bg-black/10 items-center space-x-2    "
        >
          <Image
            src="https://cdn.pixabay.com/photo/2024/08/29/13/09/pineapple-9006965_640.jpg"
            width={1000} /* Set a width that ensures full width */
            height={500} /* Set a proportional height (you can adjust this) */
            alt="Picture of the author"
            className="rounded-lg object-cover max-md:w-[25%]  md:w-[20%] lg:w-[15%] h-ful  " /* Add w-full to make it full width */
            priority={true}
          />
          <h1>{item.title}</h1>
        </Link>
      );
    });

    return Post;
  };

  return (
    <>
      <article>
        <Article />
      </article>
      <h2 className="text-4xl">related Posts</h2>

      <div className="divide-y-[1px] divide-[#39225A]">
        <Related />
      </div>
    </>
  );
};

export default ArticlePage;
