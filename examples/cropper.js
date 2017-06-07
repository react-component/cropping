webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _rcCropping = __webpack_require__(3);
	
	var _rcCropping2 = _interopRequireDefault(_rcCropping);
	
	var _rcDialog = __webpack_require__(343);
	
	var _rcDialog2 = _interopRequireDefault(_rcDialog);
	
	__webpack_require__(348);
	
	var _rcUpload = __webpack_require__(349);
	
	var _rcUpload2 = _interopRequireDefault(_rcUpload);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(144);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = _react2.default.createClass({
	  displayName: 'App',
	  beforeUpload: function beforeUpload(file) {
	    var cropper = this.cropper;
	    console.log('>> cropper', this.cropper);
	    return cropper.selectImage(file).then(function (file) {
	      console.log('>> selecTImage', file);
	      return file;
	    });
	  },
	  render: function render() {
	    var _this = this;
	
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        _rcUpload2.default,
	        { type: 'drag', beforeUpload: this.beforeUpload },
	        _react2.default.createElement(
	          'a',
	          null,
	          '\u5F00\u59CB\u4E0A\u4F20'
	        )
	      ),
	      _react2.default.createElement(_rcCropping2.default, {
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
	        circle: true,
	        locale: 'zh-CN',
	        ref: function ref(ele) {
	          return _this.cropper = ele;
	        }
	      })
	    );
	  }
	}); // use jsx to render html, do not modify simple.html
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('__react-content'));

/***/ }),

/***/ 348:
2,

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Upload = __webpack_require__(350);
	
	var _Upload2 = _interopRequireDefault(_Upload);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = _Upload2['default']; // export this package's api
	
	module.exports = exports['default'];

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(105);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(112);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(300);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(113);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(136);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(301);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _AjaxUploader = __webpack_require__(351);
	
	var _AjaxUploader2 = _interopRequireDefault(_AjaxUploader);
	
	var _IframeUploader = __webpack_require__(354);
	
	var _IframeUploader2 = _interopRequireDefault(_IframeUploader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function empty() {}
	
	var Upload = function (_Component) {
	  (0, _inherits3['default'])(Upload, _Component);
	
	  function Upload() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3['default'])(this, Upload);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = Upload.__proto__ || Object.getPrototypeOf(Upload)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      Component: null
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }
	
	  (0, _createClass3['default'])(Upload, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.supportServerRender) {
	        /* eslint react/no-did-mount-set-state:0 */
	        this.setState({
	          Component: this.getComponent()
	        }, this.props.onReady);
	      }
	    }
	  }, {
	    key: 'getComponent',
	    value: function getComponent() {
	      return typeof FormData !== 'undefined' ? _AjaxUploader2['default'] : _IframeUploader2['default'];
	    }
	  }, {
	    key: 'abort',
	    value: function abort(file) {
	      this.refs.inner.abort(file);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.props.supportServerRender) {
	        var _ComponentUploader = this.state.Component;
	        if (_ComponentUploader) {
	          return _react2['default'].createElement(_ComponentUploader, (0, _extends3['default'])({}, this.props, { ref: 'inner' }));
	        }
	        return null;
	      }
	      var ComponentUploader = this.getComponent();
	      return _react2['default'].createElement(ComponentUploader, (0, _extends3['default'])({}, this.props, { ref: 'inner' }));
	    }
	  }]);
	  return Upload;
	}(_react.Component);
	
	Upload.propTypes = {
	  component: _propTypes2['default'].string,
	  style: _propTypes2['default'].object,
	  prefixCls: _propTypes2['default'].string,
	  action: _propTypes2['default'].string,
	  name: _propTypes2['default'].string,
	  multipart: _propTypes2['default'].bool,
	  onError: _propTypes2['default'].func,
	  onSuccess: _propTypes2['default'].func,
	  onProgress: _propTypes2['default'].func,
	  onStart: _propTypes2['default'].func,
	  data: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
	  headers: _propTypes2['default'].object,
	  accept: _propTypes2['default'].string,
	  multiple: _propTypes2['default'].bool,
	  disabled: _propTypes2['default'].bool,
	  beforeUpload: _propTypes2['default'].func,
	  customRequest: _propTypes2['default'].func,
	  onReady: _propTypes2['default'].func,
	  withCredentials: _propTypes2['default'].bool,
	  supportServerRender: _propTypes2['default'].bool
	};
	Upload.defaultProps = {
	  component: 'span',
	  prefixCls: 'rc-upload',
	  data: {},
	  headers: {},
	  name: 'file',
	  multipart: false,
	  onReady: empty,
	  onStart: empty,
	  onError: empty,
	  onSuccess: empty,
	  supportServerRender: false,
	  multiple: false,
	  beforeUpload: null,
	  customRequest: null,
	  withCredentials: false
	};
	exports['default'] = Upload;
	module.exports = exports['default'];

