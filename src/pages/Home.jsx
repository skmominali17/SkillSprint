import React, { useContext, useEffect } from "react";
import Navbar from "../components/Header/Navbar";
import { FaSearch } from "react-icons/fa";
import SearchContext from "../contexts/SearchContext";
import { databases } from "../appwrite/Connection";
import AuthContext from "../contexts/AuthContext";

function Home() {
  const { searched } = useContext(SearchContext);
  const { isLoggedIn } = useContext(AuthContext);
  
  if (isLoggedIn) {
    useEffect(() => {
      const fetchDocuments = async () => {
        try {
          const documents = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_USERS_COLLECTION_ID);
          console.log("fetchedDocuments ---->",documents);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchDocuments();
    }, []);
  }
  
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {/* Hero Image Section */}
      <section className="relative h-screen w-screen bg-slate-500 flex justify-center">
        <div className="relative h-2/3 w-1/2 mt-8 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hero-image"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-12 left-12 text-white flex items-center bg-blue-500 rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white focus:outline-none text-lg"
              onInput={(e) => searched(e)}
            />
            <button>
              <FaSearch className="text-2xl mx-3 text-white" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
