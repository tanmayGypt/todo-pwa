import React from "react";

function EditTaskPopup({ editTask, setEditTask, setIsEditing, updateTask }) {
  const handleInputChange = (field) => (e) => {
    setEditTask((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Edit Task</h2>
          <input
            type="time"
            className="w-full px-3 py-2 border mb-4"
            value={editTask.time}
            placeholder="Enter Time to update"
            onChange={handleInputChange("newTime")} // Update specific field
          />
          <input
            type="date"
            className="w-full px-3 py-2 border mb-4"
            value={editTask.date}
            placeholder="Enter date to update"
            onChange={handleInputChange("newDate")} // Update specific field
          />
          <input
            type="text"
            placeholder="Enter Category to Update"
            className="w-full px-3 py-2 border mb-4"
            value={editTask.category}
            onChange={handleInputChange("category")} // Update specific field
          />
          <input
            type="text"
            placeholder="Enter Todo To Update"
            className="w-full px-3 py-2 border mb-4"
            value={editTask.message}
            onChange={handleInputChange("message")} // Update specific field
          />
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded mr-2 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={updateTask}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskPopup;
