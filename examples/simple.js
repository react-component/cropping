// use jsx to render html, do not modify simple.html

import 'rc-cropping/assets/index.less';
import CropViewer from 'rc-cropping';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<CropViewer circle={true} />, document.getElementById('__react-content'));
