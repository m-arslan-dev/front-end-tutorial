import React from 'react';
import { Box, Modal, TextField, InputAdornment, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { TreeComponentProps } from '../Assets/Interfaces';
import ParkIcon from '@mui/icons-material/Park';
import '../Styles/_planttree.scss';

function TreeDetails(props: TreeComponentProps) {
  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className="modal-content">
        <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
          Tree Details
        </Typography>

        <TextField
          id="outlined-read-only-input"
          label="Name"
          margin="dense"
          variant="standard"
          className="modal-content-input"
          defaultValue={props.selectedTree?.name}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          id="outlined-read-only-input"
          label="Type"
          margin="dense"
          variant="standard"
          className="modal-content-input"
          defaultValue={props.selectedTree?.type}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <ParkIcon />
              </InputAdornment>
            ),
          }}
        />
        <br />
        <TextField
          id="outlined-read-only-input"
          label="Note"
          multiline
          margin="dense"
          variant="standard"
          className="modal-content-input"
          defaultValue={props.selectedTree?.note}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <EventNoteIcon />
              </InputAdornment>
            ),
          }}
        />
        <br />
      </Box>
    </Modal>
  );
}

export default TreeDetails;
