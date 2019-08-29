<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import  mui from "../../lib/js/mui.min.js"
export default {
  components: {},
  props: ["maxcount","initcount","goodsid"],
  data() {
    return {};
  },
  watch: {//属性监听
     

  },
  computed: {},
  methods: {
    countChanged(){
        //数量改变
        //每当数量改变,则立即把最新的数量值同步到 购物车的 store中,覆盖之前的数量值
     this.$store.commit("updateGoodsInfo",{id:this.goodsid,count:this.$refs.numbox.value})
  }
  },
  created() {},
  mounted() {
      //初始化数字选择框组件
      mui(".mui-numbox").numbox()
  },
  
};
</script>
<style lang=""
 scoped>
</style>