import React, { useEffect, useReducer } from 'react';
import Maps from './Pages/Maps';
import InitData from './MockData/InitData.json';
import { plantTree } from './Reducers/Trees';
import { MapContext } from './ContextApi/ContextApi';
import { plantTreeActionKind } from './Assets/Variables';
function App() {
  const [trees, setTrees] = useReducer(plantTree, InitData.Trees);

  useEffect(() => {
    const treesData = JSON.parse(window.localStorage.getItem('trees') as string);
    setTrees({
      type: plantTreeActionKind.INITIALIZE,
      payload: {
        trees: treesData,
      },
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem('trees', JSON.stringify(trees));
  }, [trees]);

  return (
    <div>
      <MapContext.Provider value={{ trees, setTrees }}>
        <Maps />
      </MapContext.Provider>
    </div>
  );
}

export default App;
