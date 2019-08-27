<template>
<!-- 由于接口图片缺失,导致发生错误,刷新既可 -->
<!-- 问题： 我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值 -->
<!-- 我们可以 使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会被触发几次，
      但是，最后一次，肯定是一个 合法的 max 数值 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
    <!-- 当元素的值发生改变时，会发生 change 事件。
          该事件仅适用于文本域（text field），以及 textarea 和 select 元素。 -->
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import  mui from "../../lib/js/mui.min.js"
export default {
  components: {},
  props: ["maxcount"],
  data() {
    return {};
  },
  watch: {//属性监听
      maxcount:function(newval,oldval){
        //通过js api设置最大值,详情见mui文档
          mui(".mui-numbox").numbox().setOption('max',newval)
      }

  },
  computed: {},
  methods: {
    countChanged(){
      //每当文本框的数据被修改的时候,立即把最新的数据,用过事件调,传递给父组件
      this.$emit("getcount",parseInt(this.$refs.numbox.value))
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