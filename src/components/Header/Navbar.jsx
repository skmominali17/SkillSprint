import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import { account } from "../../appwrite/Connection";
import { IoMdAdd } from "react-icons/io";
import { CiUser, CiBookmark, CiCompass1 } from "react-icons/ci";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

function Navbar() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [searched, setSearched] = useState("");
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await account.deleteSession("current");
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-neutral-700 py-4">
      <nav className="container mx-auto sm:flex sm:justify-between sm:items-center">
        <div className="sm:flex sm:items-center sm:justify-between sm:w-[60%]">
          <div className="sm:ml-0 ml-5">
            <NavLink
              to="/"
              className="text-2xl tracking-wide font-semibold text-white"
            >
              Skill
              <span className="text-green-400 text-2xl tracking-wide font-semibold">
                Sprint
              </span>
            </NavLink>
          </div>
          <div className="sm:flex sm:justify-center sm:items-center ">
            <div className="bg-green-400 sm:flex flex sm:items-center items-center rounded-lg p-2 sm:justify-center m-5 sm:m-0">
              <input
                type="text"
                placeholder="Search..."
                className="w-[90%] px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg"
                onInput={(e) => setSearched(e.target.value.toLowerCase())}
                value={searched}
              />
              <button
                onClick={() => {
                  if (searched.length > 0) navigate("/search/:" + searched);
                  setSearched("");
                }}
              >
                <FaSearch className="text-2xl ml-3 text-black" />
              </button>
            </div>
          </div>
        </div>
        <div className="sm:flex sm:items-center sm:gap-10 sm:m-0 m-5 grid grid-cols-4 gap-4">
          {isLoggedIn && user.userType === "teacher" && (
            <Link to={"/create/course"}>
              <div className="p-2 bg-gray-300 hover:bg-green-500 rounded-full justify-center flex">
                <IoMdAdd className="text-2xl" />
              </div>
            </Link>
          )}
          <Link to={"/explore-courses"}>
            <div className="p-2 bg-gray-300 hover:bg-green-500 rounded-full justify-center flex">
              <CiCompass1 className="text-2xl" />
            </div>
          </Link>
          <Link to={"/my-courses"}>
            <div className="p-2 bg-gray-300 hover:bg-green-500 rounded-full justify-center flex">
              <CiBookmark className="text-2xl" />
            </div>
          </Link>
          <Link to={"/profile"}>
            <div className="p-2 bg-gray-300 hover:bg-green-500 rounded-full justify-center flex">
              <CiUser className="text-2xl" />
            </div>
          </Link>
          <div className="flex items-center">
            {isLoggedIn ? (
              <button
                className="px-4 py-2 rounded-xl bg-green-400 text-gray-900 focus:outline-none text-md tracking-wide hover:bg-green-500"
                onClick={logoutHandler}
              >
                <div className="flex items-center gap-2">
                  <AiOutlineLogout />
                  Logout
                </div>
              </button>
            ) : (
              <NavLink to="/login">
                <button className="px-4 py-2 rounded-lg bg-green-400 text-gray-900 focus:outline-none text-md tracking-wide hover:bg-green-500">
                  <div className="flex items-center gap-2">
                    <AiOutlineLogin />
                    Login
                  </div>
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
