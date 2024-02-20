import { createContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({children}) => {
    const [courses, setCourse] = useState([]);
    const addCourse = (course) => {
        setCourse(course);
    }
    return (
        <CourseContext.Provider value={{ courses, addCourse }}>
            {children}
        </CourseContext.Provider>
    )
}

export default CourseContext;