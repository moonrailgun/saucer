import './wdyr';

import React from 'react';
import ReactDom from 'react-dom';
import { App } from './App';

import './init';
import './index.less';
import 'antd/dist/antd.css';

ReactDom.render(<App />, document.querySelector('#app'));
