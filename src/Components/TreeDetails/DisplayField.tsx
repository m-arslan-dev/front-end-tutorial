import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { DisplayFieldProps } from '../../Assets/Interfaces';
import ParkIcon from '@mui/icons-material/Park';

const DisplayField = (props: DisplayFieldProps) => {
  const RenderIcon = () => {
    return props.label === 'Name' ? <AccountCircle /> : props.label === 'Type' ? <ParkIcon /> : <EventNoteIcon />;
  };

  return (
    <TextField
      id="outlined-read-only-input"
      label={props.label}
      margin="dense"
      variant="standard"
      className="modal-content-input"
      defaultValue={props.name}
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <RenderIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

DisplayField.displayName = 'DisplayField';

export default DisplayField;
