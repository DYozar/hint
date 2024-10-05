import Link from 'next/link';
import React from 'react'
import {Social} from '../MultiUse/socialShare';
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
const Footer = () => {
  return (
    <footer className=" mt-10 border-t-[1px] border-[#9147ff]/30 py-8 px-8 font-sans tracking-wide">
    <div className="flex max-lg:flex-col items-center justify-between gap-6">

      <ul className="flex text-2xl flex-wrap items-center justify-center  gap-x-6 gap-4">
          <h1>Social :</h1>
            <Social/>
      </ul>

      <ul className="flex gap-x-6 gap-y-2 flex-wrap">
        <li><Link href="/about-us" className=" hover:text-gray-300 text-base">about us</Link></li>
        <li><Link href="/privacy-notice" className=" hover:text-gray-300 text-base">Privacy notice</Link></li>
        <li><Link href="/cookie-policy" className=" hover:text-gray-300 text-base">cookie policy</Link></li>
        <li><Link href="/contact" className=" hover:text-gray-300 text-base">Contact</Link></li>
        {/* <li><Link href="" className=" hover:text-gray-300 text-base">advertise with us</Link></li> */}
        {/* <li><Link href="" className=" hover:text-gray-300 text-base">send us tips </Link></li>
        <li><Link href="" className=" hover:text-gray-300 text-base">Share Your Story </Link></li> */}
      </ul>
    </div>
    <p className='text-base   text-center text-nowrap pt-2 max-lg:order-1'>© Company. All rights reserved.</p>

  </footer>
  )
}

export default Footer
