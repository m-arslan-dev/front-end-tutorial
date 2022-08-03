import React, { useRef, useContext, useState } from 'react';
import { Button, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { TreeComponentProps } from '../../Assets/Interfaces';
import '../../Styles/_planttree.scss';
import { MapContext } from '../../ContextApi/ContextApi';
import { plantTree } from '../../Scripts/MapConfigurations';
import { treeTypes } from '../../Assets/Enums';
import InputField from './InputField';
import Selector from './Selector';

function PlantTree(props: TreeComponentProps) {
  const { setTrees, totalEmmissions, setTotalEmmissions } = useContext(MapContext);

  const [type, setType] = useState(treeTypes.Pine);
  const nameRef = useRef<HTMLInputElement>();
  const noteRef = useRef<HTMLInputElement>();

  const handleSubmit = () =>
    plantTree(nameRef, type, noteRef, props.location, props.setOpen, setTrees, totalEmmissions, setTotalEmmissions);

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
            <Selector value={type} setValue={setType} label="Type" />
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
