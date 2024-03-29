import React, { useContext } from "react";
import CourseContext from "../contexts/CourseContext";
import RenderAllCourses from "./RenderAllCourses";

const FeaturedCourses = () => {
  const { courses } = useContext(CourseContext);
  const featuredCourses = courses.filter((course) => course.likes.length > 0);

  return (
    <div>
      {featuredCourses.length > 0 && (
        <div>
          <h3 className="text-2xl font-medium text-white underline text-center">
            Featured Courses
          </h3>
          <RenderAllCourses courses={featuredCourses} />
        </div>
      )}
    </div>
  );
};

export default FeaturedCourses;
