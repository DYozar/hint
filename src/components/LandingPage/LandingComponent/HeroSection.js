import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment-timezone";

const HeroSection = ({ combinedData, index }) => {
  const date = moment(combinedData[0]?.postData[0]?.date);
  const isMoreThanADay = moment().diff(date, "days") >= 1;

  return (
    <div className=" lg:w-[80%] mx-auto" key={combinedData[0]?.postData[0]?.id}>
      <div className="relative">
      <Link href={`/post/${combinedData[0]?.postData[0]?.slug}`}  className="">
        <Image
          // style={{
          //   clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 85% 100%, 0% 100%)"
          // }}
          src={combinedData[0]?.postData[0]?.image?.url}
          className="lg:h-[500px] lg:w-[50%]  object-cover border-lights -2xl dark:border-[#131313] "
          width={1000} /* Set a width that ensures full width */
          height={500} /* Set a proportional height (you can adjust this) */
          alt="Picture of the author"
          quality={75}
          sizes="(max-width: 768px) 480px, (max-width: 1200px) 780px, 1000px"
          decoding="async"
          fetchPriority="high"
          layout="responsive"
          loading="eager"
        />
        <div
          className="absolute inset-0  rounded-tl-lg border-[6px]  border-transparent"
          style={{
            borderImage:"linear-gradient(45deg, rgba(252, 129, 129, 0.75), rgba(145, 71, 255, 0.75)) 1",   borderRadius: "20px", zIndex:1 // Border radius
          }}
        ></div>
        </Link>

      </div>

      <div className="my-5">
        <Link href={`/post/${combinedData[0]?.postData[0]?.slug}`}>
          <h1 className="text-[36px] lg:text-[44px] leading-[42px] sm:leading-[45px] lg:leading-[55px] tracking-tighter px-4 hover:underline underline-offset-8 decoration-[5px] shadow-black font-[900]">
            {combinedData[0]?.postData[0]?.title}
          </h1>
        </Link>
        <div className="flex gap-5 items-center  px-5 my-6">
          <div className="whitespace-nowrap rounded-full bg-[#9147ff] px-2.5 text-[#fff] py-0.5 text-xs">
            {combinedData[0]?.postData[0]?.Categories?.map(
              (category, index) => (
                <Link
                  className="md:whitespace-nowrap rounded-full font-normal text-sm"
                  key={index}
                  href={`/[cSlug]`}
                  as={`/${category?.cSlug}`}
                >
                  {category.title}
                </Link>
              )
            )}
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-extralight">By staff</p>

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
                  ? date.tz("Europe/Berlin").format("ha yy z")
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
