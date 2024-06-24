import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import { account } from "../../appwrite/Connection";
import { IoMdAdd } from "react-icons/io";
import { CiUser, CiBookmark, CiCompass1 } from "react-icons/ci";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";

function Navbar() {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [searched, setSearched] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = () => {
    if (searched.length > 0) navigate("/search/" + searched);
    setSearched("");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full p-2 border-b-2 border-slate-700">
      <div className="flex flex-wrap items-center justify-between mx-auto px-8 py-4 w-full ">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={closeMobileMenu}
        >
          <span className="self-center antialiased text-3xl font-semibold whitespace-nowrap dark:text-white">
            Skill<span className="text-green-400">Sprint</span>
          </span>
        </NavLink>
        <div className="flex md:order-2">
          <div className="relative hidden md:block">
            <input
              type="text"
              className="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              onInput={(e) => setSearched(e.target.value.toLowerCase())}
              value={searched}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FaSearch />
            </button>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-500 dark:text-gray-400 rounded-lg text-sm p-2.5 ml-1 transition-transform duration-300 ease-in-out"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-search"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:gap-24 md:items-center md:flex-row md:mt-0 md:border-0 transition ease-out">
            <li className="md:hidden">
              <div className="relative mb-4">
                <input
                  type="text"
                  className="block w-full p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search..."
                  onInput={(e) => setSearched(e.target.value.toLowerCase())}
                  value={searched}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <FaSearch />
                </button>
              </div>
            </li>
            {isMobileMenuOpen && (
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded dark:hover:text-black md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center justify-center p-2 bg-gray-300 hover:bg-green-500 rounded-full gap-4">
                    <IoHomeOutline className="text-2xl" />
                    {isMobileMenuOpen && "Home"}
                  </div>
                </Link>
              </li>
            )}
            {isLoggedIn && user.userType === "teacher" && (
              <li>
                <Link
                  to="/create/course"
                  className="block py-2 px-3 text-gray-900 rounded dark:hover:text-black md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent"
                  onClick={closeMobileMenu}
                >
                  <div className="flex items-center justify-center p-2 bg-gray-300 hover:bg-green-500 rounded-full gap-4">
                    <IoMdAdd className="text-2xl" />{" "}
                    {isMobileMenuOpen && "Add Course"}
                  </div>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/explore-courses"
                className="block py-2 px-3 text-gray-900 rounded dark:hover:text-black md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center justify-center p-2 bg-gray-300 hover:bg-green-500 rounded-full gap-4">
                  <CiCompass1 className="text-2xl" />{" "}
                  {isMobileMenuOpen && "Explore"}
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/my-courses"
                className="block py-2 px-3 text-gray-900 rounded dark:hover:text-black md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center justify-center p-2 bg-gray-300 hover:bg-green-500 rounded-full gap-4">
                  <CiBookmark className="text-2xl" />{" "}
                  {isMobileMenuOpen && "My Courses"}
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block py-2 px-3 text-gray-900 rounded dark:hover:text-black md:hover:bg-transparent md:p-0 md:dark:hover:bg-transparent mb-4 md:mb-0"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center justify-center p-2 bg-gray-300 hover:bg-green-500 rounded-full gap-4">
                  <CiUser className="text-2xl" />{" "}
                  {isMobileMenuOpen && "Profile"}
                </div>
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  className="flex w-full justify-center px-4 py-2 rounded-xl bg-green-400 text-gray-900 focus:outline-none text-md tracking-wide hover:bg-green-500"
                  onClick={logoutHandler}
                >
                  <div className="flex items-center gap-2">
                    <AiOutlineLogout />
                    Logout
                  </div>
                </button>
              ) : (
                <NavLink to="/login">
                  <button className="flex justify-center px-4 py-2 w-full rounded-lg bg-green-400 text-gray-900 focus:outline-none text-md tracking-wide hover:bg-green-500">
                    <div className="flex items-center gap-2">
                      <AiOutlineLogin />
                      Login
                    </div>
                  </button>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
