/**
 * elasticsearch的HTTP前缀
 * @type {String}
 * @default http://
 * @readonly
 */
export const URL_HTTP_PROFIX = "http://";

/**
 * elasticsearch的URL路径分隔符
 * @type {String}
 * @default /
 * @readonly
 */
export const URL_DIVISION = "/";

/**
 * elasticsearch的URL端口分割符
 * @type {String}
 * @default :
 * @readonly
 */
export const URL_SUB = ":";

/**
 * elasticsearch的默认端口号
 * @type {String}
 * @default 8020
 * @readonly
 */
export const uriSocket = "8020";

/**
 * elasticsearch的默认参数分隔符
 * @type {String}
 * @default ?
 * @readonly
 */
export const uriBody_end = "?";

/**
 * elasticsearch的默认参数分隔符
 * @type {String}
 * @default &
 * @readonly
 */
export const uriParamLink = "&";

/**
 * elasticsearch的默认请求前缀
 * @type {String}
 * @default es
 * @readonly
 */
export const elsName = "es";
/**
 * elasticsearch的默认常规查询
 * @type {String}
 * @default generalQuery
 * @readonly
 */
export const elsQuery = "generalQuery";
/**
 * elasticsearch的默认index筛选参数
 * @type {String}
 * @default indexName=
 * @readonly
 */
export const elsIndex = "indexName=";
/**
 * elasticsearch的默认type筛选参数
 * @type {String}
 * @default typeName=
 * @readonly
 */
export const elsType = "typeName=";
/**
 * elasticsearch的默认空间筛选参数
 * @type {String}
 * @default spatialCondition=
 * @readonly
 */
export const elsSpatial = "spatialCondition=";
/**
 * elasticsearch的默认时间筛选参数
 * @type {String}
 * @default timeCondition=
 * @readonly
 */
export const elsTimeComdition = "timeCondition=";
/**
 * elasticsearch的默认查询租佃参数
 * @type {String}
 * @default queryField=
 * @readonly
 */
export const elsQueryField = "queryField=";

/**
 * elasticsearch的默认查询租佃参数
 * @type {String}
 * @default queryField=
 * @readonly
 */
export const PARAM_SUB = ":";
/**
 * elasticsearch的默认查询租佃参数
 * @type {String}
 * @default queryField=
 * @readonly
 */
export const PARAM_COMMA = ",";
/**
 * elasticsearch的默认分号
 * @type {String}
 * @default ;
 * @readonly
 */
export const PARAM_SPLIT = ";";
/**
 * elasticsearch的默认类型
 * @type {String}
 * @default 0
 * @readonly
 */
export const aggGeoFormat  = "0";  //0表示点  1表示区
/**
 * elasticsearch的默认聚类精度
 * @type {String}
 * @default percision
 * @readonly
 */
export const elsPercision = "percision";//geohash聚类的精度

/**
 * elasticsearch的空间-点类型
 * @type {String}
 * @default point
 * @readonly
 */
export const SPACE_ENUM_POINT = "point";
/**
 * elasticsearch的空间-线类型
 * @type {String}
 * @default line
 * @readonly
 */
export const SPACE_ENUM_LINE = "line";
/**
 * elasticsearch的空间-区类型
 * @type {String}
 * @default polygon
 * @readonly
 */
export const SPACE_ENUM_POLYGON = "polygon";

/**
 * elasticsearch的地理哈希聚合服务
 * @type {String}
 * @default polygon
 * @readonly
 */
export const QUERY_GEOHASH = "stGeoHashQueryByAgg";
/**
 * elasticsearch的地理哈希聚合服务返回结果-点类型
 * @type {String}
 * @default 0
 * @readonly
 */
export const QUERY_GEOHASH_POINT= "0";
/**
 * elasticsearch的地理哈希聚合服务返回结果-区类型
 * @type {String}
 * @default 1
 * @readonly
 */
export const QUERY_GEOHASH_POLYGON = "1";
