import { Dispatch, SetStateAction } from 'react';
import { plantTreeActionKind } from './Variables';

export interface Location {
  lat: number | undefined;
  lng: number | undefined;
}

export interface Tree {
  id?: number;
  type: string;
  name: string;
  note?: string;
  location: Location;
}

interface PlantTreeActionPayload {
  trees?: Array<Tree>;
  tree?: Tree;
}

export interface PlantTreeAction {
  type: plantTreeActionKind;
  payload: PlantTreeActionPayload;
}

export interface PlantTreeProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  location: Location;
}

export interface MapContextInterface {
  trees: Array<Tree>;
  setTrees: Dispatch<PlantTreeAction>;
}
