import VueRouter from "vue-router"
//导入对应的路由组件
import Home from "./components/tabbar/Home.vue"
import Member from "./components/tabbar/Member.vue"
import Shopcar from "./components/tabbar/Shopcar.vue"
import Search from "./components/tabbar/Search.vue"
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"
import PhotoList from './components/photo/PhotoList.vue'
import PhotoInfo from './components/photo/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'


var router=new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},//默认显示路径
        {path:"/home",component:Home},
        {path:"/member",component:Member},
        {path:"/shopcar",component:Shopcar},
        {path:"/search",component:Search},
        {path:"/home/newslist",component:NewsList},
        {path:"/home/newsinfo/:id",component:NewsInfo},
        {path: '/home/photolist', component: PhotoList },
        {path: '/home/photoinfo/:id', component: PhotoInfo },
        {path: '/home/goodslist', component: GoodsList },
        {path: '/home/goodsinfo/:id', component: GoodsInfo ,name:"goodsinfo"}

    ],
    linkActiveClass:"mui-active"//覆盖默认的路由高亮的类,默认的类叫做 router-link-active
})
//把路由暴露出去
export default router