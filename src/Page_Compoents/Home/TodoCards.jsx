import React from "react";

function TodoCards({ task, handleDelete, handleEdit, index }) {
  return (
    <tr key={task.id} className="text-center">
      <td className="border px-2 py-2 text-sm sm:px-4 sm:py-2">{index + 1}</td>
      <td className="border px-2 py-2 text-sm sm:px-4 sm:py-2">{task.date}</td>
      <td className="border px-2 py-2 text-sm sm:px-4 sm:py-2">{task.time}</td>
      <td className="border px-2 py-2 text-sm sm:px-4 sm:py-2">
        {task.message}
      </td>
      <td className="border px-2 py-2 text-sm sm:px-4 sm:py-2">
        {task.category}
      </td>

      <td className="border px-2 py-2 text-sm sm:px-4 sm:py-2 flex flex-col sm:flex-row justify-center items-center gap-2">
        <button
          onClick={() => handleEdit(index)}
          className="w-full sm:w-auto px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(index)}
          className="w-full sm:w-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TodoCards;
