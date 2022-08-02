import { Dispatch } from 'react';

export enum treeType {
  whiteOak = 'White Oak',
  redMaple = 'Red Maple',
  hemlock = 'Hemlock',
}

export interface dataType {
  tree: string | undefined;
  name: string | undefined;
  note?: string | undefined;
  position: { lat: number; lng: number };
}

export interface contextType {
  data: Array<dataType>;
  setData: Dispatch<actionContext>;
}

export enum actionKind {
  add = 'add',
  init = 'init',
}

export interface actionContext {
  type: actionKind;
  payload: { data?: dataType; trees?: Array<dataType> };
}
