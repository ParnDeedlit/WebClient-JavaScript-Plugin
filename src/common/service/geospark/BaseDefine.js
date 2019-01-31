import {Zondy} from '../../Base';

Zondy.GeoSpark = Zondy.GeoSpark || {};

export const URL_HTTP_PROFIX = "http://";
export const URL_DIVISION = "/";
export const URL_SUB = ":";
export const URL_SOCKET = "8020";
export const URL_BODY_END = "?";
export const URL_PARAM_LINK = "&";

export const PARAM_SUB = ":";
export const PARAM_COMMA = ",";
export const PARAM_SPLIT = ";";

export const QUERY_TIMECUBE_LIB = "pgsql";
export const QUERY_TIMECUBE_INFO = "tableInfoAsJson";


export const PARAM_LIB_NAME = "libName";
export const PARAM_TLE_NAME = "tableName?";
export const PARAM_SCHEMAS = "schemas";
export const PARAM_INCLUDE_PROPS = "includeProps";


/*
 * 时空立方体服务
 * example http://192.168.81.223:9091/pgsql/tableInfoAsJson?libName=postgis&tableName=createspacetimecube_zhc_001&schemas=public&includeProps=true
 */
export const QUERY_TIMECUBE = QUERY_TIMECUBE_LIB + URL_DIVISION + QUERY_TIMECUBE_INFO + URL_BODY_END;
