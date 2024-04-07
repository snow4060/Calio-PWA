import { Task } from "../../context/TaskContext";
import useArray from "./useArray";
import { v4 as uuidv4 } from "uuid";

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

  function removeTaskListInstance(taskListId: string, taskId: string) {
    const newTaskArray = [...taskArray.array];
    const taskIndex = newTaskArray.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      throw new Error("no task with id found.");
    }
    if (newTaskArray[taskIndex].taskList === null) {
      throw new Error("no task list found.");
    }
    const removedIndex = newTaskArray[taskIndex].taskList!.find(
      (taskListInstance) => taskListInstance.taskListId === taskListId
    )?.index;
    if (removedIndex === undefined) {
      throw new Error("no task list found.");
    }
    newTaskArray[taskIndex].taskList = newTaskArray[taskIndex].taskList!.filter(
      (taskListInstance) => taskListInstance.taskListId !== taskListId
    );
    // re-index the task list instances
    newTaskArray.forEach((task) =>
      task.taskList?.forEach((taskListInstance) => {
        if (
          taskListInstance.taskListId === taskListId &&
          taskListInstance.index > removedIndex
        ) {
          taskListInstance.index -= 1;
        }
      })
    );
    taskArray.setArray(newTaskArray);
  }

  function getHighestTaskListIndex(taskListId: string) {
    let index = 0;
    taskArray.array.forEach((task) => {
      task.taskList?.forEach((taskListInstance) => {
        if (
          taskListInstance.taskListId === taskListId &&
          taskListInstance.index > index
        ) {
          index = taskListInstance.index;
        }
      });
    });
    return index;
  }
  function getHighestCalendarIndex(categoryId: string) {
    let index = 0;
    taskArray.array.forEach((task) => {
      task.calendar?.forEach((calendarInstance) => {
        if (
          calendarInstance.categoryId === categoryId &&
          calendarInstance.index > index
        ) {
          index = calendarInstance.index;
        }
      });
    });
    return index;
  }

  function addTask(
    title: string,
    details?: string,
    calendar?: {
      calendarName: string;
      calendarId: string;
      calendarDate: Date | null;
    },
    taskList?: { taskListName: string; taskListId: string }
  ) {
    taskArray.push({
      title: title,
      details: details ? details : "",
      completed: false,
      calendar: calendar
        ? [
            {
              categoryId: calendar.calendarId,
              categoryName: calendar.calendarName,
              date: calendar.calendarDate,
              index: getHighestCalendarIndex(calendar.calendarId),
            },
          ]
        : null,
      taskList: taskList
        ? [
            {
              taskListId: taskList.taskListId,
              taskListName: taskList.taskListName,
              lastModified: new Date(),
              index: getHighestTaskListIndex(taskList.taskListId),
            },
          ]
        : null,
      id: uuidv4(),
    });
  }

  return {
    taskArray,
    getTaskIndex,
    setTaskProp,
    reindexTaskList,
    removeTaskListInstance,
    addTask
  };
}

export default useTaskArray;
