import * as React from 'react';
import Scaler from './Scaler';
export type imageAttr = 'width' | 'height';
import { debounce, downScaleImage, applyTransform } from './utils';

function isImage(file: File) {
  return file.type && /^image\//g.test(file.type);
}

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

function limit(value: number, limitArray: Array<number>): number {
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

export interface DialogProps {
  title: any;
  defaultProps: any;
  footer: any;
  visible: boolean;
  width: number;
  onCancel: (args?: any) => any;
  onOk?: (args?: any) => any;
}

export interface CropperProps {
  file: File;
  size: Array<number>;
  onChange: (args: any) => void;
  prefixCls?: string;
  circle?: boolean;
  spin?: React.ComponentElement<any, any>;
  renderModal?: (args?: any) => React.ComponentElement<DialogProps, any>;
}

export default class Cropper extends React.Component<CropperProps, any> {
  static defaultProps = {
    prefixCls: 'rc',
    size: [32, 32],
    circle: false,
    onChange: () => {},
  };

  refs: {
    viewport: HTMLElement,
    dragger: HTMLElement,
    dragNotice: HTMLElement,
    Canvas2x: HTMLCanvasElement,
    Canvas1x: HTMLCanvasElement,
  };

  updateThumbnail = debounce(() => {
    const { image, width, height } = this.state;
    // const scaledImage = downScaleImage(image, 0.2);
    this.refs.Canvas2x.getContext('2d').drawImage(image, left, top, width, height);
    this.refs.Canvas1x.getContext('2d').drawImage(image, left, top, width, height);
  }, 100);

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
        width: 320 / size[1] * size[0],
      } as ImageState;
    }

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
    this.readFile(this.props.file);
    document.addEventListener('mouseup', this.dragEnd);
    document.addEventListener('mousemove', this.dragOver);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.dragEnd);
    document.removeEventListener('mousemove', this.dragOver);
  }
  readFile = (file: File) => {
    const reader = new FileReader();
    if (file && isImage(file)) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => this.loadImage(reader);
  }
  loadImage = (reader: FileReader) => {
    // const reader = new FileReader();
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

    left = limit(
      (this.state.viewport[0] - imageState.width) / 2 + Δleft,
      [this.state.viewport[0] - imageState.width, 0]
    );
    top = limit(
      (this.state.viewport[1] - imageState.height) / 2 + Δtop,
      [this.state.viewport[1] - imageState.height, 0]
    );
    this.applyPositions();
  }
  applyImageState = (imageState) => {
    this.setState({
      width: imageState.width,
      height: imageState.height,
      widthLimit: [this.state.viewport[0] - imageState.width, 0],
      heightLimit: [this.state.viewport[1] - imageState.height, 0],
    }, this.updateThumbnail);

    left = (this.state.viewport[0] - imageState.width) / 2;
    top = (this.state.viewport[1] - imageState.height) / 2;
    this.applyPositions();
  }

  // 初始化 Cropper，图片的尺寸会默认 fit 320 * 320
  normalizeImage = (image) => {
    const { width, height } = image;
    const { viewport } = this.state;

    const widthProportional = width / viewport[0];
    const heightProportional = height / viewport[1];
    const ΔProportional = widthProportional / heightProportional;

    const IdpVar: imageAttr = ΔProportional > 1 ? 'height' : 'width'; // 自变量
    const depVar: imageAttr = ΔProportional > 1 ? 'width' : 'height'; // 因变量
    const scale = Number((viewport[Number(ΔProportional > 1)] / image[IdpVar]).toFixed(4));
    // console.log('基准缩放属性：', IdpVar,':', image[IdpVar], 'px',
    //             '缩放至:', viewport[Number(ΔProportional > 1)], 'px',
    //             '缩放比例：', scale); // tslint:ignore
    const imageState = {
      [IdpVar]: viewport[Number(ΔProportional > 1)],
      [depVar]: viewport[Number(ΔProportional > 1)] / viewport[Number(ΔProportional > 1)] * image[depVar] * scale,
    } as ImageState;

    this.setState({
      image,
      scale,
      scaleRange: [scale, 1.777],
      visible: true,
    }, () => this.applyImageState(imageState));
  }

  applyPositions = () => {
    applyTransform(this.refs.viewport, `translate3d(${left}px,${top}px,0)`);
    applyTransform(this.refs.dragger, `translate3d(${left}px,${top}px,0)`);
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
      this.applyPositions();
      this.updateThumbnail();
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
    this.props.onChange(null);
    this.setState({
      visible: false,
    });
  }
  handleOk = () => {
    const { image, width, height, scale, viewport } = this.state;
    const scaledImage = downScaleImage(image, scale);
    const canvas = document.createElement('canvas');
    canvas.style.width = `${viewport[0]}px`;
    canvas.style.height = `${viewport[1]}px`;
    canvas.setAttribute('width', viewport[0]);
    canvas.setAttribute('height', viewport[1]);
    const context = canvas.getContext('2d');

    // if circle...
    if (this.props.circle) {
      context.save();
      context.beginPath();
      context.arc(
        viewport[0] / 2,
        viewport[1] / 2,
        Math.min(viewport[0] / 2, viewport[1] / 2),
        0,
        Math.PI * 2,
        true
      );
      context.closePath();
      context.clip();
    }

    context.drawImage(scaledImage, left, top, width, height);

    if (this.props.circle) {
      context.beginPath();
      context.arc(0, 0, 2, 0, Math.PI, true);
      context.closePath();
      context.restore();
    }
    canvas.toBlob( blob => {
      this.props.onChange(blob);
      this.setState({
        visible: false,
      });
    }, this.props.file.type);
  }
  render() {
    const { prefixCls, size, circle, spin, renderModal } = this.props;
    const { image, width, height, scale, scaleRange, viewport } = this.state;
    const style = { left: 0, top: 0 };
    const draggerEvents = {
      onMouseDown: this.dragStart,
    };

    const footer = [
      <Scaler
        key="scaler"
        prefixCls={prefixCls}
        onChange={this.scaleImage}
        value={scale}
        min={scaleRange[0]}
        max={scaleRange[1]}
      />,
      <button
        className={`${prefixCls}-btn ${prefixCls}-btn-ghost`}
        key="back"
        type="ghost"
        onClick={this.handleCancel}
      >
        Cancel
      </button>,
      <button
        className={`${prefixCls}-btn ${prefixCls}-btn-primary`}
        key="submit"
        type="primary"
        onClick={this.handleOk}
      >
        Submit
      </button>,
    ];
    const viewPortStyle = { width: viewport[0], height: viewport[1] };
    const previewClassName = circle ? 'radius' : null;

    const cropperElement = image ? (<div className={`${prefixCls}-cropper-wrapper`}>
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
      <div className={`${prefixCls}-thumbnail-preview`}>
        <h4>预览</h4>
        <div className="size-2x">
          <canvas
            className={previewClassName}
            ref="Canvas2x"
            width={viewport[0]}
            height={viewport[1]}
            style={{width: size[0] * 2, height: size[1] * 2}}
          ></canvas>
          <p>2x: {`${size[0] * 2}px * ${size[1] * 2}px`}</p>
        </div>
        <div className="size-1x">
          <canvas
            className={previewClassName}
            ref="Canvas1x"
            width={viewport[0]}
            height={viewport[1]}
            style={{width: size[0], height: size[1]}}
          ></canvas>
          <p>1x: {`${size[0]}px * ${size[1]}px`}</p>
        </div>
      </div>
  </div>) : null;
    if (image) {
      return (<div>
        {spin}
        {renderModal ? React.cloneElement(renderModal(), {
          visible: this.state.visible,
          title: '编辑图片',
          width: 800,
          footer,
          onCancel: this.handleCancel,
        }, cropperElement) : <div>{cropperElement} {footer}</div>
      }
      </div>);
    }

    return <span> loading... </span>;
  }
}
