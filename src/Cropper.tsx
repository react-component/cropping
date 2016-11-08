import * as React from 'react';
import Scaler from './Scaler';
import { Button, Modal, Spin } from 'antd';
export type imageAttr = 'width' | 'height';

export interface ImageState {
  width: number;
  height: number;
  left: number;
  top: number;
  [x: string]: number;
};

let startX = 0;
let startY = 0;
let Δleft = 0;
let Δtop = 0;
let left = 0;
let top = 0;
let dragging = false;

function limit(value:number, limitArray: Array<number>): number{
  const min = Math.min(limitArray[0], limitArray[1]);
  const max = Math.max(limitArray[0], limitArray[1]);
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export default class Cropper extends React.Component<any, any> {
  refs: {
    viewport: HTMLElement,
    dragger: HTMLElement,
    dragNotice: HTMLElement,
  };

  constructor(props) {
    super(props);
    const { size } = props;
    let imageState;

    if (size[0] === size[1]) {
      imageState = {
        width: 320,
        height: 320,
      };
    } else {
      imageState = {
        height: 320,
        width: 320 / size[1] * size[0]
      } as ImageState;
    }

    console.log('>> imageState', imageState);
    this.state = {
      image: null,
      viewport: [imageState.width, imageState.height],
      width: 320,
      height: 320,
      dragging: false,
      scaleRange: [1, 1],
      scale: 1,
      visible: false,
    };
  }

  componentDidMount() {
    this.loadImage(this.props.image);
    document.addEventListener('mouseup', this.dragEnd);
    document.addEventListener('mousemove', this.dragOver);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.dragEnd);
    document.removeEventListener('mousemove', this.dragOver);
  }

  loadImage = (reader: FileReader) => {
    const image = new Image();
    // Although you can use images without CORS approval in your canvas, doing so taints the canvas. 
    // Once a canvas has been tainted, you can no longer pull data back out of the canvas. 
    // For example, you can no longer use the canvas toBlob(), toDataURL(), or getImageData() methods; 
    // doing so will throw a security error.

    // This protects users from having private data exposed by using images 
    // to pull information from remote web sites without permission.

    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = () => this.normalizeImage(image);
    image.src = reader.result;
  }

  scaleImage = (scale) => {
    if (scale === this.state.scale) {
      return;
    }

    const { width, height } = this.state.image;
    const imageState = {
      width: width * scale,
      height: height * scale,
    } as ImageState;
    this.setState({
      scale,
      width: imageState.width,
      height: imageState.height,
      widthLimit: [this.state.viewport[0] - imageState.width, 0],
      heightLimit: [this.state.viewport[1] - imageState.height, 0],
    });

    left = limit((this.state.viewport[0] - imageState.width) / 2 + Δleft, [this.state.viewport[0] - imageState.width, 0]);
    top = limit((this.state.viewport[1] - imageState.height) / 2 + Δtop, [this.state.viewport[1] - imageState.height, 0]); 
    this.applyPositions({ left, top });
  }
  applyImageState = (imageState) => {
    this.setState({
      width: imageState.width,
      height: imageState.height,
      widthLimit: [this.state.viewport[0] - imageState.width, 0],
      heightLimit: [this.state.viewport[1] - imageState.height, 0],
    });

    left = (this.state.viewport[0] - imageState.width) / 2;
    top = (this.state.viewport[1] - imageState.height) / 2; 
    this.applyPositions({ left, top });
  }
  // 初始化 Cropper，图片的尺寸会默认 fit 320 * 320
  normalizeImage = (image) => {
    const { width, height } = image;
    const { viewport } = this.state;

    const widthProportional = width / viewport[0]; 
    const heightProportional = height / viewport[1];   
    console.log('>> widthProportional', widthProportional, 'heightProportional', heightProportional);
    const ΔProportional = widthProportional / heightProportional;

    const IdpVar: imageAttr = ΔProportional > 1 ? 'height' : 'width'; // 自变量
    const depVar: imageAttr = ΔProportional > 1 ? 'width' : 'height'; // 因变量
    const scale = Number((viewport[Number(ΔProportional > 1)] / image[IdpVar]).toFixed(4));
    console.log('基准缩放属性：', IdpVar, ':', image[IdpVar], 'px, 缩放至:', viewport[Number(ΔProportional > 1)], 'px, 缩放比例：', scale);
    
    const imageState = {
      [IdpVar]: viewport[Number(ΔProportional > 1)],
      [depVar]: viewport[Number(ΔProportional > 1)] / viewport[Number(ΔProportional > 1)] * image[depVar] * scale,
    } as ImageState;

    console.log('>> imageState', imageState);
    this.setState({
      image,
      scale,
      scaleRange: [scale, 1.777],
      visible: true,
    }, () => this.applyImageState(imageState));
  }

  applyPositions = ({left, top}) => {
    this.refs.viewport.style.left = `${left}px`;
    this.refs.viewport.style.top = `${top}px`;
    this.refs.dragger.style.left = `${left}px`;
    this.refs.dragger.style.top = `${top}px`;
  }
 
  onMouseDown = () => {
    this.setState({
      dragging: true,
    });
  }

  dragStart = (ev) => {
    dragging = true;
    startX = ev.clientX;
    startY = ev.clientY;
  }
  
  dragOver = (ev) => {
    if (dragging) {
      Δleft += (ev.clientX - startX);
      Δtop += (ev.clientY - startY);

      left = limit(left + (ev.clientX - startX), this.state.widthLimit);
      top = limit(top + (ev.clientY - startY), this.state.heightLimit);
      
      startX = ev.clientX;
      startY = ev.clientY;
      this.applyPositions({ left, top });

      // 拖动后，不再提示可拖动
      if (this.refs.dragNotice) {
        this.refs.dragNotice.style.display = 'none';
      }
    }
  }
  
  dragEnd = () => {
    dragging = false;
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  handleOk = () => {
    const { image, width, height, scale, scaleRange } = this.state;
    const canvas = document.createElement('canvas');
    canvas.style.width = `${this.state.viewport[0]}px`;
    canvas.style.height = `${this.state.viewport[1]}px`;
    canvas.setAttribute('width', this.state.viewport[0]);
    canvas.setAttribute('height', this.state.viewport[1]);
    const context = canvas.getContext('2d');
    context.drawImage(image, left, top, width, height);
    canvas.toBlob( blob => {
      this.props.onChange(blob);
      this.setState({
        visible: false,
      });
    });  

  }
  render() {
    const { prefixCls } = this.props;
    const { image, width, height, left, top, scale, scaleRange, viewport } = this.state;
    const style = { left, top };
    const draggerEvents = {
      onMouseDown: this.dragStart,
    };

    const footer = [
      <Scaler key="scaler" prefixCls={prefixCls} onChange={this.scaleImage} value={scale} min={scaleRange[0]} max={scaleRange[1]} />,
      <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>Cancel</Button>,
      <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
        Submit
      </Button>
    ];
    const viewPortStyle ={width: viewport[0], height: viewport[1]};
    if (image) {
      return (<div>
      <Spin />
      <Modal visible={this.state.visible} title="编辑图片" width={700} footer={footer}>
      <div className={`${prefixCls}-cropper-wrapper`}>
      <div className={`${prefixCls}-cropper`}>
        <div className={`${prefixCls}-thumbnail`} style={viewPortStyle}>
          <div className="thumbnail-window" style={viewPortStyle}>
            <img src={image.src} ref="viewport" width={width} height={height} style={style}/>
          </div>
          <img
            {...draggerEvents}
            ref="dragger"
            src={image.src}
            width={width}
            height={height}
            style={style} 
            className={`${prefixCls}-background`} 
            draggable={false}
          />
           {scale > scaleRange[0] ? <div className="candrag-notice-wrapper" ref="dragNotice"> 
            <span className="candrag-notice">拖动调整位置</span> 
          </div> : null}
          </div>
        </div>
      </div>
      </Modal>
      </div>);
    }

    return <span> loading... </span>;
  }
}