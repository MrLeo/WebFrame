/**
 * Created by lxbin on 2016/7/9  0009.
 *
 * 参考：
 *      http://webpack.github.io/docs/
 *      http://www.w2bc.com/Article/50764
 *      https://segmentfault.com/a/1190000005690280
 *      https://segmentfault.com/a/1190000005110967
 *      https://github.com/wangning0/Autumn_Ning_Blog/blob/master/blogs/3-12/webpack.md
 *
 *
 *      webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包
 *      webpack --watch   //监听变动并自动打包
 *      webpack -p    //压缩混淆脚本，这个非常非常重要！
 *      webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
 */

const webpack = require('webpack');

// 它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

// 配置目录（因为我们的webpack.config.js文件不在项目根目录下，所以需要一个路径的配置）
const path = require('path');
const CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
const ROOT_PATH = path.join(__dirname, './'); // 项目根目录
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
const BUILD_PATH = path.join(ROOT_PATH, './static/dist'); // 最后输出放置公共资源的目录

/**
 * 配置信息参考：http://webpack.github.io/docs/configuration.html
 */
module.exports = {
    // 设置webpack配置中指向的默认目录为项目根目录
    context: path.join(__dirname, '../'),
    //插件项
    plugins: [commonsPlugin],
    //入口文件配置
    entry: {
        index: './src/js/page/index.js'//支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
    },
    //输出项配置
    output: {
        path: BUILD_PATH,//设置输出目录
        filename: '[name].bundle.js'//输出文件名
    },
    module: {
        //加载器配置
        loaders: [
            // style & css & less loader
            { test: /\.css$/, loader: "style-loader!css-loader"},//.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},//.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            // babel loader
            {
                test: /\.jsx?$/, exclude: /(node_modules|bower_components)/,
                loader: ['babel-loader'],
                query: {
                    presets: ['es2015']
                    // 如果安装了React的话
                    // presets: ['react', 'es2015']
                }
            },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },//.js 文件使用 jsx-loader 来编译处理
            // image & font
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.jsx', '.coffee'], //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore: 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType: 'js/actions/ActionType.js',
            AppAction: 'js/actions/AppAction.js'
        }
    }
};