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
    <div key={index} className=" my-10">
      <div className="  flex px-1  items-center max-lg:rounded-2xl   ">
        <div className=" my-3   ">
          <div className="cursor-pointer" key={index}>
            <Link href={`/post/${post?.slug}`} className="group">
              <Image
                src={imageUrl}
                width={500}
                height={20}
                alt="Picture of the author"
                className="max-h-[150px]  max-w-[200px] object-cover sm:h-80 lg:h-96"
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
      <div key={index} className=" mx-auto lg:w-full">
        <Link
          href={`/post/${post?.slug}`}
          className=" w-full mx-auto"
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
        <div className="  text-white named">
          <span className="my-4 ">
            <Link href={`/post/${post?.slug}`}>
              <h1 className="text-[30px] lg:text-[40px] leading-[42px] sm:leading-[45px] lg:leading-[55px] tracking-tighter px-4 hover:underline underline-offset-8 decoration-[5px] shadow-black font-[900]">{post.title}</h1>
            </Link>
          </span>
        </div>
          <span className="  flex gap-5 items-center  px-5 my-4">
            <div className="whitespace-nowrap rounded-full bg-[#9147ff] px-2.5 text-[#fff] py-0.5 text-xs">
            {post.Categories?.map((category, index) => (
              <Link
                key={index}
                className="md:whitespace-nowrap rounded-full font-normal text-sm  "
                href={`/[cSlug]`}
                as={`/${category?.cSlug}`}
              >
                {category.title}
              </Link>
            ))}
            </div>
            <p className="text-[12px] text-white font-normal ">
              <time dateTime={post.date}>
                {isMoreThanADay
                  ? date.tz("Europe/Berlin").format("ha yy z")
                  : date.fromNow()}
              </time>
            </p>
          </span>
         
      </div>
    </>
  );
}
