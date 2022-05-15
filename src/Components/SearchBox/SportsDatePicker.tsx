import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./Theme";
import pl from "date-fns/locale/pl";
/*
 * Dox:
 * https://mui.com/x/react-date-pickers/date-picker/
 */

/*
 * TODO:
 * - add limiter so 'from' date cannot be later than 'to' date, etc,
 * - add polish date notation and month translation.
 */

interface SportsDatePickerProps {
    label: string;
}
function SportsDatePicker(props: any) {
    const [value, setValue] = React.useState<Date | null>(null);

    return (
        <ThemeProvider theme={Theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={pl}>
                <DateTimePicker
                    label={props.label}
                    value={props.date}
                    minutesStep={30}
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
