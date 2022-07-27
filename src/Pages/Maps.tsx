import React, { useContext, useState } from 'react';
import { lightTheme, MAP_CENTER } from '../Assets/Variables';
import { Fab } from '@mui/material';
import PlantTree from '../Components/PlantTree';
import { Location } from '../Assets/Interfaces';
import NavigationIcon from '@mui/icons-material/Navigation';
import Map from '../Components/Map';
import { loadMap } from '../Scripts/MapConfigurations';
import { ThemeProvider } from '@mui/material';
import { MapContext } from '../ContextApi/ContextApi';

function Maps() {
  const { theme } = useContext(MapContext);
  const isLoaded = loadMap();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>(MAP_CENTER);

  return isLoaded ? (
    <div>
      <ThemeProvider theme={theme ? theme : lightTheme}>
        <Map setMap={setMap} setLocation={setLocation} setOpen={setOpen} />
        <PlantTree open={open} setOpen={setOpen} location={location} />
      </ThemeProvider>

      <Fab
        variant="extended"
        size="medium"
        color="primary"
        sx={{ position: 'absolute', right: 20, top: '4vh' }}
        onClick={() => {
          map?.panTo(MAP_CENTER);
        }}>
        <NavigationIcon sx={{ mr: 1 }} />
        Center
      </Fab>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Maps);
