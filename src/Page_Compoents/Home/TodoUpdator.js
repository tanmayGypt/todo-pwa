import axios from "axios";

const updateTodoById = async (id, updatedData) => {
  try {
    const response = await axios.post(
      `https://master-sawfly-85.hasura.app/api/rest/Todo_Table/${id}`,
      {
        object: updatedData,
      }
    );

    console.log(response.data);
  } catch (e) {
    if (!navigator.onLine) {
      let previousQueue = JSON.parse(
        localStorage.getItem("pendingTasks") || "[]"
      );
      previousQueue.push({ Update: { id, updatedData } });
      localStorage.setItem("pendingTasks", JSON.stringify(previousQueue));
      console.log("Update action added to pendingTasks in local storage.");
    } else {
      console.log("Failed to update data:", e.message);
    }
  }
};

export default updateTodoById;
