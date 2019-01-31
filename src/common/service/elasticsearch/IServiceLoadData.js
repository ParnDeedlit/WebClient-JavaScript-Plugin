import {Zondy} from '../../Base';
import {FetchRequest} from "../../network/FetchRequest";

Zondy.ElasticSearch = Zondy.ElasticSearch || {};
/**
 * @class Zondy.ElasticSearch.IServiceLoadData
 * @classdesc ElasticSearch的可视化是通过MapV实现的，因此必须引入mapv的相关插件
 * @param method - {String} 网络请求方式：post get put delete
 * @param url - {String} 网络请求Url
 * @param params - {Object} 网络请求Params参数
 * @param style - {MapvOption} 地图可视化MapV的样式参数
 * @param map - {Object} 传入的地图组件
 * @param onSuccess - {function} 请求成功时的回调函数
 * @param onFailure - {function} 请求失败时的回调函数
 * @param onCallback(result) - {function} 请求成功时的回调函数，参数是result
 */
export class IServiceLoadData {

  constructor(method, url, params, style, map, onSuccess, onFailure, onCallback) {
    this.method = method;
    this.url = url;
    this.params = params;
    this.fetchServiceData(map, style, onSuccess, onFailure, onCallback);
  }

  fetchServiceData(map, style, success, failure, callback) {
    FetchRequest.commit(this.method, this.url, this.params, {
      // headers: options.headers,
      // withCredentials: options.withCredentials,
      // timeout: options.async ? 0 : null,
      // proxy: options.proxy
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      success(result, map, style, callback);
    });
  }

};

Zondy.ElasticSearch.IServiceLoadData = IServiceLoadData;
