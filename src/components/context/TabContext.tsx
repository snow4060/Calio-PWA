import React, { ReactNode, createContext, useState } from "react";
import Calendar from "../calendar/Calendar";

export const TabContext = createContext<{
  tab: ReactNode;
  setTab: React.Dispatch<React.SetStateAction<ReactNode>>;
}>({
  tab: "",
  setTab: () => null,
});

interface Props {
  children: ReactNode;
}

function TabContextProvider({ children }: Props) {
  const [tab, setTab] = useState<ReactNode>(<Calendar />);
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

export default TabContextProvider;
