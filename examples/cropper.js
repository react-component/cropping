// use jsx to render html, do not modify simple.html
import 'rc-cropping/assets/index.less';
import CropViewer from 'rc-cropping';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import Upload from 'rc-upload';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  beforeUpload(file) {
    const cropper = this.cropper;
    console.log('>> cropper', this.cropper);
    return cropper.selectImage(file).then(image => {
      console.log('>> selecTImage', image);
      return image;
    });
  }
  render() {
    return (<div>
      <Upload type="drag" beforeUpload={this.beforeUpload} ><a>开始上传</a></Upload>
      <CropViewer
        getSpinContent={() => <span>loading...</span> }
        renderModal={() => <Dialog />}
        locale="zh-CN"
        ref={ele => this.cropper = ele}
        circle
      />
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('__react-content'));
