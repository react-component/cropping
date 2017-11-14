webpackJsonp([4],{

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_cropping__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_cropping_assets_index_less__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_cropping_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_cropping_assets_index_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_dialog_assets_index_css__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_dialog_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rc_dialog_assets_index_css__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// use jsx to render html, do not modify simple.html









function CropperContainer(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    props.title,
    props.children,
    props.footer
  );
}

CropperContainer.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,
  footer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any
};

var Test = function (_React$Component) {
  _inherits(Test, _React$Component);

  function Test() {
    _classCallCheck(this, Test);

    var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));

    _this.onChange = function () {
      _this.setState({ file: _this.refs.file.files[0] });
    };

    _this.croppeFile = function (fileBlob) {
      var reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      reader.onload = function () {
        _this.setState({
          croppedFile: reader.result
        });
      };
    };

    _this.state = {
      file: null,
      croppedFile: null
    };
    return _this;
  }

  _createClass(Test, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          croppedFile = _state.croppedFile,
          file = _state.file;

      if (croppedFile) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: croppedFile });
      }
      if (!file) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'file', onChange: this.onChange, ref: 'file' });
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_cropping__["Cropper"], {
        size: [64, 64],
        file: this.state.file,
        getSpinContent: function getSpinContent() {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            'loading...'
          );
        },
        renderModal: function renderModal(props) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CropperContainer, props);
        },
        onChange: this.croppeFile
      });
    }
  }]);

  return Test;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Test, null), document.getElementById('__react-content'));

/***/ }),

/***/ 51:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(327);


/***/ })

},[883]);
//# sourceMappingURL=raw.js.map