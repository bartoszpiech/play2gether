import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { SmallHeading } from "Assets/Styles/SearchBox/Heading";
import * as React from "react";
import { Theme } from "./Theme";

const Places = ["Wrocław", "Warszawa", "Gdańsk", "Chełm"];

export default function Place() {
    return (
        <ThemeProvider theme={Theme}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Places}
                renderInput={(params) => <TextField {...params} label="Miejsce" />}
            />
            <SmallHeading />
            <Button variant="contained" size="large">
                Szukaj
            </Button>
        </ThemeProvider>
    );
}
