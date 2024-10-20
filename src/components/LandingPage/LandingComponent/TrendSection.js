import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const TrendSect = ({ data, index }) => {
  const neomorphismStyle = {
    backgroundColor: `#FED15B`, // Set your desired background color
    border: `1px solid #FFFFFC`,
    padding: `10px`,
    borderRadius: "8px", // Adjust the border radius as needed
    boxShadow: `6px 6px 0px 0px #2660A4`, // Neomorphic box shadow
  };

  // <li className="px-5 h-full font-[700] py-[10px] flex text-[#FFFFFC] gap-5 items-center">
  //       <span className='rounded-full h-[25px] w-[25px] flex items-center text-center max-lg:text-[12px] p-2 bg-[#2660A4]'></span>
  //       <Link href={`/post/${item.Slug}`} className="">
  //         <h1 className="lg:py-1 hover:underline underline-offset-4 decoration-[2px]">{item.Title}</h1>
  //       </Link>
  //     </li>

  const Trend = data.map((item, index) => {
    const date = moment(item.date);
    const isMoreThanADay = moment().diff(date, "days") >= 1;
    const imageUrl = item.image?.url || "https://cdn.pixabay.com/photo/2022/12/26/13/50/flower-7679117_1280.jpg";

    return (
      <div key={index} className="card  bg-white dark:bg-[#242824]  my-2  max-lg:w-full ">
        <div className="bar text-white bg-red-400">{index + 1}</div>
        <div className="card_form">
          {" "}
          <Link href={`/post/${item.Slug}`} className=" ">
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              alt="Picture of the author"
              className="  h-full object-cover  "
              priority={true}
              as="image"
            />
          </Link>{" "}
        </div>
        <div className="card_data">
          <div className="data">
            <div className="text">
              <Link
                href={`/post/${item.Slug}`}
                className="hover:underline underline-offset-2 line-clamp-2"
              >
                <h1 className="text_m">{item.Title}</h1>
              </Link>
              <div className="cube text_s">
                <label className="side top  mt-1">
                  {" "}
                  {item.cSlug &&<Link
                    className="whitespace-nowrap rounded-lg bg-[#9147ff] px-2.5 text-[#fff] py-[0,5px] mt-3  "
                    href={item.cSlug}
                  >
                    {item.cTitle}
                  </Link>}
                </label>
                <label className="side front  ">
                  {" "}
                    <p> By Staff at&nbsp; </p>
                    <time className="" dateTime={item.date}>
                      {isMoreThanADay
                        ? date.tz('Europe/Berlin').format('ha yy z')
                        : date.fromNow()}
                    </time>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div key={index} className="bg-gradient-to-t  w-full h-full ">
        <h1 className="text-2xl">Top Post </h1>
        {Trend}
    </div>
  );
};

export default TrendSect