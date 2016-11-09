webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // use jsx to render html, do not modify simple.html
	
	__webpack_require__(2);
	
	var _rcCropping = __webpack_require__(3);
	
	var _rcCropping2 = _interopRequireDefault(_rcCropping);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(128);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _antd = __webpack_require__(39);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FormItem = _antd.Form.Item;
	
	var NormalLoginForm = _antd.Form.create()(_react2.default.createClass({
	  displayName: 'NormalLoginForm',
	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields(function (err, values) {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
	  },
	  render: function render() {
	    var _props$form = this.props.form,
	        getFieldDecorator = _props$form.getFieldDecorator,
	        getFieldValue = _props$form.getFieldValue;
	
	    var formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 }
	    };
	
	    var tailFormItemLayout = {
	      wrapperCol: {
	        span: 14,
	        offset: 6
	      }
	    };
	
	    return _react2.default.createElement(
	      _antd.Form,
	      { onSubmit: this.handleSubmit, className: 'login-form' },
	      _react2.default.createElement(
	        FormItem,
	        _extends({ label: '\u8BF7\u4E0A\u4F20\u60A8\u7684\u5934\u50CF\uFF1A' }, formItemLayout),
	        getFieldDecorator('file')(_react2.default.createElement(_rcCropping2.default, {
	          size: [64, 64],
	          thumbnailSizes: [[64, 64], [32, 32]]
	        }))
	      ),
	      _react2.default.createElement(
	        FormItem,
	        tailFormItemLayout,
	        _react2.default.createElement(
	          _antd.Button,
	          { type: 'primary', htmlType: 'submit', className: 'login-form-button' },
	          'Submit'
	        )
	      )
	    );
	  }
	}));
	
	_reactDom2.default.render(_react2.default.createElement(NormalLoginForm, null), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=form.js.map