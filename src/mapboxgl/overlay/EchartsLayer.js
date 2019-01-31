import mapboxgl from 'mapbox-gl';
import echarts from 'echarts';

import '../core/Base';

import {
    MapCoordSys
} from './echarts/MapCoordSys';

/**
 * leaflet的echars 4.0的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class mapboxgl.zondy.EchartsLayer
 * @classdesc 基于mapboxgl的Layer对象进行的拓展
 * @param map - {Object} 传入的mapboxgl的地图对象
 * @param options - {Object} echarts.options
 * 
 * @see http://echarts.baidu.com/api.html#echarts
 */
export class EchartsLayer {

    constructor(map, options) {
        this.map = map;
        this.options = options;
        this.layerId = options.layerId || "echartlayerdefaultid";
        this.layerClass = options.classId || "echartlayerdefaultclass";

        this.initDevicePixelRatio();

        this.mapContainer = map.getCanvasContainer();
        this.canvas = this._createCanvas();
        this.mapContainer.appendChild(this.canvas);
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        this.chart = echarts.init(this.canvas);

        this.initEcharts();
        this._resizeCanvas();

        return this;
    }

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    }

    initEcharts() {
        echarts.mapboxglMap = this.map;

        echarts.registerCoordinateSystem('mapboxgl', MapCoordSys);

        echarts.extendComponentModel({
            type: 'mapboxgl',
            getBMap: function () {
                return this.__mapboxgl;
            },
            defaultOption: {
                roam: false
            }
        });

        echarts.registerAction({
                type: 'MapboxGLRoma',
                event: 'MapboxGLRoma',
                update: 'updateLayout'
            },
            function (payload, ecModel) {

            }
        );

        return this;
    }

    _createCanvas() {
        var canvas = document.createElement('div');
        canvas.id = this.layerId;
        canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.width = parseInt(this.map.getCanvas().style.width);
        canvas.height = parseInt(this.map.getCanvas().style.height);
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;

        canvas.setAttribute('id', this.layerId);
        canvas.setAttribute('class', this.layerClass);

        //这段可以先不不放开
        /*  var devicePixelRatio = this.devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
        } */
        return canvas;
    }

    _resizeCanvas() {
        const self = this;

        window.onresize = function () {
            var canvas = self.canvas;
            var map = self.map;

            canvas.style.position = 'absolute';
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            canvas.style.width = map.getCanvas().style.width;
            canvas.style.height = map.getCanvas().style.height;
            canvas.width = parseInt(map.getCanvas().style.width);
            canvas.height = parseInt(map.getCanvas().style.height);

            self.chart.resize();
        };

        //this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';

    }

    addTo(map) {
        echarts.extendComponentView({
            type: 'mapboxgl',

            render: function (mapModel, ecModel, api) {
                var rendering = true

                var mapboxglMap = echarts.mapboxglMap

                var viewportRoot = api.getZr().painter.getViewportRoot()
                var coordSys = mapModel.coordinateSystem
                var moveHandler = function (type, target) {
                    if (rendering) {
                        return
                    }
                    // var offsetEl = viewportRoot.parentNode.parentNode.parentNode
                    var offsetEl = document.getElementsByClassName('mapboxgl-map')[0];

                    var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0]
                    viewportRoot.style.left = mapOffset[0] + 'px'
                    viewportRoot.style.top = mapOffset[1] + 'px'

                    coordSys.setMapOffset(mapOffset)
                    mapModel.__mapOffset = mapOffset

                    api.dispatchAction({
                        type: 'MapboxGLRoma'
                    })
                }

                function zoomEndHandler() {
                    if (rendering) {
                        return
                    }
                    api.dispatchAction({
                        type: 'MapboxGLRoma'
                    })
                }

                mapboxglMap.off('move', this._oldMoveHandler)
                // FIXME
                // Moveend may be triggered by centerAndZoom method when creating coordSys next time
                // mapboxglMap.removeEventListener('moveend', this._oldMoveHandler)
                mapboxglMap.off('zoomend', this._oldZoomEndHandler)
                mapboxglMap.on('move', moveHandler)
                // mapboxglMap.addEventListener('moveend', moveHandler)
                mapboxglMap.on('zoomend', zoomEndHandler)

                this._oldMoveHandler = moveHandler
                this._oldZoomEndHandler = zoomEndHandler

                var roam = mapModel.get('roam')
                if (roam && roam !== 'scale') {
                    // todo 允许拖拽
                } else {
                    // todo 不允许拖拽
                }
                if (roam && roam !== 'move') {
                    // todo 允许移动
                } else {
                    // todo 不允许允许移动
                }

                rendering = false
            }
        });

        this.chart.setOption(this.options);
        return this;
    }

    _visible() {
        this.canvas.style.visibility = "visible";
    }

    _unvisible() {
        this.canvas.style.visibility = "hidden";
    }

    /**
     * 显示图层
     * @function mapboxgl.zondy.EchartsLayer.prototype.show
     */
    show() {
        this._visible();
    }

    /**
     * 隐藏图层
     * @function mapboxgl.zondy.EchartsLayer.prototype.hide
     */
    hide() {
        this._unvisible();
    }

    /**
     * 删除图层
     * @function mapboxgl.zondy.EchartsLayer.prototype.remove
     */
    remove() {
        var self = this;
        this.map._listeners.move.forEach(function (element) {
            if (element.name === 'moveHandler') {
                self.map.off('move', element);
            }
        });
        this.map._listeners.move.forEach(function (element) {
            if (element.name === 'zoomEndHandler') {
                self.map.off('zoomend', element);
            }
        });

        // this.map.off('move', this.map._listeners.move[1]);
        // this.map.off('zoomend', this.map._listeners.moveend[1]);

        this.chart.clear();

        if (this.canvas.parentNode)
            this.canvas.parentNode.removeChild(this.canvas);
        this.map = undefined;
        return this;
    }
}

mapboxgl.zondy.EchartsLayer = EchartsLayer;