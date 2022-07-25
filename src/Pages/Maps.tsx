import React, { useState, useCallback, useReducer } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { REACT_APP_GOOGLE_MAPS_API_KEY, MAP_CENTER } from '../Assets/Variables';
import { Button, Box } from '@mui/material';
import { trees } from '../Assets/InitData';
import Planttree from '../Components/Planttree';
import { Location } from '../Assets/Interfaces';
import { plantTree } from '../TypeScript/Reducers/Trees';

function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [tree, setTrees] = useReducer(plantTree, trees);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const mapMarkers = tree.map((item) => (
    <div key={item.id}>
      <Marker position={{ lat: item.location.lat as number, lng: item.location.lng as number }} />
    </div>
  ));

  const addTree = (location: Location) => {
    setOpen(true);
    alert(location.lat + ' ' + location.lng);
  };

  return isLoaded ? (
    <div>
      <Box position="absolute" width="100vw" height="100vh">
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          center={MAP_CENTER}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(e) => {
            addTree({ lat: e.latLng?.lat(), lng: e.latLng?.lng() });
          }}>
          {mapMarkers}
        </GoogleMap>
      </Box>
      <Planttree open={open} setOpen={setOpen} setTrees={setTrees} />
      <Button
        sx={{ position: 'absolute' }}
        color="inherit"
        variant="contained"
        onClick={() => {
          map?.panTo(MAP_CENTER);
        }}>
        Center
      </Button>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Maps);
