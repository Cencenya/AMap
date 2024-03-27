import React, { useEffect, useRef, useState } from 'react';
import _AMap, { AMap } from './AMap/index';
import { AMapKey } from './config/index';
import './index.module.less';
import './index.css';
import { ConfigProvider, DatePicker, message } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import TreeSelectDeom from './components/TreeSelect';
function App() {

  return (
    <main className='main'>
      <TreeSelectDeom />
    </main>

  );
}



export default App;
