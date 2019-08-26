<template>
<!-- 由于接口图片缺失,导致发生错误,刷新既可 -->
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import  mui from "../../lib/js/mui.min.js"
export default {
  components: {},
  props: [],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
      //初始化数字选择框组件
      mui("mui-numbox").numbox()
  }
};
</script>
<style lang=""
 scoped>
</style>