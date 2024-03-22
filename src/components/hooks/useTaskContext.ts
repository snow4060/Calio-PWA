import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  return context;
}
