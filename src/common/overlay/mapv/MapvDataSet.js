Zondy.Overlay = Zondy.Overlay || {};

/**
 * 
 * @class MapvDataSet
 * @classdesc MapV的DataSet参数，传入不同数据类型
 * A data set can:
 * - add/remove/update data
 * - gives triggers upon changes in the data
 * - can  import/export data in various data formats
 * @param {Array} [data]    Optional array with initial data
 * @example 
 * the field geometry is like geojson, it can be:
 * {
 *     "type": "Point",
 *     "coordinates": [125.6, 10.1]
 * }
 * {
 *     "type": "LineString",
 *     "coordinates": [
 *         [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
 *     ]
 * }
 * {
 *     "type": "Polygon",
 *     "coordinates": [
 *         [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
 *           [100.0, 1.0], [100.0, 0.0] ]
 *     ]
 * }
 * @param {Object} [options]   Available options,只做额外增加的字段作用:
 * 
 */
function MapvDataSet(data, options) {
    Event.bind(this)();

    this._options = options || {};
    this._data = []; // map with data indexed by id

    // add initial data when provided
    if (data) {
        this.add(data);
    }

}

MapvDataSet.prototype = Event.prototype;

/**
 * @function MapvDataSet.prototype.add
 * @description 添加数据
 */
MapvDataSet.prototype.add = function (data, senderId) {
    if (Array.isArray(data)) {
        // Array
        for (var i = 0, len = data.length; i < len; i++) {
            if (data[i].time && data[i].time.length == 14 && data[i].time.substr(0, 2) == '20') {
                var time = data[i].time;
                data[i].time = new Date(time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2) + ' ' + time.substr(8, 2) + ':' + time.substr(10, 2) + ':' + time.substr(12, 2)).getTime();
            }
            this._data.push(data[i]);
        }
    } else if (data instanceof Object) {
        // Single item
        this._data.push(data);
    } else {
        throw new Error('Unknown dataType');
    }

    this._dataCache = JSON.parse(JSON.stringify(this._data));
};

/**
 * @function MapvDataSet.prototype.reset
 * @description 重置数据
 */
MapvDataSet.prototype.reset = function () {
    this._data = JSON.parse(JSON.stringify(this._dataCache));
}

/**
 * @function MapvDataSet.prototype.get
 * @description 获取数据
 */
MapvDataSet.prototype.get = function (args) {
    args = args || {};

    //console.time('copy data time')
    var start = new Date();
    // TODO: 不修改原始数据，在数据上挂载新的名称，每次修改数据直接修改新名称下的数据，可以省去deepCopy
    // var data = deepCopy(this._data);
    var data = this._data;

    var start = new Date();

    if (args.filter) {
        var newData = [];
        for (var i = 0; i < data.length; i++) {
            if (args.filter(data[i])) {
                newData.push(data[i]);
            }
        }
        data = newData;
    }

    if (args.transferCoordinate) {
        data = this.transferCoordinate(data, args.transferCoordinate, args.fromColumn, args.toColumn);
    }

    // console.timeEnd('transferCoordinate time')

    return data;

};

/**
 * @function MapvDataSet.prototype.set
 * @description 设置数据
 */
MapvDataSet.prototype.set = function (data) {
    this._set(data);
    this._trigger('change');
}


MapvDataSet.prototype._set = function (data) {
    this.clear();
    this.add(data);
}

/**
 * @function MapvDataSet.prototype.clear
 * @description 清空数据
 */
MapvDataSet.prototype.clear = function (args) {
    this._data = []; // map with data indexed by id
}

/**
 * @function MapvDataSet.prototype.remove
 * @description 移除数据
 */
MapvDataSet.prototype.remove = function (args) {};

/**
 * @function MapvDataSet.prototype.update
 * @description 更新数据
 */
MapvDataSet.prototype.update = function (cbk, condition) {

    var data = this._data;

    var item = null;
    for (var i = 0; i < data.length; i++) {
        if (condition) {
            var flag = true;
            for (var key in condition) {
                if (data[i][key] != condition[key]) {
                    flag = false;
                }
            }
            if (flag) {
                cbk && cbk(data[i]);
            }
        } else {
            cbk && cbk(data[i]);
        }
    }

    this._dataCache = JSON.parse(JSON.stringify(this._data));

    this._trigger('change');
};

/**
 * @function MapvDataSet.prototype.transferCoordinate
 * @description 数据坐标转换
 */
