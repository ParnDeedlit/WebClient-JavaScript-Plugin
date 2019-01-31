/**
 * @class TimeSpaceOption
 * @classdesc ElasticSearch的Option参数，传入时间空间进行对应的els查询
 * @alias TimeSpaceOption
 * @example
 * 
var option = {
        db: "df_history",
        table: "2018-01-24",
        space:{
            field:"geo",      //空间字段
            percision:5,      //聚类精度
            west:-180,
            esat:180,
            north:90,
            south:-90
        },
        time:{
            field:"dataTime",  //时间字段
            starttime:"00000", //起始时间 unix时间戳 单位毫秒
            endtime:"10000"    //结束时间 unix时间戳 单位毫秒
        }
    }  
 */
class TimeSpaceOption {
    constructor() {
        /**
         * elasticsearch的默认搜索数据库
         * @type {String}
         * @default null 全局查找
         */
        this.db = "default_index";

        /**
         * elasticsearch的默认搜索数据表
         * @type {String}
         * @default null 全表查找
         */
        this.table = "default_type";

        /**
         * elasticsearch的空间属性，不允许为空
         * @type {Object}
         * @param percision {Number} 最大是0~12
         */
        this.space = {
            field: "geo",  //空间字段
            percision: 5,  //聚类精度
            west: -180,
            esat: 180,
            north: 90,
            south: -90
        };

        /**
         * elasticsearch的时间属性，不允许为空
         * @type {Object}
         */
        this.time = {
            field: "dataTime",   //时间字段
            starttime: "00000",  //起始时间 unix时间戳 单位毫秒
            endtime: "10000"     //结束时间 unix时间戳 单位毫秒
        }
    }
}