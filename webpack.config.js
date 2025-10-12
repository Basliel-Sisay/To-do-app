const path = require('path');
const html = require('html-webpack-plugin');

module.exports={
    mode :'development',
    entry:'./src/index.js',
    output:{
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'eval-source-map',
    devServer:{
        watchFiles:['./src/temp.html'],
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:['style-loader', 'css-loader'],
            },
            {
                test:/\.html$/i,
                use:['html-loader'],
            },
            {
                test:/\.(png|svg|jpeg|jpg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins:[
        new html({
            template: './src/temp.html',
        }),
    ],

};