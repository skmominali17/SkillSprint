import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { account, databases } from "../appwrite/Connection.js";
import AuthContext from "../contexts/AuthContext";
import { Query } from "appwrite";
import CourseContext from "../contexts/CourseContext.jsx";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const { login } = React.useContext(AuthContext);
  const { addCourse } = useContext(CourseContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      // This section creates a email session for the user to verify their email address
      const response = await account.createEmailSession(
        data.email,
        data.password
      );

      // This section get the current logged in user details majorly for its user's Document ID
      const currUser = await account.get();
      console.log("currrUser----------->", currUser.$id);
      // Here we are using the above document ID to fetch the document of the current user
      const document = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID,
        [Query.equal("userID", currUser.$id)]
      );
      if (response) {
        // add the user Details to authContext mainly for userType and userID
        login(document.documents[0]);
        // This section add the courses in courseContext
        const promise = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_COURSES_COLLECTION_ID,
        );
        addCourse(promise.documents);
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert(error.message);
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOAuth2Authentication = async () => {
    console.log("google clicked");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://img.freepik.com/free-vector/people-with-technology-devices_52683-34717.jpg?w=1380&t=st=1707297093~exp=1707297693~hmac=9381db8881c82c7453af033cc56148024da37d2aa7477464abe1cc9ccfedbc14"
              className="w-mx-auto rounded-md"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full flex-1 mt-4">
              <div className="mx-auto w-full">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600"
                >
                  <button
                    className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 w-full mt-1 items-center justify-center"
                    onClick={handleOAuth2Authentication}
                  >
                    <img
                      className="w-6 h-6"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Sign in with Google</span>
                  </button>
                  <p className="text-center mt-1 mb-3">Or</p>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="mb-2 block w-full px-4 py-2 border rounded-md bg-gray-600 text-gray-300 focus:border-gray-500 focus:outline-none"
                  />
                  <div className="relative mb-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                      })}
                      className="mb-2 block w-full px-4 py-2 border rounded-md bg-gray-600 text-gray-300 focus:border-gray-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 mt-3 mr-4"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="tracking-wide font-semibold bg-green-400 text-gray-900 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" disabled={loading}
                  >
                    {loading ? <FaSpinner className="animate-spin"/> : "Sign in"}
                  </button>
                </form>
                <p className="mt-4 text-xs text-gray-400 text-center">
                  I agree to abide by SkillSprint{" "}
                  <Link
                    to="#"
                    className="border-b border-gray-500 border-dotted text-blue-500"
                  >
                    Terms of Service{" "}
                  </Link>
                  and its{" "}
                  <Link
                    to="#"
                    className="border-b border-gray-500 border-dotted text-blue-500"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-10 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-400 underline">
                Register here
              </Link>
            </div>
          </div>
        </div>
        <div className="items-center flex-1 bg-green-100 text-center lg:flex rounded-md">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img
              src="https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg?w=740&t=st=1707296852~exp=1707297452~hmac=9db8a5c3a7dee0fbb5f27efc3845f7b29c59ad45fe8bfecd3b15ebcc1705e68c"
              alt="png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
