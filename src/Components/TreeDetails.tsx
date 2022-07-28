import React from 'react';
import { TextField, InputAdornment, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { TreeComponentProps } from '../Assets/Interfaces';
import ParkIcon from '@mui/icons-material/Park';
import '../Styles/_planttree.scss';

function TreeDetails(props: TreeComponentProps) {
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title" align="center">
        {'Tree Details'}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-read-only-input"
          label="Name"
          margin="dense"
          variant="standard"
          className="modal-content-input"
          defaultValue={props.selectedTree?.name}
          sx={{ width: '100%' }}
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
          sx={{ width: '100%' }}
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
          sx={{ width: '100%' }}
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
        <TextField
          id="outlined-read-only-input"
          label="Carbon Emissions"
          multiline
          margin="dense"
          variant="standard"
          sx={{ width: '100%' }}
          className="modal-content-input"
          defaultValue={props.selectedTree?.carbonEmissions}
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
      </DialogContent>
    </Dialog>
  );
}

export default TreeDetails;
