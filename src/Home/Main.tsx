import React, { useReducer, useEffect } from 'react';
import MapSection from '../Components/MapSection';
import { contextData } from '../ContextAPI/Context';
import data from '../Data/Marked.json';
import { actionKind } from '../Interfaces/Interface';
import { reducer } from '../ContextAPI/Reducer';

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
