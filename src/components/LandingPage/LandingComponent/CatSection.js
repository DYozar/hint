import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const CategorySect = ({ data, i }) => {
  const CATEGORY = data.map((item, index) => {
    const date = moment(item.date);
    const isMoreThanADay = moment().diff(date, "days") >= 1;
    const imageUrl =item.image?.url || "/asset/postbanner.png";
    let content = (
      <div key={item.slug} className={` flex justify-normal my-4  w-full  `}>
        <Link href={`/post/${item?.slug}`} className="w-[40%] h-[100px]">
          {item.image?.url && ( // Conditionally render the Image component
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              alt={item?.title || "Picture"}
              className=" w-full h-full  object-cover"
              priority={true}
              as="image"
            />
          )}
        </Link>

        <span className=" text-left w-[60%] mx-2">
          <h1>
            <Link
              className="hover:underline underline-offset-4   line-clamp-3 font-bold tracking-tighter"
              href={`/post/${item?.slug}`}
            >
              {item?.title}
            </Link>
          </h1>
          {/* <p className=" text-sm font-thin text-white">
            by staff&nbsp;&nbsp;
            <time dateTime={item?.date}>
              {isMoreThanADay
                ? date.tz("Europe/Berlin").format("ha z")
                : date.fromNow()}
            </time>
          </p> */}
        </span>
      </div>
    );

    return (
      <div key={index} className={`w-full`}>
        {content}
      </div>
    );
  });

  return (
    <>
      {data[0].Categories?.map((c, is) => (
        <Link key={c.cSlug} href={`https://nuttynook.com/${c.cSlug}`}>
          see all {c.title}
        </Link>
      ))}
      <div className="z-0  lg:sticky top-0 ">{CATEGORY}</div>
    </>
  );
};

export default CategorySect;
