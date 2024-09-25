import React, { useEffect, useState } from "react";
import TodoCards from "./TodoCards";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import EditTaskPopup from "./EditTaskPopup";
import axios from "axios";
import updateTodoById from "./TodoUpdator";
import createData from "./TodoCreator";
import deleteTodoById from "./TodoDeletor";
import PendingTasksCompletor from "./PendingTaskCompletor";
function ListOfTodos() {
  const [tasks, setTasks] = useState([]);
  const [Category, setCategory] = useState("Default");
  const [newDate, setnewDate] = useState("");
  const [newTime, setnewTime] = useState("");
  //   const [CategoryList, setCategoryList] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("Fetched_Todos", JSON.stringify(tasks));
    const fetchTodos = async () => {
      try {
        let Fetched_Todos = await axios.get(
          "https://master-sawfly-85.hasura.app/api/rest/Todo_Table"
        );

        const todos = Fetched_Todos.data.Todo_Table;

        if (todos && Array.isArray(todos)) {
          setTasks(todos);
          localStorage.setItem("Fetched_Todos", JSON.stringify(todos));
          console.log(
            "Local Storage todos:",
            localStorage.getItem("Fetched_Todos")
          );
        } else {
          console.log("Fetched data is not valid.");
        }
      } catch (e) {
        console.log("Error fetching todos:", e.message);

        if (!navigator.onLine) {
          const storedTodos = JSON.parse(
            localStorage.getItem("Fetched_Todos") || "[]"
          );
          if (storedTodos.length > 0) {
            setTasks(storedTodos);
          } else {
            console.log("No stored todos found in local storage.");
          }
        }
      }
    };
    fetchTodos();
    PendingTasksCompletor();
  }, [tasks]);
  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: tasks.length + 1,
        message: newTask,
        date: newDate,
        time: newTime,
        category: Category,
      };

      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      localStorage.setItem("Fetched_Todos", JSON.stringify(updatedTasks));

      setNewTask("");
      setCategory("");
      setnewTime("");
      setnewDate("");

      createData({
        message: newTask,
        date: newDate,
        time: newTime,
        category: Category,
      });
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditTask(tasks[index]);
    setEditIndex(index);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex
        ? {
            ...task,
            id: editTask.id,
            message: editTask.message,
            date: editTask.newDate,
            time: editTask.newTime,
            category: editTask.category,
          }
        : task
    );

    updateTodoById(editTask.id, editTask);
    setTasks(updatedTasks);

    setIsEditing(false);
    setEditTask("");
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setShowDeleteConfirm(true);
    setDeleteIndex(index);
    deleteTodoById(tasks[index].id);
  };

  const confirmDelete = () => {
    const updatedTasks = tasks.filter((_, i) => i !== deleteIndex);
    // localStorage.setItem("Fetched_Todos", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setShowDeleteConfirm(false);
    setDeleteIndex(null);
  };

  return (
    <div className="bg-gray-100 flex justify-center mx-auto my-12 w-full sm:w-11/12 md:w-9/12">
      <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          To-Do List
        </h1>

        {/* Input to add new tasks */}
        <div className="flex flex-wrap gap-y-2 md:flex-nowrap mb-4 gap-x-2">
          <input
            type="time"
            className="w-full md:w-auto flex-1 px-3 py-2 border rounded-md"
            placeholder="Add a new task..."
            value={newTime}
            onChange={(e) => setnewTime(e.target.value)}
          />
          <input
            type="date"
            className="w-full md:w-auto flex-1 px-3 py-2 border rounded-md"
            placeholder="Add a new task..."
            value={newDate}
            onChange={(e) => setnewDate(e.target.value)}
          />
          <input
            type="text"
            className="w-full md:w-auto flex-1 px-3 py-2 border rounded-md"
            placeholder="Enter Category..."
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            className="w-full md:w-auto flex-1 px-3 py-2 border rounded-md"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
        </div>

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task, index) => (
              <TodoCards
                key={task.id}
                index={index}
                task={task}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <EditTaskPopup
          editTask={editTask}
          setEditTask={setEditTask}
          setIsEditing={setIsEditing}
          updateTask={updateTask}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmationPopup
          setShowDeleteConfirm={setShowDeleteConfirm}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
}

export default ListOfTodos;
