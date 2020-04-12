const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // the 'transform-runtime' plugin tells Babel to
            // require the runtime instead of inlining it.
            {
                test: /\.m?js$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'services'),
                    path.resolve(__dirname, 'data'),
                ],
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //   presets: ['@babel/preset-env'],
                    //   plugins: ['@babel/plugin-transform-runtime']
                    // }
                }
            }
        ]
    }
};