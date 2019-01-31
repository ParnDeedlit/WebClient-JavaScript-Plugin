import {
  Zondy
} from '../../Base';

import {
    URL_HTTP_PROFIX,
    URL_SUB,
    QUERY_TIMECUBE
} from './BaseDefine';

import {
  IServiceQuery
} from '../base/IServiceQuery';

import {
  DeveloperError
} from '../../debug/DeveloperError';


Zondy.GeoSpark.TimeSpaceCubeService = undefined;

/**
 * 时空立方体的总体介绍
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 *
 * @alias TimeSpaceCubeService
 * @constructor
 *
 * @param {Object} options 该对象拥有以下属性：
 * @param {Number} options.ip DataStore的ip地址.
 * @param {Number} options.socket DataStore的socket通信端口.
 * @param {Object} [options.queryOption=DEFAULT] 查询条件属性.
 *
 * @exception {DeveloperError} options.styleOption 必须是正确的样式.
 *
 * @see TimeSpaceCubeLayer
 *
 * @example
 * // create cylinder geometry
 * var cylinder = new Zondy.GeoSpark.TimeSpaceCubeService({
 *     ip: "192.168.81.223",
 *     socket: "9091",
 *     queryOption: {
 *        libName : "postgis",
 *        tableName : "createspacetimecube_zhc_001",
 *        schemas : "public",
 *        includeProps : true
 *     }
 * });
 * var geometry = Cesium.CylinderGeometry.createGeometry(cylinder);
 */
export class TimeSpaceCubeService {
  constructor(options, successCallBack, failureCallBack) {
    //ip, socket, map, queryOption, styleOption    
    this.urlAddress = "";

    this.queryOption = {};

    this.handleSuccess = successCallBack;
    this.handleFailure = failureCallBack

    this.prefixUrlPost(options.ip, options.socket, options.queryOption);
    new IServiceQuery("GET", this.urlAddress, this.queryOption, this.map, this.handleSuccess, this.handleFailure);
  }

  /*
  * 下面的逻辑是对应的DataStore的Post请求一一对应，这里只是一个封装，将用户的直观参数
  转换成DataStore要求的参数
  */
  prefixUrlPost(ip, socket, queryOption) {
    this.urlAddress = "http://192.168.81.223:9091/pgsql/tableInfoAsJson?libName=postgis&tableName=createspacetimecube_zhc_001&schemas=public&includeProps=true";
    //处理url
    this.urlAddress = "" + URL_HTTP_PROFIX + ip + URL_SUB + socket + "/" + QUERY_TIMECUBE;
    //处理elasticsearch的数据库库名,表名等请求参数
    this.queryOption = queryOption;
  } 

};

Zondy.GeoSpark.TimeSpaceCubeService = TimeSpaceCubeService;