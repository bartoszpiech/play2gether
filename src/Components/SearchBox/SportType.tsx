import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { SportsType } from "./Sports";
import { Theme } from "./Theme";


function SportType(props: any) {
    return (
        <ThemeProvider theme={Theme}>
            <Autocomplete
                multiple
                disablePortal
                size="small"
                limitTags={2}
                id="combo-box-demo"
                value={props.sports}
                options={SportsType}
                onChange={(event, value) => props.setSports(value)}
                renderInput={(params) => <TextField {...params} label="Sport" />}
            />
        </ThemeProvider>
    );
}
export default SportType;
