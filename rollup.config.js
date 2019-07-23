import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import glslify from 'rollup-plugin-glslify';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

export default {
  external: ['events', 'graphology-metrics/extent', 'graphology-utils/is-graph'],
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    glslify({ basedir: 'src/renderers/webgl/shaders' }),
    babel(),
    external(),
    resolve({
      preferBuiltins: false
    }),
    commonjs()
  ]
};
