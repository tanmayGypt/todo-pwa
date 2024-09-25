import axios from "axios";

const deleteTodoById = async (id) => {
  try {
    const response = await axios.delete(
      `https://master-sawfly-85.hasura.app/api/rest/Todo_Table/${id}`
    );
    console.log(response.data);
  } catch (e) {
    if (!navigator.onLine) {
      let previousQueue = JSON.parse(
        localStorage.getItem("pendingTasks") || "[]"
      );
      previousQueue.push({ Delete: { id } });
      localStorage.setItem("pendingTasks", JSON.stringify(previousQueue));

      console.log("Task delete action added to pendingTasks in local storage.");
    } else {
      console.log("Failed to delete data:", e.message);
    }
  }
};

export default deleteTodoById;
