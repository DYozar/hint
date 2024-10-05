"use client";

import React, { useEffect, useState } from "react";
import DynamicLink from "../../MultiUse/DynamicLink";
import {
  FaXmark,
  FaPlus,
  FaDiscord,
  FaTwitch,
  FaReddit
} from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquarePinterest,
  FaSquareThreads,
  FaSquareWhatsapp,
  FaSquareXTwitter,
  FaSquareYoutube,
  FaTiktok,
  FaX
} from "react-icons/fa6";
import Image from "next/image";

const Menu = ({ Categories }) => {
  const [size, setSize] = useState(4);
  const [open, setOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("scroll-up");
  const [addclassName, setAddclassName] = useState(
    "left-3/4 border-b-2 w-full lg:w-2/4"
  );
  const [ScrollHidden, setScrollHidden] = useState();
  const [SearchInput, setSearchInput] = useState("");
  const router = useRouter();

  const [clickedIndex, setClickedIndex] = useState(null); // State to track the clicked index

  const handleIsClick = (index) => {
    setClickedIndex(index === clickedIndex ? null : index); // Toggle the clicked index
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setSize((prev) => prev + Categories.length);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);

    const searchUrl = `/searching/${SearchInput}`;

    try {
      // Redirect to the dynamic search results page with the SearchInput as the slug
      router.push(searchUrl);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 20) {
        setAddclassName(
          "bg-black dark:bg-white font-semibold w-fit text-white dark:text-black rounded-full h-[55px] border-0 left-[90%]"
        );
        setScrollHidden("hidden");
      } else {
        setAddclassName("left-3/4 border-b-2 w-full lg:w-2/4");
        setScrollHidden();
      }

      if (currentScroll > 0 && currentScroll > lastScroll) {
        setScrollDirection("scroll-down");
      } else {
        setScrollDirection("scroll-up");
      }

      lastScroll = currentScroll;
    };

    const handleBodyOverflow = () => {
      document.body.style.overflow = open ? "hidden" : "";
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleBodyOverflow);

    handleBodyOverflow();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleBodyOverflow);
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerStyles = {
    transform:
      scrollDirection === "scroll-down" ? "translate3d(0, -200%, 0)" : "none",
    transition: "transform 0.3s ease-out, filter 0.3s ease-out"
  };

  const NavMenu = Categories.slice(0, size).map((c, i) => {
    return (
      <div key={i}>
        <DynamicLink path={c.cSlug}>{c.title}</DynamicLink>
      </div>
    );
  });

  const MenuOpened = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if (open) {
        setIsAnimating(true);
      }
    }, []);

    const handleTransitionEnd = () => {
      if (!open) {
        setIsAnimating(false);
      }
    };

    if (!open && !isAnimating) {
      return null;
    }

    return (
      <div className=" absolute top-0 w-full flex h-screen z-50 ">
        <div
          className={`fixed top-0 text-[28px]  text-white	h-screen bg-red-400 right-0 w-full lg:w-[30%] z-50 transform transition-transform duration-500 ${
            open ? "translate-x-0 ease-in duration-300 " : "translate-x-full"
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="flex items-center mx-10 my-5">
            <form
              onSubmit={handleSubmit}
              className=" w-full text-lg forms text-black"
            >
              <label htmlFor="text">
                <input
                  className=" text-md"
                  required=""
                  value={SearchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="search your post and insert at least 3 words"
                  id="search"
                  type="text"
                />
                <div className="icon">
                  <svg
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="swap-on"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <svg
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="swap-off"
                  >
                    <path
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </div>
              </label>
            </form>
            <button onClick={handleOpen} className="relative px-2 text-[35px]">
              <FaXmark />
            </button>
          </div>
          <div className="m-10 w-[80%] mx-auto ">
            {Categories.map((c, i) => (
              <div key={i}>
                <div className=" font-extrabold p-4 hover:bg-black/5 " key={i}>
                  <span
                    className="flex items-center cursor-pointer 	 justify-between "
                    onClick={() => handleIsClick(i)}
                  >
                    <h1> {c.title}</h1>
                    <h1>{clickedIndex === i ? "-" : "+"}</h1>
                  </span>
                </div>

                {clickedIndex === i && (
                  <div className="">
                    <h1 className="text-2xl ml-10 font-bold">
                      <Link
                        onClick={() => (handleIsClick(i), handleOpen())}
                        className="hover:underline"
                        href={c.cSlug}
                      >
                        all {c.title}
                      </Link>
                      {c.SubCategories?.map((s, is) => (
                        <div key={is} className="my-2 hover:underline">
                          <Link
                          key={is}
                            onClick={() => (handleIsClick(i), handleOpen())}
                            href={`http://localhost:3000/${c.cSlug}?subcategory=${s.sSlug}`}
                          >
                            {s.title}
                          </Link>
                        </div>
                      ))}
                    </h1>
                  </div>
                )}
              </div>
            ))}
          </div>
          <span className="flex text-4xl space-x-2 my-2  justify-center  ">
            {/* <FaSquareFacebook href="" className="hover:text-black" /> */}
            <Link  href="https://www.instagram.com/nuttyn00k/">
              <FaSquareInstagram
               
                className="hover:text-black"
              />
            </Link>
            <Link  href="https://whatsapp.com/channel/0029VarUc3yJf05UTjrEaY2P">
              <FaSquareWhatsapp
               
                className="hover:text-black"
              />
            </Link>
            {/* 
            <FaSquareXTwitter href="pinterest.com/NuttyNook/" className="hover:text-black" /> */}
            {/* 
            <FaSquareThreads href="" className="hover:text-black" /> */}
            <Link  href="pinterest.com/NuttyNook/">
              <FaSquarePinterest
               
                className="hover:text-black"
              />
            </Link>
            <Link   href="https://www.youtube.com/@nuttynookhub">
              <FaSquareYoutube
              
                className="hover:text-black"
              />
            </Link>
            <Link href="https://www.tiktok.com/@nuttyn00k">
              <FaTiktok
                
                className="hover:text-black"
              />
            </Link>
            <Link href="https://discord.gg/cmqVuVqq">
              <FaDiscord
                
                className="hover:text-black"
              />
            </Link>

            <Link href="https://www.twitch.tv/nuttyn00k">
              <FaTwitch className="hover:text-black" />
            </Link>

            <Link href="https://www.reddit.com/user/nuttyn00k/">
              <FaReddit className="hover:text-black" />
            </Link>
          </span>
          <ul className="flex gap-x-6 gap-y-2 flex-wrap w-[80%] mx-auto">
            <li>
              <Link href="" className=" hover:text-gray-300 text-base">
                about us
              </Link>
            </li>
            <li>
              <Link href="" className=" hover:text-gray-300 text-base">
                Privacy notice
              </Link>
            </li>
            <li>
              <Link href="" className=" hover:text-gray-300 text-base">
                cookie policy
              </Link>
            </li>
            <li>
              <Link href="" className=" hover:text-gray-300 text-base">
                Contact
              </Link>
            </li>
            {/* <li><Link href="" className=" hover:text-gray-300 text-base">advertise with us</Link></li> */}
            {/* <li><Link href="" className=" hover:text-gray-300 text-base">send us tips </Link></li>
            <li><Link href="" className=" hover:text-gray-300 text-base">Share Your Story </Link></li> */}
          </ul>
        </div>

        <div
          onClick={handleOpen}
          className="  h-screen fixed top-0 z-50 left-0 w-[70%]"
        ></div>
      </div>
    );
  };

  return (
    <>
      <div
        style={headerStyles}
        className={`flex sticky top-4 items-center p-2 mt-4  border-black dark:border-white  z-50  text-[28px] ${scrollDirection} ${addclassName} justify-between `}
      >
        <Link href="/">
          <h1 className={`${ScrollHidden}`}> <Image  width={1150} height={1150} className="w-[60%] lg:w-[50%]  h-full" src={'/asset/g4.png'}/></h1>
        </Link>
        <div className="flex space-x-3 font-semibold capitalize items-center  right-0  ">
          <div className={`max-lg:hidden flex space-x-3 ${ScrollHidden} `}>
            {NavMenu}
          </div>
          <button
            className="flex items-center hover:bg-gray-500/40 px-2 hover:rounded-full"
            onClick={handleOpen}
          >
            <h1>More</h1>
            <FaPlus />
          </button>
        </div>
      </div>
      <>{MenuOpened()}</>
    </>
  );
};

export default Menu;
