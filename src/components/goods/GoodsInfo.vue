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
            市场价:
            <span class="market_price">¥{{goodsinfo.market_price}}</span>&nbsp;&nbsp;
            销售价:
            <span class="sell_price">¥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量:
            <numbox @getcount="getCount" :maxcount="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button size="small" type="primary">立即购买</mt-button>
            <mt-button size="small" type="danger" @click="addToShopCar">加入购物车</mt-button>
             <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
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
        <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
      </div>
    </div>
    <!-- 实现点击 加入购物车,小球飞入 -->
    <transition 
     @before-enter="beforeEnter"
     @enter="enter"
     @after-enter="afterEnter">
      <div class="ball" v-show="ballflag" ref="ball"></div>
    </transition>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../goods/GoodsInfo_numbox.vue";
export default {
  components: {
    swiper,
    numbox
  },
  props: [],
  data() {
    return {
      id: this.$route.params.id, //将路由参数上的id挂载到data上,方便调用
      lunbotu: [], //轮播图的数据
      goodsinfo: {}, //获取到的商品的信息
      ballflag: false,//控制小球显示和隐藏
      count:1//购买商品个数,默认为1
    };
  },
  watch: {},
  computed: {},
  methods: {
    getLunbotu() {
      this.axios.get("api/getthumimages/" + this.id).then(result => {
        if (result.data.status === 0) {
          //循环每个图片数据,添加img属性,因为 轮播图组件中,只认识item.img,不认识item.src
          result.data.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.data.message;
        }
      });
    },
    getGoodsInfo() {
      this.axios.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.data.status === 0) {
          this.goodsinfo = result.data.message[0];
          // 要分清楚,什么时候加[0]
        }
      });
    },
    getDesc(id) {
      //点击使用编程式导航跳转到 图文介绍 页面
      this.$router.push({ name: "goodsdesc", params: { id: id } });
    },
    getComment(id) {
      //点击使用编程式导航跳转到 商品评论 页面
      this.$router.push({ name: "goodscomment", params: { id: id } });
    },
    addToShopCar() {//加入购物车
      this.ballflag = !this.ballflag;
     // {id:商品的id,price:商品的单价,count:要买商品的数量,selected:true(商品是否被选中)}  
     var goodsinfoincar={id:this.id,price:this.goodsinfo.sell_price,count:this.count,selected:true} 
     this.$store.commit("addToCar",goodsinfoincar)
    },
    beforeEnter(el) {
        el.style.transform="translate(0,0)";

    },
    enter(el,done){
        el.offsetWidth;
        // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect(),返回的是一个对象,有top,bottom,left,right四个属性
        //获取小球的坐标
        const ballPosition=this.$refs.ball.getBoundingClientRect()
        //获取图标的坐标
        const badgePosition=document.getElementById("badge").getBoundingClientRect()
        //小球要位移的x轴距离
        const x=(badgePosition.left - ballPosition.left)+"px"
         //小球要位移的y轴距离
        const y=(badgePosition.top - ballPosition.top)+"px"
        el.style.transform="translate("+x+","+y+")";
        el.style.transition="all 0.5s cubic-bezier(.48,-0.32,.9,.18)";
        done()
    },
    afterEnter(el){
        this.ballflag=!this.ballflag
    },
    getCount(count){//获取子组件传过来的购买数量
        this.count=count
        // console.log(this.count)
    }
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .price {
    .market_price {
      text-decoration: line-through;
    }
    .sell_price {
      font-size: 16px;
      color: red;
      font-weight: bold;
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 392px;
    left: 139px;
    z-index: 99;
  }
}
</style>