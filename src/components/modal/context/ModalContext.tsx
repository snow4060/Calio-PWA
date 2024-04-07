import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import SmoothModal from "../SmoothModal";

export type ModalFunction = (modalContent: ReactNode, verticalTranslation?: number) => void;

export const ModalContext = createContext<{
  useModal: ModalFunction;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}>({ useModal: () => null, setOpen: () => null });

interface Props {
  children: ReactNode;
}

function ModalProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>("");
  const [verticalTranslation, setVerticalTranslation] = useState(50);

  const useModal = (modalContent: ReactNode, verticalTranslation: number = 50) => {
    setVerticalTranslation(verticalTranslation)
    setOpen(true);
    setModalContent(modalContent);
  };

  return (
    <ModalContext.Provider value={{ useModal, setOpen }}>
      {children}
      <SmoothModal open={open} setOpen={setOpen} verticalTranslation={verticalTranslation}>
        {modalContent}
      </SmoothModal>
    </ModalContext.Provider>
  );
}

export default ModalProvider;
