<template>
<div class="cmt-container">
  <!-- 发表评论 -->
  <h1>发表评论</h1>
  <hr>
  <textarea maxlength="120" placeholder="请输入评论的内容,最多120" v-model="msg"></textarea>
  <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
  <!-- 显示评论 -->
  <div class="cmt-list">
    <div class="cmt-item" v-for="(item,i) in newscomments" :key="item.add_time+i">
      <div class="cmt-title">
       第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;&nbsp;&nbsp;发表时间: {{item.add_time|dataFormat}}
      </div>
      <div class="cmt-body"> {{item.content===""? "此用户很懒,什么都没说" : item.content}}</div>
      
    </div>
  </div>
  <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
</div>

</template>

<script>
import {Toast} from "mint-ui"
export default {
  components:{},
  props:["id"],
  data(){
    return {
      pageIndex:1,//默认展示第一页数据
      newscomments:[],//所有评论数据
      msg:""
    }
  },
  watch:{},
  computed:{},
  methods:{
    getComments(){//获取评论
      this.axios.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
        
         if (result.data.status===0) {
            // this.newscomments=result.data.message
            //每当获取新的评论数据时,不要把老数据覆盖,而是用老数据拼接新数据
            this.newscomments=this.newscomments.concat(result.data.message)

          }else{
            Toast("加载失败")
          }
      })
    },
    getMore(){//加载更多
        this.pageIndex++
        this.getComments()

    },
    postComment(){
      //校验评论内容是否为空
      if(this.msg.trim().length===0){
        return Toast("评论不能为空")
      }
        this.axios
        .post("api/postcomment/"+this.$route.params.id,{
          content: this.msg.trim()
        })
        .then(result=>{
          if (result.data.status===0) {
            //拼接出一个对象
            var cmt={
              name:"匿名用户",
              add_time:Date.now(),
              content:this.msg.trim()
            }
            this.msg=""
            
          }
        })
    }
  },
  created(){
    this.getComments()
  },
  mounted(){}
}
</script>
<style lang="scss" scoped>
  .cmt-container{
    h1{
      font-size: 16px;
    }
    textarea{
      height: 85px;
      margin: 0;
    }
    .cmt-list{
      margin-top: 5px;
      .cmt-item{
        font-size: 13px;
        .cmt-title{
          background-color: grey;
          line-height:35px ;
          
        }
        .cmt-body{
          text-indent: 2em;
          line-height:35px ;
        }
      }
    }
  }
</style>