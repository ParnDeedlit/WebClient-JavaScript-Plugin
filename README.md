# MapGIS WebClient-JavaScript-Plugin

[![npm version][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![apache licensed](https://img.shields.io/badge/license-Apache%202.0-orange.svg?style=flat-square)](https://github.com/ParnDeedlit/WebClient-JavaScript-Plugin/blob/master/LICENSE)

[npm-img]: https://img.shields.io/npm/v/esri-leaflet.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/esri-leaflet
[travis-img]: https://img.shields.io/travis/Esri/esri-leaflet/master.svg?style=flat-square
[travis-url]: https://github.com/ParnDeedlit/WebClient-JavaScript-Plugin

[WebClient-JavaScript](https://github.com/MapGIS/WebClient-JavaScript) 的官方插件。针对 [IGService-X](http://client.snanyun.com:8899/ui/gallery-leaflet.html#igserverx)服务类型. 集成百度 [MapV](https://github.com/huiyan-fe/mapv), 百度[Echarts](https://github.com/apache/incubator-echarts) 阿里L7 [L7](https://github.com/antvis/L7) Data-Driven Documents[D3](https://github.com/d3/d3)等常见互联网的技术.

> 该工程由中地数码多个团队协同配合，主要是将公网的开源技术进行整合，如果需要`高级收费`的js版本，请联系内部维护人员.

这个工程的目标 **不是** 替代司马云上的官方 [WebClient-JavaScript](https://github.com/MapGIS/WebClient-JavaScript) 而是作为一种补集 *针对* 传统GIS技术中较少使用的大数据可视化，时空聚类，前端空间分析，客户端专题去等提供额外的功能支撑.

> 司马云上的官方的传统的**WebClient-JavaScript**完全满足常规的GIS开发模式

## 目录

- [开始](#getting-started)
  - [示例](#demos)
  - [使用方式](#example)
  - [API 引用](#api-reference)
  - [其他插件](#additional-plugins)
  - [问题](#issues)
  - [依赖](#dependencies)
- [深入了解](#going-deeper)
  - [开发说明](#development-instructions)
  - [版本](#versioning)
  - [贡献人员](#contributing)
- [团队](#terms)
- [验证](#credit)
- [证书](#license)

## 示例
请看 [Zondy.Echarts](http://client.snanyun.com:8899/ui/gallery-mapbox.html#dataview), [Zondy.Mapv](http://client.snanyun.com:8899/ui/gallery-mapbox.html#dataview-mapv-path_converge), [Zondy.D3](http://client.snanyun.com:8899/ui/gallery-leaflet.html#dataview-d3-csv). 

> http://client.snanyun.com:8899/ui/index.html

## 使用方式

**两种使用方式：**

1. 配合WebClient-JavaScript使用
1. 单独使用WebClient-JavaScript-Plugin

### 1.WebClient-JavaScript使用

> WebClient-JavaScript中的**include-leaflet/cesium/openlayers/mapboxgl.js**会`默认自动引入`该脚本, 前提是没有使用`exclude标签`将plugin插件单独`排除`出去

#### 使用方式   

``` javascript
    <script src="./libs/zondyclient/include-mapboxgl-local.js"></script>
```

``` javascript
    if (!inArray(excludes, 'plugin')) {
        //这里是三方如igserver-x，datastore,mapv,echart等的api    
        inputCSS(httpUrl + "/cdn/zondyclient/webclient-mapboxgl-plugins.css");
        inputScript(httpUrl + "/cdn/zondyclient/webclient-mapboxgl-plugins.min.js");
    }
```

### 2.单独使用
以百度Echatrs为例，如果要使用 EchartsLayer图层：
``` javascript
    layer = new mapboxgl.zondy.EchartsLayer(map, option).addTo(map);
```

引用顺序如下： 必须是地图脚本主题先引入-> 使用的三方js（echarts/mapv）-> 本文的插件js

1. 引入基本的 mapbox-gl.js脚本库 [mapbox-gl.js](https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.js)
1. 引入使用的echarts.js库 [incubator-echarts](https://github.com/apache/incubator-echarts)
1. 引入本文提到的 WebClient-JavaScript-Plugin.js库

## [API接口](http://client.snanyun.com:8899/api/leaflet/index.html)

1. [Leaflet API](http://client.snanyun.com:8899/api/leaflet/index.html)
1. [OpenLayers API](http://client.snanyun.com:8899/api/openlayers/index.html)
1. [MapboxGL API](http://client.snanyun.com:8899/api/mapboxgl/index.html)

> cesium模块由三维部门`单独负责`！

## 额外插件

除了基本的地图脚本库：leaflet，openlauyer之外 一些常见的js库如：turfjs（空间分析）等可以直接单独引入。 **推荐使用Turf做几何判断**

|独立js库|cdn地址|node使用| 
|:---|:---|:---|
|turfjs|https://npmcdn.com/@turf/turf/turf.min.js|import * as turf from '@turf/turf'|

## 问题

* [判断多边形自相交?](https://github.com/MapGIS/WebClient-JavaScript/issues/18)
* [后台空间分析出错误?](https://github.com/MapGIS/WebClient-JavaScript/issues/5)

## 深入了解

### 开发说明

如何从源代码编译脚本.

1. [分支 & 克隆 WebClient-JavaScript-Plugin](https://github.com/ParnDeedlit/WebClient-JavaScript-Plugin.git)
2. `cd` 进入 `WebClient-JavaScript-Plugin` 文件夹
3.安装 [`package.json`](https://github.com/ParnDeedlit/WebClient-JavaScript-Plugin/blob/master/package.json) 所需依赖 `npm install`
4. 执行命令 `npm run mapbox-cmj` 编译通用的commonjs版本的mapboxgl-plugin插件js,生成的js文件保存到 `dist` 文件夹下.
5. 拷贝编译好的`webclient-mapboxgl-plugins.cmj.min.js`文件单独使用
6. 将你自己的修改提交到远程仓库[pull request](https://help.github.com/articles/creating-a-pull-request)

### Dependencies

* webclient-leaflet-plugin.js [1.0+](https://leafletjs.com/2018/12/30/leaflet-1.4.0.html) ([CDN链接](https://unpkg.com/leaflet@1.4.0/dist/leaflet.js))
  *  [Leaflet](http://leafletjs.com) version 1.0+
* webclient-openlayers-plugin.js [5.0+](https://openlayers.org/) ([CDN链接](https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js))
  *  [OpenLayers](https://openlayers.org/) version 5.0+
* webclient-mapboxgl-plugin.js [0.50+]() ([CDN链接](https://github.com/mapbox/mapbox-gl-js/releases))
  *  [MapboxGL](https://docs.mapbox.com/mapbox-gl-js/api/) version 0.50+


本仓库 `master` 分支 *仅* 针对最新版的的脚本库。

### 版本控制

1. master分支实时更新10.3.0.201xmmdd
1. release分支， 一月一次大的版本更新10.3.0.20190101 -> 10.3.1.20190201

### 贡献方式

请参考 [guidelines for contributing](https://github.com/Esri/esri-leaflet/blob/master/CONTRIBUTING.md).

### 团队

* 创新中心 [DataStore]()
* IGserver-X [IGserver-X]()
* IGServer-S [IGserver-S]()

```js
L.zondy.EchartsLayer(map, option).addTo(map);
```

### 证书

Copyright &copy; 2014-2019 MapGIS

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [LICENSE](./LICENSE) file.
