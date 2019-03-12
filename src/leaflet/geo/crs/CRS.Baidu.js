import L from 'leaflet';

import '../../core/Base';

/*
 * @namespace CRS
 * @crs L.CRS.Baidu
 * @see L.Proj.CRS in proj4leaflet.js
 * 针对百度最小3级，最大18级的特定的web墨卡托的EPSG参数设定
 */

/* if (L && L.Proj) {
	EPSGBaidu = new L.Proj.CRS(
		'EPSG:3395',
		'+proj=merc +lon_0=0 +k=1 +x_0=140 +y_0=-250 +datum=WGS84 +units=m +no_defs', {
			resolutions: function () {
				var level = 19;
				var res = [];
				res[0] = Math.pow(2, 18);
				for (var i = 1; i < level; i++) {
					res[i] = Math.pow(2, (18 - i))
				}
				return res;
			}(),
			origin: [0, 0],
			bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
		}
	);
} else {
	console.log('Leaflet and proj4 必须在使用之前加载！常见错误：如js引入的顺序问题leaflet>proj4>plugins!');
} */

export var EPSGBaidu;
export var epsgBaidu = function () {
	return new EPSGBaidu();
}

if (L && L.Proj) {
	L.CRS.EPSGBaidu = new L.Proj.CRS(
		'EPSG:3395',
		'+proj=merc +lon_0=0 +k=1 +x_0=140 +y_0=-250 +datum=WGS84 +units=m +no_defs', {
			resolutions: function () {
				var level = 19;
				var res = [];
				res[0] = Math.pow(2, 18);
				for (var i = 1; i < level; i++) {
					res[i] = Math.pow(2, (18 - i))
				}
				return res;
			}(),
			origin: [0, 0],
			bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
		}
	);
} else {
	console.log("使用高斯投影的时候，请严格遵守espg的规范 http://client.snanyun.com:8899/ui/epsg.html , 请不要过分相信上面表格中的中文名字，以后面的+proj=tmerc +lat_0=0 +lon_0=135 为标准")	
	console.log('Leaflet and proj4 必须在使用之前加载！常见错误：如js引入的顺序问题leaflet>proj4>plugins!');
}