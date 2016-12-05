import * as React from 'react';
import Icon from './Icon';
import Uploader from './Uploader';
import Cropper from './Cropper';

export interface CropViewerState {
  previewImage?: File;
  selectedImage?: string;
}

export interface CropProps {
  prefixCls: string;
  value: Blob;
  onChange: (blob: Blob) => void;
  size?: Array<number>;
  circle?: boolean;
  renderModal: (args?: any) => React.ComponentElement<any, any>;
  getSpinContent: () => React.ComponentElement<any, any>;
}

export default class CropViewer extends React.Component<CropProps, CropViewerState> {
  static Cropper = Cropper;
  static defaultProps = {
    prefixCls: 'rc',
    size: [32, 32],
    circle: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      previewImage: null,
      selectedImage: null,
    };
    if (props.value) {
      this.loadSelectedImage(props.value);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.loadSelectedImage(nextProps.value);
    } else {
      this.setState({
        previewImage: null,
        selectedImage: null,
      });
    }
  }
  loadSelectedImage = (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      this.setState({
        selectedImage: reader.result,
      });
    };
  }
  reset = () => {
    this.onChange(null);
  }
  selectImage = (file) => {
    this.setState({
      previewImage: file,
    });
  }
  onChange = (fileblob: Blob) => {
    if (this.props.onChange) {
      const file = new File([fileblob], this.state.previewImage.name, { type: this.state.previewImage.type });
      this.props.onChange(file);
    }
    if (!this.props.value) {
      if (fileblob) {
        this.loadSelectedImage(fileblob);
      } else {
        this.setState({
          previewImage: null,
          selectedImage: null,
        });
      }
    }
  }
  render() {
    const { previewImage, selectedImage } = this.state;
    const { prefixCls, size, circle, getSpinContent, renderModal} = this.props;

    if (selectedImage) {
      return <div className={`${prefixCls}-preview-wrapper`}>
        <div className={`${prefixCls}-preview`}>
          <div className={`${prefixCls}-preview-mask`} onClick={this.reset}>
            <Icon type="delete" />
          </div>
          <img src={selectedImage} width={size[0]} height={size[1]} />
        </div>
      </div>;
    }
    if (previewImage) {
      return <Cropper
        circle={circle}
        size={size}
        prefixCls={prefixCls}
        file={previewImage}
        onChange={this.onChange}
        renderModal={renderModal}
        spin={getSpinContent()}
      />;
    }
    return <Uploader prefixCls={prefixCls} onSelectImage={this.selectImage}/>;
  }
};
