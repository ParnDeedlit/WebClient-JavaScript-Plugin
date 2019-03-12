import L from 'leaflet';

export var BaiduMercator = {

	R: 6378137,
    MAX_LATITUDE: 85.0511287798,    
	
	project: function (latlng) {
		var d = Math.PI / 180,
			max = this.MAX_LATITUDE,
			lat = Math.max(Math.min(max, latlng.lat), -max),
			sin = Math.sin(lat * d);

		return new L.Point(
			this.R * latlng.lng * d,
			this.R * Math.log((1 + sin) / (1 - sin)) / 2);
	},

	unproject: function (point) {
		var d = 180 / Math.PI;

		return new L.LatLng(
			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
			point.x * d / this.R);
	},

	bounds: (function () {
		var d = 6378137 * Math.PI;
		return new L.Bounds([-d, -d], [d, d]);
	})()
};