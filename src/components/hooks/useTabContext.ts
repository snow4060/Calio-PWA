import { useContext } from "react";
import { TabContext } from "../context/TabContext";

export default function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("TabContext must be used within a TaskContextProvider");
  }
  return context;
}
