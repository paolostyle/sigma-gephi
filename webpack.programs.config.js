const path = require('path');
const glob = require('glob');

const shaders = glob.sync(path.join(__dirname, 'src', 'renderers', 'webgl', 'shaders', '*.glsl'));

const entry = {};

shaders.forEach(p => {
  entry[path.basename(p, '.glsl')] = p;
});

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.join(__dirname, 'dist', 'renderers', 'webgl', 'shaders'),
    filename: '[name].glsl',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.glsl$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
      // {
      //   test: /\.vert\.glsl$/,
      //   exclude: /node_modules/,
      //   loader: 'glsl-minify-loader',
      //   options: {
      //     shaderType: 'vertex'
      //   }
      // },
      // {
      //   test: /\.frag\.glsl$/,
      //   exclude: /node_modules/,
      //   loader: 'glsl-minify-loader',
      //   options: {
      //     shaderType: 'fragment'
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
