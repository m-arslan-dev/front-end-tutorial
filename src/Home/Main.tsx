import React, { useReducer, useEffect } from 'react';
import MapSection from '../Components/MapSection';
import { contextData } from '../ContextAPI/Context';
import data from '../Data/Marked.json';
import { dataType, actionContext, actionKind } from '../Interfaces/Interface';

const reducer = (state: Array<dataType>, action: actionContext) => {
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

const App = () => {
  const [state, dispatch] = useReducer(reducer, data);

  useEffect(() => {
    const items = JSON.parse(window.localStorage.getItem('items') as string);
    dispatch({ type: actionKind.init, payload: { trees: items } });
  }, []);

  useEffect(() => {
    window.localStorage.setItem('items', JSON.stringify(state));
  }, [state]);

  return (
    <div>
      <contextData.Provider value={{ data: state, setData: dispatch }}>
        <MapSection />
      </contextData.Provider>
    </div>
  );
};

export default App;
