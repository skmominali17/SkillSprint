import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { FaSearch } from "react-icons/fa";
import SearchContext from "../../contexts/SearchContext";
import { account } from "../../appwrite/Connection";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { searched, search } = useContext(SearchContext);
  console.log(search);

  const logoutHandler = async () => {
    try {
      const response = await account.deleteSession("current");
      console.log(response);
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-zinc-800 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <NavLink
            to="/"
            className="text-2xl tracking-wide font-semibold text-white"
          >
            Logo
          </NavLink>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/4 px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg"
            onInput={(e) => searched(e)}
          />
          <button>
            <FaSearch className="text-2xl ml-3 text-white" />
          </button>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <button
              className="px-4 py-2 rounded-xl bg-green-400 text-gray-900 focus:outline-none text-sm tracking-wide font-semibold"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button className="px-4 py-2 rounded-lg bg-green-400 text-gray-900 focus:outline-none text-sm tracking-wide font-semibold">
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
