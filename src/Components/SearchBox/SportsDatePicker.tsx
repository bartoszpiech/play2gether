import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import pl from "date-fns/locale/pl";
import * as React from "react";
import { Theme } from "./Theme";

function SportsDatePicker(props: any) {
    return (
        <ThemeProvider theme={Theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={pl}>
                <DateTimePicker
                    label={props.label}
                    value={props.date}
                    minutesStep={15}
                    onChange={(newValue) => {
                        props.setDate(newValue);
                    }}
                    minDateTime={new Date().setDate(new Date().getDate() - 1)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}
export default SportsDatePicker;
