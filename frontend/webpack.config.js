const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'), // Добавлено для статических файлов
      publicPath: '/',
    },
    historyApiFallback: true,
    hot: true, // Включен HMR
    open: true, // Автоматическое открытие браузера
    client: {
        overlay: {
          errors: true,
          warnings: false,
        },
    }
  },

  output: {
    publicPath: 'http://localhost:3000/',
    uniqueName: 'hostApp', // Важно для избежания конфликтов
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
            ['@babel/preset-react', { runtime: 'automatic' }] // Новый JSX-трансформ
          ],
        },
      },
      {
        test: /\.(woff2|woff|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]' // Сохранять в папку fonts
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'], // Обработка SVG
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteModal: 'remoteModal@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: {
            singleton: true,
            //requiredVersion: '19.1.0',
            eager: false,
            import: 'react' // Явное указание
          },
          'react-dom/client': { // Добавьте клиент
            singleton: true,
            //requiredVersion: '19.1.0',
            eager: false,
            import: 'react-dom/client'
          },
          'react-router-dom': {
            singleton: true,
           // requiredVersion: '^7.4.1'
          }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: false, // отключите минификацию для дебага
      publicPath: '/', // явно укажите publicPath
      scriptLoading: 'module',
      inject: 'body',
      minify: false,
      cache: false
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'] // Разрешение расширений файлов
  },
  experiments: {
    topLevelAwait: true,  // Для корректной работы динамических импортов
  },
  optimization: {
    runtimeChunk: 'single'  // Выделяем runtime в отдельный файл
  }
};
