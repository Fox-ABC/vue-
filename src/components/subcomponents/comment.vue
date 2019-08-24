<template>
<div class="cmt-container">
  <!-- 发表评论 -->
  <h1>发表评论</h1>
  <hr>
  <textarea maxlength="120" placeholder="请输入评论的内容,最多120"></textarea>
  <mt-button type="primary" size="large">发表评论</mt-button>
  <!-- 显示评论 -->
  <div class="cmt-list">
    <div class="cmt-item" v-for="(item,i) in newscomments" :key="item.add_time">
      <div class="cmt-title">
       第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;&nbsp;&nbsp;发表时间: {{item.add_time|dataFormat}}
      </div>
      <div class="cmt-body"> {{item.content==="undefined"? "此用户很懒,什么都没说" : item.content}}</div>
      
    </div>
  </div>
  <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
</div>

</template>

<script>
export default {
  components:{},
  props:["id"],
  data(){
    return {
      pageIndex:1,//默认展示第一页数据
      newscomments:[]//所有评论数据
    }
  },
  watch:{},
  computed:{},
  methods:{
    getComments(){//获取评论
      this.axios.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
        console.log(result)
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