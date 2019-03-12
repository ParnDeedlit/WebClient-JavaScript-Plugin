var webpack = require('webpack');
var {resolve} = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var packageName = "webclient-leaflet-plugins";
var banner = `
    datastore-leaflet.(www.smaryun.com)
    Copyright© 2000-2018 MapGis
    license: Apache-2.0
    version: 10.0.2
`;

module.exports = {
    mode: "production",
    //页面入口文件配置
    entry:[],
    //入口文件输出配置
    output: {
        path: __dirname + '/../dist',
        filename: packageName + ".js"
    },
    //不显示打包文件大小相关警告
    performance: {
        hints: false
    },
    //是否启用压缩
    optimization: {
        minimize: false
    },

    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    externals: {
        'leaflet': 'L',
        'mapv': "function(){try{return mapv}catch(e){return {}}}()",
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()'
    },

    module: {
        rules: [{
            //图片小于80k采用base64编码
            test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 80000
                }
            }]
        }, {
            test: [/\.js$/],
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
                failOnError: true
            }
        }, {
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: {
                    loader: 'css-loader'
                }
            })
        }]
    },
    plugins: [

    ]
};
