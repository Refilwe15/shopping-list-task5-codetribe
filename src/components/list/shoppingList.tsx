import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { setItems } from "../../listSlice";
import { FiEdit, FiTrash, FiStar } from "react-icons/fi";
import Pic from "../../assets/list.png";
import Pics from "../../assets/profile2.png";
import { useNavigate } from "react-router-dom";

interface LocalItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  description?: string;
  image?: string;
  favorite?: boolean;
}

const API_URL = "http://localhost:5006/items";

const ShoppingList: React.FC = () => {
  const items = useSelector((state: RootState) => state.list.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      dispatch(setItems(data));
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (item: LocalItem) => {
    setCurrentItemId(item.id);
    setName(item.name);
    setCategory(item.category);
    setQuantity(item.quantity);
    setDescription(item.description || "");
    setImage(item.image || "");
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!name || !category) {
      alert("Please fill all required fields");
      return;
    }

    const item: LocalItem = {
      id: currentItemId ?? Date.now(),
      name,
      category,
      quantity,
      description,
      image,
      favorite: currentItemId
        ? items.find((i) => i.id === currentItemId)?.favorite
        : false,
    };

    try {
      if (currentItemId !== null) {
        await fetch(`${API_URL}/${currentItemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });

        alert("Item updated successfully ✅");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });

        alert("Item added successfully ✅");
      }

      fetchItems();
      setIsModalOpen(false);
      setCurrentItemId(null);
      setName("");
      setCategory("");
      setQuantity(1);
      setDescription("");
      setImage("");
    } catch (err) {
      console.error("Failed to save item:", err);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      alert("Item deleted successfully 🗑️");

      fetchItems();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleToggleFavorite = async (item: LocalItem) => {
    const updatedItem = { ...item, favorite: !item.favorite };

    try {
      await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      fetchItems();
    } catch (err) {
      console.error("Favorite update failed:", err);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("user");
    dispatch(setItems([]));

    alert("Logged out successfully");

    navigate("/login");
  };

  const handleProfileClick = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6">
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">My Shopping List</h2>

        <img
          src={Pics}
          alt="Profile"
          onClick={handleProfileClick}
          className="w-12 h-12 rounded-full cursor-pointer hover:scale-105 transition"
        />
      </div>

      <img src={Pic} alt="Shopping" className="w-24 h-24 mb-6" />

      {/* Search */}
      <div className="flex w-full max-w-3xl mb-6">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border rounded-l-lg px-4 py-2"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-purple-600 text-white px-4 rounded-r-lg hover:bg-purple-700"
        >
          Clear
        </button>
      </div>

      {/* Add Item */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg mb-6 hover:bg-purple-700 shadow"
      >
        + Add Item
      </button>

      {/* Items */}
      <div className="w-full max-w-3xl grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {filteredItems.length === 0 ? (
          <p className="text-gray-500">No items found.</p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex gap-4"
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>

                <p className="text-sm text-gray-600">
                  Category: {item.category}
                </p>

                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>

                {item.description && (
                  <p className="text-xs text-gray-400 italic">
                    {item.description}
                  </p>
                )}

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-1 text-purple-600 border border-purple-600 px-2 py-1 rounded text-sm"
                  >
                    <FiEdit /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 text-red-600 border border-red-600 px-2 py-1 rounded text-sm"
                  >
                    <FiTrash /> Delete
                  </button>

                  <button
                    onClick={() => handleToggleFavorite(item)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-sm border ${
                      item.favorite
                        ? "bg-purple-100 text-purple-700 border-purple-500"
                        : "border-gray-400 text-gray-600"
                    }`}
                  >
                    <FiStar /> Favorite
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 shadow"
      >
        Logout
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {currentItemId ? "Edit Item" : "Add Item"}
            </h3>

            <div className="space-y-3">
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentItemId(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  {currentItemId ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