/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends2 = __webpack_require__(105);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _defineProperty2 = __webpack_require__(47);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _classCallCheck2 = __webpack_require__(112);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(300);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(113);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(136);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(301);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _classnames = __webpack_require__(294);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _request = __webpack_require__(352);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _uid = __webpack_require__(353);
	
	var _uid2 = _interopRequireDefault(_uid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var AjaxUploader = function (_Component) {
	  (0, _inherits3['default'])(AjaxUploader, _Component);
	
	  function AjaxUploader() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3['default'])(this, AjaxUploader);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = AjaxUploader.__proto__ || Object.getPrototypeOf(AjaxUploader)).call.apply(_ref, [this].concat(args))), _this), _this.state = { uid: (0, _uid2['default'])() }, _this.reqs = {}, _this.onChange = function (e) {
	      var files = e.target.files;
	      _this.uploadFiles(files);
	      _this.reset();
	    }, _this.onClick = function () {
	      var el = _this.refs.file;
	      if (!el) {
	        return;
	      }
	      el.click();
	    }, _this.onKeyDown = function (e) {
	      if (e.key === 'Enter') {
	        _this.onClick();
	      }
	    }, _this.onFileDrop = function (e) {
	      if (e.type === 'dragover') {
	        e.preventDefault();
	        return;
	      }
	
	      var files = e.dataTransfer.files;
	      _this.uploadFiles(files);
	
	      e.preventDefault();
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }
	
	  (0, _createClass3['default'])(AjaxUploader, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._isMounted = true;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._isMounted = false;
	      this.abort();
	    }
	  }, {
	    key: 'uploadFiles',
	    value: function uploadFiles(files) {
	      var postFiles = Array.prototype.slice.call(files);
	      var len = postFiles.length;
	      for (var i = 0; i < len; i++) {
	        var file = postFiles[i];
	        file.uid = (0, _uid2['default'])();
	        this.upload(file, postFiles);
	      }
	    }
	  }, {
	    key: 'upload',
	    value: function upload(file, fileList) {
	      var _this2 = this;
	
	      var props = this.props;
	
	      if (!props.beforeUpload) {
	        // always async in case use react state to keep fileList
	        return setTimeout(function () {
	          return _this2.post(file);
	        }, 0);
	      }
	
	      var before = props.beforeUpload(file, fileList);
	      if (before && before.then) {
	        before.then(function (processedFile) {
	          var processedFileType = Object.prototype.toString.call(processedFile);
	          if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
	            _this2.post(processedFile);
	          } else {
	            _this2.post(file);
	          }
	        })['catch'](function (e) {
	          console && console.log(e); // eslint-disable-line
	        });
	      } else if (before !== false) {
	        setTimeout(function () {
	          return _this2.post(file);
	        }, 0);
	      }
	    }
	  }, {
	    key: 'post',
	    value: function post(file) {
	      var _this3 = this;
	
	      if (!this._isMounted) {
	        return;
	      }
	      var props = this.props;
	      var data = props.data;
	      var onStart = props.onStart,
	          onProgress = props.onProgress;
	
	      if (typeof data === 'function') {
	        data = data(file);
	      }
	      var uid = file.uid;
	
	      var request = props.customRequest || _request2['default'];
	      this.reqs[uid] = request({
	        action: props.action,
	        filename: props.name,
	        file: file,
	        data: data,
	        headers: props.headers,
	        withCredentials: props.withCredentials,
	        onProgress: onProgress ? function (e) {
	          onProgress(e, file);
	        } : null,
	        onSuccess: function onSuccess(ret) {
	          delete _this3.reqs[uid];
	          props.onSuccess(ret, file);
	        },
	        onError: function onError(err, ret) {
	          delete _this3.reqs[uid];
	          props.onError(err, ret, file);
	        }
	      });
	      onStart(file);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.setState({
	        uid: (0, _uid2['default'])()
	      });
	    }
	  }, {
	    key: 'abort',
	    value: function abort(file) {
	      var reqs = this.reqs;
	
	      if (file) {
	        var uid = file;
	        if (file && file.uid) {
	          uid = file.uid;
	        }
	        if (reqs[uid]) {
	          reqs[uid].abort();
	          delete reqs[uid];
	        }
	      } else {
	        Object.keys(reqs).forEach(function (uid) {
	          if (reqs[uid]) {
	            reqs[uid].abort();
	          }
	
	          delete reqs[uid];
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames;
	
	      var _props = this.props,
	          Tag = _props.component,
	          prefixCls = _props.prefixCls,
	          className = _props.className,
	          disabled = _props.disabled,
	          style = _props.style,
	          multiple = _props.multiple,
	          accept = _props.accept,
	          children = _props.children;
	
	      var cls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls, true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_classNames, className, className), _classNames));
	      var events = disabled ? {} : {
	        onClick: this.onClick,
	        onKeyDown: this.onKeyDown,
	        onDrop: this.onFileDrop,
	        onDragOver: this.onFileDrop,
	        tabIndex: '0'
	      };
	      return _react2['default'].createElement(
	        Tag,
	        (0, _extends3['default'])({}, events, {
	          className: cls,
	          role: 'button',
	          style: style
	        }),
	        _react2['default'].createElement('input', {
	          type: 'file',
	          ref: 'file',
	          key: this.state.uid,
	          style: { display: 'none' },
	          accept: accept,
	          multiple: multiple,
	          onChange: this.onChange
	        }),
	        children
	      );
	    }
	  }]);
	  return AjaxUploader;
	}(_react.Component); /* eslint react/no-is-mounted:0 react/sort-comp:0 */
	
	AjaxUploader.propTypes = {
	  component: _propTypes2['default'].string,
	  style: _propTypes2['default'].object,
	  prefixCls: _propTypes2['default'].string,
	  className: _propTypes2['default'].string,
	  multiple: _propTypes2['default'].bool,
	  disabled: _propTypes2['default'].bool,
	  accept: _propTypes2['default'].string,
	  children: _propTypes2['default'].any,
	  onStart: _propTypes2['default'].func,
	  data: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
	  headers: _propTypes2['default'].object,
	  beforeUpload: _propTypes2['default'].func,
	  customRequest: _propTypes2['default'].func,
	  onProgress: _propTypes2['default'].func,
	  withCredentials: _propTypes2['default'].bool
	};
	exports['default'] = AjaxUploader;
	module.exports = exports['default'];

