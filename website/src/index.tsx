import React from 'react';
import ReactDom from 'react-dom';
import './init';
import { App } from './App';

import './index.less';

ReactDom.render(<App />, document.querySelector('#app'));
