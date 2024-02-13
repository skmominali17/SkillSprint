import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { account, databases } from "../appwrite/Connection.js";
import AuthContext from "../contexts/AuthContext";

const Register = () => {
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [userType, setUserType] = useState("learner");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    data.userType = userType;
    const currUserId = crypto.randomUUID();
    try {
      const response = await account.create(
        currUserId,
        data.email,
        data.password,
        data.fullName
      );
      if (response) {
        await account.createEmailSession(
          data.email,
          data.password
        );
        const document = await databases.createDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_USERS_COLLECTION_ID,
          crypto.randomUUID(),
          {
            userID: currUserId,
            mail: data.email,
            fullName: data.fullName,
            userType: data.userType,
          }
        );
        login(document);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
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
                  <div className="flex justify-center items-center mb-2">
                    <div className="text-lg mr-4">Register as:</div>
                    <div className="text-lg">
                      <input
                        type="radio"
                        id="learner"
                        name="userType"
                        value="learner"
                        checked={userType === "learner"}
                        onChange={handleUserTypeChange}
                        className="mr-2"
                      />
                      <label htmlFor="learner" className="mr-4">
                        Learner
                      </label>
                      <input
                        type="radio"
                        id="teacher"
                        name="userType"
                        value="teacher"
                        checked={userType === "teacher"}
                        onChange={handleUserTypeChange}
                        className="mr-2"
                      />
                      <label htmlFor="teacher">Teacher</label>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName", { required: true })}
                    className="mb-2 block w-full px-4 py-2 border rounded-md bg-gray-600 text-gray-300 focus:border-gray-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    })}
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
                  {errors.firstName?.type === "minLength" && (
                    <p role="alert">
                      Minimum Length Of The Password Should Be 8.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="tracking-wide font-semibold bg-green-400 text-gray-900 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    Register
                  </button>
                  <p className="text-center mt-2">Or</p>
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
                    <span>Continue with Google</span>
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-10 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 underline">
                Login here
              </Link>
            </div>
          </div>
        </div>
        <div className="items-center flex-1 bg-green-100 text-center lg:flex rounded-md">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img
              src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=1380&t=st=1707296811~exp=1707297411~hmac=4b4d8e435e0757cc58dafad8c7d25c46558759e063fee4180f2a1e0fc302ddbb"
              alt="png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
