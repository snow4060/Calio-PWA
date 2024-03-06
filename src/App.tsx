import { useState } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import LeftPanel from "./components/leftPanel/LeftPanel";
import TaskList from "./components/taskList/TaskList";
import Notes from "./components/notes/Notes";
import Settings from "./components/settings/Settings";

export type Tab = "calendar" | "task list" | "notes" | "settings";

function App() {
  const [tab, setTab] = useState<Tab>("calendar");
  return (
    <>
      <LeftPanel setTab={setTab} />
      {tab === "calendar" ? (
        <Calendar />
      ) : tab === "task list" ? (
        <TaskList />
      ) : tab === "notes" ? (
        <Notes />
      ) : tab === "settings" ? (
        <Settings />
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
