import React, { useRef, useContext, useState } from 'react';
import {
  Button,
  Tooltip,
  FormControl,
  InputLabel,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TreeComponentProps } from '../../Assets/Interfaces';
import '../../Styles/_planttree.scss';
import { MapContext } from '../../ContextApi/ContextApi';
import { plantTree } from '../../Scripts/MapConfigurations';
import { treeTypes } from '../../Assets/Enums';
import InputField from './InputField';

function PlantTree(props: TreeComponentProps) {
  const { setTrees, totalEmmissions, setTotalEmmissions } = useContext(MapContext);

  const [type, setType] = useState(treeTypes.Pine);
  const nameRef = useRef<HTMLInputElement>();
  const noteRef = useRef<HTMLInputElement>();

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as treeTypes);
  };

  const handleSubmit = () =>
    plantTree(nameRef, type, noteRef, props.location, props.setOpen, setTrees, totalEmmissions, setTotalEmmissions);

  const Selector = () => (
    <FormControl fullWidth margin="dense" required>
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label="Type"
        onChange={handleChange}>
        <MenuItem value={treeTypes.Pine}>Pine</MenuItem>
        <MenuItem value={treeTypes.Bonsai}>Bonsai</MenuItem>
        <MenuItem value={treeTypes.Neem}>Neem</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      <Dialog open={props.open} onClose={() => props.setOpen(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title" align="center">
          {'Tree Details'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" autoComplete="off" onSubmit={handleSubmit} className="input-modal">
            <InputField ref={nameRef} label="Name" required={true} />
            <Selector />
            <InputField ref={noteRef} label="Note" required={false} />
            <DialogActions>
              <Tooltip title="Plant A Tree" placement="bottom-end" arrow>
                <Button className="button" color="primary" variant="contained" type="submit">
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
