import axios from "axios";

let createData = async (task) => {
  try {
    let InsertedTodo = await axios.post(
      "https://master-sawfly-85.hasura.app/api/rest/Todo_Table",
      { object: task }
    );
    console.log(InsertedTodo.data);
  } catch (e) {
    if (!navigator.onLine) {
      let previousQueue = JSON.parse(
        localStorage.getItem("pendingTasks") || "[]"
      );
      previousQueue.push({ Create: { task } });
      localStorage.setItem("pendingTasks", JSON.stringify(previousQueue));
      console.log("Task added to pendingTasks in local storage.");
    } else {
      console.log("Failed to Create Todo:", e.message);
    }
  }
};

export default createData;
