import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Theme({ children }: Props) {
  const THEME = createTheme({
    typography: {
      fontFamily: "Poppins",
      fontSize: 16,
      body1: {
        fontFamily: "Poppins",
      },
      button: {
        textTransform: "none",
      },
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#f0f8ff",
      },
      secondary: {
        main: "#5d79a5",
      },
      // error: {
      //   // main: "#fffff",
      // },
    },
    components: {
      MuiButtonBase: {
        // defaultProps: {
        //   disableRipple: !userSettings.buttonRipple,
        // },
      },
      MuiTab: {
        defaultProps: {
          disableFocusRipple: true,
        },
      },
    },
  });

  return <ThemeProvider theme={THEME}>{children}</ThemeProvider>;
}
