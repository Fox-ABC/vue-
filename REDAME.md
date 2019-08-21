#项目介绍

#用(传统方式)命令行把修改过的代码传到GitHub;
1.git add .
2.git commit -m "提交信息"
3.git push

#制作首页app组件
1.完成Header 区域,使用的是Mint-UI中的Header组件
2.制作底部的Tabbar 区域,使用的是MUI的Tabbar.html
    + 在制作 购物车图标时,操作会多一点:
    + 先把 拓展图标的css样式拷贝到 项目中
    + 再拷贝拓展字体库tff文件,到项目中
    + 为 购物车 小图标,添加如下样式:mui-icon mui-icon-extra mui-icon-extra-cart
3.要在中间放置一个 router-view 来展示路由匹配的组件

#改造tabbar 为router-link

#设置路由高亮

#点击tabbat中的路由链接,展示相对应的组件

#制作首页轮播图布局

#加载首页轮播图布局数据
1.获取数据,如何获取呢,使用 axios
2.使用axios的this.axios.get 获取数据
3.获取到的数据,保存到data中
4.使用v-for 循环渲染 每个item项

#实现组件切换的动画
