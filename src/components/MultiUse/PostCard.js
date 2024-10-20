"use client";
import moment, { tz } from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
// import { useMediaQuery } from 'react-responsive';
import { BsDot } from "react-icons/bs";

export function PostCard({ post, index }) {
  //   const underLargeDevice = useMediaQuery({ maxWidth:1024 });
  //   const smallDevices = useMediaQuery({ maxWidth:480 });
  const date = moment(post.date);
  const isMoreThanADay = moment().diff(date, "days") >= 1;
const imageUrl = post.image?.url || "https://cdn.pixabay.com/photo/2022/12/26/13/50/flower-7679117_1280.jpg";

  return (
    <div key={index} className="">
      <div className="  flex px-1  items-center max-lg:rounded-2xl   ">
        <div className=" my-3   ">
          <div className="cursor-pointer" key={index}>
            <Link href={`/post/${post?.slug}`} className="group">
              <Image
                src={imageUrl}
                width={500}
                height={20}
                alt="Picture of the author"
                className="max-h-[150px] rounded-xl max-w-[200px] object-cover sm:h-80 lg:h-96"
                priority={true}
                as="image"
              />
            </Link>
          </div>
        </div>
        <div className="p-4 my-3 w-[500px] ">
          <Link href={`/post/${post?.slug}`}>
            <h1 className="font-extrabold  hover:underline underline-offset-4  text-2xl ">
              {post.title}
            </h1>
          </Link>

          <div className="flex gap-4 my-2 items-center ">
            <div className="whitespace-nowrap rounded-full bg-[#9147ff] px-2.5 text-[#fff] py-0.5 ">
              {post.Categories?.map((category, index) => (
                <Link
                  className="md:whitespace-nowrap rounded-full font-normal  text-sm  "
                  key={index}
                  href={`/[cSlug]`}
                  as={`/${category?.cSlug}`}
                >
                  {category.title}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-1  ">
              <p className="text-sm  font-extralight">By staff</p>

              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <p className="text-[12px] text-red-400 font-normal ">
                <time dateTime={post.date}>
                  {isMoreThanADay
                    ? date.tz("Europe/Berlin").format("ha yy z")
                    : date.fromNow()}
                </time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FirstPostCard({ post, index }) {
  //   const underLargeDevice = useMediaQuery({ maxWidth:1024 });
  //   const smallDevices = useMediaQuery({ maxWidth:480 });
  const date = moment(post.date);
  const isMoreThanADay = moment().diff(date, "days") >= 1;
  const imageUrl = post.image?.url || "https://cdn.pixabay.com/photo/2022/12/26/13/50/flower-7679117_1280.jpg";

  return (
    <>
      <div key={index} className="crd mb-3 mx-auto lg:w-[75%]">
        <div className="sub-crd bg-red-400 category">
          <span className="text_span  flex items-center   space-x-6">
            {post.Categories?.map((category, index) => (
              <Link
                key={index}
                className="md:whitespace-nowrap rounded-full font-normal  text-white text-lg hover:underline  "
                href={`/[cSlug]`}
                as={`/${category?.cSlug}`}
              >
                {category.title}
              </Link>
            ))}
            <p className="text-[12px] text-white font-normal ">
              <time dateTime={post.date}>
                {isMoreThanADay
                  ? date.tz("Europe/Berlin").format("ha yy z")
                  : date.fromNow()}
              </time>
            </p>
          </span>
          <svg
            className="icon_svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M86.6 64l85.2 85.2C194.5 121.7 208 86.4 208 48c0-14.7-2-28.9-5.7-42.4C158.6 15 119 35.5 86.6 64zM64 86.6C35.5 119 15 158.6 5.6 202.3C19.1 206 33.3 208 48 208c38.4 0 73.7-13.5 101.3-36.1L64 86.6zM256 0c-7.3 0-14.6 .3-21.8 .9C238 16 240 31.8 240 48c0 47.3-17.1 90.5-45.4 124L256 233.4 425.4 64C380.2 24.2 320.9 0 256 0zM48 240c-16.2 0-32-2-47.1-5.8C.3 241.4 0 248.7 0 256c0 64.9 24.2 124.2 64 169.4L233.4 256 172 194.6C138.5 222.9 95.3 240 48 240zm463.1 37.8c.6-7.2 .9-14.5 .9-21.8c0-64.9-24.2-124.2-64-169.4L278.6 256 340 317.4c33.4-28.3 76.7-45.4 124-45.4c16.2 0 32 2 47.1 5.8zm-4.7 31.9C492.9 306 478.7 304 464 304c-38.4 0-73.7 13.5-101.3 36.1L448 425.4c28.5-32.3 49.1-71.9 58.4-115.7zM340.1 362.7C317.5 390.3 304 425.6 304 464c0 14.7 2 28.9 5.7 42.4C353.4 497 393 476.5 425.4 448l-85.2-85.2zM317.4 340L256 278.6 86.6 448c45.1 39.8 104.4 64 169.4 64c7.3 0 14.6-.3 21.8-.9C274 496 272 480.2 272 464c0-47.3 17.1-90.5 45.4-124z"></path>
          </svg>
        </div>
        <Link
          href={`/post/${post?.slug}`}
          className="crd_container w-full mx-auto"
        >
          <Image
            src={imageUrl}
            width={500}
            height={20}
            alt="Picture of the author"
            className="w-full min-h-96"
            priority={true}
            as="image"
          />
        </Link>
        <div className="sub-crd bg-red-400 text-white named">
          <span className="text_span">
            <Link href={`/post/${post?.slug}`}>
              <h1 className="text-lg">{post.title}</h1>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
