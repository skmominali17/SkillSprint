import React, { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";
import CourseContext from "../contexts/CourseContext";
import AuthContext from "../contexts/AuthContext";
import { storage, databases } from "../appwrite/Connection";
import { Query } from "appwrite";
import { useParams } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Profile from "../assests/images/profileImage.jpg";
// this function is extracts the videoID from youtube link
function extractVideoId(url) {
  const videoIdRegex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/  ]{11})/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : null;
}

const CourseRender = () => {
  const params = useParams();
  const { courses, addCourse } = useContext(CourseContext);
  const { user } = useContext(AuthContext);

  const [thumbnail, setThumbnail] = useState(null);
  const [creator, setCreator] = useState();
  const [liked, setLiked] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [activeLectureIndex, setActiveLectureIndex] = useState(null);

  // this courseID will come from the url params
  const courseID = params.id.replace(":", "");

  // filtering the current course with the help of courseID
  const currCourse = courses.find((course) => course.courseId === courseID);
  // acquiring the thumbnailID from currCourse
  const thumbnailID = currCourse.thumbnailID;

  useEffect(() => {
    // Check if the user has already liked the course
    const hasLiked = currCourse.likes.includes(user.userID);
    // Update the liked state based on whether the user has liked the course
    setLiked(hasLiked);
   }, [currCourse, user.userID]);

  useEffect(() => {
    // finding neccesary details such as thumbnail and creator of the course
    const getDetails = async () => {
      // fetching the thumbnail from thumnailID
      const thumbnail = storage.getFilePreview(
        import.meta.env.VITE_BUCKET_THUMBNAILS_ID,
        thumbnailID
      );
      setThumbnail(thumbnail);

      // Finding the creator of the course
      const creatorDetails = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID,
        [Query.equal("userID", currCourse.userID)]
      );
      setCreator(creatorDetails.documents[0]);

      //finding the profile Image of the creator
      if (user.profileImageID.length > 0) {
        const profileImage = storage.getFilePreview(
          import.meta.env.VITE_BUCKET_PROFILE_IMAGES_ID,
          user.profileImageID[0]
        );
        setProfileImage(profileImage);
      } else {
        setProfileImage(Profile);
      }
    };

    getDetails();
  }, [currCourse, user, courses]);

  const videoOptions = {
    playerVars: {
      autoplay: 0,
    },
    height: "100%",
    width: "100%"
  };

  const likeHandler = async () => {
    const promise = await databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COURSES_COLLECTION_ID,
      currCourse.$id,
      {
        likes: [...currCourse.likes, user.userID],
      }
    );

    const update = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COURSES_COLLECTION_ID
    );
    addCourse(update.documents);
    setLiked(true);
  };

  const UnlikeHandler = async () => {
    const newLikes = currCourse.likes.filter((like) => like !== user.userID);
    const promise = await databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COURSES_COLLECTION_ID,
      currCourse.$id,
      {
        likes: newLikes,
      }
    );

    const update = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COURSES_COLLECTION_ID
    );
    addCourse(update.documents);
    setLiked(false);
  };

  return (
    <div className="w-screen bg-gray-900 py-3 px-3">
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-full overflow-hidden rounded-lg">
          {activeLectureIndex !== null ? (
            // Render YouTube video for the active lecture
            <YouTube
              videoId={extractVideoId(
                currCourse.lectureLinks[activeLectureIndex]
              )}
              opts={videoOptions}
              className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh]"
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
            <div className="w-full">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
                  <img
                    src={profileImage}
                    alt="profileImage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-lg sm:text-2xl">
                  Course Created By -{" "}
                  <span className="text-green-400 font-medium">
                    {creator?.fullName}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg sm:text-3xl mt-4 mb-2">{currCourse.title}</p>
                  {/* <p className="text-md">{currCourse.description}</p> */}
                </div>
                
                <div className="flex gap-2 items-center">
                <div className="text-black bg-gray-300 py-2 px-4 rounded-full">{currCourse?.likes.length}</div>
                  {!liked ? (
                    <button
                      className="flex items-center gap-2 bg-green-400 text-black px-2 py-1 rounded-lg"
                      onClick={likeHandler}
                    >
                      <AiOutlineLike />
                      Like
                    </button>
                  ) : (
                    <button
                      className="flex items-center gap-2 bg-green-400 text-black px-2 py-1 rounded-lg"
                      onClick={UnlikeHandler}
                    >
                      <AiOutlineDislike />
                      Unlike
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full pt-10 pb-6 text-white">
            <p className="text-lg mb-2">Lecture {activeLectureIndex + 1}</p>
            <p className="text-lg">
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
