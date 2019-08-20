//入口文件
//导入Vue
import Vue from "../node_modules/vue/dist/vue"

//导入入MintUI组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//导入MUI
import "./lib/css/mui.css"

import app from "./App.vue"
var vm=new Vue({
    el:"#app",
    render:c=>c(app)
})