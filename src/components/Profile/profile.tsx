import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
import ProfilePic from "../../assets/profile.png";
import type { RootState } from "../../store";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5006/users";
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    joined: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Guard clause: redirect if no logged-in user
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/${currentUser.id}`);
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();
        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          joined: data.joined || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser, navigate]);

  const handleSave = async () => {
    if (!currentUser) return; // safety check

    try {
      const response = await fetch(`${API_URL}/${currentUser.id}`, {
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
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <FiArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Left: Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src={ProfilePic}
          alt="Profile"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-blue-400 mx-auto"
        />
      </div>

      {/* Right: Profile Details */}
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
          {user.name}
        </h2>
        <p className="text-gray-500 text-center md:text-left">{user.email}</p>
        <p className="text-sm text-gray-400 mt-2 md:mt-4">Phone: {user.phone}</p>
        <p className="text-sm text-gray-400">Joined: {user.joined}</p>

        <button
          onClick={handleEdit}
          className="mt-4 flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition w-full md:w-auto"
        >
          <FiEdit2 />
          {isEditing ? "Stop Editing" : "Edit Profile"}
        </button>

        {isEditing && (
          <form className="mt-6 space-y-3">
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
                Phone
              </label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
