import babel from 'rollup-plugin-babel';

export default {
    input: 'src/leaflet/index.js',
    plugins: [ babel() ],
    output: {
        file: 'dist/webclient-leaflet-plugins.cmj.min.js', // 输出文件
        format: 'cjs'
    }
};