import "./styles/App.css";
import LeftPanel from "./components/leftPanel/LeftPanel";
import TaskContextProvider from "./components/context/TaskContext";
import useTabContext from "./components/hooks/useTabContext";
import Theme from "./styles/Theme";
import ModalProvider from "./components/modal/context/ModalContext";

function App() {
  const { tab } = useTabContext();

  return (
    <>
      <Theme>
        <LeftPanel />
        <TaskContextProvider>
          <ModalProvider>{tab}</ModalProvider>
        </TaskContextProvider>
      </Theme>
    </>
  );
}

export default App;
