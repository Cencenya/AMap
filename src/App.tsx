import React, { useEffect, useRef, useState } from 'react';
import _AMap, { AMap } from './AMap/index';
import { AMapKey } from './config/index';
import './index.module.less';
import './index.css';
function App() {
  const firstRender = useRef<boolean>();

  const [map, setMap] = useState()

  useEffect(() => {
    if (!firstRender.current) {
      firstRender.current = true;
      return;
    }
    initMap();

  }, [])
  const initMap = async () => {
    const newMap = new _AMap();
    await newMap.init({
      key: AMapKey,
      version: "2.0",
      plugins: ['AMap.Scale']
    },)
    const lnglat = new window.AMap.LngLat(106.122082, 33.719192);
    // newMap.createCountryDistrictLayer({
    //   zIndex: 10,
    //   SOC: 'CHN',
    //   depth: 1,
    //   styles: {
    //     'nation-stroke': '#ff0000',
    //     'coastline-stroke': '#0088ff',
    //     'province-stroke': 'grey',
    //   }
    // })
    await newMap.createMapInstance('container', {
      zooms: [4, 8],
      center: [105.602725, 37.076636],
      zoom: 4,
      isHotspot: false,
      defaultCursor: 'pointer',
      viewMode: '3D',
    })




  }
  return (
    <main className='main'>
      <div id="container" style={{
        width: '100%',
        height: '100%'
      }}>
      </div>
    </main>

  );
}



export default App;
