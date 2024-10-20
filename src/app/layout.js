import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "./ApolloWrapper";
import Header from '../components/LandingPage/Header'
import Footer from '../components/LandingPage/Footer'
import { Roboto } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const roboto =({
  weight:['500'],
  style:['normal'],
  subsets:['latin'],
  display:'swap'
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  
};
// w-[95%] sm:w-[90%] md:w-3/4 lg:w-[80%] lg:max-w-[1500px] lg:min-w-[1000px]
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=5, user-scalable=yes"/>

      </head>
      <body className={roboto.className}>
        <div className="relative font-roboto capitalize w-[95%] sm:w-[90%] md:w-3/4 lg:w-[80%] lg:max-w-[1500px] lg:min-w-[1000px]  mx-auto">
          <Header/>
          <ApolloWrapper>{children}</ApolloWrapper>
          <Footer/>
      </div>
      </body>
      
    </html>
  );
}
