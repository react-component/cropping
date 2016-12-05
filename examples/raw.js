webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(792);


/***/ },

/***/ 792:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(3);
	
	var _rcCropping = __webpack_require__(4);
	
	var _rcCropping2 = _interopRequireDefault(_rcCropping);
	
	var _rcDialog = __webpack_require__(537);
	
	var _rcDialog2 = _interopRequireDefault(_rcDialog);
	
	__webpack_require__(793);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(143);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// use jsx to render html, do not modify simple.html
	
	function CropperContainer(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    props.title,
	    props.children,
	    props.footer
	  );
	}
	
	var Test = _react2.default.createClass({
	  displayName: 'Test',
	  getInitialState: function getInitialState() {
	    return {
	      file: null,
	      croppedFile: null
	    };
	  },
	  onChange: function onChange(ev) {
	    this.setState({ file: this.refs.file.files[0] });
	  },
	  croppeFile: function croppeFile(fileBlob) {
	    var _this = this;
	
	    var reader = new FileReader();
	    reader.readAsDataURL(fileBlob);
	    reader.onload = function () {
	      _this.setState({
	        croppedFile: reader.result
	      });
	    };
	  },
	  render: function render() {
	    var _state = this.state,
	        croppedFile = _state.croppedFile,
	        file = _state.file;
	
	    if (croppedFile) {
	      return _react2.default.createElement('img', { src: croppedFile });
	    }
	    if (!file) {
	      return _react2.default.createElement('input', { type: 'file', onChange: this.onChange, ref: 'file' });
	    }
	    return _react2.default.createElement(_rcCropping.Cropper, {
	      size: [64, 64],
	      file: this.state.file,
	      getSpinContent: function getSpinContent() {
	        return _react2.default.createElement(
	          'span',
	          null,
	          'loading...'
	        );
	      },
	      renderModal: function renderModal(props) {
	        return _react2.default.createElement(CropperContainer, props);
	      },
	      onChange: this.croppeFile
	    });
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Test, null), document.getElementById('__react-content'));

/***/ },

/***/ 793:
3

});
//# sourceMappingURL=raw.js.map