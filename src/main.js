//入口文件
//导入Vue
import Vue from 'vue'
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
//安装vuex
import Vuex from "vuex"
Vue.use(Vuex)

var store=new Vuex.Store({
    state:{//访问方法 :this.$store.state.***
        car:[]// 将购物车中的 商品,用一个数组封装起来, 在car数组中,存储一些商品的对象,
              //可以暂时将商品对象,设计成如下形式
              //{id:商品的id,price:商品的单价,count:要买商品的数量,selected:true(商品是否被选中)}  
    },
    mutations:{//this.$store.commit("方法名",参数)
        addToCar(state,goodsinfoincar){
            //点击加入购物车,把商品信息,放到state的car中去
            /**
             * 分析:
             * 1.如果购物车中,之前没有这样商品,则把商品信息,push到car[]中去
             * 2.如果购物车中,之前已经有了这样商品,则只更新数量
             */
            // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
            // some() 方法会依次执行数组的每个元素：
            // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
            // 如果没有满足条件的元素，则返回false。
            // 注意： some() 不会对空数组进行检测。
            // array.some(function(currentValue,index,arr),thisValue)
            // currentValue	  必须。当前元素的值
            // index 	      可选。当前元素的索引值
            // arr	          可选。 当前元素属于的数组对象
            // 注意： some() 不会改变原始数组。       
            
            
            //不懂为什么下面的不行
            // if(state.car.some(item=>item.id == goodsinfoincar.id)){
            //        state.car.count+=parseInt(goodsinfoincar.count)
            //         console.log(state.car)
            // }   else{
            // state.car.push(goodsinfoincar)}
            var flag = false

            state.car.some(item => {
              if (item.id == goodsinfoincar.id) {
                item.count += parseInt(goodsinfoincar.count)
                flag = true
                return true
              }
            })
      
            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
              state.car.push(goodsinfoincar)
            }
        }
    },
    getters:{//this.$store.getters.***

    }
    
})


import app from "./App.vue"
var vm=new Vue({
    el:"#app",
    render:c=>c(app),
    router:router,//1.4挂载路由
    axios,
    store //挂载 store 状态管理对象
})