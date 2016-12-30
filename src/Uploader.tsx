import * as React from 'react';
import Icon from './Icon';

export interface FileMeta {
  name: string;
  type: string;
};

export interface UploaderProps {
  onSelectImage: (file: File) => void;
  prefixCls?: string;
};

export default class Uploader extends React.Component<UploaderProps, any> {

  refs: {
    file: HTMLInputElement;
  };

  onClick = () => {
    const el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
  }

  selectFile = (ev) => {
    const file = this.refs.file.files[0];
    this.props.onSelectImage(file);
  }
  render() {
    const { prefixCls } = this.props;
    return (<button className={`${prefixCls}-btn ${prefixCls}-btn-ghost`} type="ghost" onClick={this.onClick}>
      <input type="file" ref="file" accept="image/*" style={{display: 'none'}} onChange={this.selectFile}/>
      {this.props.children || <span><Icon type="upload" /> Click to Upload </span>}
    </button>);
  }
}
