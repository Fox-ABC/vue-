<template>
<div class="goodscomment-container">
    <comment-box :id="this.$route.params.id"></comment-box>
</div>
</template>

<script>
//导入评论组件
import comment from "../subcomponents/comment.vue"
export default {
  components:{
      "comment-box":comment
  },
  props:[],
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang=""
 scoped>
</style>