const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'web',
  entry: {
    app: './src/index.js'
  },
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: !isProd ? '[name].js' : '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js'],
    modules: ['./src', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
                    esmodules: true
                  }
                }
              ]
            ],
            plugins: [
              require('@babel/plugin-syntax-dynamic-import'),
              require('@babel/plugin-proposal-pipeline-operator')
            ]
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // return DataURL if image size <= 8KB
              name: 'assets/[name].[ext]',
              fallback: 'file-loader' // use file loader for size > 8KB
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd,
        removeScriptTypeAttributes: isProd,
        removeStyleLinkTypeAttributes: isProd,
        sortAttributes: isProd,
        sortClassName: isProd,
        useShortDoctype: isProd,
        minifyCSS: isProd,
        minifyJS: isProd,
        caseSensitive: isProd
      },
      hash: isProd,
      inject: true,
      template: './public/index.html'
    }),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'defer',
      module: ['app']
    }),
    new WebpackBar(),
    ...(isProd
      ? [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          })
          // new BundleAnalyzerPlugin({ openAnalyzer: false })
        ]
      : [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
        ])
  ],
  optimization: {
    nodeEnv: 'production',
    concatenateModules: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: { ecma: 6, compress: false },
        cache: true,
        // parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  }
};

if (!isProd) {
  module.exports.serve = {
    content: [__dirname],
    hot: true,
    add: (app, middleware, options) => {
      const historyOptions = {
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };

      app.use(convert(history(historyOptions)));
    }
  };
}
