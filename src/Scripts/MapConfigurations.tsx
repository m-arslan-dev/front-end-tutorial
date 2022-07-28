import React, { Dispatch, SetStateAction, useCallback, MutableRefObject } from 'react';
import { REACT_APP_GOOGLE_MAPS_API_KEY } from '../Assets/Variables';
import { useJsApiLoader, Marker } from '@react-google-maps/api';
import { plantTreeActionKind, treeCarbonemmission, treeTypes } from '../Assets/Variables';
import { Tree, PlantTreeAction, Location } from '../Assets/Interfaces';

const onLoad = (setMap: Dispatch<SetStateAction<google.maps.Map | null>>) => {
  const load = useCallback(function callback(map: google.maps.Map) {
    if (setMap) setMap(map);
  }, []);
  return load;
};

const onUnmount = (setMap: Dispatch<SetStateAction<google.maps.Map | null>>) => {
  const unmount = useCallback(function callback() {
    if (setMap) setMap(null);
  }, []);
  return unmount;
};

const loadMap = (): boolean => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  return isLoaded ? true : false;
};

const makeTreeMarkers = (
  trees: Array<Tree>,
  setOpen?: Dispatch<SetStateAction<boolean>>,
  setSelectedTree?: Dispatch<SetStateAction<Tree | null>>
) => {
  return trees.map((item: Tree) => (
    <div key={item.id}>
      <Marker
        position={{ lat: item.location.lat as number, lng: item.location.lng as number }}
        onClick={() => {
          if (setSelectedTree) setSelectedTree(item);
          if (setOpen) setOpen(true);
        }}
        icon={{ url: require('../Assets/Images/' + item.type + 'Tree.png') }}
      />
    </div>
  ));
};

const plantTree = (
  name?: MutableRefObject<HTMLInputElement | undefined>,
  type?: string,
  note?: MutableRefObject<HTMLInputElement | undefined>,
  location?: Location,
  setOpen?: Dispatch<SetStateAction<boolean>>,
  setTrees?: Dispatch<PlantTreeAction>,
  totalEmmissions?: number,
  setTotalEmmissions?: Dispatch<SetStateAction<number>>
) => {
  if (name && note && location && type) {
    if (name.current && note.current && setTrees && setTotalEmmissions && totalEmmissions) {
      setTotalEmmissions(totalEmmissions + treeCarbonemmission[type as treeTypes]);
      setTrees({
        type: plantTreeActionKind.PLANT,
        payload: {
          tree: {
            type: type,
            name: name.current.value,
            note: note.current.value,
            location: location,
            carbonEmissions: treeCarbonemmission[type as treeTypes],
          },
        },
      });
    }
  }
  if (setOpen) setOpen(false);
};

export { onLoad, onUnmount, loadMap, makeTreeMarkers, plantTree };
