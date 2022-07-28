import React, { useContext, useState } from 'react';
import { darkTheme, lightTheme, MAP_CENTER, Item } from '../Assets/Variables';
import { Fab, Switch, Button } from '@mui/material';
import PlantTree from '../Components/PlantTree';
import TreesList from '../Components/TreesList';
import { Location } from '../Assets/Interfaces';
import NavigationIcon from '@mui/icons-material/Navigation';
import Map from '../Components/Map';
import { loadMap } from '../Scripts/MapConfigurations';
import { MapContext } from '../ContextApi/ContextApi';

function Maps() {
  const { theme, setTheme, totalEmmissions, trees } = useContext(MapContext);
  const isLoaded = loadMap();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openTreesList, setOpenTrees] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>(MAP_CENTER);
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (setTheme) theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  };

  const totalEmmissionsClicked = () => {
    setOpenTrees(true);
  };

  return isLoaded ? (
    <div>
      <Map setMap={setMap} setLocation={setLocation} setOpen={setOpen} />
      <PlantTree open={open} setOpen={setOpen} location={location} />
      <TreesList open={openTreesList} setOpen={setOpenTrees} />

      <Button
        sx={{
          position: 'absolute',
          right: 20,
          bottom: '4vh',
        }}
        onClick={totalEmmissionsClicked}>
        <Item key={4} elevation={10} sx={{ paddingX: 1 }}>
          {`Emmissions=${totalEmmissions} `}
          {`Count=${trees.length}`}
        </Item>
      </Button>

      <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />

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
