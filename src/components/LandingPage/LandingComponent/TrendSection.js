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
    return (
      <div key={index} className="card my-2 max-sm:w-full ">
        <div className="bar">{index + 1}</div>
        <div className="card_form">
          {" "}
          <Link href={`/post/${item.Slug}`} className=" ">
            <Image
              src="https://i.postimg.cc/C5rqnSYp/6206720.jpg"
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
                  <Link
                    className="whitespace-nowrap rounded-lg bg-[#9147ff] px-2.5 text-[#fff] py-[0,5px] mt-3  "
                    href={item.cSlug}
                  >
                    {item.cTitle}
                  </Link>
                </label>
                <label className="side front  ">
                  {" "}
                  <Link className="  flex capitalize" href={item.cSlug}>
                    <h4> By Staff at&nbsp; </h4>
                    <time dateTime={item.date}>
                      {isMoreThanADay
                        ? date.tz('Europe/Berlin').format('ha z')
                        : date.fromNow()}
                    </time>
                  </Link>
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
      <ol>
        <h1 className="text-2xl">Top Post on {data[0]?.cTitle}  </h1>
        {Trend}
      </ol>
    </div>
  );
};

export default TrendSect