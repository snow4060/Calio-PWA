import { SxProps } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";
import { darkDarkBlueBackground, whiteText } from "../../styles/colors";

interface Props {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  verticalTranslation: number;
  children: ReactNode;
}

function SmoothModal({ open, setOpen, verticalTranslation, children }: Props) {
  const style: SxProps = {
    position: "absolute" as const,
    top: `${verticalTranslation}%`,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: darkDarkBlueBackground,
    boxShadow: 24,
    p: "48px",
    color: whiteText,
    borderRadius: 2,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 50,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}

export default SmoothModal;
