import React from 'react';
import Image from "next/image";
import Link from "next/link";
import moment from 'moment-timezone';

const HeroSection = ({ combinedData, index }) => {
  const date = moment(combinedData[0]?.postData[0]?.date);
  const isMoreThanADay = moment().diff(date, "days") >= 1;

  return (
    <div key={combinedData[0]?.postData[0]?.id}>
      <div  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 85% 100%, 0% 100%)', }} className="mx-auto my-auto bg-gradient-to-r from-red-400  to-[#9147ff] p-2  rounded-2xl">
      <div  style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 85% 100%, 0% 100%)', }} className=" dark:bg-[#131313] bg-lights  p-[5px]  ">
        <Link href={`/post/${combinedData[0]?.postData[0]?.slug}`}  className="">
          <Image
          style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 85% 100%, 0% 100%)' , }}
            src={combinedData[0]?.postData[0]?.image?.url}
            width={1000}
            height={1000}
            alt="Picture of the author"
            className="h-[500px] w-[780]  object-cover border-lights dark:border-[#131313] "
            priority={true}
            as="image"
          />
        </Link>
      </div>
      </div>

      <div className="my-5">
        <Link href={`/post/${combinedData[0]?.postData[0]?.slug}`}>
          <h3 className="text-[50px] leading-[42px] sm:leading-[45px] lg:leading-[60px] tracking-tighter px-5 hover:underline underline-offset-8 decoration-[5px] shadow-black font-[900]">
            {combinedData[0]?.postData[0]?.title}
          </h3>
        </Link>
        <div className="flex gap-5 items-center my-6">
          <div className="whitespace-nowrap rounded-full bg-[#9147ff] px-2.5 text-[#fff] py-0.5 text-xs">
            {combinedData[0]?.postData[0]?.Categories?.map((category ,index) => (
              <Link
                className="md:whitespace-nowrap rounded-full font-normal text-sm"
                key={index}
                href={`/[cSlug]`}
                as={`/${category?.cSlug}`}
              >
                {category.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-extralight">By staff</h4>

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
            <p className="text-xs text-red-400 font-normal">
              <time dateTime={combinedData[0]?.postData[0]?.date}>
                {isMoreThanADay
                  ? date.tz('Europe/Berlin').format('ha yy z')
                  : date.fromNow()}
              </time>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
