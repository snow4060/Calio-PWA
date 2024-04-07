import "./styles/App.css";
import LeftPanel from "./components/leftPanel/LeftPanel";
import TaskContextProvider from "./components/context/TaskContext";
import useTabContext from "./components/hooks/useTabContext";
import Theme from "./styles/Theme";

function App() {
  const { tab } = useTabContext();

  return (
    <>
      <Theme>
        <LeftPanel />
        <TaskContextProvider>{tab}</TaskContextProvider>
      </Theme>
    </>
  );
}

export default App;
