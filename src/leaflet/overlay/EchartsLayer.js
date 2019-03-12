import L from "leaflet";
import echarts from 'echarts';

import '../core/Base';

import MapCoordSys from './echart/MapCoordSys';

/**
 * leaflet的echars 4.0的实现
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.EchartsLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @param map - {Object} 传入的leaflet的地图对象
 * @param options - {Object} echarts.options
 * 
 * @see http://echarts.baidu.com/api.html#echarts
 */
export var EchartsLayer = L.Layer.extend({

    map: null, //传入的leaflet地图
    chart: null,
    options: null,
    canvas: null,

    initialize: function (map, options) {
        this.map = map;
        this.options = options;
        this.layerId = options.layerId || "echartlayerdefaultid";
        this.layerClass = options.classId || "echartlayerdefaultclass";

        this.initDevicePixelRatio();
        this.initOptions(this.options);
        this.initEcharts();

        this._resizeCanvas();
    },

    initDevicePixelRatio() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
    },

    initOptions: function (options) {
        if (options) {
            if(options.leaflet){
                return;
            }
            this.options.leaflet = {
                roam: true
            }
        }
    },

    initEcharts() {
        echarts.registerCoordinateSystem('leaflet', MapCoordSys);

        echarts.extendComponentModel({
            type: 'leaflet',
            getBMap: function () {
                return this.__leaflet;
            },
            defaultOption: {
                roam: false
            }
        });

        echarts.registerAction({
                type: 'LeafletRoma',
                event: 'LeafletRoma',
                update: 'updateLayout'
            },
            function (payload, ecModel) {
                /* ecModel.eachComponent('leaflet', function(leafletModel) {
                  const leaflet = leafletModel.getLeaflet();
                  const center = leaflet.getCenter();
                  leafletModel.setCenterAndZoom(
                    [center.lng, center.lat],
                    leaflet.getZoom()
                  );
                }); */
            }
        );
    },

    _visible: function () {
        this.canvas.style.visibility = "visible";
    },

    _unvisible: function () {
        this.canvas.style.visibility = "hidden";
    },

    onAdd: function (map) {
        this.map = map;
        this.canvas = this._createCanvas();
        map.getPanes().overlayPane.appendChild(this.canvas);

        this.chart = echarts.init(this.canvas);

        echarts.leafletMap = map;

        var self = this;
        map.on('resize', function (e) {
            let size = e.newSize;
            self.canvas.style.width = size.x + 'px';
            self.canvas.style.height = size.y + 'px';
            self.chart.resize()
        })
        map.on("zoomstart", function () {
            self._unvisible();
        });

        echarts.extendComponentView({
            type: 'leaflet',

            render: function (mapModel, ecModel, api) {
                var rendering = true;

                var leafletMap = echarts.leafletMap;

                var viewportRoot = api.getZr().painter.getViewportRoot();
                var coordSys = mapModel.coordinateSystem;

                var moveHandler = function () {
                    if (rendering) {
                        return;
                    }
                    var topleft = leafletMap.getBounds().getNorthWest();
                    var offset = leafletMap.latLngToLayerPoint(topleft);
                    var mapOffset = [parseInt(offset.x, 10) || 0, parseInt(offset.y, 10) || 0]
                    viewportRoot.style.left = mapOffset[0] + 'px';
                    viewportRoot.style.top = mapOffset[1] + 'px';
                    coordSys.setMapOffset(mapOffset);
                    mapModel.__mapOffset = mapOffset;

                    api.dispatchAction({
                        type: 'LeafletRoma'
                    })
                };

                var zoomEndHandler = function () {
                    if (rendering) {
                        return;
                    }

                    api.dispatchAction({
                        type: 'LeafletRoma'
                    });

                    self._visible();
                };

                leafletMap.off('move', this._oldMoveHandler)
                leafletMap.off('zoomend', this._oldZoomEndHandler)
                // FIXME
                // Moveend may be triggered by centerAndZoom method when creating coordSys next time
                // leafletMap.off('moveend', this._oldMoveHandler)
                leafletMap.on('move', moveHandler);
                leafletMap.on('zoomend', zoomEndHandler);
                // leafletMap.on('moveend', moveHandler)
                this._oldMoveHandler = moveHandler;
                this._oldZoomEndHandler = zoomEndHandler;

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

                rendering = false;
            }
        });
        this.chart.setOption(this.options);
    },

    onRemove: function (map) {
        this.chart.dispose();
    },

    _createCanvas: function () {
        var canvas = document.createElement('div');
        canvas.id = this.layerId;
        //canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.height = this.map.getSize().y + 'px';
        canvas.width = this.map.getSize().x + 'px';
        canvas.style.height = this.map.getSize().y + 'px';
        canvas.style.width = this.map.getSize().x + 'px';
        canvas.style.zIndex = 100;

        canvas.setAttribute('id', this.layerId);
        canvas.setAttribute('class', this.layerClass);

        this.canvas = canvas;

        return canvas;
    },

    _resizeCanvas: function () {
        const self = this;

        window.onresize = function () {
            var canvas = self.canvas;
            var map = self.map;

            //canvas.style.position = 'absolute';
            canvas.style.top = "0px";
            canvas.style.left = "0px";
            canvas.height = this.map.getSize().y + 'px';
            canvas.width = this.map.getSize().x + 'px';
            canvas.style.height = this.map.getSize().y + 'px';
            canvas.style.width = this.map.getSize().x + 'px';

            self.chart.resize();
        };
    },

    /**
     * 显示图层
     * @function L.zondy.EchartsLayer.prototype.show
     */
    show: function () {
        this._visible();
    },

    /**
     * 隐藏图层
     * @function L.zondy.EchartsLayer.prototype.hide
     */
    hide: function () {
        this._unvisible();
    },

    /**
     * 重置图层大小
     * @function L.zondy.EchartsLayer.prototype.resize
     */
    resize: function () {
        var canvas = this.canvas;
        var map = this.map;

        //canvas.style.position = 'absolute';
        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.height = this.map.getSize().y + 'px';
        canvas.width = this.map.getSize().x + 'px';
        canvas.style.height = this.map.getSize().y + 'px';
        canvas.style.width = this.map.getSize().x + 'px';

        this.chart.resize();
    }
});

export var echartsLayer = function (echartsParams, options) {
    return new EchartsLayer(echartsParams, options);
};

L.zondy.EchartsLayer = echartsLayer;