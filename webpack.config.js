require('dotenv').config();
const fs = require("fs");
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const {WEBSITE_URL, SLUG, PORT} = process.env;

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new OptimizeCssAssetsPlugin(),
    new BrowserSyncPlugin({
      proxy: "http://157.245.151.61:8080",
      port: 3400,
      files: [
        'build/main.css',
        'build/main.js'
      ],
      reloadDebounce: 300,
      injectChanges: false,
      rewriteRules: [
        {
          match: /<style[^>]*id\=\"wp-custom-css\"[^>]*>([^<]+)<\/style>/,
          fn: function (req, res, match) {
            return '<style type="text/css" id="wp-custom-css" ></style>';
          }
        },
        {
          match: /#placeholer-css-marker\{}/,
          fn: function () {
            return fs.readFileSync('build/main.css', {encoding: 'utf8', flag: 'r'});
          }
        },
        {
          match: /console.log\("#placeholer-script"\)/,
          fn: function () {
            return fs.readFileSync('build/main.js', {encoding: 'utf8', flag: 'r'});
          }
        }
      ]
    })
  ],
}
