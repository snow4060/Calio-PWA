import "./styles/App.css";
import LeftPanel from "./components/leftPanel/LeftPanel";
import TaskContextProvider from "./components/context/TaskContext";
import Theme from "./styles/Theme";
import ModalProvider from "./components/modal/context/ModalContext";
import NotesContextProvider from "./components/context/NotesContext";
import { Route, Routes } from "react-router-dom";
import Calendar from "./components/calendar/Calendar";
import TaskLists from "./components/taskList/TaskLists";
import Notes from "./components/notes/Notes";
import Settings from "./components/settings/Settings";
import TaskList from "./components/taskList/TaskList";

function App() {
  return (
    <>
      <Theme>
        <LeftPanel />
        <TaskContextProvider>
          <NotesContextProvider>
            <ModalProvider>
              <Routes>
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/taskList" element={<TaskLists />} />
                <Route path="/taskList/:id" element={<TaskList />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </ModalProvider>
          </NotesContextProvider>
        </TaskContextProvider>
      </Theme>
    </>
  );
}

export default App;
