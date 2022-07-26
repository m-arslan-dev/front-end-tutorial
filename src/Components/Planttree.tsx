import React, { useRef, useContext } from 'react';
import { Button, Box, Modal, Typography, TextField, Tooltip } from '@mui/material';
import { PlantTreeProps } from '../Assets/Interfaces';
import '../Styles/_planttree.scss';
import { plantTreeActionKind } from '../Assets/Variables';
import { MapContext } from '../ContextApi/ContextApi';

function Planttree(props: PlantTreeProps) {
  const { setTrees } = useContext(MapContext);

  const nameRef = useRef<HTMLInputElement>();
  const typeRef = useRef<HTMLInputElement>();
  const noteRef = useRef<HTMLInputElement>();

  const plantTree = () => {
    if (nameRef.current && typeRef.current && noteRef.current) {
      setTrees({
        type: plantTreeActionKind.PLANT,
        payload: {
          tree: {
            type: typeRef.current.value,
            name: nameRef.current.value,
            note: noteRef.current.value,
            location: props.location,
          },
        },
      });
    }
    props.setOpen(false);
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box
        className="modal-content"
        component="form"
        onSubmit={() => {
          plantTree();
        }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Plant A Tree
        </Typography>
        <TextField
          required
          inputRef={nameRef}
          margin="dense"
          label="Name"
          variant="standard"
          className="modal-content-input"
        />
        <br />
        <TextField
          required
          inputRef={typeRef}
          margin="dense"
          label="Type"
          variant="standard"
          className="modal-content-input"
        />
        <br />
        <TextField inputRef={noteRef} margin="dense" label="Note" variant="standard" className="modal-content-input" />
        <br />
        <Tooltip title="Plant A Tree" placement="bottom-end" arrow>
          <Button className="button" color="primary" variant="contained" type="submit">
            Plant Tree
          </Button>
        </Tooltip>
      </Box>
    </Modal>
  );
}

export default Planttree;
