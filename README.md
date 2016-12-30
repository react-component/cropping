# rc-cropping
---

React Cropping Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-cropping.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-cropping
[travis-image]: https://img.shields.io/travis/react-component/cropping.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/cropping
[coveralls-image]: https://img.shields.io/coveralls/react-component/cropping.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/cropping?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/cropping.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/cropping
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-cropping.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-cropping

## Feature

* Cropping pictures in facebook mode.
* Cropping result preview.
* Supports exporting circle and square picture.
* I18n.
* [FUTURE] Rotate picture.

## Screenshots

<img src="https://zos.alipayobjects.com/rmsportal/vrydErgwuwLzNpQ.png" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8001/examples/


online example: http://react-component.github.io/cropping/

## install


[![rc-cropping](https://nodei.co/npm/rc-cropping.png)](https://npmjs.org/package/rc-cropping)


## Usage

```js
var Cropping = require('rc-cropping');
var React = require('react');

ReactDOM.render(<CropViewer
  getSpinContent={() => <span>loading...</span> }
  renderModal={() => <Dialog />}
  circle={true}
/>, document.getElementById('__react-content'));
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
        <tr>
          <td>getSpinContent</td>
          <td>Function() => React.Component<any, any></td>
          <td></td>
          <td> spin content of Cropper</td>
        </tr>
        <tr>
          <td>renderModal</td>
          <td>Function() => React.Component<any, any></td>
          <td></td>
          <td> Modal Render of Component, you can pass any React Component to replace it.</td>
        </tr>
        <tr>
          <td>locale</td>
          <td>'en-US' | 'zh-CN'</td>
          <td></td>
          <td> i18n locale.</td>
        </tr>
        <tr>
          <td>circle</td>
          <td>boolean</td>
          <td>false</td>
          <td> Croppe circle image or not. If true, you'll get a circle picture. Notice: transparent background *ONLY* supported in png file, croppe jpg file will get white background. </td>
        </tr>
    </tbody>
</table>


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rc-cropping is released under the MIT license.
