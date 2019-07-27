
//这个配置文件就是一个js文件，通过node中的模块操作，向外暴露了一个配置对象
const path= require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin =  require('vue-loader/lib/plugin');
module.exports = {
    // 用来修改默认的输入和输出文件
    entry: path.join(__dirname,'./src/index.js'), //入口，表示要用webpack打包哪个文件
    output:{  //这是输出文件相关的配置
        path : path.join(__dirname,'./dist'),//指定打包好的文件输出到哪个文件目录中去
        filename: 'bundle.js' //指定输出文件的名称，默认是main.js
    },
    plugins: [//配置插件节点
        new htmlWebpackPlugin({ //这是创建一个在内存中生成html的插件
            //指定模板文件，将来会根据指定的模板文件的路径去生成内存中的页面
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',//指定生成页面的名称
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',  // 指定生成css文件的名称
        }),
        new VueLoaderPlugin(),

    ],
    module:{//用于配置所有的第三方模块加载器
        // rules:[//所有第三方模块的处理规则
        //     { test: /\.css$/, use: ['style-loader', 'css-loader'] }//前面用正则匹配css文件，后面指定处理这个文件的加载器
        // ]
        rules: [
            {
                test: /\.css$/,  // 用正则去匹配要用该 loader 转换的 CSS 文件
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',//style-loader: 在打包生成的js文件中，动态创建<style>将css-loader内部样式注入head标签
                    // 所以在单独打包css的时候就要把rules里的style-loader去掉，否则会报错
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|bmp|png)$/,
                // use: 'url-loader?limit=2000&name=[hash:8]-[name].[ext]'
                use: {
                    loader: 'url-loader',
                    options: {
                        limit:2000,//如果图片大小大于2000个字节就不转化为base64编码
                        name: '[hash:8]-[name].[ext]' //图片原来叫什么名字就是什么名字，在前面放一个hash8位的值，防止文件重名
                    }
                }
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            { //这是配置babel来转换高级语法
                test : /\.js$/,
                use : 'babel-loader',
                exclude : /node_modules/
            },
            {
                test : /\.vue/,
                use: 'vue-loader'
            }
        ]

    },

    // resolve:{
    //     alias: {//修改vue被导入的包的路径
    //         "vue$": "vue/dist/vue.js"
    //     }
    // }


    // devServer: {
    //     contentBase: require('path').join(__dirname, "src"),
    //     open:true,
    //     compress: true,
    //     port: 8080,
    //     host: "localhost",
    //     hot:true,
    // }

};