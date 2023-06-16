import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#b30c3e", // Replace with your primary color
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
