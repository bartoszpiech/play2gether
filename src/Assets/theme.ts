import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
        otherColor: Palette["primary"];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        otherColor?: PaletteOptions["primary"];
    }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        otherColor: true;
    }
}

export const myTheme = createTheme({
    palette: {
        primary: {
            main: "#5e3fa1",
            "50": "#ece8f4",
            "100": "#d0c6e4",
            "200": "#b1a1d3",
            "300": "#937bc1",
            "400": "#7c5fb4",
            "500": "#6644a7",
            "600": "#5e3fa1",
            "700": "#523798",
            "800": "#48318f",
            "900": "#38267e",
            dark: "#412C70",
            light: "#7E65B3",
        },
        secondary: {
            main: "#15c630",
        },
        otherColor: {
            main: "#999",
        },
    },
});
