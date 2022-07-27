import React, { useRef, useContext, useState } from 'react';
import {
  Button,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TreeComponentProps } from '../Assets/Interfaces';
import '../Styles/_planttree.scss';
import { MapContext } from '../ContextApi/ContextApi';
import { plantTree } from '../Scripts/MapConfigurations';
import { AccountCircle } from '@mui/icons-material';
import EventNoteIcon from '@mui/icons-material/EventNote';

function PlantTree(props: TreeComponentProps) {
  const { setTrees } = useContext(MapContext);

  const [type, setType] = useState('Pine');
  const nameRef = useRef<HTMLInputElement>();
  const noteRef = useRef<HTMLInputElement>();

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <form
      onSubmit={() => {
        plantTree(nameRef, type, noteRef, props.location, props.setOpen, setTrees);
      }}>
      <Dialog open={props.open} onClose={() => props.setOpen(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" align="center">
          {'Tree Details'}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={() => {
              plantTree(nameRef, type, noteRef, props.location, props.setOpen, setTrees);
            }}>
            <TextField
              required
              inputRef={nameRef}
              margin="dense"
              label="Name"
              variant="standard"
              className="modal-content-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <br />
            <FormControl fullWidth margin="dense" required>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={handleChange}>
                <MenuItem value={'Pine'}>Pine</MenuItem>
                <MenuItem value={'Bonsai'}>Bonsai</MenuItem>
                <MenuItem value={'Neem'}>Neem</MenuItem>
              </Select>
            </FormControl>

            <TextField
              inputRef={noteRef}
              margin="dense"
              label="Note"
              variant="standard"
              multiline
              className="modal-content-input"
              sx={{ width: '100%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventNoteIcon />
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <br />
            <DialogActions>
              <Tooltip title="Plant A Tree" placement="bottom-end" arrow>
                <Button className="button" color="primary" variant="contained" type="submit" sx={{ align: 'center' }}>
                  Plant Tree
                </Button>
              </Tooltip>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </form>
  );
}

export default PlantTree;
