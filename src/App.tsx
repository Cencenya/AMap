import React, { useEffect, useRef, useState } from 'react';
import _AMap, { AMap } from './AMap/index';
import { AMapKey } from './config/index';
import './index.module.less';
import './index.css';
import { ConfigProvider, DatePicker, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import TreeSelectDeom from './components/TreeSelect';
import Waterfall from './components/CustomTable';
function App() {

  return (
    <main className='main'>
      <TreeSelectDeom />
      <Waterfall />
    </main>

  );
}



export default App;
