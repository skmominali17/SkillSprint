import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import { account } from "../../appwrite/Connection";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
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
      <nav className="container mx-auto flex justify-between items-center">
        <div>
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
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-green-400 w-[30%] flex items-center rounded-lg p-2 justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-[90%] px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg"
              onInput={(e) => setSearched(e.target.value)}
              value={searched}
            />
            <button
              onClick={() => {
                if (searched.length > 0)
                  navigate("/search/:" + searched);
                setSearched("");
              }}
            >
              <FaSearch className="text-2xl ml-3 text-black" />
            </button>
          </div>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <button
              className="px-4 py-2 rounded-xl bg-green-400 text-gray-900 focus:outline-none text-lg tracking-wide font-semibold hover:bg-green-500"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button className="px-4 py-2 rounded-lg bg-green-400 text-gray-900 focus:outline-none text-lg tracking-wide font-semibold  hover:bg-green-500">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
