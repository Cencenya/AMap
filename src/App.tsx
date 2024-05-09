import React, { useEffect, useRef, useState } from 'react';
import _AMap, { AMap } from './AMap/index';
import { AMapKey } from './config/index';
import './index.module.less';
import './index.css';
import { ConfigProvider, DatePicker, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import TreeSelectDeom from './components/TreeSelect';
import Waterfall from './components/CustomTable';
import { Map, APILoader, Marker } from '@uiw/react-amap';
function App() {


  
  return (
    <main className='main'>
      <TreeSelectDeom />
      <Waterfall />
      <Mount/>
    </main>

  );
}

const Mount = () => (
  <APILoader akey="a7a90e05a37d3f6bf76d4a9032fc9129">
    <Example />
  </APILoader>
);


const Example = ()=>{
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(1);
  console.log('AMap',window.AMap);
  
  return  <Map zoom={4}>
  <Marker
    visiable={show}
    title="北京市"
    // label={{
    //   // 设置文本标注内容
    //   content: "<div class='info'>我是 marker 222的 label 标签</div>",
    //   // 设置文本标注方位
    //   direction: 'right'
    // }}
    draggable
    bubble={true}
    // content="<div>我是 marker 的 label 标签</div>"
    position={new window.AMap.LngLat(113.280637,23.125178)}
    onClick={(event)=> console.log('event',event)}
  >
    <>
    <div
      style={{
        height: '32px',
        width: '23px',
        margin: '-31px 0 0 -10px',
        background: 'url(https://amap.com/assets/img/poi-marker.png) 437px 267px',
        backgroundSize: '437px 267px',
        backgroundPosition: '-9px -3px'
      }}
    />
    <div>
      我是 marker 的 {count} label 标签
      <button onClick={() => setCount(count + 1)}>
        {count} 点击 + 1
      </button>
    </div>
    </>
    
  </Marker>
</Map>
}



export default App;
