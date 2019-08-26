<template>
  <div>
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!-- 使用mui的九宫格改成六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
      
    </ul>
  </div>
</template>

<script>
//导入Toast组件
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue"
export default {
  components: {
    swiper
  },
  props: {},
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  watch: {},
  computed: {},
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      this.axios
        .get("api/getlunbo")
        .then(result => {
          if (result.data.status === 0) {
            this.lunbotuList = result.data.message;
          } else {
            Toast("加载轮播图失败");
          }
        });
    }
  },
  created() {
    this.getLunbotu();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>

//设置九宫格的样式
.mui-grid-view.mui-grid-9{
  background-color:white;
  border:none;
img{
  width:60px;
  height:60px
}
.mui-media-body{
  font-size:14px;
}
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
     border:0;
     //设置九宫格内的线条
}
</style>