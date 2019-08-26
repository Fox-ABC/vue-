<template>
<div class="goodsinfo-container">
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						 <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>
			<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                           市场价: <span class="market_price">¥{{goodsinfo.market_price}}</span>&nbsp;&nbsp;
                            销售价:<span class="sell_price">¥{{goodsinfo.sell_price}}</span>
                        </p>
                        <p> 购买数量:<numbox></numbox></p>
                        <p>
                            <mt-button size="small" type="primary">立即购买</mt-button>
                            <mt-button size="small" type="danger">加入购物车</mt-button>

                        </p>

					</div>
				</div>
			</div>
			
			<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goodsinfo.goods_no}}</p>
						<p>库存情况:{{goodsinfo.stock_quantity}}件</p>
						<p>上架时间:{{goodsinfo.add_time|dataFormat}}</p>

					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>

                </div>
			</div>
</div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from "../goods/GoodsInfo_numbox.vue"
export default {

  components:{
      swiper,
      numbox

  },
  props:{},
  data(){
    return {
        id:this.$route.params.id,//将路由参数上的id挂载到data上,方便调用
        lunbotu:[],//轮播图的数据
        goodsinfo:{}//获取到的商品的信息
    }
  },
  watch:{},
  computed:{},
  methods:{
      getLunbotu() {
      this.axios.get("api/getthumimages/" + this.id).then(result => {
        if (result.data.status === 0) {
          //循环每个图片数据,添加img属性,因为 轮播图组件中,只认识item.img,不认识item.src
          result.data.message.forEach(item => {
           
            item.img= item.src;
          });
          this.lunbotu = result.data.message;
        }
      });
    
  },
        getGoodsInfo(){
            this.axios
            .get("api/goods/getinfo/"+this.id)
            .then(result=>{
                if (result.data.status===0) {
                    this.goodsinfo=result.data.message[0]
                    // 要分清楚,什么时候加[0]
                }
            })
        }
  },
  created(){
      this.getLunbotu()
      this.getGoodsInfo()
      },
  mounted(){
      
  }
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .price{
        .market_price{
            text-decoration: line-through;
        }
        .sell_price{
            font-size: 16px;
            color: red;
            font-weight: bold;
        }
    }
    .mui-card-footer{
        display: block;
    button{
        margin: 15px 0;
    }
    }
}
</style>