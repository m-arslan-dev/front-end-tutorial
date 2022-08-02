import React, { useContext, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { MAP_CENTER, assasinMapStyle } from '../Assets/Variables';
import { Box } from '@mui/material';
import { Location, MapComponentProps, Tree } from '../Assets/Interfaces';
import { MapContext } from '../ContextApi/ContextApi';
import { onUnmount, onLoad, makeTreeMarkers } from '../Scripts/MapConfigurations';
import TreeDetails from './TreeDetails/TreeDetails';

function Map(props: MapComponentProps<google.maps.Map, Location, boolean>) {
  const { trees } = useContext(MapContext);
  const [open, setOpen] = useState(false);
  const onLoadMap = onLoad(props.setMap);
  const onUnmountMap = onUnmount(props.setMap);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const mapMarkers = makeTreeMarkers(trees, setOpen, setSelectedTree);

  const addTree = (location: Location) => {
    if (props.setLocation) props.setLocation(location);
    if (props.setOpen) props.setOpen(true);
  };

  return (
    <div>
      <Box position="absolute" width="100vw" height="100vh">
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          center={MAP_CENTER}
          zoom={16}
          onLoad={onLoadMap}
          onUnmount={onUnmountMap}
          onClick={(e) => {
            addTree({ lat: e.latLng?.lat(), lng: e.latLng?.lng() });
          }}
          options={{ fullscreenControl: false, zoomControl: false, styles: assasinMapStyle }}>
          {mapMarkers}
        </GoogleMap>
      </Box>
      <TreeDetails open={open} setOpen={setOpen} selectedTree={selectedTree} />
    </div>
  );
}

export default Map;
