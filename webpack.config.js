var webpack = require('webpack');

var config = {
    context: __dirname + '/src',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        
        }],
       rules: [{
           test: /\.css$/,
           use: ['style-loader', 'css-loader']
       }]
    
    },
    entry: ['./js/main.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'main.js',
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
};

module.exports = config;