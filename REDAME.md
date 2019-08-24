#项目介绍

#用(传统方式)命令行把修改过的代码传到GitHub;
1.git add .
2.git comment -m "提交信息"
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


#改造新闻资讯路由链接

#新闻资讯页面制作
1.绘制界面,使用mui中的media-list.html
2.使用axios获取数据
3.渲染真实数据

#实现 新闻资讯列表 点击跳转到新闻详情
1.把列表中的每一项改造为 router-link,同时,在跳转时提供唯一的id标识符
2.创建新闻详情的组件页面 NewsInfo.vue
3.在 路由模块中,将新闻的 路由地址和组件对应起来

#实现新闻详情的 页面布局 和数据渲染

#单独封装一个 comment.vue 评论子组件
1.先创建一个 单独的comment.vue模板
2.在需要使用comment组件的页面中,手动导入 comment组件
  import comment from "./comment.vue"
3.在父组件中使用 components属性,将刚才的导入的 comment组件,注册为自己的子组件
4.将注册子组件的时候,注册名称,以标签形式,在页面中 引用既可

#获取所有的评论显示在页面中



#实现点击实现加载更多评论的功能
1.为 加载更多 添加点击事件, 在事件中,请求下一页的数据
2.点击加载更多,让pageIndex++,然后重新调用this.getComments()方法 重新获取最新一页的数据
3.为了防止 新数据 覆盖老数据的情况,我们要在点击加载更多的时候,每当获取到新的数据,应该让 老数据
调用 数组的concat 方法,拼接上数组