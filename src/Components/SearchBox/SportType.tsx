import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './Theme';
import { Sports } from './Sports';

export default function SportType() {
  return (
    <ThemeProvider theme={ Theme }>
        <Autocomplete
          multiple
          disablePortal
          size="small"
          limitTags={ 2 }
          id="combo-box-demo"
          options={ Sports }
          renderInput={ (params) => <TextField {...params} label="Sport" /> }
          />
    </ThemeProvider>
  );
}
