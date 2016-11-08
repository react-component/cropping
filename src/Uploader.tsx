import * as React from 'react';
import { Button, Icon } from 'antd';

function isImage(file: File) {
  return file.type && /^image\//g.test(file.type);
}

export interface UploaderProps {
  onSelectImage: (reader: FileReader) => void;
  prefixCls?: string;
};

export default class Uploader extends React.Component<UploaderProps, any> {

  refs: {
    file: HTMLInputElement;
  }

  onClick = () => {
    const el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
  }
  
  selectFile = (ev) => {
    const reader = new FileReader();
    const file = this.refs.file.files[0];

    if (file && isImage(file)) {
      reader.readAsDataURL(file);
    }

    reader.onload = () => {
      this.props.onSelectImage(reader);
    }
  }
  render() {
    const { prefixCls } = this.props;
  return (<Button type="ghost" onClick={this.onClick}>
      <input type="file" ref="file" style={{display: 'none'}} onChange={this.selectFile}/>
      <Icon type="upload" /> Click to Upload
    </Button>);
  }
}