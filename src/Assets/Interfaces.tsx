import { Dispatch, SetStateAction } from 'react';
import { plantTreeActionKind } from './Variables';

export interface Location {
  lat: number | undefined;
  lng: number | undefined;
}

export interface Tree {
  id: number;
  type: string;
  name: string;
  note: string;
  location: Location;
}

export interface PlantTreeAction {
  type: plantTreeActionKind;
  payload: Tree;
}

export interface Display {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setTrees: Dispatch<PlantTreeAction>;
}
