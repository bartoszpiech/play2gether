import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { SportsType } from "Components/SearchBox/Sports";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect(props: any) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof props.sports>) => {
        const {
            target: { value },
        } = event;
        props.setSports(typeof value === "string" ? value.split(",") : value);
    };

    const printSports = (array: any) => {
        return array.map((name: any) => (
            <MenuItem key={name} value={name} style={getStyles(name, props.sports, theme)}>
                {name}
            </MenuItem>
        ));
    };

    return (
        <div>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Sport</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple={props.multiple}
                    value={props.sports}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >

                    {props.sportsType ? printSports(props.sportsType) : printSports(SportsType)}
                    
                </Select>
            </FormControl>
        </div>
    );
}
