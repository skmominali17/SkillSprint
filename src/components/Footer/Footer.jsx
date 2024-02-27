import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaHome, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-center text-neutral-600 bg-gray-900 dark:text-neutral-200 lg:text-left text-sm">
      <hr className="opacity-60 w-full border-1" />
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        {/* <!-- Social network icons container --> */}
        <div className="flex justify-center">
          <a href="https://www.facebook.com/profile.php?id=100068173236127" className="mr-6 text-neutral-600 dark:text-neutral-200">
          <FaFacebookF />
          </a>
          <a href="https://twitter.com/SKMOMINALI20" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaTwitter />
          </a>
          <a href="www.linkedin.com/in/skmominali17" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaLinkedin />
          </a>
          <a href="https://github.com/skmominali17" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <FaGithub />
          </a>
        </div>
      </div>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="flex justify-around flex-wrap gap-10">
          <div className="">
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-3 h-4 w-4"
              >
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              SkillSprint
            </h6>
            <p>
            SkillSprint is an innovative educational platform that empowers users to freely access and share a wide range of courses, fostering a community of lifelong learners.
            </p>
          </div>

          {/* <!-- Contact section --> */}
          <div className="">
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <FaHome className="mr-4 text-xl"/>
              Kolkata, India
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <FaMailBulk className="mr-4 text-xl"/>
              info@example.com
            </p>
          </div>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
        <span>© 2024 Copyright:</span>
        <a
          className="font-semibold text-neutral-600 dark:text-neutral-400"
          href="#"
        >
          SkillSprint
        </a>
      </div>
    </footer>
  );
};

export default Footer;
