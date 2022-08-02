import { Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { plantTreeActionKind } from './Enums';

export interface Location {
  lat: number | undefined;
  lng: number | undefined;
}

export interface Tree {
  id?: number;
  type: string;
  name: string;
  note?: string;
  carbonEmissions?: number;
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

export interface TreeComponentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  location?: Location;
  tree?: Tree;
  selectedTree?: Tree | null;
}

export interface MapContextInterface {
  trees: Array<Tree>;
  setTrees: Dispatch<PlantTreeAction>;
  theme?: Theme | null;
  setTheme?: Dispatch<SetStateAction<Theme | null>>;
  totalEmmissions: number;
  setTotalEmmissions: Dispatch<SetStateAction<number>>;
}

export interface MapComponentProps<T, R, S> {
  setMap: Dispatch<SetStateAction<T | null>>;
  setLocation?: Dispatch<SetStateAction<R>>;
  setOpen?: Dispatch<SetStateAction<S>>;
}

export interface InputFieldProps {
  label: string;
  required: boolean;
}

export interface DisplayFieldProps {
  label: string;
  name: string;
}
