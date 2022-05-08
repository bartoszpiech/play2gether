import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './Theme';

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

export default function SportsDatePicker(props: SportsDatePickerProps) {
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <ThemeProvider theme={ Theme }>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={props.label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </ThemeProvider>
  );
}
