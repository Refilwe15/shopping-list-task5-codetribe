import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash, FiStar } from "react-icons/fi";
import Pic from "../../assets/list.png";

interface LocalItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  image?: string;
  description?: string;
}

const API_URL = "http://localhost:5002/items";

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<LocalItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>("");

  // Fetch items from JSON server
  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async () => {
    if (!name || !category) return;

    const newItem: LocalItem = { id: Date.now(), name, category, quantity, description, image };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      setIsModalOpen(false);
      setName(""); setCategory(""); setQuantity(1); setDescription(""); setImage("");
      fetchItems(); // refresh list
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchItems(); // refresh list
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-4">My Shopping List</h2>
      <img src={Pic} alt="Shopping" className="w-28 h-28 mx-auto mb-6" />

      {/* Add button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
      >
        + Add Item
      </button>

      {/* Items List */}
      <ul className="space-y-4 w-full max-w-lg">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">No items added yet.</p>
        ) : (
          items.map(item => (
            <li key={item.id} className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
              <img src={item.image || "/placeholder.png"} alt={item.name} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                {item.description && <p className="text-sm text-gray-400 italic">{item.description}</p>}
                <div className="flex gap-3 mt-3 text-sm">
                  <button className="flex items-center gap-1 px-3 py-1 border border-black rounded">
                    <FiEdit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 px-3 py-1 border border-black rounded hover:text-red-600"
                  >
                    <FiTrash size={16} /> Delete
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 border border-black rounded">
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
            <h3 className="text-xl font-bold mb-4">Add New Item</h3>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Picture</label>
                <input type="file" onChange={handleImageChange} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" placeholder="Enter item name" value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" rows={2}></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input type="text" placeholder="e.g., Snacks, Drinks, Bakery" value={category} onChange={e => setCategory(e.target.value)} className="w-full border px-3 py-2 rounded" />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Cancel</button>
                <button type="button" onClick={handleAddItem} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
