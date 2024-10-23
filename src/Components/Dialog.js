import React from "react";

const Dialog = ({ isOpen, onClose, todo, onSave, handleEditChange }) => {
  if (!isOpen) return null; // Render nothing if the modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={todo.title}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={todo.description}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="priority">
              Priority
            </label>
            <input
              type="number"
              name="priority"
              value={todo.priority}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              min="0"
              max="5"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={todo.dueDate}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-red-500 hover:text-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
