"use client"
import Image from 'next/image'
import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
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

const aboutus = () => {

    useEffect(() => {
        AOS.init({ duration: 1000,  once: false, mirror: true,anchorPlacement: 'top-bottom',  });
      }, []);
      
      
  return (
    <div>
        <section className='w-full flex my-4 scroll-smooth flex-col h-screen items-center justify-center rounded-3xl text-white bg-red-400 z-10 relative  right-0 top-0'>
            <div data-aos="zoom-in-up" className='mx-auto max-lg:w-2/3 lg:w-1/2   '>
                <h1 className='text-5xl py-4 font-extrabold'>Who Are We?</h1>
                <p className='text-lg font-thin'>
                We’re the fun side of the internet. Imagine a place where memes, anime, gaming, tech, and random trivia all collide—and somehow, it works! We’re here to make your day a little brighter, your knowledge a little weirder, and your procrastination a lot more entertaining.
                </p>
            </div>
            

        </section>
        <section className='bg-white my-4 text-red-400 rounded-3xl h-screen  flex flex-row justify-center items-center '>
            <div className='lg:w-1/2 max-lg:w-2/3 mx-auto'>
                <h1 data-aos="fade-up" className=' text-5xl py-4 font-extrabold'>What Do We Do?</h1>
                <p data-aos="fade-up" className='text-lg font-thin'>
                    We’re the fun side of the internet. Imagine a place where memes, anime, gaming, tech, and random trivia all collide—and somehow, it works! We’re here to make your day a little brighter, your knowledge a little weirder, and your procrastination a lot more entertaining.
                </p>
            </div>
            
        </section>
        <section className='bg-red-400 text-white rounded-3xl h-[100px] my-4 flex flex-row justify-center items-center '>
            <h1 data-aos="fade-up" className='col-span-4 font-extrabold row-span-1 text-3xl text-center'>What’s on the Menu?</h1>
   
        </section>

        <section className='bg-white p-6 w-full my-4 grid grid-cols-4  h-screen overflow-hidden overscroll-y-auto  z-10 gap-2 rounded-3xl '>
            
            <div data-aos="fade-up" className="relative bg-red-400 rounded-3xl row-span-2 col-span-2  bg-[url('/asset/entertainment.jpg')] bg-cover bg-top  ">
                <h1 className=' bg-black text-white w-fit px-4 text-2xl lg:text-3xl absolute bottom-5 right-5 rounded-2xl'>Entertainment</h1>

            </div>
            <div data-aos="fade-up" className="relative rounded-3xl  bg-[url('/asset/anime.jpg')] bg-cover bg-center">
                <h1 className=' bg-black text-white w-fit px-4 text-xl lg:text-3xl absolute bottom-5 right-5 rounded-2xl'>Anime</h1>

            </div>
            <div data-aos="fade-up" className="relative rounded-3xl  bg-[url('/asset/games.jpg')] bg-cover bg-center">
                <h1 className=" bg-black text-white w-fit px-4 text-xl lg:text-3xl absolute bottom-5 right-5 rounded-2xl">Gaming</h1>

                
            </div>
            
            <div data-aos="fade-up"  className="relative rounded-3xl max-lg:col-span-2 lg:row-span-2 bg-[url('/asset/trivia.jpg')] bg-cover bg-center">
                <h1 className=" bg-black text-white w-fit px-4 text-xl lg:text-3xl absolute bottom-5 right-5 rounded-2xl">Trivia</h1>

                
            </div>
            <div data-aos="fade-up" className="relative rounded-3xl max-lg:col-span-2 max-lg:row-span-2 lg:row-span-2 bg-[url('/asset/tech.jpg')] bg-cover bg-top ">
                <h1 className=" bg-black text-white w-fit px-4 text-xl lg:text-3xl absolute bottom-5 right-5 rounded-2xl">Tech</h1>

                
            </div>
            <div data-aos="fade-up"  className="relative rounded-3xl max-lg:col-span-2 max-lg:row-span-2max-lg:col-span-2 max-lg:row-span-2 bg-[url('/asset/memes.jpg')] bg-cover bg-center">
                <h1 className=" bg-black text-white w-fit px-4 text-xl lg:text-3xl absolute bottom-5 right-5 rounded-2xl">Memes</h1>

                
            </div> 
            <div data-aos="fade-up"  className="relative bg-red-400 p-2 text-white flex flex-col max-lg:col-span-4 justify-center items-center rounded-3xl  ">
                <h1 className="  text-4xl font-extrabold">Why We Do It?</h1>
                <p data-aos="fade-up" className='text-lg py-2 font-thin'>
                Well, we don't know why  HAHA  !
                </p>
                
            </div>
            
        </section>
        <section className='bg-white text-red-400 rounded-3xl h-screen flex flex-col justify-center items-center  my-4'>
            <div className='lg:w-1/2 max-lg:w-2/3 mx-auto'>
                <h1 data-aos="fade-up" className=' text-5xl font-extrabold'>Just Kidding &#128517; We Do It Because !</h1> 
                <p data-aos="fade-up" className='text-lg py-2 font-thin'>
                    life’s better when you’re laughing, learning, and leveling up. We’re passionate about creating a space where people can geek out, share what they love, and never take things too seriously. Plus, who doesn’t want a daily dose of memes?

                </p>
            </div>
            
        </section>

        <section className='  text-black rounded-3xl my-2 h-screen flex flex-col justify-center items-center '>
            -<div className='h-full mx-auto grid grid-cols-2 gap-2  '>
                <div className='bg-white  h-full p-4  flex flex-col justify-center items-center rounded-3xl max-lg:col-span-2 row-span-2 place-items-start'>
                    <h1 data-aos="fade-up" className=' text-5xl font-extrabold'>Join the Fun</h1> 
                    <p data-aos="fade-up" className='text-lg p-4 font-thin'>
                        We’re not just a website—we’re a community. Drop us a comment, follow us on social media, or share your favorite meme. Come hang out, laugh, and learn a thing or two (or ten).
                    </p>
                </div>
                

                <div className='bg-white h-full p-4 flex flex-col justify-center items-center rounded-3xl place-items-start         '>
                    <h1 data-aos="fade-up" className=' text-3xl font-extrabold '>Stay in Touch</h1> 
                    <p  data-aos="fade-up" className='text-lg p-4 font-thin'>
                        Got questions? Want to collab? Or just want to send us a funny cat pic? Hit us up at contact@yourwebsite.com.
                    </p>
                </div>
                <div className='bg-white h-full p-4  flex flex-col justify-center items-center rounded-3xl place-items-start'>
                    <h1 data-aos="fade-up" className=' text-3xl font-extrabold '>Follow us</h1> 
                    <div>
                        <ul data-aos="fade-up" className="py-4 flex text-2xl flex-wrap items-center justify-center  gap-x-6 gap-4">
                                <FaSquareFacebook href="" className="hover:text-black text-4xl" />
                                <FaSquareInstagram href="" className="hover:text-black text-4xl" />
                                <FaSquareWhatsapp href="" className="hover:text-black text-4xl" />
                                <FaSquareXTwitter href="" className="hover:text-black text-4xl" />
                                <FaSquareThreads href="" className="hover:text-black text-4xl" />
                                <FaSquarePinterest href="" className="hover:text-black text-4xl" />
                                <FaSquareYoutube href="" className="hover:text-black text-4xl" />
                                <FaTiktok href="" className="hover:text-black text-4xl" />
                        </ul>
                    </div>
                    
                </div>
                
            </div>
            
        </section>
        <section className=' my-4 bg-white p-4 rounded-3xl min-h-[200px] flex flex-col justify-center items-center '>
            <h1 data-aos="fade-up" className='text-black text-2xl font-extrabold'>That’s it. Simple, fun, and ready for you to dive in!</h1>
            {/* <button data-aos="fade-up" className='bg-blue-900 my-6  text-black rounded-full text-2xl px-4 py-2  hover:transition hover:duration-700 hover:ease-in-out'>Discover !</button> */}
        </section>
    </div>
  )
}

export default aboutus