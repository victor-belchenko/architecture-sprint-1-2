const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: 'http://localhost:3000/',
    },
    historyApiFallback: true,
    hot: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  output: {
    publicPath: 'http://localhost:3000/',
    uniqueName: 'hostApp',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
      {
        test: /\.(woff2|woff|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource', // Обработка SVG как файла
        generator: {
          filename: 'images/[name][ext]', // Сохранять в папку images
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      filename: 'hostEntry.js', // Добавьте точку входа для хоста
      remotes: {
        remoteModal: 'remoteModal@http://localhost:3002/remoteEntry.js',
      },
      exposes: {
        './PopupWithForm': './src/components/PopupWithForm', // Экспорт модуля
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          import: 'react',
          requiredVersion: '^17.0.2', // Соответствует вашей версии
        },
        'react-dom': { // Используйте react-dom, а не react-dom/client
          singleton: true,
          eager: true,
          import: 'react-dom',
          requiredVersion: '^17.0.2',
        },
        //'react-router-dom': {
        //  singleton: true,
        //  requiredVersion: '^5.2.0', // Соответствует вашей версии
        //},
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: false,
      publicPath: 'http://localhost:3000/',
      scriptLoading: 'defer',
      inject: 'body',
      cache: false,
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
};