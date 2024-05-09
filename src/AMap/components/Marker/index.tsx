import ReactDOM from 'react-dom';
import React, { useEffect, useRef, Fragment } from 'react';
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation, Marker } from '@uiw/react-amap';

const Demo = () => (
  <div>
    <Map style={{ height: 300 }}>
      <ScaleControl offset={[16, 30]} position="LB" />
      <ToolBarControl offset={[16, 10]} position="RB" />
      <ControlBarControl offset={[16, 180]} position="RB" />
      <Geolocation
        maximumAge={100000}
        borderRadius="5px"
        position="RB"
        offset={[16, 80]}
        zoomToAccuracy={true}
        showCircle={true}
      />
      <Marker visiable title="澳門特別行政區" position={new AMap.LngLat(113.54909,22.198951)} />
    </Map>
    <Map style={{ height: 300 }}>
      {/* {({ AMap, map, container }) => {
        return;
      }} */}
    </Map>
  </div>
);

const Mount = () => (
  <APILoader version="2.0.5" akey="a7a90e05a37d3f6bf76d4a9032fc9129">
    <Demo />
  </APILoader>
)
export default Mount