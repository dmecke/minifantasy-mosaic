// eslint-disable-next-line @typescript-eslint/no-var-requires
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.ts',
    },
    plugins: [
        new ESLintWebpackPlugin({
            extensions: ['.ts'],
        }),
        new HtmlWebpackPlugin({
            title: 'Mosaic',
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.png$/,
                use: 'file-loader',
            },
            {
                test: /\.yy$/,
                use: 'json-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        static: './static',
        hot: true,
    },
    devtool: 'eval-source-map'
}
