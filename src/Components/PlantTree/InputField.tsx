import React, { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { InputFieldProps } from '../../Assets/Interfaces';

const InputField = forwardRef((props: InputFieldProps, ref) => {
  const RenderIcon = () => {
    return props.label === 'Note' ? <EventNoteIcon /> : <AccountCircle />;
  };

  return (
    <TextField
      required={props.required}
      inputRef={ref}
      margin="dense"
      label={props.label}
      variant="standard"
      multiline={!props.required}
      className="modal-content-input"
      InputProps={{
        startAdornment: <InputAdornment position="start">{<RenderIcon />}</InputAdornment>,
      }}
    />
  );
});

InputField.displayName = 'InputField';

export default InputField;
