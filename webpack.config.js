const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Mom and Pop',
      template: './index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }
      
    ]
  },
  devServer: {
    publicPath: '/build',
    hot:true,
    proxy: {
      '/': 'http://localhost:3000',
    }
}
}


