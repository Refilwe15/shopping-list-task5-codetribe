import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { setItems } from "../../listSlice";
import { FiEdit, FiTrash, FiStar } from "react-icons/fi";
import Pic from "../../assets/list.png";

interface LocalItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  description?: string;
  image?: string;
  favorite?: boolean;
}

const API_URL = "http://localhost:5005/items";

const ShoppingList: React.FC = () => {
  const items = useSelector((state: RootState) => state.list.items);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch items from JSON server
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
    if (!name || !category) return;

    const item: LocalItem = {
      id: currentItemId || Date.now(),
      name,
      category,
      quantity,
      description,
      image,
      favorite: currentItemId ? items.find(i => i.id === currentItemId)?.favorite : false
    };

    try {
      if (currentItemId) {
        await fetch(`${API_URL}/${currentItemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      fetchItems();
      setIsModalOpen(false);
      setCurrentItemId(null);
      setName(""); setCategory(""); setQuantity(1); setDescription(""); setImage("");
    } catch (err) {
      console.error("Failed to save item:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (err) {
      console.error("Failed to delete item:", err);
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
      console.error("Failed to toggle favorite:", err);
    }
  };

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-4">My Shopping List</h2>
      <img src={Pic} alt="Shopping" className="w-28 h-28 mx-auto mb-6" />

      {/* Search */}
      <div className="flex gap-2 mb-4 w-full max-w-lg">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={() => setSearchTerm("")}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {/* Add Item */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
      >
        + Add Item
      </button>

      {/* Items List */}
      <ul className="space-y-4 w-full max-w-lg">
        {filteredItems.length === 0 ? (
          <p className="text-gray-500 text-center">No items found.</p>
        ) : (
          filteredItems.map(item => (
            <li key={item.id} className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
              <img src={item.image || "/placeholder.png"} alt={item.name} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                {item.description && <p className="text-sm text-gray-400 italic">{item.description}</p>}

                <div className="flex gap-3 mt-3 text-sm">
                  <button onClick={() => handleEdit(item)} className="flex items-center gap-1 px-3 py-1 border border-black rounded">
                    <FiEdit size={16} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1 px-3 py-1 border border-black rounded hover:text-red-600">
                    <FiTrash size={16} /> Delete
                  </button>
                  <button
                    onClick={() => handleToggleFavorite(item)}
                    className={`flex items-center gap-1 px-3 py-1 border rounded ${item.favorite ? "border-yellow-400 text-yellow-500" : "border-black"}`}
                  >
                    <FiStar size={16} /> Favorite
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4">{currentItemId ? "Edit Item" : "Add New Item"}</h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Picture</label>
                <input type="file" onChange={handleImageChange} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" rows={2}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => { setIsModalOpen(false); setCurrentItemId(null); }} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Cancel</button>
                <button type="button" onClick={handleSave} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">{currentItemId ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
