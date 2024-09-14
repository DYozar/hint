import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-5xl my-6">Cookie Policy</h1>

      <h3 className="text-3xl py-4">1. What Are Cookies?</h3>
      <p className="text-lg ">
        Cookies are tiny text files that are placed on your device (like a
        computer or phone) when you visit our website. They help us remember
        things about your visit, like your preferences, and make the site work
        more smoothly for you.
      </p>

      <h3 className="text-3xl py-4">2. How We Use Cookies</h3>
      <p className="text-lg ">We use cookies to:</p>
      <ul>
        <li>
          <strong>Remember your preferences</strong>: So you don’t have to
          re-select things like language or login information every time you
          visit.
        </li>
        <li>
          <strong>Understand how you use our site</strong>: Cookies help us
          figure out which pages you visit, how long you stay, and what you
          click on, so we can improve our content.
        </li>
        <li>
          <strong>Show relevant ads</strong>: Cookies may also be used to serve
          ads that are relevant to your interests.
        </li>
      </ul>

      <h3 className="text-3xl py-4">3. Types of Cookies We Use</h3>
      <p className="text-lg ">We use the following types of cookies:</p>
      <ul>
        <li>
          <strong>Essential Cookies</strong>: These are necessary for the
          website to function properly. Without these, some parts of the site
          won’t work.
        </li>
        <li>
          <strong>Analytics Cookies</strong>: These help us understand how
          visitors use the site so we can improve performance and content.
        </li>
        <li>
          <strong>Advertising Cookies</strong>: These are used to show you
          relevant ads based on your interests.
        </li>
      </ul>

      <h3 className="text-3xl py-4">4. Third-Party Cookies</h3>
      <p className="text-lg ">
        Sometimes, we use third-party cookies from services like Google
        Analytics or social media platforms. These cookies help us track website
        usage or show you ads across the web. We don’t control these cookies, so
        check their cookie policies for more details.
      </p>

      <h3 className="text-3xl py-4">5. How to Control Cookies</h3>
      <p className="text-lg ">
        You can control or delete cookies through your browser settings. Here’s
        how:
      </p>
      <ul>
        <li>
          <strong>Opt-out</strong>: You can usually turn off cookies by
          adjusting your browser settings. However, this might affect your
          experience on our site (some parts might not work).
        </li>
        <li>
          <strong>Clear Cookies</strong>: You can also clear your cookies
          anytime through your browser settings.
        </li>
      </ul>

      <h3 className="text-3xl py-4">6. Updates to This Cookie Policy</h3>
      <p className="text-lg ">
        We may update this policy from time to time, so check back occasionally.
        We’ll notify you if we make any big changes.
      </p>

      <h3 className="text-3xl py-4">7. Contact Us</h3>
      <p className="text-lg ">
        Got questions about cookies? Feel free to reach out to us at{" "}
        <Link className="text-red-400" href="mailto:contact@yourwebsite.com">contact@yourwebsite.com</Link>.
      </p>
    </div>
  );
};

export default page;
