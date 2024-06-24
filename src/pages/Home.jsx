import React, { useContext, useEffect } from "react";
import Navbar from "../components/Header/Navbar";
import { FaSearch } from "react-icons/fa";
import SearchContext from "../contexts/SearchContext";
import { databases, storage } from "../appwrite/Connection";
import AuthContext from "../contexts/AuthContext";
import CourseCategory from "../components/CourseCategory";
import FeaturedCourses from "../components/FeaturedCourses";
import Mobile from "../assests/images/Mobile.png";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchDocuments = async () => {
        try {
          const documents = await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_USERS_COLLECTION_ID
          );
          const image = storage.getFilePreview(
            import.meta.env.VITE_BUCKET_PROFILE_IMAGES_ID,
            "65c8782e758ff0af154e"
          );
        } catch (error) {
          console.log(error);
        }
      };

      fetchDocuments();
    }
  }, [isLoggedIn]);

  return (
    <div className="w-screen">
      <div className="container mx-auto flex justify-around items-center">
        <div className="sm:h-[70vh]">
          <img
            src={Mobile}
            alt="mobile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-white flex items-center">
          <div className="font-semibold uppercase lg:text-7xl hidden lg:block">
            <span className="text-green-400">learn</span> what <br />
            matters
          </div>
        </div>
      </div>
      <div className="mt-2">
        <CourseCategory />
      </div>
      {isLoggedIn && (
        <div className="mt-8">
          <FeaturedCourses />
        </div>
      )}
    </div>
  );
}

export default Home;

// <div className="container mx-auto">
//   <section className="relative flex justify-center sm:hidden">
//     <div className="relative h-2/3 w-3/5 my-8 rounded-xl overflow-hidden">
//       <img
//         src="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="hero-image"
//         className="h-full w-full object-cover"
//       />
//       <div className="absolute top-64 right-28 text-white flex flex-col items-center rounded-lg">
//         <div className="font-semibold mb-4 uppercase text-6xl">
//           <span className="text-green-400">learn</span> what <br />
//           matters
//         </div>
//       </div>
//     </div>
//   </section>
//   <div className="mt-2">
//     <CourseCategory />
//   </div>
//   {isLoggedIn && (
//     <div className="mt-8">
//       <FeaturedCourses />
//     </div>
//   )}
// </div>
