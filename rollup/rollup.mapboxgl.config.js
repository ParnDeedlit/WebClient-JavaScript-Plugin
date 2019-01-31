import babel from 'rollup-plugin-babel';

export default {
    input: 'src/mapboxgl/index.js',
    plugins: [ babel() ],
    output: {
        file: 'dist/webclient-mapboxgl-plugins.cmj.min.js', // 输出文件
        format: 'cjs'
    }
};