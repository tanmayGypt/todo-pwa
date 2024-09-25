import React from "react";

function DeleteConfirmationPopup({ setShowDeleteConfirm, confirmDelete }) {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Are you sure you want to delete this task?
          </h2>
          <div className="flex justify-end">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded mr-2 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
