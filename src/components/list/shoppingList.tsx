import React, { useState } from "react";
import { FiEdit, FiTrash, FiStar } from "react-icons/fi";
import Pic from "../../assets/list.png";

const ShoppingListUI: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        {/* Example Item */}
        <li className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
          <img
            src="/chocolate.png"
            alt="Dairy Milk"
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Dairy Milk Choc</h3>
            <p className="text-sm text-gray-600">Category: Snacks</p>
            <p className="text-sm text-gray-600">Quantity: 2</p>
            <p className="text-sm text-gray-400 italic">Optional notes...</p>

            {/* Inline actions with borders */}
            <div className="flex gap-3 mt-3 text-sm">
              <button className="flex items-center gap-1 px-3 py-1 border border-black">
                <FiEdit size={16} /> Edit
              </button>
              <button className="flex items-center gap-1 px-3 py-1 border border-black">
                <FiTrash size={16} /> Delete
              </button>
              <button className="flex items-center gap-1 px-3 py-1 border border-black">
                <FiStar size={16} /> Favorite
              </button>
            </div>
          </div>
        </li>

        {/* Example Item */}
        <li className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
          <img
            src="/bread.png"
            alt="Bread"
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Bread</h3>
            <p className="text-sm text-black">Category: Bakery</p>
            <p className="text-sm text-black">Quantity: 1</p>

            <div className="flex gap-3 mt-3 text-sm">
              <button className="flex items-center gap-1 px-3 py-1 border border-black">
                <FiEdit size={16} /> Edit
              </button>
              <button className="flex items-center gap-1 px-3 py-1 border border-black">
                <FiTrash size={16} /> Delete
              </button>
              <button className="flex items-center gap-1 px-3 py-1 border border-black">
                <FiStar size={16} /> Favorite
              </button>
            </div>
          </div>
        </li>
      </ul>

      {/* Modal (UI only) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4">Add New Item</h3>

            <form className="space-y-4">
              {/* Upload image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Picture
                </label>
                <input type="file" className="w-full border px-3 py-2 rounded" />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter item name"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Enter description"
                  className="w-full border px-3 py-2 rounded"
                  rows={2}
                ></textarea>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g., Snacks, Drinks, Bakery"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListUI;
