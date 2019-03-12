var webpack = require('webpack');
var path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
var HappyPack = require('happypack');//多线程loader 加快编译速度
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  mode: 'production',
  entry:  './src/mapboxgl/index.js',
  output: {
    path: __dirname + '/../dist',//打包后的文件存放的地方
    filename: "webclient-mapboxgl-plugin.min.js" //打包后输出文件的文件名
  },
  module: {
     rules: [{
                test: /(\.js)$/,
                use: 'happypack/loader?id=js',
         exclude: [/node_modules/,/leaflet/,/openlayers/,/cesium/]
            }]
  },
  // devtool: 'cheap-module-source-map',
  plugins: [
    new HappyPack({
            id: 'js',
            // threads: 4,
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    cacheDirectory: true,
                    plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties']
                }
            }]
    }),
     new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          //NODE_ENV: JSON.stringify("production") 
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
   
  ],
  optimization:{
      minimizer:[new uglify({uglifyOptions:{compress:false}})]
  }
}
