import React, { useContext } from 'react'
import CourseContext from '../contexts/CourseContext'
import { useParams } from 'react-router-dom';
import RenderAllCourses from '../components/RenderAllCourses';

const Search = () => {
    const {courses} = useContext(CourseContext);
    const params = useParams();
    const searchedCourses = courses.filter((course) => course.title.includes(params.search.replace(":", "")));
  return (
    <div><RenderAllCourses courses={searchedCourses} /></div>
  )
}

export default Search