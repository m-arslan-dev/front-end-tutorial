import React, { useState, memo, useContext, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';
import { key } from '../Keys/APIkey';
import 'antd/dist/antd.css';
import { contextData } from '../ContextAPI/Context';
import { Button } from 'antd';
import PlantTreeModal from '../Components/PlantTreeModal';
import Modal_List from './Modal_List';
import { emissionReduced } from '../Utility Functions/Emissions';
import { getCurrentLocation } from '../Utility Functions/currLoc';

function MapSection() {
  const { data, setData } = useContext(contextData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible_list, setIsModalVisible_list] = useState(false);
  const [latt, setLatt] = useState(0);
  const [lngg, setLngg] = useState(0);
  const [emissions, setEmissions] = useState(20);
  const [currPos, setCurrPos] = useState({ lat: 0, lng: 0 });
  const [currZoom, setCurrZoom] = useState(5);

  const treee = useRef<HTMLSelectElement>(null);
  const namee = useRef<HTMLInputElement>(null);
  const notee = useRef<HTMLInputElement>(null);

  const props = {
    VisibleFunc: setIsModalVisible,
    Visible: isModalVisible,
    VisibleList: isModalVisible_list,
    VisibleListFunc: setIsModalVisible_list,
    lt: latt,
    lg: lngg,
    D: data,
    setD: setData,
    setEm: setEmissions,
    TREE: treee,
    NAME: namee,
    NOTE: notee,
    ZoomFunc: setCurrZoom,
    PosFunc: setCurrPos,
  };

  useEffect(() => {
    const emission = JSON.parse(window.localStorage.getItem('emissions') as string);
    if (emission) setEmissions(emission);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('emissions', JSON.stringify(emissions));
  }, [emissions]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key.GoogleMapsAPI,
  });

  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [, setMap] = useState<google.maps.Map | null>(null);

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    data.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setIsModalVisible(true);
    setLatt(event.latLng.lat());
    setLngg(event.latLng.lng());
  };

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
      center={currPos}
      zoom={currZoom}
      onLoad={handleOnLoad}
      onUnmount={onUnmount}
      onClick={(e) => {
        handleClick(e);
      }}>
      <div style={{ display: 'flex' }}>
        <Button type="primary" id="curr" onClick={getCurrentLocation} style={{ marginRight: 'auto' }}>
          Current Location
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible_list(true);
          }}
          style={{ marginLeft: 'auto' }}>
          Carbon Emissions Reduced: {emissions}
        </Button>
      </div>
      {data.map(({ tree, name, position, note }, i) => (
        <Marker
          key={i}
          position={position}
          onClick={() => handleActiveMarker(i)}
          icon={{
            url: require('../../assets/' + tree + '.svg'),
            scaledSize: new google.maps.Size(45, 60),
          }}>
          {activeMarker === i ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
                <div>Name: {name}</div>
                <div>Type of Tree: {tree}</div>
                <div>Emissions reduced:{emissionReduced(tree)}</div>
                <div>{note}</div>
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
      {PlantTreeModal(props)}
      {Modal_List(props)};
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MapSection);
