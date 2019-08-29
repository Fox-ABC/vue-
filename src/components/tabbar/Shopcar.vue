<template>
<div class="shopcar-container">
    <!-- 购物车商品列表 -->
    <div class="shopcar-list" v-for="(item,i) in goodslist" :key="item.id">
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="" srcset="">
            <div class="goodsinfo">
              <h1 class="title">{{item.title}}</h1>
              <p class="canshu"> 
                <span class="price">¥{{item.sell_price}}</span>
                <span><shopcarnumbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></shopcarnumbox>
                <!-- 如何从购物车中,获取商品的数量 -->
                <!-- 
                  1.可以先创建一个空对象,然后循环购物车中所有商品的数据, 把 当前的循环
                  这个商品的id作为属性名, count值 作为 属性值, 这样,当把商品循环一遍,
                  就得到一个对象{88:2,89:3,.....}
                 -->
                </span>
                <span><a href="#" @click.prevent="remove(item.id,i)">删除</a> </span>

              </p>
            </div>
					</div>
				</div>
			</div>
    </div>

    <!-- 购物车 结算 -->
    <div class="shopcar-settlement">
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="left">
              <p>总计(不包含运费)</p>
              <p class="left_down">已勾选商品 <span >
                {{$store.getters.getGoodsCountAndAmount.count}}</span> 件,
                总价:&nbsp; <span >¥{{$store.getters.getGoodsCountAndAmount.amount}}</span> </p> 
            </div>
            <mt-button type="danger">结算</mt-button>
					</div>
				</div>
			</div>
    </div>
      <div>{{$store.getters.getGoodsSelected}}</div>
</div>
</template>

<script>
import shopcarnumbox from "../subcomponents/shopcar_numbox.vue"
export default {
  components:{
    shopcarnumbox
  },
  props:{},
  data(){
    return {
      goodslist:[]//购物车所有商品的数据
    }
  },
  watch:{},
  computed:{},
  methods:{
    getGoodsList(){//获取购物车商品列表
      //1.获取到 store 中所有商品的id,然后拼接出一个数组
      var idArr=[]
      this.$store.state.car.forEach(element => idArr.push(element.id))
      //判断数组是否为空
      if (idArr.length<=0) {
        return ;
      }
      this.axios
      .get("api/goods/getshopcarlist/"+idArr.join(","))
      .then(result=>{
          if (result.data.status===0) {
            this.goodslist=result.data.message
            
          }
      })
    },
    remove(id,i){//删除商品
        //根据索引,删除goodslist中的商品
        this.goodslist.splice(i,1)
        this.$store.commit("removeGoods",id)
    },
    selectChanged(id,val){//每当点击开关,把最新的开关状态,同步到store中
          this.$store.commit("updateGoodsSelected",{id:id,selected:val})

    }
  },
  created(){
     this.getGoodsList()
  },
  mounted(){}
}
</script>
<style lang="scss">
.shopcar-container{
  background-color: #eee;
    overflow: hidden;
  .shopcar-list{
  .mui-card-content-inner{
    display: flex;
    align-items: center;
    img{
      width: 60px;
      height: 60px;
    }
    .goodsinfo{
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      .title{
        font-size: 13px;
        
      }
      .canshu{
        margin-top: 10px;
        margin-bottom: 0px;
        .price{
        color:red;
        
      }
      }
      
    }
  }
  }
   .shopcar-settlement{
     .mui-card-content-inner{
       display: flex;
       justify-content: space-between;
       align-items: center;//纵向居中
       .left{
         .left_down{
           span{
             color:red;
             font-size: 18px;
             font-weight: bold;
           }
         }
       }
     }
     
   } 
  
}
</style>