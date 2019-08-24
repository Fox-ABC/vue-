const path=require("path")
//启用热更新,第二部
const webpack=require('webpack')
//导入在页面中生成html的插件
//只要是插件,都一定要放到plugins节点中去
//这个插件的两个作用:
//1.自动在内存中根据指定页面生成另一个内存的页面
//2.自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin=require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//这个配置文件,其实就是一个js文件,通过Node 中的模块操作,向外暴露 一个配置对象
module.exports={
    //在配置文件中,需要设置入口和出口
    entry:path.join(__dirname,'./src/main.js'),//入口 ,表示,要使用webpack打包哪个文件
    output:
    {
        path:path.join(__dirname,'./dist'),//出口,指定打包好的文件输出到哪个目录中去
        filename:'bundle.js'//这是指定 输出文件的名称
},
    devServer:{
        //这是配置dev-server参数的第二种形式,相对来说,这种方式麻烦一些
        //--open --prot 8080 --contentBase src --hot

        open: true,//自动打开浏览器
        port: 3000,//设置启动时候的运行端口
        contentBase: 'src',//设置托管的根目录
        hot: true//启用热更新 ,第一步

    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//new 一个热更新的模块对象,这是启用热更新的第三步
        new htmlWebpackPlugin({//创建一个在内存中生成html的插件
            template:path.join(__dirname,'./src/index.html'),//指定模板页面,将来会根据指定的页面路径,去生成内存中的页面
            filename:'index.html'//指定生成的页面名称
        }),
        new VueLoaderPlugin()
    ],
    module:{//这个节点,用于配置所有第三方模块 加载器
        rules:[
            {test: /\.css$/,use:['style-loader','css-loader'] },//配置处理.css文件的第三方loader规则
            {test: /\.less$/,use:['style-loader','css-loader','less-loader']},//处理.less文件
            {test: /\.scss$/,use:['style-loader','css-loader','sass-loader']},//处理.sass文件

            {test: /\.(jpg|jpeg|gif|png)$/,use:['url-loader?limit=5584&name=[hash:8]-[name].[ext]']},//处理图片路径的loader
            //limit 给定的值,是图片的大小,单位是byte,如果我们引用的图片大于给定的limit值,则不会被转为base64格式
            //的字符串,如果小于等于,则会被转换,[name].[ext]可以设置图片名称为原名称,前面加[hash:自定义的数字],可在前面加上hash值
            //防止同名图片
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件的loader
            {test: /\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel来转换es更高级的语法
            {test: /\.vue$/,use:'vue-loader'}//配置babel来转换es更高级的语法

        ],
        // resolve: {
        //     alias: {
        //         'vue': 'vue/dist/vue.js'
        //     }
        // }
    }

}



/**
 * 当我们在控制台,直接输入 webpack 命令执行的时候, webpack做了以下几步:
    1.首先,webpack发现我们并没有通过命令的形式,给他指定入口和出口
    2.webpack 就会到项目的根目录中,找一个叫做webpack.config.js的配置文件
    3.当找到配置文件后,webpack就会去解析执行这个 配置文件,当解析执行完配置文件之后,就得到了,
    配置文件中,导出的配置对象
    4.当 webpack拿到 配置对象后,就拿到了配置对象中的 ,指定的 入口 和 出口,然后进行打包构建
 */