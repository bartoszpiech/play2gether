import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./Theme";
import { SportsType } from "./Sports";

export default function SportType(props:any) {
    const handleChange = (event: any, value: string[]) => {
        props.setSports(value)
    };

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
                onChange={(event, value) => handleChange(event,value)}
                renderInput={(params) => <TextField {...params} label="Sport" />}
            />
        </ThemeProvider>
    );
}
