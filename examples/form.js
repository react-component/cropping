// use jsx to render html, do not modify simple.html

import 'rc-CropViewer/assets/index.less';
import CropViewer from 'rc-CropViewer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
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
          {getFieldDecorator('file')(
            <CropViewer 
              size={[32, 32]} 
              thumbnailSizes={[[64, 64], [32, 32]]}
            />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  },
}));

ReactDOM.render(<NormalLoginForm />, document.getElementById('__react-content'));
