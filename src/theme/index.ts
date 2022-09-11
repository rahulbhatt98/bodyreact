import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      light: "#004240",
      main: "#004236",
      dark: "#00352B",
    },
    secondary: {
      light:"#3D857E",
      main: "#D6CE4B",
    },
  },
  spacing: 10,
  typography: {
    fontFamily: ["Work Sans", " Druk", "Recoleta Alt"].join(","),
    h3: {
      fontFamily: "Work Sans",
      fontWeight: 600,
      fontStyle: "normal",
      fontSize: 26,
    },
    h4: {
      fontFamily: "Druk",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: 26,
    },
    h5: {
      fontFamily: "Work Sans",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: 16,
    },
    body1: {
      fontFamily: "Work Sans",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: 15,
    },
    body2: {
      fontFamily: "Work Sans",
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: 15,
    },
  },
});

export default theme;
