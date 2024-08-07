"use client"

import React, { useEffect, useState } from 'react'
import DynamicLink from '../../MultiUse/DynamicLink'
import { FaXmark ,FaPlus } from "react-icons/fa6";
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const Menu =  ( {Categories} ) => {
    const [size, setSize] = useState(4);
    const [open , setOpen ] = useState(false)
    const [scrollDirection, setScrollDirection] = useState('scroll-up');
    const [addClass, setAddClass] = useState('left-3/4 border-b-2');
    const [SearchInput,setSearchInput] =useState('')
    const router =useRouter()
    
    const handleOpen =()=>{
        setOpen(!open)
    }
    const handleClick = () => {
      setSize(prev => prev + Categories.length);
    }
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
                setAddClass('bg-red-900 w-3/4 rounded-2xl h-[55px] border-0 mx-auto');
            } else {
                setAddClass('left-3/4 border-b-2');
            }

            if (currentScroll > 0 && currentScroll > lastScroll) {
                setScrollDirection('scroll-down');
            } else {
                setScrollDirection('scroll-up');
            }

            lastScroll = currentScroll;
        };

        const handleBodyOverflow = () => {
            document.body.style.overflow = open ? "hidden" : "";
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleBodyOverflow);

        handleBodyOverflow();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleBodyOverflow);
            document.body.style.overflow = "";
        };
    }, [open]);
    

    const headerStyles = {
    transform: scrollDirection === 'scroll-down' ? 'translate3d(0, -200%, 0)' : 'none',
    transition: 'transform 0.3s ease-out, filter 0.3s ease-out',
    };

      
    const NavMenu = Categories.slice(0,size).map( (c,i) =>{

        return(

            <div key={i }>
                <DynamicLink   path={c.cSlug}>
                    {c.title}
                </DynamicLink>  
            </div>
        )
    })

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
            <div
                className={`fixed top-0 text-[28px] h-screen bg-red-500 right-0 w-[20%] transform transition-transform duration-500 ${
                    open ? 'translate-x-0 ease-in duration-300 ' : 'translate-x-full'
                }`}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className='flex items-center my-4'>
                    <form onSubmit={handleSubmit} className='w-full flex items-center'>
                        <input
                            type='text'
                            placeholder='Search'
                            value={SearchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className='text-black w-[80%] mx-auto'
                        />
                    </form>
                    <button onClick={handleOpen} className='relative px-2 text-[35px]'>
                        <FaXmark />
                    </button>
                </div>
                
                {Categories.map((c, i) => (
                    <div key={i}>
                        <DynamicLink handleClick={handleOpen} path={c.cSlug}>
                            {c.title}
                        </DynamicLink>
                    </div>
                ))}
            </div>
        );
    };
    
    

  return (
    <>
        <div style={headerStyles}  className={`flex sticky top-4 items-center px-2 mt-4  z-50  w-3/4 text-[28px] ${scrollDirection} ${addClass} justify-between `}>
            <Link href="/"><h1 className=' ' > logo</h1></Link>
            <div className='flex space-x-3  capitalize items-center  right-0  '>
                {NavMenu} 
                <button className='flex items-center hover:bg-gray-500/40 px-2 hover:rounded-lg' onClick={handleOpen}> 
                  <h1>More</h1><FaPlus />
                </button>
                
            </div>
        </div>
        <>
            {MenuOpened()}
        </>
    </>
  )
}

export default Menu
