const path = require('path');

const moduleConfig = {
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
};

module.exports = [
  {
    name: 'sigma',
    mode: 'production',
    entry: './src/endpoint.js',
    output: {
      filename: 'sigma.min.js',
      path: path.join(__dirname, 'build'),
      library: 'Sigma',
      libraryTarget: 'umd'
    },
    module: moduleConfig
  }
];
