import React from "react";
import Business from "../assests/images/Business.jpg";
import Design from "../assests/images/Design.jpg";
import Photography from "../assests/images/Photography.jpg";
import Technology from "../assests/images/Technology.jpg";
import { Link } from "react-router-dom";

const FeaturedCourses = () => {
  const categories = [
    {
      id: 1,
      title: "Complete Desiging",
      creator: "Momin",
      length: "1hr 30min",
      img: Design,
      link: "#",
    },
    {
      id: 2,
      title: "Complete Technology",
      img: Technology,
      creator: "Momin",
      length: "6hr 30min",
      link: "#",
    },
    {
      id: 3,
      title: "Complete Business",
      img: Business,
      creator: "Momin",
      length: "3hr 30min",
      link: "#",
    },
    {
      id: 4,
      title: "Complete Photography",
      img: Photography,
      creator: "Momin",
      length: "2hr 30min",
      link: "#",
    },
  ];
  return (
    <div >
      <h3 className="text-2xl font-medium text-white underline">Featured</h3>
      {/* Card component */}
      <div className="mx-auto container flex items-center justify-evenly mt-3">
        {categories.map((category) => (
          <Link to={`featured/:${category.id}`} key={category.id}>
            <div className="flex flex-col p-5 text-white rounded-lg ">
              <div className="h-36 w-60 overflow-hidden rounded-lg">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg mt-2 font-medium">
                {category.title}
              </h3>
              <p className="text-sm text-gray-400">{category.creator}</p>
              <p className="text-sm text-gray-400">{category.length}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;
