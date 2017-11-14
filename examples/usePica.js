// use jsx to render html, do not modify simple.html
import React from 'react';
import ReactDOM from 'react-dom';
import CropViewer from 'rc-cropping';
import Dialog from 'rc-dialog';

import pica from 'pica';

import 'rc-cropping/assets/index.less';
import 'rc-dialog/assets/index.css';

function resizer(from, to) {
  console.log('>> pica resizer', from, to);
  return pica().resize(from, to);
}

ReactDOM.render(<CropViewer
  getSpinContent={() => <span>loading...</span> }
  renderModal={() => <Dialog />}
  locale="zh-CN"
  resizer={resizer}
  circle
/>, document.getElementById('__react-content'));
