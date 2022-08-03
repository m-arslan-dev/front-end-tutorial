import { dataType, actionContext, actionKind } from '../Interfaces/Interface';

export const reducer = (state: Array<dataType>, action: actionContext) => {
  if (action.type === actionKind.add)
    return [
      ...state,
      {
        tree: action.payload.data.tree,
        name: action.payload.data.name,
        position: action.payload.data.position,
        note: action.payload.data.note,
      },
    ];
  else if (action.type === actionKind.init) {
    return action.payload.trees;
  }
  return state;
};
