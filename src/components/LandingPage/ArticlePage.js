'use client'

import Image from 'next/image';
import React, { useEffect } from 'react'
import parse from 'html-react-parser';
import moment from 'moment';
import { FaFacebook , FaInstagram , FaSquareFacebook, FaSquareInstagram, FaSquarePinterest, FaSquareThreads, FaSquareWhatsapp, FaSquareXTwitter, FaSquareYoutube, FaTiktok, FaX} from 'react-icons/fa6';
import Link from 'next/link';
// import { marked } from 'marked';

// // Function to convert Markdown to HTML
// const convertMarkdownToHTML = (markdown) => {
//   return marked(markdown);
// };

// // Component to render Markdown content
// const MarkdownRenderer = ({ markdown }) => {
//   const htmlContent = convertMarkdownToHTML(markdown);

//   return (
//     <div
//       className="markdown-content "
//       dangerouslySetInnerHTML={{ __html: htmlContent }}
//     />
//   );
// };


const ArticlePage = ({detail, relatedPosts, currentUrl}) => {
 
 
  const date = moment(detail.date);
  const isMoreThanADay = moment().diff(date, 'days') >= 1;

  useEffect(() => {
    const adjustIframes = () => {
      const iframes = document.querySelectorAll('iframe.ql-video');
      iframes.forEach((iframe) => {
        const aspectRatio = 9 / 16; // 16:9 aspect ratio for videos
        const width = iframe.clientWidth;
        iframe.style.height = `${width * aspectRatio}px`;
      });
    };

    // Adjust on initial load
    adjustIframes();

    // Adjust on window resize
    window.addEventListener('resize', adjustIframes);

    // Optional: Observe changes in the DOM (e.g., if Quill adds new content)
    const observer = new MutationObserver(adjustIframes);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', adjustIframes);
      observer.disconnect();
    };
  }, []);


    console.log('posts',detail)

    const Article = () => {


        const Detail = detail.map((item, index) => {
            console.log("cat",item )
 
            const date = moment(item.date);
            const isMoreThanADay = moment().diff(date, 'days') >= 1;
          

          return (
           <div className=' '>
                <>
                  <span className='  lg:flex items-center  my-10 '  >
                  <h1 className='lg:w-[75%] mx-auto m-4 text-5xl font-[900]  overflow-hidden  first-line:tracking-widest'>{item.title}</h1>
                    <span className='lg:w-[20%] text-start  items-center   '>
                      <h4>post created by platform staff&nbsp;&nbsp;&nbsp;</h4> 
                      <time dateTime={item.date}>
                        {isMoreThanADay ? date.format('MMM D YYYY , hh:mm A ') : date.fromNow()}
                      </time>
                      <span className=' text-xl flex max-md:text-3xl space-x-2 my-2 '>
                        <FaSquareFacebook />
                        <FaSquareInstagram />
                        <FaSquareWhatsapp />
                        <FaSquareXTwitter />
                        <FaSquareThreads />
                        <FaSquarePinterest />
                        <FaSquareYoutube/>
                        <FaTiktok/>
                      </span>
                    </span>
                   

                    </span>
                  <Image
                      src="https://cdn.pixabay.com/photo/2024/08/29/13/09/pineapple-9006965_640.jpg"
                      width={1000} /* Set a width that ensures full width */
                      height={500} /* Set a proportional height (you can adjust this) */
                      alt="Picture of the author"
                      className="rounded-lg  a mx-auto object-cover w-full  md:h-[550px]  " /* Add w-full to make it full width */
                      priority={true}
                  />
                  <h4 className='text-center my-2'>&nbsp;&nbsp;&nbsp; picture credit by {item.imgAuthor}</h4>


                </>
                <div className="flex my-10 flex-col  md:flex-row  md:space-x-4">
                  {/* {item.Categories.map((c)=>{ return <div key={index}>{c.title}</div>})} */}    


                  <div className="markdown-content lg:w-[60%] mx-auto  first-letter:text-5xl text-[22px] space-y-10  first-line:tracking-widest mt-10 ">
                    {   parse(item.content)}
                  </div>
                  <div className='lg:w-[30%] lg:text-center'>
                    <h1>hello</h1>

                  </div>

                </div>
            </div>

          );
        });

        return Detail

      };

    const Related = () => {


        const Post = relatedPosts.map((item, index) => {
           


          return (
           <div className='flex py-5  items-center space-x-2    '>
              <Image
                      src="https://cdn.pixabay.com/photo/2024/08/29/13/09/pineapple-9006965_640.jpg"
                      width={1000} /* Set a width that ensures full width */
                      height={500} /* Set a proportional height (you can adjust this) */
                      alt="Picture of the author"
                      className="rounded-lg object-cover max-md:w-[25%]  md:w-[20%] lg:w-[15%] h-ful  " /* Add w-full to make it full width */
                      priority={true}
              />
              <Link href={item.slug} className='text-2xl  hover:underline underline-offset-8 '>{item.title}</Link>
              
            </div>

          );
        });

        return Post

      };





  return (
    <>
      <article><Article/></article>
      <h2 className='text-4xl'>related Posts</h2>

      <div className='divide-y-2 '>
        <Related/>
      </div>
    
    </>
  )
}

export default ArticlePage