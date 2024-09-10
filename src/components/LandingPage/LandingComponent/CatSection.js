import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const CategorySect = ({ data, i }) => {
  // console.log("data", data.image[0]?.url);

  const CATEGORY = data.map((item, index) => {
    const date = moment(item.date);
    const isMoreThanADay = moment().diff(date, "days") >= 1;

    let content = (
      <div className={`cards id${i + 1} `}>
        <div className="image">
          <Image
            src="https://i.postimg.cc/C5rqnSYp/6206720.jpg"
            width={1000}
            height={1000}
            alt="Picture of the author"
            className="svg  h-full object-cover  "
            priority={true}
            as="image"
          />
        </div>
        <span className="title ">
          {" "}
          <h1 className=" ">
            <Link
              className="hover:underline underline-offset-4  font-bold tracking-tighter "
              href={`/post/${item.slug}`}
            >
              {item.title}
            </Link>{" "}
          </h1>
        </span>
        <p className="paragraph">
          by staff&nbsp;&nbsp;
          <time dateTime={item.date}>
            {isMoreThanADay
              ? date.tz("Europe/Berlin").format("ha z")
              : date.fromNow()}
          </time>
        </p>
      </div>
    );

    return (
      <div key={index} className={``}>
        {content}
      </div>
    );
  });

  return (
    <>
      {data[0].Categories?.map((c, is) => (
        <Link href={`http://localhost:3000/${c.cSlug}`}>see all {c.title}</Link>
      ))}
      <div className="z-0 mx-auto w-full lg:sticky top-0  grid grid-cols-2 gap-2 ">
        {" "}
        {CATEGORY}{" "}
      </div>
    </>
  );
};

export default CategorySect;
