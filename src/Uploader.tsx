import * as React from 'react';
import Icon from './Icon';

export interface IFileMeta {
  name: string;
  type: string;
};

export interface IUploaderProps {
  onSelectImage: (file: File) => void;
  prefixCls?: string;
  accept?: string;
};

export default class Uploader extends React.Component<IUploaderProps, any> {

  refs: {
    file: HTMLInputElement;
  };

  onClick = (ev) => {
    const el = this.refs.file;
    if (!el) {
      return;
    }
    el.click();
  }

  selectFile = (ev) => {
    const file = this.refs.file.files[0];
    if (/image\/*/g.test(file.type)) {
      this.props.onSelectImage(file);
    }
  }
  render() {
    const { prefixCls, accept } = this.props;
    return (<span className={`${prefixCls}-btn ${prefixCls}-btn-ghost`} type="ghost" onClick={this.onClick}>
      <input type="file" ref="file" accept={accept} style={{display: 'none'}} onChange={this.selectFile}/>
      {this.props.children || <span><Icon type="upload" /> Click to Upload </span>}
    </span>);
  }
}
