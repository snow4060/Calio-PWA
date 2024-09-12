import "./styles/App.css";
import LeftPanel from "./components/leftPanel/LeftPanel";
import TaskContextProvider from "./components/context/TaskContext";
import useTabContext from "./components/hooks/useTabContext";
import Theme from "./styles/Theme";
import ModalProvider from "./components/modal/context/ModalContext";
import NotesContextProvider from "./components/context/NotesContext";

function App() {
  const { tab } = useTabContext();

  return (
    <>
      <Theme>
        <LeftPanel />
        <TaskContextProvider>
          <NotesContextProvider>
            <ModalProvider>{tab}</ModalProvider>
          </NotesContextProvider>
        </TaskContextProvider>
      </Theme>
    </>
  );
}

export default App;
