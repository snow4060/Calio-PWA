import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export default function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("TaskContext must be used within a TaskContextProvider");
  }
  return context;
}
