import { Dispatch } from "react";

export enum treeType {
  whiteOak = 'White Oak',
  redMaple = 'Red Maple',
  hemlock = 'Hemlock'
}

export interface dataType {
    tree: string;
    name: string;
    note?: string;
    position:{lat: number, lng: number}
  }

export interface contextType {
  data: Array<dataType>,
  setData: Dispatch<actionContext>
}

export enum actionKind {
  add = 'add'
}

export interface actionContext {
  type: actionKind;
  payload: dataType;
}