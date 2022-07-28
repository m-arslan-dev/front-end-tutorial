import React from 'react';
import { Tree } from '../Assets/Interfaces';
import { List, ListItem, ListItemText } from '@mui/material';

export const getTreesList = (trees: Array<Tree>) => {
  const treesList = (
    <List>
      {trees.map((item) => (
        <ListItem key={item.id} sx={{ width: '100%' }}>
          <ListItemText
            primary={`${item.id}. ${item.name}`}
            secondary={`Tree: ${item.type} --- Emmission: ${item.carbonEmissions}`}
          />
        </ListItem>
      ))}
    </List>
  );
  return treesList;
};
