import { Task, TaskWithSingularTaskList } from "../context/TaskContext";

export const formatTaskLists = (tasks: Task[]) => {
    const formattedTaskLists: {
      name: string;
      id: string;
      tasks: TaskWithSingularTaskList[];
      lastModified: Date;
    }[] = [];
    tasks.forEach((task) => {
      if (task.taskList !== null) {
        task.taskList.forEach((taskListInstance) => {
          const taskListId = taskListInstance.taskListId;
          const taskListIndex = formattedTaskLists.findIndex(
            (taskList) => taskList.id === taskListId
          );
          // task list with name already exists in array
          if (taskListIndex !== -1) {
            formattedTaskLists[taskListIndex].tasks.push({
              ...task,
              taskList: taskListInstance,
            });
          }
          // task list with name does not yet exist in array
          else {
            formattedTaskLists.push({
              name: taskListInstance.taskListName,
              id: taskListId,
              tasks: [
                {
                  ...task,
                  taskList: taskListInstance,
                },
              ],
              lastModified: new Date(),
            });
          }
        });
      }
      formattedTaskLists.forEach((taskList) => {
        let latestDate = taskList.tasks[0].taskList.lastModified;
        taskList.tasks.forEach((task) => {
          if (task.taskList.lastModified > latestDate) {
            latestDate = task.taskList.lastModified;
          }
        });
        taskList.lastModified = latestDate;
      });
    });
    return formattedTaskLists;
  };