/***/ }),

/***/ 352:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports['default'] = upload;
	function getError(option, xhr) {
	  var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
	  var err = new Error(msg);
	  err.status = xhr.status;
	  err.method = 'post';
	  err.url = option.action;
	  return err;
	}
	
	function getBody(xhr) {
	  var text = xhr.responseText || xhr.response;
	  if (!text) {
	    return text;
	  }
	
	  try {
	    return JSON.parse(text);
	  } catch (e) {
	    return text;
	  }
	}
	
	// option {
	//  onProgress: (event: { percent: number }): void,
	//  onError: (event: Error, body?: Object): void,
	//  onSuccess: (body: Object): void,
	//  data: Object,
	//  filename: String,
	//  file: File,
	//  withCredentials: Boolean,
	//  action: String,
	//  headers: Object,
	// }
	function upload(option) {
	  var xhr = new XMLHttpRequest();
	
	  if (option.onProgress && xhr.upload) {
	    xhr.upload.onprogress = function progress(e) {
	      if (e.total > 0) {
	        e.percent = e.loaded / e.total * 100;
	      }
	      option.onProgress(e);
	    };
	  }
	
	  var formData = new FormData();
	
	  if (option.data) {
	    Object.keys(option.data).map(function (key) {
	      formData.append(key, option.data[key]);
	    });
	  }
	
	  formData.append(option.filename, option.file);
	
	  xhr.onerror = function error(e) {
	    option.onError(e);
	  };
	
	  xhr.onload = function onload() {
	    // allow success when 2xx status
	    // see https://github.com/react-component/upload/issues/34
	    if (xhr.status < 200 || xhr.status >= 300) {
	      return option.onError(getError(option, xhr), getBody(xhr));
	    }
	
	    option.onSuccess(getBody(xhr));
	  };
	
	  xhr.open('post', option.action, true);
	
	  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
	  if (option.withCredentials && 'withCredentials' in xhr) {
	    xhr.withCredentials = true;
	  }
	
	  var headers = option.headers || {};
	
	  // when set headers['X-Requested-With'] = null , can close default XHR header
	  // see https://github.com/react-component/upload/issues/33
	  if (headers['X-Requested-With'] !== null) {
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	  }
	
	  for (var h in headers) {
	    if (headers.hasOwnProperty(h) && headers[h] !== null) {
	      xhr.setRequestHeader(h, headers[h]);
	    }
	  }
	  xhr.send(formData);
	
	  return {
	    abort: function abort() {
	      xhr.abort();
	    }
	  };
	}
	module.exports = exports['default'];

/***/ }),

