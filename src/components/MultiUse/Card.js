import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ post, index, bordeColor, bgGrnd, txtColor }) => {
  const date = moment(post.date);
  const isMoreThanADay = moment().diff(date, "days") >= 1;

  return (
    <div key={index} className="cursor-pointer   ">
      <Link href={`/post/${post.slug}`}>
        <h3
          style={{ borderColor: bordeColor, textDecorationColor: bordeColor }}
          className="mt-5  lg:leading-[22.5px] lg:tracking-tighter border-l-[10px]  text-3xl px-5 hover:underline underline-offset-2 decoration-[5px]   font-extrabold"
        >
          {post.title}
        </h3>
      </Link>
      <div className="p-4">
        <div className="flex gap-5 items-center text-sm">
          <div className="whitespace-nowrap rounded-full bg-[#9147ff] px-2.5 text-[#fff] py-0.5">
            {post.Categories?.map((category) => (
              <Link
                className="md:whitespace-nowrap rounded-full font-normal  "
                key={category.id}
                href={`/[cSlug]`}
                as={`/${category.cSlug}`}
              >
                {category.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1   font-normal ">
            <p className=" ">
              <time dateTime={post.date}>
                {isMoreThanADay ? date.format("MMM D yy") : date.fromNow()}
              </time>
            </p>
          </div>
        </div>
      </div>
      <Link href={`/post/${post.slug}`} className="group  ">
        <Image
          src="https://i.postimg.cc/C5rqnSYp/6206720.jpg"
          width={352}
          height={235}
          alt="Picture of the author"
          className="lg:max-h-[235px] max-h-full  lg:w-[352px] object-cover sm:h-80 lg:h-[235px]   "
          priority={true}
          as="image"
        />
      </Link>
    </div>
  );
};

export default Card;
