<template>
<div class="appcon">
  <!-- 顶部 Header -->
    <mt-header fixed title="购物车">
		<span @click="goback" slot="left">
    <mt-button icon="back" v-show="falg">返回</mt-button>
  		</span>
	</mt-header>
<!-- 中间的路由区域 -->
<transition>
<router-view></router-view>
</transition>

<!-- 底部TabBar -->
<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-lib" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-lib" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-lib" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span id="badge" class="mui-badge">{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-lib" to="/search">
				<span class="mui-icon mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
		
</div>

</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
		falg:false
    }
  },
  watch:{
	  	"$route.path":function(newval){
			  if (newval===("/home")) {
				  this.falg=false
			  }else{
				  this.falg=true
			  }

		  }
  },
  computed:{

  },
  methods:{
	  goback(){//点击后退
		  this.$router.go(-1)
	  }
  },
  created(){
	//   if (this.$route.path==="/home") {
	// 	  this.falg=false
	//   }else{
	// 	  this.falg=true
	//   }
	//加载页面时,判断是否为首页,是则隐藏返回按钮,不是则不隐藏
	this.falg=this.$route.path==="/home"?false:true
  },
  mounted(){}
}

</script>
<style lang="scss" scoped>
.mint-header{
  z-index: 99;
}
.appcon{
	padding-top: 40px;
	padding-bottom: 50px ;
	overflow-x: hidden;
	/* 隐藏x轴上的超出的部分 */
}
.v-enter{
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute; /*不写这句话,页面切换会向上位移,不懂原理*/
}
.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease;
}
// 该类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item-lib.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-lib {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-lib .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-lib .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>