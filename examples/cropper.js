// use jsx to render html, do not modify simple.html

import 'rc-cropping/assets/index.less';
import CropViewer from 'rc-cropping';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import Upload from 'rc-upload';
import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  beforeUpload(file) {
    const cropper = this.cropper;
    console.log('>> cropper', this.cropper);
    return cropper.selectImage(file).then(file => {
      console.log('>> selecTImage', file);
      return file;
    });
  },
  render() {
    return <div>
      <Upload type="drag" beforeUpload={this.beforeUpload} ><a>开始上传</a></Upload>
      <CropViewer
        getSpinContent={() => <span>loading...</span> }
        renderModal={() => <Dialog />}
        circle={true}
        locale='zh-CN'
        ref={ele => this.cropper = ele}
      />
    </div>
  }
});

ReactDOM.render(<App />, document.getElementById('__react-content'));
