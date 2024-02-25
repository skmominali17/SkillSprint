import React, { useContext } from "react";
import RenderAllCourses from "../components/RenderAllCourses";
import CourseContext from "../contexts/CourseContext";

const ExploreCourses = () => {
  const { courses } = useContext(CourseContext);
  return (
    <div>
      <RenderAllCourses courses={courses} />
    </div>
  );
};

export default ExploreCourses;
