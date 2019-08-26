<template>
  <div class="goods-list">
    <!-- <router-link
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      :to="'/home/goodsinfo/'+item.id"
      tag="div"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->
    <!-- 在网页中,存在两种跳转方式:
          1.使用 a 标签 的形式叫做 标签跳转
          2.使用 window.location.href的形式,叫做编程是导航
     -->
      <div
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      @click="goDetail(item.id)"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      pageindex: 1, //分页的页数
      goodslist: [] //存放商品列表的数组
    };
  },
  watch: {},
  computed: {},
  methods: {
    getGoodsList() {
      this.axios
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          console.log(result);
          if (result.data.status === 0) {
            this.goodslist = this.goodslist.concat(result.data.message);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id){
      /**
       * 使用js的形式进行路由导航
       * 
       * 注意: 一定要区分 this.$router和this.$route 这两个对象
       * 其中: this.$route 是路由[参数对象],所有的路由中的参数, params,query 都属于他
       *       this.$router 是一个路由[导航对象],用它可以方便的使用js代码,实现路由的前进,后退
       *       ,跳转到新的url地址
       */
      //1.最简单的
      // this.$router.push("/home/goodsinfo/"+id)//具体使用方法看文档
      //2.传递对象
      // this.$router.push({ path:"/home/goodsinfo/"+id})
      //3.传递命名的路由
      this.$router.push({name:"goodsinfo",params:{id:id}})
      
    }
  },
  created() {
    this.getGoodsList();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.goods-list {
  padding: 7px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; //贴边对齐
  .goods-item {
    display: flex;
    flex-direction: column; //设置flex以y轴,不太懂,具体查看文档
    justify-content: space-between;
    padding: 2px;
    margin: 3px 0;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    min-height: 290px;
    width: 49%;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      .sell {
        display: flex;
        justify-content: space-between;
      }
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          margin-left: 10px;
          font-size: 12px;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>