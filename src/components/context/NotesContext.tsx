import React, { ReactNode } from "react";
import useArray from "../util/hooks/useArray";

type Note = {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
};

export const NotesContext = React.createContext<
  ReturnType<typeof useArray<Note>>
>({
  array: [],
  length: 0,
  setArray: () => null,
  push: () => null,
  filter: () => null,
  update: () => null,
  updateCallback: () => null,
  remove: () => null,
});

interface Props {
  children: ReactNode;
}

function NotesContextProvider({ children }: Props) {
  const notesArray = useArray<Note>();
  return (
    <NotesContext.Provider value={notesArray}>{children}</NotesContext.Provider>
  );
}

export default NotesContextProvider;
