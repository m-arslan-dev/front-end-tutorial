import React, { useState, memo, useContext, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';
import { key } from '../Keys/APIkey';
import 'antd/dist/antd.css';
import { contextData } from '../ContextAPI/Context';
import { actionKind } from '../Interfaces/Interface';
import { dataType } from '../Interfaces/Interface';
import { Button, Modal } from 'antd';

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

  useEffect(() => {
    const emission = JSON.parse(window.localStorage.getItem('emissions') as string);
    if (emission) setEmissions(emission);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('emissions', JSON.stringify(emissions));
  }, [emissions]);

  const containerStyle = {
    width: '100vw',
    height: '100vh',
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrPos({ lat: position.coords.latitude, lng: position.coords.longitude });
      setCurrZoom(20);
    });
  };

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

  const handleSubmit = () => {
    if (treee.current.value != '' && namee.current.value != '') {
      const pload: dataType = {
        tree: treee.current.value,
        name: namee.current.value,
        position: { lat: latt, lng: lngg },
        note: notee.current.value,
      };
      setData({ type: actionKind.add, payload: { data: pload } });
      setIsModalVisible(false);
      if (treee.current.value === 'White Oak') setEmissions((prevState) => prevState + 5);
      else if (treee.current.value === 'Red Maple') setEmissions((prevState) => prevState + 10);
      else if (treee.current.value === 'Hemlock') setEmissions((prevState) => prevState + 15);
      treee.current.value = '';
      namee.current.value = '';
      notee.current.value = '';
    } else {
      setIsModalVisible(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setIsModalVisible(true);
    setLatt(event.latLng.lat());
    setLngg(event.latLng.lng());
  };

  const emissionReduced = (treeetype: string) => {
    if (treeetype === 'White Oak') return 5;
    if (treeetype === 'Red Maple') return 10;
    if (treeetype === 'Hemlock') return 15;
  };

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
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
      <Modal
        title="Plant a Tree"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsModalVisible(false);
            }}>
            Cancel
          </Button>,
          <Button key="link" type="primary" onClick={handleSubmit}>
            Plant a Tree
          </Button>,
        ]}>
        <div className="grid-container">
          <div className="grid-item">
            <label className="label-margin">Select Tree Type*</label>
          </div>
          <div className="grid-item">
            <select name="tree" id="tree" ref={treee}>
              <option value="White Oak">White Oak</option>
              <option value="Red Maple">Red Maple</option>
              <option value="Hemlock">Hemlock</option>
            </select>
          </div>

          <br />
          <div className="grid-container">
            <div className="grid-item">
              <label className="label-margin">Name*</label>
            </div>
            <div className="grid-item">
              <input ref={namee} id="name" type="text" />
            </div>
          </div>
          <br />
          <div className="grid-container">
            <div className="grid-item">
              <label className="label-margin">Note</label>
            </div>
            <div className="grid-item">
              <input ref={notee} id="note" type="text" />
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Total Trees Planted"
        visible={isModalVisible_list}
        onOk={() => {
          setIsModalVisible_list(false);
        }}
        onCancel={() => {
          setIsModalVisible_list(false);
        }}>
        {data.map(({ tree, name }, i) => (
          <div key={i}>
            <li>
              Name: {name}, &nbsp; Type of Tree: {tree}, &nbsp; Emissions reduced: {emissionReduced(tree)}
            </li>
          </div>
        ))}
      </Modal>
      ;
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MapSection);
