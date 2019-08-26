<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >
          <!-- 如果用手机调试,发现 图片列表 不能切换,可以将click改为tap  ,但是可能有新的bug -->
		  <!-- 这里的 getPhotoListByCateId(item.id)的参数 是要把当前图片分类的id传过去,去读取对应接口的数据-->
            <!-- 注意:这里的 :class="['mui-control-item',item.id==0?'mui-active':'']"
            是让页面默认 "全部"的样式,点击改变颜色,是滑动条里的样式-->
            {{item.title}}
          </a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <div>
      <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" tag="li" :to='"/home/photoinfo/"+item.id'>
          <img v-lazy="item.img_url" />
		  <div class="info">
			  <h1 class="info-title">{{item.title}}</h1>
			  <div class="info-body">{{item.zhaiyao}}</div>
		  </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
//1.导入mui的js文件
import mui from "../../lib/js/mui.min.js";

export default {
  components: {},
  props: {},
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] //图片列表的数据
    };
  },
  watch: {},
  computed: {},
  methods: {
    getCategory() {
      //获取所有的图片分类
      this.axios.get("api/getimgcategory").then(result => {
        //   console.log(result)
        if (result.data.status === 0) {
          this.cates = result.data.message.unshift({ title: "全部", id: 0 }); //将获取的数组最前面加上{title:"全部",id:0}
          this.cates = result.data.message;
          //   console.log(this.cates)
        }
      });
    },
    getPhotoListByCateId(cateid) {
      //根据分类id获取图片列表
      this.axios.get("api/getimages/"+cateid ).then(result => {
		
        if (result.data.status === 0) {
			
          this.list = result.data.message;
        }
      });
    }
  },
  created() {
	this.getCategory();
	//默认进入页面,就主动请求图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    //2.初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list{
	list-style: none;
	margin: 0;
	padding:10px; 
	padding-bottom: 10px;
	li{
		background-color: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 9px #999;
		position: relative;
		img{
			width: 100%;
			vertical-align: middle;
		}
		img[lazy="loading"] {
		width: 40px;
		height: 300px;
		margin: auto;
		}
		.info{
			text-align: left;
			position: absolute;
			bottom: 0;
			color:white;
			background-color: rgba(0,0,0,0.4);
			max-height: 84px;
			.info-title{
				font-size: 14px;
			}
			.info-body{
				font-size: 13px;
				
			}
		}
	}
}

</style>