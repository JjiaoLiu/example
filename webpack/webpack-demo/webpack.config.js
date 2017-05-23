/**
 * Created by Administrator on 2017/5/22 0022.
 */
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const extractLESS = new ExtractTextPlugin('styles.css');
const UglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
       beautify: true,
       compress: { warnings: true, },
       output: { comments: true }
    })
const HtmlWebpackPluginnew = new HtmlWebpackPlugin({//根据模板插入css/js等生成最终HTML
    filename: 'index.html',    //生成的html存放路径，相对于 path
    template: 'my-index.html',    //html模板路径 相对于根目录
    inject: true,    //允许插件修改哪些内容，包括head与body
    hash: true,    //为静态资源生成hash值
    minify: {    //压缩HTML文件
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: false    //删除空白符与换行符
    }
});
module.exports = {
    entry: {
        main: './app/index.js',
        vendor:['lodash','jquery','react','react-router-dom']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundle'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: extractLESS.extract(
                [ "css-loader","less-loader"]
            )
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'stage-0', 'react'],
                    plugins: ['transform-runtime', ['import', {"libraryName": "antd", "style": "css"}]]
                }
            }
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=1000&name=images/[name].[ext]'
        }]
    },
    plugins: [
        extractLESS,
        HtmlWebpackPluginnew,
        new webpack.HotModuleReplacementPlugin(),
        UglifyJSPlugin,
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ],
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        open:true,
        compress: true,
    },
};