/***/ 353:
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = uid;
	var now = +new Date();
	var index = 0;
	
	function uid() {
	  return "rc-upload-" + now + "-" + ++index;
	}
	module.exports = exports['default'];

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(47);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _extends2 = __webpack_require__(105);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(112);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(300);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(113);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(136);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(301);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactDom = __webpack_require__(144);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(294);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _uid = __webpack_require__(353);
	
	var _uid2 = _interopRequireDefault(_uid);
	
	var _warning = __webpack_require__(355);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/* eslint react/sort-comp:0 */
	var IFRAME_STYLE = {
	  position: 'absolute',
	  top: 0,
	  opacity: 0,
	  filter: 'alpha(opacity=0)',
	  left: 0,
	  zIndex: 9999
	};
	
	// diferent from AjaxUpload, can only upload on at one time, serial seriously
	
	var IframeUploader = function (_Component) {
	  (0, _inherits3['default'])(IframeUploader, _Component);
	
	  function IframeUploader() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    (0, _classCallCheck3['default'])(this, IframeUploader);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = IframeUploader.__proto__ || Object.getPrototypeOf(IframeUploader)).call.apply(_ref, [this].concat(args))), _this), _this.state = { uploading: false }, _this.file = {}, _this.onLoad = function () {
	      if (!_this.state.uploading) {
	        return;
	      }
	      var _this2 = _this,
	          props = _this2.props,
	          file = _this2.file;
	
	      var response = void 0;
	      try {
	        var doc = _this.getIframeDocument();
	        var script = doc.getElementsByTagName('script')[0];
	        if (script && script.parentNode === doc.body) {
	          doc.body.removeChild(script);
	        }
	        response = doc.body.innerHTML;
	        props.onSuccess(response, file);
	      } catch (err) {
	        (0, _warning2['default'])(false, 'cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
	        response = 'cross-domain';
	        props.onError(err, null, file);
	      }
	      _this.endUpload();
	    }, _this.onChange = function () {
	      var target = _this.getFormInputNode();
	      // ie8/9 don't support FileList Object
	      // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
	      var file = _this.file = {
	        uid: (0, _uid2['default'])(),
	        name: target.value
	      };
	      _this.startUpload();
	      var _this3 = _this,
	          props = _this3.props;
	
	      if (!props.beforeUpload) {
	        return _this.post(file);
	      }
	      var before = props.beforeUpload(file);
	      if (before && before.then) {
	        before.then(function () {
	          _this.post(file);
	        }, function () {
	          _this.endUpload();
	        });
	      } else if (before !== false) {
	        _this.post(file);
	      } else {
	        _this.endUpload();
	      }
	    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
	  }
	
	  (0, _createClass3['default'])(IframeUploader, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updateIframeWH();
	      this.initIframe();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.updateIframeWH();
	    }
	  }, {
	    key: 'getIframeNode',
	    value: function getIframeNode() {
	      return this.refs.iframe;
	    }
	  }, {
	    key: 'getIframeDocument',
	    value: function getIframeDocument() {
	      return this.getIframeNode().contentDocument;
	    }
	  }, {
	    key: 'getFormNode',
	    value: function getFormNode() {
	      return this.getIframeDocument().getElementById('form');
	    }
	  }, {
	    key: 'getFormInputNode',
	    value: function getFormInputNode() {
	      return this.getIframeDocument().getElementById('input');
	    }
	  }, {
	    key: 'getFormDataNode',
	    value: function getFormDataNode() {
	      return this.getIframeDocument().getElementById('data');
	    }
	  }, {
	    key: 'getFileForMultiple',
	    value: function getFileForMultiple(file) {
	      return this.props.multiple ? [file] : file;
	    }
	  }, {
	    key: 'getIframeHTML',
	    value: function getIframeHTML(domain) {
	      var domainScript = '';
	      var domainInput = '';
	      if (domain) {
	        var script = 'script';
	        domainScript = '<' + script + '>document.domain="' + domain + '";</' + script + '>';
	        domainInput = '<input name="_documentDomain" value="' + domain + '" />';
	      }
	      return '\n    <!DOCTYPE html>\n    <html>\n    <head>\n    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n    <style>\n    body,html {padding:0;margin:0;border:0;overflow:hidden;}\n    </style>\n    ' + domainScript + '\n    </head>\n    <body>\n    <form method="post"\n    encType="multipart/form-data"\n    action="' + this.props.action + '" id="form"\n    style="display:block;height:9999px;position:relative;overflow:hidden;">\n    <input id="input" type="file"\n     name="' + this.props.name + '"\n     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>\n    ' + domainInput + '\n    <span id="data"></span>\n    </form>\n    </body>\n    </html>\n    ';
	    }
	  }, {
	    key: 'initIframeSrc',
	    value: function initIframeSrc() {
	      if (this.domain) {
	        this.getIframeNode().src = 'javascript:void((function(){\n        var d = document;\n        d.open();\n        d.domain=\'' + this.domain + '\';\n        d.write(\'\');\n        d.close();\n      })())';
	      }
	    }
	  }, {
	    key: 'initIframe',
	    value: function initIframe() {
	      var iframeNode = this.getIframeNode();
	      var win = iframeNode.contentWindow;
	      var doc = void 0;
	      this.domain = this.domain || '';
	      this.initIframeSrc();
	      try {
	        doc = win.document;
	      } catch (e) {
	        this.domain = document.domain;
	        this.initIframeSrc();
	        win = iframeNode.contentWindow;
	        doc = win.document;
	      }
	      doc.open('text/html', 'replace');
	      doc.write(this.getIframeHTML(this.domain));
	      doc.close();
	      this.getFormInputNode().onchange = this.onChange;
	    }
	  }, {
	    key: 'endUpload',
	    value: function endUpload() {
	      if (this.state.uploading) {
	        this.file = {};
	        // hack avoid batch
	        this.state.uploading = false;
	        this.setState({
	          uploading: false
	        });
	        this.initIframe();
	      }
	    }
	  }, {
	    key: 'startUpload',
	    value: function startUpload() {
	      if (!this.state.uploading) {
	        this.state.uploading = true;
	        this.setState({
	          uploading: true
	        });
	      }
	    }
	  }, {
	    key: 'updateIframeWH',
	    value: function updateIframeWH() {
	      var rootNode = _reactDom2['default'].findDOMNode(this);
	      var iframeNode = this.getIframeNode();
	      iframeNode.style.height = rootNode.offsetHeight + 'px';
	      iframeNode.style.width = rootNode.offsetWidth + 'px';
	    }
	  }, {
	    key: 'abort',
	    value: function abort(file) {
	      if (file) {
	        var uid = file;
	        if (file && file.uid) {
	          uid = file.uid;
	        }
	        if (uid === this.file.uid) {
	          this.endUpload();
	        }
	      } else {
	        this.endUpload();
	      }
	    }
	  }, {
	    key: 'post',
	    value: function post(file) {
	      var formNode = this.getFormNode();
	      var dataSpan = this.getFormDataNode();
	      var data = this.props.data;
	      var onStart = this.props.onStart;
	
	      if (typeof data === 'function') {
	        data = data(file);
	      }
	      var inputs = [];
	      for (var key in data) {
	        if (data.hasOwnProperty(key)) {
	          inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
	        }
	      }
	      dataSpan.innerHTML = inputs.join('');
	      formNode.submit();
	      dataSpan.innerHTML = '';
	      onStart(file);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames;
	
	      var _props = this.props,
	          Tag = _props.component,
	          disabled = _props.disabled,
	          className = _props.className,
	          prefixCls = _props.prefixCls,
	          children = _props.children,
	          style = _props.style;
	
	      var iframeStyle = (0, _extends3['default'])({}, IFRAME_STYLE, {
	        display: this.state.uploading || disabled ? 'none' : ''
	      });
	      var cls = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls, true), (0, _defineProperty3['default'])(_classNames, prefixCls + '-disabled', disabled), (0, _defineProperty3['default'])(_classNames, className, className), _classNames));
	      return _react2['default'].createElement(
	        Tag,
	        {
	          className: cls,
	          style: (0, _extends3['default'])({ position: 'relative', zIndex: 0 }, style)
	        },
	        _react2['default'].createElement('iframe', {
	          ref: 'iframe',
	          onLoad: this.onLoad,
	          style: iframeStyle
	        }),
	        children
	      );
	    }
	  }]);
	  return IframeUploader;
	}(_react.Component);
	
	IframeUploader.propTypes = {
	  component: _propTypes2['default'].string,
	  style: _propTypes2['default'].object,
	  disabled: _propTypes2['default'].bool,
	  prefixCls: _propTypes2['default'].string,
	  className: _propTypes2['default'].string,
	  accept: _propTypes2['default'].string,
	  onStart: _propTypes2['default'].func,
	  multiple: _propTypes2['default'].bool,
	  children: _propTypes2['default'].any,
	  data: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
	  action: _propTypes2['default'].string,
	  name: _propTypes2['default'].string
	};
	exports['default'] = IframeUploader;
	module.exports = exports['default'];

/***/ }),

/***/ 355:
336

});
//# sourceMappingURL=cropper.js.map