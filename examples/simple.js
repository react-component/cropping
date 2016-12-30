// use jsx to render html, do not modify simple.html

import 'rc-cropping/assets/index.less';
import CropViewer from 'rc-cropping';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<CropViewer
  getSpinContent={() => <span>loading...</span> }
  renderModal={() => <Dialog />}
  circle={true}
  locale='zh-CN'
/>, document.getElementById('__react-content'));
