import React, { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";
import CourseContext from "../contexts/CourseContext";
import AuthContext from "../contexts/AuthContext";
import { storage, databases } from "../appwrite/Connection";
import { Query } from "appwrite";
import Profile from "../assests/images/Design.jpg";
import { useParams } from "react-router-dom";

// this function is extracts the videoID from youtube link
function extractVideoId(url) {
  const videoIdRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/  ]{11})/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : null;
}

const CourseRender = () => {
  const params = useParams();
  const { courses } = useContext(CourseContext);
  const { user } = useContext(AuthContext);

  const [thumbnail, setThumbnail] = useState(null);
  const [creator, setCreator] = useState();
  const [loading, setLoading] = useState(false);
  const [activeLectureIndex, setActiveLectureIndex] = useState(null);

  // this courseID will come from the url params
  const courseID = params.id.replace(":", "");

  // filtering the current course with the help of courseID
  const currCourse = courses.find((course) => course.courseId === courseID);

  // acquiring the thumbnailID from currCourse
  const thumbnailID = currCourse.thumbnailID;

  useEffect(() => {
    // finding neccesary details such as thumbnail and creator of the course
    const getDetails = async () => {
      // fetching the thumbnail from thumnailID
      const thumbnail = storage.getFilePreview(
        import.meta.env.VITE_BUCKET_THUMBNAILS_ID,
        thumbnailID
      );

      // Finding the creator of the course
      const creatorDetails = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID,
        [Query.equal("userID", currCourse.userID)]
      );
      setCreator(creatorDetails.documents[0]);
      setThumbnail(thumbnail);
    };

    getDetails();
  }, [currCourse]);

  const videoOptions = {
    playerVars: {
      autoplay: 0,
    },
    width: "100%",
    height: "610",
  };

  return (
    <div className="w-screen bg-gray-900 py-3">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mx-auto w-full h-2/3 overflow-hidden rounded-lg">
          {activeLectureIndex !== null ? (
            // Render YouTube video for the active lecture
            <YouTube
              videoId={extractVideoId(
                currCourse.lectureLinks[activeLectureIndex]
              )}
              opts={videoOptions}
            />
          ) : (
            // Render thumbnail if no lecture is active
            <img
              src={thumbnail}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {activeLectureIndex === null ? (
          <div className="w-full pt-10 pb-6 text-white">
            <div className="flex items-center w-full gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={Profile}
                  alt="profileImage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-2xl">
                  Course Created By:{" "}
                  <span className="text-green-400 font-medium">
                    {creator?.fullName}
                  </span>
                </p>
                <p className="text-3xl mt-4 mb-2">{currCourse.title}</p>
                <p className="text-md">{currCourse.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full pt-10 pb-6 text-white">
            <p className="text-3xl mb-2">Lecture {activeLectureIndex + 1}</p>
            <p className="text-md">
              {currCourse.lectureTitles[activeLectureIndex]}
            </p>
          </div>
        )}

        <div className="text-white w-full pb-14">
          {currCourse.lectureTitles.map((title, index) => (
            <div
              key={index}
              className="flex items-center w-full gap-4 cursor-pointer"
              onClick={() => setActiveLectureIndex(index)}
            >
              <span className="text-lg">{index + 1}.</span>
              <div className="flex items-center w-full h-10 mb-2 rounded-md bg-gray-700">
                <span className="mx-4">{title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRender;
