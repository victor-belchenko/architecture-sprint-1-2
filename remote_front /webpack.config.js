const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3002,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    hot: false,
    open: true,
    devMiddleware: {
      publicPath: '/',
      writeToDisk: true
    }
  },
  output: {
    publicPath: 'http://localhost:3002/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteModal', // Добавьте имя приложения
      filename: 'remoteEntry.js', // Имя файла для Module Federation
      exposes: {
        './Modal_place': './src/Modal_place', // Пример экспорта компонента
      },
      shared: {
        react: { 
          singleton: true,
          eager: true,
          requiredVersion: '^17.0.2'
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^17.0.2'
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};