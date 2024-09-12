import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function useNoteContext() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  return context;
}
