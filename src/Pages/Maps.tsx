import React, { useState, useCallback, useContext } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { REACT_APP_GOOGLE_MAPS_API_KEY, MAP_CENTER } from '../Assets/Variables';
import { Box, Fab } from '@mui/material';
import Planttree from '../Components/Planttree';
import { Location, Tree } from '../Assets/Interfaces';
import { MapContext } from '../ContextApi/ContextApi';
import NavigationIcon from '@mui/icons-material/Navigation';

function Maps() {
  const { trees } = useContext(MapContext);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>(MAP_CENTER);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const mapMarkers = trees.map((item: Tree) => (
    <div key={item.id}>
      <Marker
        position={{ lat: item.location.lat as number, lng: item.location.lng as number }}
        onClick={() => {
          alert(item.id + ' Clicked');
        }}
        icon={'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'}
      />
    </div>
  ));

  const addTree = (location: Location) => {
    setLocation(location);
    setOpen(true);
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
          }}
          options={{ fullscreenControl: false }}>
          {mapMarkers}
        </GoogleMap>
      </Box>
      <Planttree open={open} setOpen={setOpen} location={location} />
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
