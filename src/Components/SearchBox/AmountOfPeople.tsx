import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./Theme";

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

function AmountOfPeople(props: any) {
    return (
        <ThemeProvider theme={Theme}>
            <Box>
                <Slider
                    aria-label="Temperature"
                    getAriaValueText={valuetext}
                    step={1}
                    value={props.placesAvailable}
                    onChange={(event, value) => props.setPlacesAvailable(value)}
                    min={0}
                    max={30}
                    valueLabelDisplay="on"
                />
            </Box>
        </ThemeProvider>
    );
}

export default AmountOfPeople;
