// use jsx to render html, do not modify simple.html
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CropViewer from 'rc-cropping';
import { Form, Button, Modal, Spin } from 'antd';

import 'antd/dist/antd.less';
import 'rc-cropping/assets/index.less';

const FormItem = Form.Item;

class NormalLoginFormComp extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} className="login-form" >
        <FormItem label="请上传您的头像：" {...formItemLayout} >
          {getFieldDecorator('file', { initialValue: 'https://avatars2.githubusercontent.com/u/566097?v=3&s=88' })(
            <CropViewer
              size={[64, 64]}
              thumbnailSizes={[[64, 64], [32, 32]]}
              getSpinContent={() => <Spin /> }
              renderModal={() => <Modal />}
              fileType="image/jpeg"
              accept="image/gif,image/jpeg,image/png,image/bmp,image/x-png,image/pjpeg"
            >请上传文件</CropViewer>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

NormalLoginFormComp.propTypes = {
  form: PropTypes.object,
};

const NormalLoginForm = Form.create()(NormalLoginFormComp);

ReactDOM.render(<NormalLoginForm />, document.getElementById('__react-content'));
