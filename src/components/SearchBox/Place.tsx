import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './Theme';

import { SmallHeading } from './styled/Heading';

const Places = [
    'Wrocław',
    'Warszawa',
    'Gdańsk',
    'Chełm',
];

/*
 * docs: https://mui.com/material-ui/react-autocomplete/
 * rozdział autocomplete -> google maps place
 */
export default function Place() {
  return (
    <ThemeProvider theme={ Theme }>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={ Places }
          renderInput={ (params) => <TextField {...params} label="Miejsce" /> }
          />
          <SmallHeading/>
          <Button variant="contained" size="large">Szukaj</Button>
    </ThemeProvider>
  );
}
