import createData from "./TodoCreator";
import deleteTodoById from "./TodoDeletor";
import updateTodoById from "./TodoUpdator";

const PendingTasksCompletor = () => {
  let tasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
  console.log(tasks);
  // Check if the browser is online
  if (navigator.onLine) {
    tasks.forEach((task) => {
      console.log(task.Create);
      if (task.Create) {
        createData(task.Create.task)
          .then(() => {
            console.log("Task created:", task.Create.task);
          })
          .catch((error) => {
            console.error("Error creating task:", error);
          });
      }

      if (task.Delete) {
        deleteTodoById(task.Delete.id)
          .then(() => {
            console.log("Task deleted:", task.Delete.id);
          })
          .catch((error) => {
            console.error("Error deleting task:", error);
          });
      }

      if (task.Update) {
        console.log(task.Update);
        updateTodoById(task.Update.id, task.Update.updatedData)
          .then(() => {
            console.log("Task updated:", task);
          })
          .catch((error) => {
            console.error("Error updating task:", error);
          });
      }
    });

    localStorage.removeItem("pendingTasks");
  }
};

export default PendingTasksCompletor;
