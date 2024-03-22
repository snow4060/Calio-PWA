import "./App.css";
import LeftPanel from "./components/leftPanel/LeftPanel";
import TaskContextProvider from "./components/context/TaskContext";
import useTabContext from "./components/hooks/useTabContext";

function App() {
  const {tab} = useTabContext()
  return (
    <>
        <LeftPanel />
        <TaskContextProvider>
          {tab}
        </TaskContextProvider>
    </>
  );
}

export default App;