Zondy.Overlay = Zondy.Overlay || {};

/**
 * @class MapvOption
 * @classdesc MapV的Option参数，决定不同数据类型显示效果
 * @alias MapvOption
 * @example
    options = {
        zIndex: 1, // 层级
        size: 5, // 大小值
        unit: 'px', // 'px': 以像素为单位绘制,默认值。'm': 以米制为单位绘制，会跟随地图比例放大缩小
        mixBlendMode: 'normal', // 不同图层之间的叠加模式，参考[https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
        fillStyle: 'rgba(200, 200, 50, 1)', // 填充颜色
        strokeStyle: 'rgba(0, 0, 255, 1)', // 描边颜色
        lineWidth: 4, // 描边宽度
        globalAlpha: 1, // 透明度
        globalCompositeOperation: 'lighter', // 颜色叠加方式
        coordType: 'bd09ll', // 可选百度墨卡托坐标类型bd09mc和百度经纬度坐标类型bd09ll(默认)
        shadowColor: 'rgba(255, 255, 255, 1)', // 投影颜色
        shadowBlur: 35,  // 投影模糊级数
        updateCallback: function (time) { // 重绘回调函数，如果是时间动画、返回当前帧的时间
        },
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        context: '2d', // 可选2d和webgl，webgl目前只支持画simple模式的点和线
        lineCap: 'butt',
        lineJoin: 'miter',
        miterLimit: 10,
        methods: { // 一些事件回调函数
            click: function (item) { // 点击事件，返回对应点击元素的对象值
                console.log(item);
            },
            mousemove: function(item) { // 鼠标移动事件，对应鼠标经过的元素对象值
                console.log(item);
            }
        },
        animation: {
            type: 'time', // 按时间展示动画
            stepsRange: { // 动画时间范围,time字段中值
                start: 0,
                end: 100
            },
            trails: 10, // 时间动画的拖尾大小
            duration: 5, // 单个动画的时间，单位秒
        }
    }
 */
export class MapvOption {
    constructor() {
        /**
         * zIndex值，决定压盖顺序.
         * @type {Number}
         * @default 1
         */
        this.zIndex = 1;

        /**
         * size值，大小值.
         * @type {Number}
         * @default 5
         */
        this.size = 5;

        /**
         * unit 'px': 以像素为单位绘制,默认值。'm': 以米制为单位绘制，会跟随地图比例放大缩小.
         * @type {String}
         * @default px
         */
        this.unit = 'px';

        /**
         * 不同图层之间的叠加模式，参考[https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
         * @type {String}
         * @default normal
         */
        this.mixBlendMode = 'normal';

        /**
         * 填充颜色
         * @type {String}
         * @default rgba(200, 200, 50, 1)
         */
        this.fillStyle = 'rgba(200, 200, 50, 1)';

        /**
         * 描边颜色
         * @type {String}
         * @default rgba(0, 0, 255, 1)
         */
        this.strokeStyle = 'rgba(0, 0, 255, 1)';

        /**
         * 描边宽度
         * @type {Number}
         * @default 4
         */
        this.lineWidth = 4;

        /**
         * 透明度
         * @type {Number}
         * @default 1
         */
        this.globalAlpha = 1;

        /**
         * 颜色叠加方式
         * @type {String}
         * @default lighter
         */
        this.globalCompositeOperation = 'lighter';

        /**
         * 可选百度墨卡托坐标类型bd09mc和百度经纬度坐标类型bd09ll(默认)
         * @type {String}
         * @default bd09ll
         */
        this.coordType = 'bd09ll';

        /**
         * 投影颜色
         * @type {String}
         * @default rgba(255, 255, 255, 1)
         */
        this.shadowColor = 'rgba(255, 255, 255, 1)';

        /**
         * 投影模糊级数
         * @type {Number}
         * @default 35
         */
        this.shadowBlur = 35;

        /**
         * 重绘回调函数，如果是时间动画、返回当前帧的时间
         * @param {Number} time 
         */
        this.updateCallback = function (time) {};

        /**
         * 阴影x偏移
         * @type {Number}
         * @default 0
         */
        this.shadowOffsetX = 0;

        /**
         * 阴影y偏移
         * @type {Number}
         * @default 0
         */
        this.shadowOffsetY = 0;

        /**
         * 可选2d和webgl，webgl目前只支持画simple模式的点和线
         * @type {String}
         * @default 2d
         */
        this.context = '2d';

        /**
         * 线的角类型 
         * @type {String}
         * @default butt
         */
        this.lineCap = 'butt';

        /**
         * 线的join类型 
         * @type {String}
         * @default miter
         */
        this.lineJoin = 'miter';

        /**
         * 长度限制
         * @type {Number}
         * @default 10
         */
        this.miterLimit = 10;

        /**
         * 一些事件回调函数
         * @type {Object}
         * @example 
         * { // 一些事件回调函数
            click: function (item) { // 点击事件，返回对应点击元素的对象值
                console.log(item);
            },
            mousemove: function (item) { // 鼠标移动事件，对应鼠标经过的元素对象值
                console.log(item);
            }
        }
         */
        this.methods = { // 一些事件回调函数
            click: function (item) { // 点击事件，返回对应点击元素的对象值
                console.log(item);
            },
            mousemove: function (item) { // 鼠标移动事件，对应鼠标经过的元素对象值
                console.log(item);
            }
        };

        /**
         * 动画属性 
         * @type {Object}
         * @example 
         * {
                type: 'time', // 按时间展示动画
                stepsRange: { // 动画时间范围,time字段中值
                    start: 100,
                    end: 100
                },
                trails: 10, // 时间动画的拖尾大小
                duration: 5, // 单个动画的时间，单位秒
            }
         */
        this.animation = {
            type: 'time', // 按时间展示动画
            stepsRange: { // 动画时间范围,time字段中值
                start: 100,
                end: 100
            },
            trails: 10, // 时间动画的拖尾大小
            duration: 5, // 单个动画的时间，单位秒
        };
    }

}

Zondy.Overlay.MapvOption = MapvOption;