// переписали точку выхода, используя утилиту path
const path = require('path');
const webpack = require('webpack');
// webpack.config.js


new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    },
    entry: { main: './src/scripts/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{ // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
            exclude: /node_modules/ // исключает папку node_modules
        },
        // пример настройки плагина image-webpack-loader
        {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                {
                    loader: 'image-webpack-loader',
                    options: {}
                },
            ]
        },
        {
            test: /\.css$/i,
            use: [
                (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                'css-loader',
                'postcss-loader'
            ]

        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        }
        ],
    },
plugins: [
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
            preset: ['default'],
        },
        canPrint: true
    }),
    new HtmlWebpackPlugin({
        inject: false,
        template: './src/index.html',
        filename: 'index.html'
    }),
    new WebpackMd5Hash()
]
};