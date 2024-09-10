"use client";

import React, { useEffect, useState } from "react";
import DynamicLink from "../../MultiUse/DynamicLink";
import { FaXmark, FaPlus } from "react-icons/fa6";
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

const Menu = ({ Categories }) => {
  const [size, setSize] = useState(4);
  const [open, setOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("scroll-up");
  const [addclassName, setAddclassName] = useState("left-3/4 border-b-2");
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
        setAddclassName("bg-red-900 w-3/4 rounded-2xl h-[55px] border-0 mx-auto");
      } else {
        setAddclassName("left-3/4 border-b-2");
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
    }, [open]);

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
          className={`fixed top-0 text-[28px] 	h-screen bg-red-500 right-0 w-[30%] z-50 transform transition-transform duration-500 ${
            open ? "translate-x-0 ease-in duration-300 " : "translate-x-full"
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="flex items-center my-4">
            <form onSubmit={handleSubmit} className="w-full flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={SearchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="text-black w-[80%] mx-auto"
              />
            </form>
            <button onClick={handleOpen} className="relative px-2 text-[35px]">
              <FaXmark />
            </button>
          </div>
          <div className="m-10 w-[80%] mx-auto ">
            {Categories.map((c, i) => (
              <>
                <div
                  className=" font-extrabold p-4 hover:backdrop-opacity-10 hover:backdrop-invert  "
                  key={i}
                >
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
                        <div className="my-2 hover:underline">
                          <Link
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
              </>
            ))}
          </div>
          <span className="flex text-4xl space-x-2 my-2 w-[80%] mx-auto justify-center  ">
            <FaSquareFacebook hre className="hover:text-black" />
            <FaSquareInstagram hre className="hover:text-black" />
            <FaSquareWhatsapp hre className="hover:text-black" />
            <FaSquareXTwitter hre className="hover:text-black" />
            <FaSquareThreads hre className="hover:text-black" />
            <FaSquarePinterest hre className="hover:text-black" />
            <FaSquareYoutube hre className="hover:text-black" />
            <FaTiktok hre className="hover:text-black" />
          </span>
        </div>

        <div onClick={handleOpen} className="  h-screen fixed top-0 z-50 left-0 w-[70%]"></div>
      </div>
    );
  };

  return (
    <>
      <div
        style={headerStyles}
        className={`flex sticky top-4 items-center px-2 mt-4  z-50  w-3/4 text-[28px] ${scrollDirection} ${addclassName} justify-between `}
      >
        <Link href="/">
          <h1 className=" "> logo</h1>
        </Link>
        <div className="flex space-x-3  capitalize items-center  right-0  ">
          {NavMenu}
          <button
            className="flex items-center hover:bg-gray-500/40 px-2 hover:rounded-lg"
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
