import React, { useReducer, useState } from 'react';
import Maps from './Pages/Maps';
import InitData from './MockData/InitData.json';
import { plantTree } from './Reducers/Trees';
import { MapContext } from './ContextApi/ContextApi';
import { lightTheme } from './Assets/Variables';
import { ThemeProvider, Theme, CssBaseline } from '@mui/material';

function App() {
  const [trees, setTrees] = useReducer(plantTree, InitData.Trees);
  const [theme, setTheme] = useState<Theme | null>(lightTheme);
  const [totalEmmissions, setTotalEmmissions] = useState<number>(InitData.TotalEmmissions);

  return (
    <div>
      <ThemeProvider theme={theme ? theme : lightTheme}>
        <CssBaseline />
        <MapContext.Provider value={{ trees, setTrees, theme, setTheme, totalEmmissions, setTotalEmmissions }}>
          <Maps />
        </MapContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
