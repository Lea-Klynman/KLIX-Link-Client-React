import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
          main: "#2c3e50", 
        },
        secondary: {
          main: "#3C434E",
        },
        background: {
          default: "#545E68",
          paper:"#ffffff",
          
        },
        text: {
          primary: "#3D4450",
          secondary: "#2be0dc",
        },
      },
      typography: {
        fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
        h1: {
          fontFamily: "'Montserrat', sans-serif",
        },
        h2: {
          fontFamily: "'Montserrat', sans-serif",
        },
        button: {
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              overflowX: 'hidden',
              width: '100%',
              maxWidth: '100vw',
            },
            '#root': {
              overflowX: 'hidden',
              width: '100%',
              maxWidth: '100vw',
            }
          }
        }
      }
});

export default theme;