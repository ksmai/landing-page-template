const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const paths = require('./paths');

module.exports = {
  devtool: 'source-map',

  entry: {
    polyfills: paths.polyfills,
    main: paths.main,
  },

  output: {
    publicPath: paths.publicPath,
    filename: '[name].[chunkhash].js',
    path: paths.docs,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [{
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          minimize: true,
          conservativeCollapse: false,
          caseSensitive: true,
          removeAttributeQuotes: false,
        },
      },
    }, {
      test: /\.(?:sa|s?c)ss$/,
      include: paths.app,
      use: [
        'to-string-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        },
        'postcss-loader',
        'sass-loader',
      ],
    }, {
      test: /\.(?:sa|s?c)ss$/,
      exclude: paths.app,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      }),
    }, {
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: '@ngtools/webpack',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.ContextReplacementPlugin(
      /@angular(?:\\|\/)core(?:\\|\/)esm5/,
      paths.src,
      {}
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[chunkhash].js',
      minChunks: function(module) {
        return module.context &&
          module.context.indexOf('node_modules') !== -1;
      },
      chunks: ['main'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.NamedModulesPlugin(),
    new AngularCompilerPlugin({
      tsConfigPath: paths.tsconfig,
      entryModule: paths.appModule,
      sourceMap: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new FaviconsWebpackPlugin(paths.favicon),
    new HTMLWebpackPlugin({
      template: paths.index,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: false,
        caseSensitive: true,
      },
    }),
    new HTMLWebpackPlugin({
      template: paths.index,
      filename: '404.html',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: false,
        caseSensitive: true,
      },
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
  ],
};
