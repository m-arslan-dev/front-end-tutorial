import React from 'react';
import { Button, Box, Modal, Typography, TextField } from '@mui/material';
import { Display } from '../Assets/Interfaces';
import '../Styles/_planttree.scss';

function Planttree(props: Display) {
  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className="modal-content" component="form" autoComplete="off">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new element
        </Typography>

        <TextField
          required
          margin="dense"
          id="outlined-required"
          label="RollNo"
          variant="standard"
          className="modal-content-input"
        />
        <br />
        <TextField
          required
          margin="dense"
          id="outlined-required"
          label="Name"
          variant="standard"
          className="modal-content-input"
        />
        <br />
        <TextField
          required
          margin="dense"
          id="outlined-required"
          label="Age"
          variant="standard"
          className="modal-content-input"
        />

        <br />
        <div className="add-button">
          <Button className="button" color="primary" variant="contained" type="submit">
            {' '}
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default Planttree;
