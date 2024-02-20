import React, { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";
import CourseContext from "../contexts/CourseContext";
import AuthContext from "../contexts/AuthContext";
import { storage, databases } from "../appwrite/Connection";
import { Query } from "appwrite";
import Profile from "../assests/images/Design.jpg";

// this function is extracts the videoID from youtube link
function extractVideoId(url) {
  const videoIdRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/  ]{11})/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : null;
}

const CourseRender = () => {
  const { courses } = useContext(CourseContext);
  const { user } = useContext(AuthContext);

  const [thumnail, setThumbnail] = useState(null);
  const [creator, setCreator] = useState();
  const [loading, setLoading] = useState(false);

  // this courseID will come from the url params
  const courseID = "b5d0634f-828b-418f-afc2-0ef4777a89ae";

  // filtering the current course with the help of courseID
  const currCourse = courses.filter((course) => course.courseId === courseID);
  console.log("currCourse", currCourse[0].lectures);

  // acquiring the thumbnailID from currCourse
  const thumbnailID = currCourse[0].thumbnailID;

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
        [Query.equal("userID", user.userID)]
      );
      // console.log("creatorDetails", creatorDetails.documents[0]);
      setCreator(creatorDetails.documents[0]);
      setThumbnail(thumbnail);
    };

    getDetails();
    console.log("creator", creator);
  }, []);
  // This section will be used in different component
  // const videoId = extractVideoId(
  //   "https://youtu.be/dx4m_2xiNWU?si=PXcPPCW_C9wRjX8f"
  // );
  // const videoOptions = {
  //   playerVars: {
  //     autoplay: 0,
  //   },
  //   width: "100%",
  //   height: "610",
  // };
  return (
    <div className="w-screen bg-gray-900 py-3">
      <div className="container mx-auto flex flex-col items-center">
        <div className="mx-auto w-full h-2/3 overflow-hidden rounded-lg">
          {/* <YouTube videoId={videoId} opts={videoOptions} /> */}
          <img
            src={thumnail}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full pt-10 pb-6 text-white">
          <div className="flex items-center w-full gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={Profile}
                alt="profileImage"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-2xl">
              Course Created By:{" "}
              <span className="text-green-400 font-medium">
                {/* {creator.fullName} */} Momin
              </span>
            </p>
          </div>
          <p className="text-3xl mt-4 mb-2">{currCourse[0].title}</p>
          <p className="text-md">{currCourse[0].description}</p>
        </div>
        <div className="text-white w-full pb-14">
          {currCourse[0].lectures.map((lecture, index) => (
            <div key={index} className="flex items-center w-full gap-4">
              <span className="text-lg">{index + 1}.</span>
              <div className="flex items-center w-full h-10 mb-2 rounded-md bg-gray-700">
                <span className="mx-4">{lecture}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRender;
