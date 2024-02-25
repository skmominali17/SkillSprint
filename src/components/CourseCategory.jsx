import React from "react";
import Business from "../assests/images/Business.jpg";
import Design from "../assests/images/Design.jpg";
import Photography from "../assests/images/Photography.jpg";
import Technology from "../assests/images/Technology.jpg";
import { Link } from "react-router-dom";

const CourseCategory = () => {
  const categories = [
    {
      id:  1,
      title: "Design",
      img: Design,
    },
    {
      id:  2,
      title: "Technology",
      img: Technology,
    },
    {
      id:  3,
      title: "Business",
      img: Business,
    },
    {
      id:  4,
      title: "Photography",
      img: Photography,
    },
  ];
  return (
    <div>
      <h3 className="text-2xl font-medium text-white underline text-center capitalize">Browse by category</h3>
      {/* Card component */}
      <div className="mx-auto container flex flex-wrap items-center justify-evenly mt-3">
        {categories.map((category) => (
          <Link to={`category/${category.title}`} key={category.id}>
            <div className="flex flex-col items-center p-5 text-white hover:text-black hover:bg-green-400 rounded-lg transition duration-300 ease-in-out">
              <div className="h-60 w-60 overflow-hidden rounded-lg">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-left text-lg mt-2 font-medium">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseCategory;
