import babel from 'rollup-plugin-babel'
import css from 'rollup-plugin-css-only'

export default {
    input: 'src/mapboxgl/index.js',
    plugins: [
        babel(),
        css({ output: 'dist/webclient-mapboxgl-plugins.css' })
    ],
    output: {
        file: 'dist/webclient-mapboxgl-plugins.cmj.min.js', // 输出文件
        format: 'cjs'
    }
};