import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const CategorySect = ({ data, i }) => {
  const CATEGORY = data.map((item, index) => {
    const date = moment(item.date);
    const isMoreThanADay = moment().diff(date, "days") >= 1;
    const imageUrl = item.image?.url || "https://cdn.pixabay.com/photo/2022/12/26/13/50/flower-7679117_1280.jpg";
    let content = (
      <div key={item.slug} className={`cards w-full id${i + 1} `}>
        <Link
              href={`/post/${item?.slug}`}
              className="image w-fit"
            >
          {item.image?.url && ( // Conditionally render the Image component
            <Image
              src={item.image.url}
              width={1000}
              height={1000}
              alt={item?.title || "Picture"}
              className="svg h-full object-cover"
              priority={true}
              as="image"
            />
          )}
           </Link>
        <span className="title">
          <h1>
            <Link
              className="hover:underline underline-offset-4   line-clamp-3 font-bold tracking-tighter"
              href={`/post/${item?.slug}`}
            >
              {item?.title}
            </Link>
          </h1>
        </span>
        <p className="paragraph text-sm font-thin text-white">
          by staff&nbsp;&nbsp;
          <time dateTime={item?.date}>
            {isMoreThanADay
              ? date.tz("Europe/Berlin").format("ha z")
              : date.fromNow()}
          </time>
        </p>
      </div>
    );

    return <div key={index} className={``}>{content}</div>;
  });

  return (
    <>
      {data[0].Categories?.map((c, is) => (
        <Link key={c.cSlug} href={`https://nuttynook.com/${c.cSlug}`}>
          see all {c.title}
        </Link>
      ))}
      <div className="z-0 mx-auto w-full lg:sticky top-0 grid grid-cols-2 gap-2">
        {CATEGORY}
      </div>
    </>
  );
};

export default CategorySect;
