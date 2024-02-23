import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storage } from "../appwrite/Connection";

const RenderAllCourses = ({ courses }) => {
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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {courses.map((course, index) => (
                    // here according to the userType we will conditionally render the route for students it will be /watch/... and for teachers it will be /edit/...
                    <Link to={`/watch/course/:${course.courseId}`} key={index} className="block">
                        <div className="flex flex-col p-5 text-white rounded-lg ">
                            <div className="h-36 w-full overflow-hidden rounded-lg">
                                <img
                                    src={thumbnails[index]}
                                    alt={`thumbnail ${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-lg mt-2 font-medium">{course.title}</h3>
                            <p className="text-sm text-gray-400">{course.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RenderAllCourses;