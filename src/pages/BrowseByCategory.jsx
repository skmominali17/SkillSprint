import React, { useContext } from "react";
import CourseContext from "../contexts/CourseContext";
import { useParams } from "react-router-dom";
import RenderAllCourses from "../components/RenderAllCourses";

const BrowseByCategory = () => {
  const { courses } = useContext(CourseContext);
  const params = useParams();
  console.log(params.category);
  const categoryCourses = courses.filter(
    (course) => course.category === params.category
  );
  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl text-white">Category: <span className="text-green-400">{params.category}</span></h1>
      <RenderAllCourses courses={categoryCourses} />
    </div>
  );
};

export default BrowseByCategory;