MapvDataSet.prototype.transferCoordinate = function (data, transferFn, fromColumn, toColumnName) {

    toColumnName = toColumnName || '_coordinates';
    fromColumn = fromColumn || 'coordinates';

    for (var i = 0; i < data.length; i++) {

        var geometry = data[i].geometry;
        var coordinates = geometry[fromColumn];
        switch (geometry.type) {
            case 'Point':
                geometry[toColumnName] = transferFn(coordinates);
                break;
            case 'LineString':
                var newCoordinates = [];
                for (var j = 0; j < coordinates.length; j++) {
                    newCoordinates.push(transferFn(coordinates[j]));
                }
                geometry[toColumnName] = newCoordinates;
                break;
            case 'Polygon':
                var newCoordinates = getPolygon(coordinates);
                geometry[toColumnName] = newCoordinates;
                break;
            case 'MultiPolygon':
                var newCoordinates = [];
                for (var c = 0; c < coordinates.length; c++) {
                    var polygon = coordinates[c];
                    var polygon = getPolygon(polygon);
                    newCoordinates.push(polygon);
                }

                geometry[toColumnName] = newCoordinates;
                break;
        }

    }

    function getPolygon(coordinates) {
        var newCoordinates = [];
        for (var c = 0; c < coordinates.length; c++) {
            var coordinate = coordinates[c];
            var newcoordinate = [];
            for (var j = 0; j < coordinate.length; j++) {
                newcoordinate.push(transferFn(coordinate[j]));
            }
            newCoordinates.push(newcoordinate);
        }
        return newCoordinates;
    }

    return data;
};

MapvDataSet.prototype.initGeometry = function (transferFn) {

    if (transferFn) {

        this._data.forEach(function (item) {
            item.geometry = transferFn(item);
        });

    } else {

        this._data.forEach(function (item) {
            if (!item.geometry) {
                if (item.lng && item.lat) {
                    item.geometry = {
                        type: 'Point',
                        coordinates: [item.lng, item.lat]
                    }
                } else if (item.city) {
                    var center = cityCenter.getCenterByCityName(item.city);
                    if (center) {
                        item.geometry = {
                            type: 'Point',
                            coordinates: [center.lng, center.lat]
                        }
                    }
                }
            }
        });
    }

}

/**
 * @function MapvDataSet.prototype.getMax
 * @description 获取当前列的最大值
 */
MapvDataSet.prototype.getMax = function (columnName) {
    var data = this._data;

    if (!data || data.length <= 0) {
        return;
    }

    var max = parseFloat(data[0][columnName]);

    for (var i = 1; i < data.length; i++) {
        var value = parseFloat(data[i][columnName]);
        if (value > max) {
            max = value;
        }
    }

    return max;
}

/**
 * @function MapvDataSet.prototype.getSum
 * @description 获取当前列的总和
 */
MapvDataSet.prototype.getSum = function (columnName) {
    var data = this._data;

    if (!data || data.length <= 0) {
        return;
    }

    var sum = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i][columnName]) {
            sum += parseFloat(data[i][columnName]);
        }
    }

    return sum;
}

/**
 * @function MapvDataSet.prototype.getMin
 * @description 获取当前列的最小值
 */
MapvDataSet.prototype.getMin = function (columnName) {
    var data = this._data;

    if (!data || data.length <= 0) {
        return;
    }

    var min = parseFloat(data[0][columnName]);

    for (var i = 1; i < data.length; i++) {
        var value = parseFloat(data[i][columnName]);
        if (value < min) {
            min = value;
        }
    }

    return min;
}

/**
 * @function MapvDataSet.prototype.getUnique
 * @description 获取去重的数据
 */
MapvDataSet.prototype.getUnique = function (columnName) {
    var data = this._data;

    if (!data || data.length <= 0) {
        return;
    }

    var maps = {};

    for (var i = 1; i < data.length; i++) {
        maps[data[i][columnName]] = true;
    }

    var data = [];
    for (var key in maps) {
        data.push(key);
    }

    return data;
}

function deepCopy(obj) {
    var newObj;
    if (typeof obj == 'object') {
        newObj = obj instanceof Array ? [] : {};
        for (var i in obj) {
            newObj[i] = obj[i] instanceof HTMLElement ? obj[i] : deepCopy(obj[i]);
        }
    } else {
        newObj = obj
    }
    return newObj;
}

export default MapvDataSet;