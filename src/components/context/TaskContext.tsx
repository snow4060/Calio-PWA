import React, { ReactNode } from "react";
import useArray from "../util/hooks/useArray";

type Calendar = {
  categoryName: string;
  date: Date | null;
  index: number;
};

type TaskList = {
  lastModified: Date;
  taskListName: string;
  index: number;
};

export type Task = {
  id: string;
  title: string;
  details: string;
  completed: boolean;
  calendar: Calendar[] | null;
  taskList: TaskList[] | null;
};

export type TaskWithTaskList = Task & { taskList: TaskList[] };
export type TaskWithCalendar = Task & { calendar: Calendar[] };

export const TaskContext = React.createContext<{
  taskArray: ReturnType<typeof useArray<Task>>;
}>({
  taskArray: {
    array: [],
    length: 0,
    setArray: () => null,
    push: () => null,
    filter: () => null,
    update: () => null,
    updateCallback: () => null,
    remove: () => null,
  },
});

// test task array for front end dev
const TEST_TASK_ARRAY: Task[] = [
  {
    id: "a",
    title: "task 1",
    details: "task 1 details",
    completed: false,
    calendar: null,
    taskList: [
      {
        lastModified: new Date(),
        taskListName: "task list 1",
        index: 4,
      },
    ],
  },
  {
    id: "b",
    title: "task 2",
    details: "task 2 details",
    completed: false,
    calendar: null,
    taskList: [
      {
        lastModified: new Date(),
        taskListName: "task list 1",
        index: 1,
      },
    ],
  },
  {
    id: "c",
    title: "task 3",
    details: "task 3 details",
    completed: true,
    calendar: null,
    taskList: [
      {
        lastModified: new Date(),
        taskListName: "task list 1",
        index: 2,
      },
    ],
  },
  {
    id: "d",
    title: "task 4",
    details: "task 4 details",
    completed: false,
    calendar: null,
    taskList: [
      {
        lastModified: new Date(),
        taskListName: "task list 1",
        index: 3,
      },
    ],
  },
  {
    id: "e",
    title: "task 5",
    details: "task 5 details",
    completed: false,
    calendar: null,
    taskList: [
      {
        lastModified: new Date(),
        taskListName: "task list 1",
        index: 0,
      },
    ],
  },
  {
    id: "f",
    title: "task 6",
    details: "task 6 details",
    completed: false,
    calendar: null,
    taskList: null,
  },
  {
    id: "g",
    title: "task 7",
    details: "task 7 details",
    completed: true,
    calendar: null,
    taskList: [
      {
        lastModified: new Date(),
        taskListName: "task list 1",
        index: 5,
      },
      {
        lastModified: new Date(),
        taskListName: "task list 2",
        index: 0,
      },
    ],
  },
  {
    id: "h",
    title: "task 8",
    details: "task 8 details",
    completed: true,
    calendar: null,
    taskList: [
      {
        lastModified: new Date(2050, 0, 1),
        taskListName: "task list 2",
        index: 1,
      },
    ],
  },
];

interface Props {
  children: ReactNode;
}

function TaskContextProvider({ children }: Props) {
  const taskArray = useArray<Task>(TEST_TASK_ARRAY);
  // const loadTasks = () => {};

  return (
    <TaskContext.Provider value={{ taskArray }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContextProvider;
