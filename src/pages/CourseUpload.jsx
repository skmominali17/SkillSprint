import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { databases, storage } from "../appwrite/Connection";
import { FaSpinner } from "react-icons/fa";
import { Query } from "appwrite";
import AuthContext from "../contexts/AuthContext";
import CourseContext from "../contexts/CourseContext";

const CourseUpload = () => {
  // All Contexts
  const { addCourse, courses } = useContext(CourseContext);
  const { user, login } = useContext(AuthContext);
  console.log("All Courses: ", courses);
  console.log("User: ", user);
  const { register, handleSubmit } = useForm();
  const [lectureLinks, setLectureLinks] = useState([""]);
  const [lectureTitles, setLectureTitles] = useState([""]);
  const [loading, setLoading] = useState(false);
  const categories = ["Design", "Technology", "Business", "Photography"];

  const handleAddLecture = () => {
    setLectureTitles([...lectureTitles, ""]);
    setLectureLinks([...lectureLinks, ""]);
  };

  const handleRemoveLecture = (index) => {
    const updatedTitles = [...lectureTitles];
    updatedTitles.splice(index, 1);
    setLectureTitles(updatedTitles);

    const updatedLinks = [...lectureLinks];
    updatedLinks.splice(index, 1);
    setLectureLinks(updatedLinks);
  };

  const submitHandler = async (data) => {
    //necessary condition for submitting course
    if (
      data.title.length === 0 &&
      data.description.length === 0 &&
      data.category.length === 0 &&
      data.thumbnail === null
    ) {
      alert("Please fill title, description, and category in all fields");
      return;
    } else {
      try {
        if (user) {
          setLoading(true);
          // This section uploads the thumbnail in the database
          const thumbnail = await storage.createFile(
            import.meta.env.VITE_BUCKET_THUMBNAILS_ID,
            crypto.randomUUID(),
            document.getElementById("uploader").files[0]
          );
          const courseId = crypto.randomUUID();
          // This section creates the course in the database
          const promise = await databases.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COURSES_COLLECTION_ID,
            crypto.randomUUID(),
            {
              title: data.title,
              description: data.description,
              category: data.category,
              lectureLinks: lectureLinks,
              lectureTitles: lectureTitles,
              userID: user.userID,
              thumbnailID: thumbnail.$id,
              courseId: courseId,
            }
          );
          if (promise) {
            setLoading(false);
            // we are updating the course array of user by adding the courseID
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
            // This section add the courses in courseContext
            const promise = await databases.listDocuments(
              import.meta.env.VITE_DATABASE_ID,
              import.meta.env.VITE_COURSES_COLLECTION_ID
            );
            addCourse(promise.documents);
            alert("Course uploaded successfully");
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="container mx-auto py-8 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-6 w-full">
          <h2 className="text-3xl font-medium text-white mb-4">
            Add A New Course
          </h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <input
              type="text"
              placeholder="Course Title"
              {...register("title")}
              className="mb-4 block w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg"
            />
            <input
              type="text"
              placeholder="Course Description"
              {...register("description")}
              className="mb-4 block w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg"
            />
            <select
              {...register("category")}
              className="mb-4 block w-full px-5 py-3 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Lectures</h3>
              {lectureTitles.map((title, index) => (
                <div key={index} className="flex mb-4">
                  <div className="flex flex-col w-full gap-2">
                    <input
                      type="text"
                      placeholder={`Lecture ${index + 1} Title`}
                      value={title}
                      onChange={(e) => {
                        const newTitles = [...lectureTitles];
                        newTitles[index] = e.target.value;
                        setLectureTitles(newTitles);
                      }}
                      required
                      className="flex-1 px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg mr-2"
                    />
                    <input
                      type="text"
                      placeholder={`Lecture ${index + 1} YouTube Link`}
                      value={lectureLinks[index]}
                      onChange={(e) => {
                        const newLinks = [...lectureLinks];
                        newLinks[index] = e.target.value;
                        setLectureLinks(newLinks);
                      }}
                      required
                      className="flex-1 px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg mr-2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLecture(index)}
                    className="bg-red-500 text-white text-3xl font-medium p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <CiCircleRemove />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddLecture}
                className="bg-green-400 text-black text-3xl p-2 font-medium rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <IoIosAddCircleOutline />
              </button>
            </div>
            <div className="mt-4">
              <label htmlFor="thumbnail" className="text-white font-medium">
                Upload Thumbnail:{" "}
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("thumbnail")}
                className="mb-4 block w-full p-2 rounded-lg bg-zinc-700 text-white focus:outline-none"
                id="uploader"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-green-400 text-black font-medium px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={loading}
              >
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseUpload;
