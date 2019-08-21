<template>
<div class="appcon">
  <!-- 顶部 Header -->
    <mt-header fixed title="购物车"></mt-header>
<!-- 中间的路由区域 -->
<transition>
<router-view></router-view>
</transition>

<!-- 底部TabBar -->
<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
		
</div>

</template>

<script>


</script>
<style scoped>
.appcon{
	padding-top: 40px;
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
</style>