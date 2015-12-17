import HtmlWebpackPlugin from 'html-webpack-plugin';

// const proxy = path => ({ target: '', secure: false, bypass: () => path });

const config = {
  entry: './src/index.js',
  publicPath: '/',
  output: {
    path: 'build',
    filename: 'index.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules|build/
      }
    ],
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules|build/
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|build)/,
        loader: 'style!css!autoprefixer!less'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        loader: 'babel'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=8192',
          'img'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      filename: 'index.html'
    })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  externals: {
    'three': 'THREE'
  },
  devServer: {
    proxy: {
      // '/moulen.jpg': proxy('img/moulen.jpg')
    }
  }
};

module.exports = config;
