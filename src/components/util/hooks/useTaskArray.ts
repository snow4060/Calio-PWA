import { Task } from "../../context/TaskContext";
import useArray from "./useArray";

function useTaskArray(defaultValue?: Task[]) {
  const taskArray = useArray<Task>(defaultValue);

  function getTaskIndex(taskId: string) {
    const index = taskArray.array.findIndex((task) => task.id === taskId);
    if (index === -1) {
      throw new Error("no task with id found.");
    }
    return index;
  }

  function setTaskProp(
    id: string,
    prop: "title" | "details" | "completed",
    newProp: string | undefined,
    propagationOriginId: "calendar" | string,
    propagateAll: boolean = true
  ) {
    const index = getTaskIndex(id);
    taskArray.updateCallback(index, (task) => {
      if (prop === "title" && newProp !== undefined) {
        task.title = newProp;
      } else if (prop === "details" && newProp !== undefined) {
        task.details = newProp;
      } else if (prop === "completed") {
        task.completed = !task.completed;
      }
      task.taskList?.forEach((taskListInstance) => {
        if (
          taskListInstance.taskListId === propagationOriginId ||
          propagateAll
        ) {
          taskListInstance.lastModified = new Date();
        }
      });
      return task;
    });
  }

  function reindexTaskList(
    taskListId: string,
    prevIndex: number,
    newIndex: number
  ) {
    const newTaskArray = [...taskArray.array];
    newTaskArray.forEach((task) => {
      const taskListInstanceIndex = task.taskList?.findIndex(
        (taskListInstance) => taskListInstance.taskListId === taskListId
      );
      // task list instance exists
      if (
        task.taskList !== null &&
        taskListInstanceIndex !== undefined &&
        taskListInstanceIndex !== -1
      ) {
        // switched task is moved backwards
        if (newIndex < prevIndex) {
          // this is the switched task
          if (task.taskList[taskListInstanceIndex].index === prevIndex) {
            console.log(
              "change",
              task.title,
              task.taskList[taskListInstanceIndex].index,
              newIndex
            );
            task.taskList[taskListInstanceIndex].index = newIndex;
          }
          // all elements after the new index and before the prev index increment by 1
          else if (
            task.taskList[taskListInstanceIndex].index >= newIndex &&
            task.taskList[taskListInstanceIndex].index < prevIndex
          ) {
            task.taskList[taskListInstanceIndex].index += 1;
          }
        }
        // switched task is moved forward
        if (newIndex > prevIndex) {
          // this is the switched task
          if (task.taskList[taskListInstanceIndex].index === prevIndex) {
            task.taskList[taskListInstanceIndex].index = newIndex;
          }
          // all elements after the prevIndex and before the new index decrement by 1
          else if (
            task.taskList[taskListInstanceIndex].index > prevIndex &&
            task.taskList[taskListInstanceIndex].index <= newIndex
          ) {
            task.taskList[taskListInstanceIndex].index -= 1;
          }
        }
      }
    });
    taskArray.setArray(newTaskArray);
  }

  return { taskArray, getTaskIndex, setTaskProp, reindexTaskList };
}

export default useTaskArray;
