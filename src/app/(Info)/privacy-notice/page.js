import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <section>
        <h1 className="text-5xl my-6">Privacy Notice</h1>
        <h3 className="text-3xl py-4">  1. Who We Are:</h3>
        <p className="text-lg">
          {" "}
          We’re the team behind <span className="text-red-400">[Your Website Name]</span>, your go-to spot for memes,
          anime, gaming, tech, and more. We’re committed to protecting your
          privacy while you enjoy all the awesome content we have to offer.
        </p>
        <h3 className="text-3xl py-4">2. What Information We Collect:</h3>
        <p className="text-lg font-bold">
          When you visit our site, we may collect: 
        </p>

        <p className="text-lg ">
          <strong>- Personal Info: </strong> If you sign up, comment, or contact us, we may ask for things like your name,
          email, or username. 
          
        </p>
        <p className="text-lg ">
        <strong>- Browsing Data: </strong> We collect basic info like
          what pages you visit and how long you stay. This helps us improve the
          site and keep things running smoothly (thanks cookies! 🍪).
        </p> 
        <h3 className="text-3xl py-4">  3. How We Use Your Info :</h3>
        <p className="text-lg">
          <strong>We promise not to spam you. We only use your info for:</strong>
          <br/> - Making sure
          the site works well and looks awesome for you.
          <br/> - Sending you updates
          if you’ve signed up for our newsletter (which you can unsubscribe from
          anytime).
          <br/> - Responding to your questions or feedback.
        </p>

        <h3 className="text-3xl py-4"> 4. Sharing Your Info:</h3>
        <p className="text-lg">
          We don’t sell your info. Ever. The only time we might share your data
          is with trusted partners who help us run the site (like analytics
          tools), and they’re sworn to secrecy, too.
        </p>

        <h3 className="text-3xl py-4"> 5. Your Privacy Rights:</h3>
        <p className="text-lg">
          You’re the boss of your data. You can: - Ask us what info we have on
          you. - Request that we delete your info. - Unsubscribe from
          newsletters or emails whenever you want.
        </p>

        <h3 className="text-3xl py-4"> 6. How to Contact Us:</h3>
        <p className="text-lg">
          {" "}
          If you’ve got any questions, concerns, or want to know more about your
          data, shoot us an email at 
          <Link className=" text-red-400" href={'mailto:contact@yourwebsite.com'} >&nbsp;contact@yourwebsite.com</Link>
        </p>
      </section>
    </div>
  );
};

export default page;
