//入口文件
//导入Vue
import Vue from "../node_modules/vue/dist/vue"
//1.导入vue-router
import VueRouter from "vue-router"
//2.安装路由
Vue.use(VueRouter)

//导入MUI样式
import "./lib/css/mui.css"
//导入 拓展图标css样式
import "./lib/css/icons-extra.css"//只导入这个会报错,还要拷贝拓展字体文件

// 按需导入 Mint-UI 中的组件   
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


//导入asios
import axios from "./httpConfig/http"
Vue.prototype.axios = axios;
//1.3 导入自己创建的路由
import router from "./router"

//导入格式化时间的插件
import moment from "moment"
//定义全局过滤器,格式化时间
Vue.filter("dataFormat",function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})
//安装缩略图插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

import app from "./App.vue"
var vm=new Vue({
    el:"#app",
    render:c=>c(app),
    router:router,//1.4挂载路由
    axios,
})