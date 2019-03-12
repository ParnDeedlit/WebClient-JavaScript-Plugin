import L from 'leaflet';
import '../core/Base';

export var BaiduTileLayer = L.TileLayer.extend({

    style: {
        light: 'light',
        visualization: 'visualization',
        redalert: 'redalert',
        grassgreen: 'grassgreen',
        pink: 'pink',
        bluish: 'bluish',
        darkgreen: 'darkgreen',
        grayscale: 'grayscale',
        hardedge: 'hardedge',
        midnight: 'midnight',
        default: 'pl'
    },

    url: 'http://api2.map.bdimg.com/customimage/tile?&udt=20180601&scale=1&x={x}&y={y}&z={z}&ak={baidukey}&styles={styles}',


    options: {
        // @option minZoom: Number = 3
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 3,

        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,

        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: [0, 1, 2],

        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: '',

        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,

        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: true,

        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: false,

        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: false,

        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: false,

        baidukey: 'HmkUGKETQBkEcd6aj3udNZ3W5hKXmXSi',

        //dark,light,street
        id: 'dark',

        styles: "pl"
    },

    initialize: function (options) {
        this.options = L.Util.setOptions(this, options);
    },

    getTileUrl: function (coords) {
        var data = {
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl(),
            styles: this.options.styles,
            ak: this.options.baidukey
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        //this.options.styles = this.options.styles;               

        return L.Util.template(this.url, L.Util.extend(data, this.options));
    },

    _getSubdomain: function (tilePoint) {
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    }
});

export var baiduTileLayer = function (options) {
    return new BaiduTileLayer(options);
}

L.zondy.BaiduTileLayer = baiduTileLayer;