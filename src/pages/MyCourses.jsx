import React, { useContext } from "react";
import CourseContext from "../contexts/CourseContext";
import AuthContext from "../contexts/AuthContext";
import RenderAllCourses from "../components/RenderAllCourses";

const MyCourses = () => {
  const { courses } = useContext(CourseContext);
  const { user } = useContext(AuthContext);
  // This filter out the user courses from the courses context
  const userCourses = courses.filter((course) =>
    user.courses.includes(course.courseId)
  );
  console.log("userCourses=>", userCourses);
  return (
    <div>
      <RenderAllCourses courses={userCourses} />
    </div>
  );
};

export default MyCourses;
