// add spec here!
import React from 'react';
import Dialog from 'rc-dialog';
import CropViewer from '../src';
import { mount } from 'enzyme';

describe('Cropper', () => {
  it('should mount', () => {
    const cropper = mount(<CropViewer
      getSpinContent={() => <span>loading...</span> }
      renderModal={() => <Dialog />}
      locale="zh-CN"
      circle
    />);

    expect(cropper).not.toBe(null);
  });
});
