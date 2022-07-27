import React, { useEffect, useReducer, useState } from 'react';
import Maps from './Pages/Maps';
import InitData from './MockData/InitData.json';
import { plantTree } from './Reducers/Trees';
import { MapContext } from './ContextApi/ContextApi';
import { plantTreeActionKind, lightTheme } from './Assets/Variables';
import { ThemeProvider, Theme } from '@mui/material';

function App() {
  const [trees, setTrees] = useReducer(plantTree, InitData.Trees);
  const [theme, setTheme] = useState<Theme | null>(lightTheme);

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
      <ThemeProvider theme={theme ? theme : lightTheme}>
        <MapContext.Provider value={{ trees, setTrees, theme, setTheme }}>
          <Maps />
        </MapContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
