import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
import ProfilePic from "../../assets/profile.png";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5006"; 

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    joined: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleEdit = () => setIsEditing(!isEditing);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <FiArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src={ProfilePic}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-400 mb-4"
        />
        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-400">Cell Number: {user.role}</p>
        <p className="text-sm text-gray-400 mb-4">Email: {user.joined}</p>

        <button
          onClick={handleEdit}
          className="mt-4 flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <FiEdit2 />
          {isEditing ? "Stop Editing" : "Edit Profile"}
        </button>

        {isEditing && (
          <form className="mt-6 space-y-3 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
                <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cell Number
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
