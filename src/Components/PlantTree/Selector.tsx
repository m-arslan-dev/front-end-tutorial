import React from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SelectorProps } from '../../Assets/Interfaces';
import { treeTypes } from '../../Assets/Enums';

const Selector = (props: SelectorProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.setValue(event.target.value as treeTypes);
  };

  return (
    <FormControl fullWidth margin="dense" required>
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        label={props.label}
        onChange={handleChange}>
        <MenuItem value={treeTypes.Pine}>Pine</MenuItem>
        <MenuItem value={treeTypes.Bonsai}>Bonsai</MenuItem>
        <MenuItem value={treeTypes.Neem}>Neem</MenuItem>
      </Select>
    </FormControl>
  );
};

Selector.displayName = 'Selector';

export default Selector;
