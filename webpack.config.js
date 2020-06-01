// // webpack.config.js
// const path = require('path');
// // подключаем path к конфигу вебпак

// module.exports = {
//     entry: { main: './src/scripts/script.js' },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'main.js'
//     }
// }
// переписали точку выхода, используя утилиту path
const path = require('path');

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
            }
        ]
    }
};