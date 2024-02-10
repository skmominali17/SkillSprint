import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { account } from "../appwrite/Connection.js"
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const { login } = React.useContext(AuthContext);
  const [userType, setUserType] = useState("learner");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    data.userType = userType;
    console.log(data);
    try {
      const response = await account.createEmailSession(
        data.email,
        data.password,
      );
      console.log(response);
      if (response) {
        login(response);
      }
      navigate("/");
    } catch (error) {
      alert(error.message);
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
                    <div className="text-lg mr-4">Login as:</div>
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
                    className="tracking-wide font-semibold bg-green-400 text-gray-900 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    Sign In
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
                    <span>Sign in with Google</span>
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
