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
  locale?: String;
  accept?: String;
  thumbnailSizes?: Array<Array<number>>;
  showSelected: boolean;
  resetPreviewAfterSelectImage: boolean;
}

export default class CropViewer extends React.Component<CropProps, CropViewerState> {
  static Cropper = Cropper;
  static defaultProps = {
    prefixCls: 'rc',
    size: [32, 32],
    circle: false,
    locale: 'en-US',
    accept: null,
    showSelected: true,
    resetPreviewAfterSelectImage: false,
  };
  private selectImageCallback: Function;
  private cancelSelectImageCallback: Function;
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
      if (nextProps.value !== this.props.value) {
        this.setState({
          previewImage: null,
          selectedImage: null,
        });
      }
    }
  }
  loadSelectedImage = (blobOrString: Blob | string) => {
    const { resetPreviewAfterSelectImage } = this.props;
    if (typeof blobOrString === 'string') {
      const image = new Image();
      image.onload = () => {
        this.setState({
          selectedImage: blobOrString,
          previewImage: resetPreviewAfterSelectImage ? null : this.state.previewImage,
        });
      };
      image.src = blobOrString;
    } else {
      this.readBlob(blobOrString);
    }

  }
  readBlob = (blob: Blob) => {
    const { resetPreviewAfterSelectImage } = this.props;
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      this.setState({
        selectedImage: reader.result,
        previewImage: resetPreviewAfterSelectImage ? null : this.state.previewImage,
      });
    };
  }
  reset = () => {
    this.onChange(null);
  }
  selectImage = (file) => {
    const self = this;
    this.setState({
      previewImage: file,
    });

    return new Promise((resolve, reject) => {
      self.selectImageCallback = file => {
        self.selectImageCallback = null;
        resolve(file);
      }
      self.cancelSelectImageCallback = () => {
        self.cancelSelectImageCallback = null;
        reject();
      }
    });
  }
  onChange = (fileblob: Blob) => {
    const file = fileblob ? new File([fileblob], this.state.previewImage.name, { type: this.state.previewImage.type }) : null;
    if (this.props.onChange) {
      this.props.onChange(file);
    }
    if (file && this.selectImageCallback) {
      this.selectImageCallback(file);
    }
    if (!fileblob) {
      this.cancelSelectImageCallback();
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
    const { prefixCls, size, circle, getSpinContent, renderModal, locale, accept, thumbnailSizes, showSelected } = this.props;
    if (showSelected && selectedImage) {
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
        thumbnailSizes={thumbnailSizes}
        spin={getSpinContent()}
        locale={locale}
      />;
    }
    return <Uploader
      prefixCls={prefixCls}
      onSelectImage={this.selectImage}
      accept={accept}
    >
      {this.props.children}
    </Uploader>;
  }
};
