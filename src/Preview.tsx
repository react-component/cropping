import * as React from 'react';

export default class Preview extends React.Component<any, any> {
  render() {
    const { prefixCls } = this.props;
    return <div className={`${prefixCls}-thumbnail-preview`}>
      <h4>预览</h4>
      <div className="2x-size">
        <img src="" alt=""/>
      </div>
      <div className="1x-size">
        <img src="" alt=""/>
      </div>
    </div>
  }
}