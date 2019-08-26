<template>
<div class="newsinfo-container">
  <!-- 标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
            <span>发布时间:{{newsinfo.add_time|dataFormat}}</span>
            <span>点击数:{{newsinfo.click}}</span>
          </p>
          <hr>
          <!-- 内容 -->
          <div class="content" v-html="newsinfo.content"></div>
          <!-- 评论 -->
          <comment-box :id="this.id"></comment-box>
</div>

</template>

<script>
//导入入评论子组件
import comment from "../subcomponents/comment.vue"
import {Toast} from "mint-ui"
export default {
  components:{
    //注册子组件
      "comment-box":comment
  },
  props:{},
  data(){
    return {
        id:this.$route.params.id,//将url地址中传过来的id值,挂载到data上.方便以后调用
        newsinfo:{}
    }
  },
  watch:{},
  computed:{},
  methods:{
    getNewsInfo(){
      this.axios.get("api/getnew/"+this.id).then(result=>{
        
          if (result.data.status===0) {
            this.newsinfo=result.data.message[0]
          }else{
            Toast("加载失败")
          }
      })
    }
  },
  created(){
    this.getNewsInfo()
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
.newsinfo-container{
    padding:0 4px;
    .title{
        font-size:16px;
        text-align:center;
        margin:15px 0;
    }
    .subtitle{
        font-size: 13px;
        color:blue;
        display: flex;
        justify-content: space-between;
    }
    .content{
      img{
        width: 100%;
      }
    }
}
</style>