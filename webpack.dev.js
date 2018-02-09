const paths = require('./paths');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    polyfills: paths.polyfills,
    main: paths.main,
  },

  output: {
    publicPath: paths.publicPath,
    path: paths.docs,
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [{
      test: /\.html$/,
      use: 'raw-loader',
    }, {
      test: /\.(?:sa|s?c)ss$/,
      include: paths.app,
      use: ['to-string-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.(?:sa|s?c)ss$/,
      exclude: paths.app,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.ts$/,
      use: ['awesome-typescript-loader', 'angular2-template-loader'],
    }, {
      test: /\.(?:gif|jpe?g|png|svg|ttf|eot|woff2?)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    }],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(
      /@angular(?:\\|\/)core(?:\\|\/)esm5/,
      paths.src,
      {}
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills',
      minChunks: Infinity,
    }),
    new HTMLWebpackPlugin({
      template: paths.index,
    }),
  ],

  devServer: {
    hot: true,
    noInfo: true,
    historyApiFallback: {
      index: paths.publicPath,
    },
  },
};
