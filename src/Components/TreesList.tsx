import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { TreeComponentProps } from '../Assets/Interfaces';
import { MapContext } from '../ContextApi/ContextApi';
import { getTreesList } from '../Scripts/TreeList';
import '../Styles/_planttree.scss';

function TreesList(props: TreeComponentProps) {
  const { trees } = useContext(MapContext);

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title" align="center">
        {'Trees List'}
      </DialogTitle>
      <DialogContent>{getTreesList(trees)}</DialogContent>
    </Dialog>
  );
}

export default TreesList;
