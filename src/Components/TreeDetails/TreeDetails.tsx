import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { TreeComponentProps } from '../../Assets/Interfaces';
import '../../Styles/_planttree.scss';
import DisplayField from './DisplayField';

function TreeDetails(props: TreeComponentProps) {
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title" align="center">
        {'Tree Details'}
      </DialogTitle>
      <DialogContent className="input-modal">
        <DisplayField name={props.selectedTree?.name ? props.selectedTree?.name : 'Name'} label="Name" />
        <DisplayField name={props.selectedTree?.type ? props.selectedTree?.type : 'Type'} label="Type" />
        <DisplayField name={props.selectedTree?.note ? props.selectedTree?.note : 'Note'} label="Note" />
        <DisplayField
          name={
            props.selectedTree?.carbonEmissions ? props.selectedTree?.carbonEmissions.toString() : 'Carbon Emissions'
          }
          label="Carbon Emissions"
        />
      </DialogContent>
    </Dialog>
  );
}

export default TreeDetails;
