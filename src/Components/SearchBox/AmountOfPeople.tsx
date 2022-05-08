import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './Theme';

function valuetext(value: number) {
  return `${value}°C`;
}

/*
const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 15,
    label: '15',
  },
];
*/

export default function AmountOfPeople() {
  return (
    <ThemeProvider theme={ Theme }>
        <Box>
            <Slider
                aria-label="Temperature"
                defaultValue={1}
                getAriaValueText={valuetext}
                step={1}
                //marks={marks}
                min={1}
                max={15}
                valueLabelDisplay="on"
                />
        </Box>
    </ThemeProvider>
  );
}
