/* eslint no-console: ["error", { allow: ["log"] }] */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fakeApi = process.env.FAKE_API === 'true';

const DEV_SERVER_URL = 'http://localhost:3000';
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

console.log('============================ Omniexplorer ============================');
console.log('Webpack is building for: ', PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT');

const entry = PRODUCTION
    ? {
      app: [
        './src/Bootstrap.jsx'
      ]
    }
    : {
      app: [
        'babel-polyfill',
        'react-hot-loader/patch',
        `webpack-dev-server/client?${DEV_SERVER_URL}`,
        './src/Bootstrap.jsx'
      ],
      vendor: [
        'react',
        'redux'
      ]
    };


const plugins = PRODUCTION
    ? [new webpack.optimize.UglifyJsPlugin()]
    : [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '[name].bundle-[hash].js' })
    ];

plugins.push(
    new HtmlWebpackPlugin({ template: './index.html' }),
    new webpack.DefinePlugin({
      'process.env': {
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION),
        FAKE_API: JSON.stringify(fakeApi)
      }
    }),
    new ExtractTextPlugin({
      filename: 'bundle-[hash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
);

module.exports = {
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[hash:12].min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'sass-loader']
        })
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 7
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            }
          }
        }],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],

    modules: [
      path.resolve('./src'),
      'node_modules'
    ],

    // Whenever someone does import 'react', resolve the one in the node_modules
    // at the top level, just in case a dependency also has react in its node_modules,
    // we don't want to be running to versions of react!!!
    alias: {
      react: path.join(__dirname, 'node_modules/react')
    }
  },
  plugins
};
