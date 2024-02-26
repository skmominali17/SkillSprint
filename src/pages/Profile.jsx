import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import AuthContext from "../contexts/AuthContext";
import { storage, databases } from "../appwrite/Connection";
import ProfileImage from "../assests/images/profileImage.jpg"
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate()
  console.log("User", user);
  const [profileImage, setProfileImage] = useState(ProfileImage);
  const [name, setName] = useState(user.fullName);
  const [edited, setEdited] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      const profileImage = storage.getFilePreview(
        import.meta.env.VITE_BUCKET_PROFILE_IMAGES_ID,
        user.profileImageID[0],
      );
      setProfileImage(profileImage);
    };
    fetchProfile();
  }, [user, triggerUpdate]);

  const handleImageChange = async () => {
    const profile = await storage.createFile(
        import.meta.env.VITE_BUCKET_PROFILE_IMAGES_ID,
        crypto.randomUUID(),
        document.getElementById("uploader").files[0]
    );
    console.log("Profile Image", profile);
    
    const update = await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID,
        user.$id,
        {
          profileImageID: [profile.$id, ...user.profileImageID],
        }
    );
    login(update);
    setTriggerUpdate(!triggerUpdate);
  };

  const handleSave = async () => {
    const update = await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_USERS_COLLECTION_ID,
        user.$id,
        {
          fullName: name,
        }
    );
    login(update);
    alert("Changes will be applied in few seconds");
    setEdited(false);
    setTriggerUpdate(!triggerUpdate);
    navigate("/profile");
  }

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-gray-600 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-20">
                <div className="flex flex-col">
                  <div className="w-40 h-40 overflow-hidden rounded-full">
                    <img
                      src={profileImage}
                      alt="profile-picture"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {edited && (
                    <button className="bottom-0 right-0 mb-2 mr-2 bg-opacity-50">
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                        id="uploader"
                      />
                      <label htmlFor="uploader" className="flex items-center gap-2 justify-center text-white cursor-pointer mt-2">
                        <FaEdit className="text-white text-xl" />Choose Image
                      </label>
                    </button>
                  )}
                </div>
                {!edited ? (
                  <div className="flex flex-col text-white">
                    <span className="text-2xl font-bold">{user.fullName}</span>
                    <span className="text-md">I am a {user.userType}</span>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => {setName(e.target.value)}}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                )}
              </div>
              <div className="absolute top-0 right-0 mt-4 mr-4">
                {!edited ? (
                  <button
                    className="py-2 px-4 bg-green-400 text-black font-medium hover:bg-green-500 rounded-lg flex items-center"
                    onClick={() => setEdited(true)}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                ) : (
                  <button className="py-2 px-4 bg-green-400 text-black font-medium hover:bg-green-500 rounded-lg flex items-center" onClick={handleSave}>
                    <FaSave className="mr-2" /> Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
