require('dotenv').config();
const fs = require("fs");
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const {WEBSITE_URL, SLUG, PORT} = process.env;

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, 'styles/main.less'),
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
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
      port: PORT,
      proxy: `${WEBSITE_URL}/${SLUG}`,
      files: "build/main.css",
      injectChanges: false,
      rewriteRules: [
        {
          match: new RegExp('<style[^>]*id\\=\\"wp-custom-css\\"[^>]*>([^<]+)<\\/style>'),
          fn: function () {
            return '<style type="text/css" id="wp-custom-css" ></style>';
          }
        },
        {
          match: new RegExp('#placeholer-css-marker\{\}'),
          fn: function () {
            return fs.readFileSync('build/main.css', {encoding: 'utf8', flag: 'r'});
          }
        }
      ]
    })
  ],
}
