import React, { useState, memo, useContext, useRef } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';
import { key } from '../Keys/APIkey';
import 'antd/dist/antd.css';
import { contextData } from '../ContextAPI/Context';
import { contextType } from '../Interfaces/Interface';
import { actionKind } from '../Interfaces/Interface';
import { dataType, treeType } from '../Interfaces/Interface';
import { Button, Modal, Space, Table } from 'antd';

function MapSection() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [latt, setLatt] = useState(0);
  const [lngg, setLngg] = useState(0);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const treee = useRef<HTMLSelectElement>(null);
  const namee = useRef<HTMLInputElement>(null);
  const notee = useRef<HTMLInputElement>(null);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const containerStyle = {
    width: '100vw',
    height: '100vh',
  };

  const initialCenter = {
    lat: 41.881832,
    lng: -87.623177,
  };

  const { data, setData } = useContext(contextData);
  //console.log(data);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key.GoogleMapsAPI,
  });

  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

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

  const handleSubmit = () => {
    // event.preventDefault();
    if (treee.current != null && namee.current != null) {
      const pload: dataType = {
        tree: treee.current.value,
        name: namee.current.value,
        position: { lat: latt, lng: lngg },
        note: notee.current?.value,
      };
      setData({ type: actionKind.add, payload: pload });
      treee.current.value = '';
      namee.current.value = '';
      // notee.current.value = '';
      setIsModalVisible(false);
    }
    console.log(data);
  };

  const handleClick = (event: any) => {
    showModal();
    setLatt(event.latLng.lat());
    setLngg(event.latLng.lng());
    // console.log(lat);
    // console.log(lng);
    // const pload: dataType = {
    //   tree: treeType.whiteOak,
    //   name: 'Talha',
    //   position: { lat: latt, lng: lngg },
    //   note: 'Planted',
    // };
    // setData({ type: actionKind.add, payload: pload });
  };

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialCenter}
      // zoom={5}
      onLoad={handleOnLoad}
      onUnmount={onUnmount}
      onClick={(e) => {
        handleClick(e);
      }}>
      <Button type="primary">Current Location</Button>
      {data.map(({ tree, name, position }, i) => (
        <Marker key={i} position={position} onClick={() => handleActiveMarker(i)}>
          {/* {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
                <div>{name}</div>
              </div>
            </InfoWindow>
          ) : null} */}
        </Marker>
      ))}
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleSubmit} onCancel={handleCancel}>
        <div className="grid-container">
          <div className="grid-item">
            <label className="label-margin">Select Tree Type*</label>
            <select name="tree" id="tree" ref={treee}>
              <option value="WhiteOak">White Oak</option>
              <option value="RedMaple">Red Maple</option>
              <option value="Hemlock">Hemlock</option>
            </select>
          </div>

          <br />
          <div className="grid-container">
            <label className="label-margin">Name*</label>
            <input ref={namee} id="name" type="text" />
          </div>
          <br />
          <div className="grid-container">
            <label className="label-margin">Note</label>
            <input ref={notee} id="note" type="text" />
          </div>
        </div>
      </Modal>
      ;
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MapSection);
