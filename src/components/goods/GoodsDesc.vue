<template>
<div class="goodsdesc-container">
    <h1>{{info.title}}</h1>
    <hr>
    <div class="content" v-html="info.content"></div>
</div>
</template>

<script>
export default {
  components:{},
  props:[],
  data(){
    return {
        id:this.$route.params.id,
        info:{}//图文介绍的数据
    }
  },
  watch:{},
  computed:{},
  methods:{
      getGoodsDesc(){
            this.axios
            .get("api/goods/getdesc/"+this.id)
            .then(result=>{
                console.log(result)
                if (result.data.status===0) {
                    this.info=result.data.message[0]
                }
            })
      }
  },
  created(){
      this.getGoodsDesc();
  },
  mounted(){}
}
</script>
<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h1{
        font-size:16px;
        text-align: center;
        margin: 15px 0;
        color: blue;
    }
    .content{
    img{
            width: 100%;
        }   
    }
    
}
</style>