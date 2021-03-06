// use jsx to render html, do not modify simple.html
import React from 'react';
import ReactDOM from 'react-dom';
import CropViewer from 'rc-cropping';
import Dialog from 'rc-dialog';

import 'rc-cropping/assets/index.less';
import 'rc-dialog/assets/index.css';

ReactDOM.render(<CropViewer
  getSpinContent={() => <span>loading...</span> }
  renderModal={() => <Dialog />}
  locale="zh-CN"
  circle
/>, document.getElementById('__react-content'));
