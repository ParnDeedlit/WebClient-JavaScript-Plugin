import "./PromisePolyfill"
import 'fetch-ie8'
import fetchJsonp from 'fetch-jsonp';
import {Zondy} from '../Base';
import {appendUrl} from '../util/Util';

const fetch = window.fetch;

/**
 * @member Zondy.CORS
 * @description 是否支持跨域
 * @type {boolean}
 */
var CORS = Zondy.CORS = Zondy.CORS || (window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest());

/**
 * @member Zondy.DefaultTimeout
 * @description 请求超时时间，默认60s
 * @type {number}
 */
var DefaultTimeout = Zondy.DefaultTimeout = Zondy.DefaultTimeout || 60000;

/**
 * @class FetchRequest
 * @classdesc 核心请求库，该库封装了GET,POST,PUT,DELETE四种网络请求，使用jsonp进行客户端的跨域处理以及proxy代理功能
 */
var FetchRequest = Zondy.FetchRequest = {
    commit: function (method, url, params, options) {
        method = method ? method.toUpperCase() : method;
        switch (method) {
            case 'GET':
                return this.get(url, params, options);
            case 'POST':
                return this.post(url, params, options);
            case 'PUT':
                return this.put(url, params, options);
            case 'DELETE':
                return this.delete(url, params, options);
            default:
                return this.get(url, params, options);
        }
    },

    get: function (url, params, options) {
        options = options || {};
        var type = 'GET';
        url = this.prefixUrl(url, options);
        url = appendUrl(url, this.getParamString(params || {}));
        if (!this.urlIsLong(url)) {
            return this.fetchByES(url, params, options, type);
        }
        return this.postSimulate(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    delete: function (url, params, options) {
        options = options || {};
        var type = 'DELETE';
        url = this.prefixUrl(url, options);
        url = appendUrl(url, this.getParamString(params || {}));
        if (!this.urlIsLong(url) && CORS) {
            return this.fetchByES(url, params, options, type);
        }
        return this.postSimulate(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    post: function (url, params, options) {
        options = options || {};
        return this.fetchByES(this.prefixUrl(url, options), params, options, 'POST');
    },

    put: function (url, params, options) {
        options = options || {};
        return this.fetchByES(this.prefixUrl(url, options), params, options, 'PUT');
    },

     /**
     * 判断当前url的长度是否超过2000的限制
     * @function Zondy.FetchRequest.prototype.postSimulate
     * 
     * @param url - {String} 网络请求Url.
     * @returns post {function} 发送处理好参数后的url的post请求.
     */
    urlIsLong: function (url) {
        //当前url的字节长度。
        var totalLength = 0,
            charCode = null;
        for (var i = 0, len = url.length; i < len; i++) {
            //转化为Unicode编码
            charCode = url.charCodeAt(i);
            if (charCode < 0x007f) { 
                // 0 -127是单字节
                totalLength++;
            } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
                // 128 -2047是双字节
                totalLength += 2;
            } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
                // 2048 -65535是三字节
                totalLength += 3;
            }
        }
        return (totalLength < 2000) ? false : true;
    },


    /**
     * 模拟post请求Url
     * @function Zondy.FetchRequest.prototype.postSimulate
     * 
     * @param type - {String} "get, post, delete, add".
     * @param url - {String} 网络请求Url.
     * @param params - {String} 网络请求参数.
     * @param options - {Object} 额外的选项.
     * @returns post {function} 发送处理好参数后的url的post请求.
     */
    postSimulate: function (type, url, params, options) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + '_method=' + type;
        if (typeof params !== 'string') {
            params = JSON.stringify(params);
        }
        return this.post(url, params, options);
    },

    /**
     * 修正代理后的post请求Url
     * @function Zondy.FetchRequest.prototype.prefixUrl
     * 
     * @param url - {String} 网络请求Url.
     * @param options - {Object} 额外的选项.
     * @returns url {String} 发送处理好代理参数后的url.
     */
    prefixUrl: function (url, options) {
        if (options && options.proxy) {
            if (typeof options.proxy === "function") {
                url = options.proxy(url);
            } else {
                url = decodeURIComponent(url);
                url = options.proxy + encodeURIComponent(url);
            }
        }
        return url;
    },

    /**
     * 模拟post请求Url
     * @function Zondy.FetchRequest.prototype.fetchByES
     * 
     * @param url - {String} 网络请求Url.
     * @param params - {String} 网络请求参数.
     * @param options - {Object} 额外的选项.
     * @param type - {String} "get, post, delete, add".
     * @returns response {Object} 返回结果.
     */
    fetchByES: function (url, params, options, type) {
        options = options || {};
        options.headers = options.headers || {};
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
//        options.headers['Access-Control-Allow-Origin'] = '*';
//        options.headers['Access-Control-Allow-Headers'] = 'Origin,X-Requested-With,Content-Type,Accept';
//        options.headers['Accept'] = 'application/json';
       // options.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE';
        if (options.timeout) {
            return this.timeDelay(options.timeout, fetch(url, {
                method: type,
                headers: options.headers,
                body: type === 'PUT' || type === 'POST' ? params : undefined,
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: 'cors',
                timeout: DefaultTimeout
            }).then(function (response) {
                return response;
            }));
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: 'cors',
            timeout: DefaultTimeout
        }).then(function (response) {
            return response;
        });
    },

    /**
     * 当需要前端使用jsonp进行跨域的时候，使用jsonp进行跨域，这个最好直接让后台改下跨域问题就行了，免得麻烦
     * @function Zondy.FetchRequest.prototype.fetchByJsonp
     * 
     * @param url - {String} 网络请求Url.
     * @param options - {Object} 额外的选项.
     * @returns url {String} 发送处理好代理参数后的url.
     */
     fetchByJsonp: function (url, options) {
         options = options || {};
         return fetchJsonp(url, { method: 'GET', timeout: options.timeout })
             .then(function (response) {
                 return response;
             });
     },

    /**
     * 延时发送网络请求
     * @function Zondy.FetchRequest.prototype.timeDelay
     * 
     * @param seconds - {Number} 延时的秒数.
     * @param promise - {Promise} 要延时执行的Promise.
     * @returns {Promise} 延迟处理的Promise.
     */
    timeDelay: function (seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"))
            }, seconds)
            promise.then(resolve, reject)
        })
    },

    getParamString: function (params) {
        var paramsArray = [];
        for (var key in params) {
            var value = params[key];
            if ((value != null) && (typeof value !== 'function')) {
                var encodedValue;
                if (typeof value === 'object' && value.constructor === Array) {
                    var encodedItemArray = [];
                    var item;
                    for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                        item = value[itemIndex];
                        encodedItemArray.push(encodeURIComponent(
                            (item === null || item === undefined) ? "" : item)
                        );
                    }
                    encodedValue = '[' + encodedItemArray.join(",") + ']';
                } else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
            }
        }
        return paramsArray.join("&");
    }
};
export { CORS,DefaultTimeout,FetchRequest};
Zondy.Network.FetchRequest = FetchRequest;
Zondy.Network.CORS = CORS;
Zondy.Network.DefaultTimeout = DefaultTimeout;
