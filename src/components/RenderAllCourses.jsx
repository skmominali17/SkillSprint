import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { databases, storage } from "../appwrite/Connection";
import AuthContext from "../contexts/AuthContext";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { CiEdit, CiCompass1 } from "react-icons/ci";

const RenderAllCourses = ({ courses }) => {
  const { user, login } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [thumbnails, setThumbnails] = useState([]);
  useEffect(() => {
    const fetchThumbnails = async () => {
      const thumbnailsPromises = courses.map(async (course) => {
        const thumbnail = storage.getFilePreview(
          import.meta.env.VITE_BUCKET_THUMBNAILS_ID,
          course.thumbnailID
        );
        return thumbnail;
      });

      const thumbnailsData = await Promise.all(thumbnailsPromises);
      setThumbnails(thumbnailsData);
    };

    fetchThumbnails();
  }, [courses]);

  const EnrollHandeler = async (courseId) => {
    const update = await databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USERS_COLLECTION_ID,
      user.$id,
      {
        courses: [...user.courses, courseId],
      }
    );
    // Also updating the user context with latest course
    login(update);
  };

  const truncateTitle = (title) => {
    if (title.length > 30) {
      return title.substring(0, 30) + "...";
    }
    return title;
  };

  const className =
    pathname === "/"
      ? "container mx-auto px-4 py-6"
      : "container mx-auto px-4 py-6 h-screen";

  return (
    <div className={className}>
      {user.courses.length === 0 && pathname === "/my-courses" && (
        <div className="mt-10 flex flex-col items-center">
          <h1 className="text-4xl text-white text-center">
            You haven't enrolled in any courses yet...
          </h1>
          <Link to={"/explore-courses"}>
            <button className="mt-4 bg-green-400 hover:bg-green-500 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <CiCompass1 /> Explore Courses
              </div>
            </button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course, index) => (
          <Link
            to={`/watch/course/:${course.courseId}`}
            key={index}
            className="block"
          >
            <div className="flex flex-col p-5 text-white">
              <div className="h-36 w-full overflow-hidden rounded-lg">
                <img
                  src={thumbnails[index]}
                  alt={`thumbnail ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg mt-2 font-medium">
                    {truncateTitle(course.title)}
                  </h3>
                  <p className="text-sm text-gray-400">{course.category}</p>
                </div>
                {user.userType === "teacher"
                  ? pathname === "/my-courses" && (
                      <div>
                        <Link to={`/edit/course/:${course.courseId}`}>
                          <button className="p-2 bg-gray-300 text-black mt-3 rounded-full">
                            <div className="flex items-center gap-2">
                              <CiEdit className="text-lg" />
                            </div>
                          </button>
                        </Link>
                      </div>
                    )
                  : pathname !== "/my-courses" && (
                      <div>
                        {user.courses.includes(course.courseId) ? (
                          <div className="text-lg p-1 bg-green-500 mt-2 text-black font-semibold rounded-full">
                            <IoCheckmarkDoneCircleOutline />
                          </div>
                        ) : (
                          <button
                            className="text-sm py-1 px-2 bg-green-500 rounded-lg font-medium text-black mt-2"
                            onClick={() => {
                              EnrollHandeler(course.courseId);
                            }}
                          >
                            Enroll
                          </button>
                        )}
                      </div>
                    )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RenderAllCourses;
