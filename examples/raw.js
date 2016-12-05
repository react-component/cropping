// use jsx to render html, do not modify simple.html

import 'rc-cropping/assets/index.less';
import CropViewer, { Cropper } from 'rc-cropping';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';

function CropperContainer(props) {
  return <div>
    {props.title}
    {props.children}
    {props.footer}
  </div>;
}

const Test = React.createClass({
  getInitialState() {
    return {
      file: null,
      croppedFile: null,
    };
  },
  onChange(ev) {
    this.setState({ file: this.refs.file.files[0] });
  },
  croppeFile(fileBlob) {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      this.setState({
        croppedFile: reader.result,
      });
    }
  },
  render() {
    const { croppedFile, file } = this.state;
    if (croppedFile) {
      return <img src={croppedFile} />;
    }
    if (!file) {
      return <input type="file" onChange={this.onChange} ref="file" />
    }
    return <Cropper
      size={[64, 64]}
      file={this.state.file}
      getSpinContent={() => <span>loading...</span> }
      renderModal={(props) => <CropperContainer {...props} />}
      onChange={this.croppeFile}
    />;
  }
});

ReactDOM.render(<Test />, document.getElementById('__react-content'));
