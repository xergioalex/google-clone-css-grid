const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = (env, argv) => {
  const devServerPort = '9000';
  let devServerHost = 'localhost';
  let outputPublicPath = 'dist/';
  let HtmlWebpackPluginPrefix = 'dist/pages/[name]/';
  if (!!process.env.DOCKER_SERVER) {
    devServerHost = '0.0.0.0';
  }
  if (env && env.mode === 'server') {
    HtmlWebpackPluginPrefix = '';
    outputPublicPath = `http://localhost:${devServerPort}/`
  }

  // Webpack configuration
  let config = {
    entry: {
      google: path.resolve(__dirname, 'src/pages/google/js/main.ts'),
      youtube: path.resolve(__dirname, 'src/pages/youtube/js/main.ts')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'pages/[name]/js/main.[fullhash].js',
      publicPath: outputPublicPath,
    },
    watch: true,
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      // compress: true,
      host: devServerHost,
      port: devServerPort,
      open: true,
      hot: false,
      liveReload: true
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.webpack.js', '.web.js']
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(ts|tsx)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(jpg|png|woff|eot|ttf|svg|ico)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: (absoluteUrl) => {
                const urlSplit = (absoluteUrl).split('/')
                const pagesIndex = urlSplit.findIndex((item) => item === 'pages')
                const path = urlSplit.slice(pagesIndex, urlSplit.length-1).join('/')
                return `${path}/[name].[hash].[ext]`
              },
              publicPath: (fileName) => {
                const urlSplit = (fileName).split('/')
                const pagesIndex = urlSplit.findIndex((item) => item === 'assets')
                if (env && env.mode === 'server') {
                  return `${outputPublicPath}${fileName}`
                } else {
                  return urlSplit.slice(pagesIndex, urlSplit.length).join('/')
                }
              }
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // // Creates `style` nodes from JS strings
            // 'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: false,
            }
          }
        },
        // {
        //   test: /\.(png|jpe?g|gif)$/i,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         outputPath: 'pages/',
        //         regExp: /.*\/([a-z0-9]+)\/([a-z0-9]+)\/([a-z0-9]+)\/[^.]+\.[^.]+$/i,
        //         name: '[1]/[2]/[3]/[name].[ext]',
        //         esModule: false,
        //       },
        //     },
        //   ],
        // },
        // {
        //   test: /\.(png|jpe?g|gif)$/i,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         limit: false,
        //       },
        //     },
        //   ],
        // },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'pages/[name]/css/styles.[hash].css'
      }),
      new HtmlWebpackPlugin({
        filename: `pages/google/index.html`,
        template: 'src/pages/google/index.html',
        chunks : ['google'],
      }),
      new HtmlWebpackPlugin({
        filename: `pages/youtube/index.html`,
        template: 'src/pages/youtube/index.html',
        chunks : ['youtube'],
      }),
    ],
  }

  if (argv && argv.mode === 'production') {
    config.plugins.push(
      new CleanWebpackPlugin()
    )
  }

  return config
}


urlSplit = ('/home/ads/ads/asdsad/pages/google/asdsfd/sadfsd/hol.jpg').split('/')
index = urlSplit.findIndex((item) => item === 'pages')
urlSplit.slice(index, urlSplit.length-1).join('/')