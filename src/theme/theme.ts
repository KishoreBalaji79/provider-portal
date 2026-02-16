import { createTheme } from "@mui/material/styles";
import { alnuTheme } from "./alnuTheme";

const c = alnuTheme.colors;

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: c.primary[500],
      dark: c.primary[950],
      contrastText: c.text.inverse
    },
    background: {
      default: c.background.secondary,
      paper: c.background.primary
    },
    text: {
      primary: c.text.primary,
      secondary: c.text.secondary
    },
    divider: c.border.main
  },
  shape: {
    borderRadius: alnuTheme.borderRadius.lg
  },
  typography: {
    fontFamily: [
      "Be Vietnam Pro",
      "Inter",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif"
    ].join(","),
    h4: { fontWeight: 700, fontSize: 28 },
    h5: { fontWeight: 700, fontSize: 24 },
    h6: { fontWeight: 700, fontSize: 20 },
    body1: { fontSize: 14 },
    body2: { fontSize: 12 }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { border: `1px solid ${c.border.light}` }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: alnuTheme.borderRadius.md,
          fontWeight: 700
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: alnuTheme.borderRadius.md,
          background: c.background.primary
        },
        notchedOutline: { borderColor: c.border.light }
      }
    }
  }
});
