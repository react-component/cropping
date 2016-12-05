webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(794);


/***/ },

/***/ 793:
3,

/***/ 794:
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
	
	_reactDom2.default.render(_react2.default.createElement(_rcCropping2.default, {
	  getSpinContent: function getSpinContent() {
	    return _react2.default.createElement(
	      'span',
	      null,
	      'loading...'
	    );
	  },
	  renderModal: function renderModal() {
	    return _react2.default.createElement(_rcDialog2.default, null);
	  },
	  circle: true
	}), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple.js.map