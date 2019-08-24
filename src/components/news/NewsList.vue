<template>
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
      <router-link :to="'/home/newsinfo/'+item.id">
        <img class="mui-media-object mui-pull-left" :src="item.img_url" />
        <div class="mui-media-body">
          <h1>{{item.title}}</h1>
          <p class="mui-ellipsis">
            <span>发布时间:{{item.add_time | dataFormat}}</span>
            <span>点击数: {{item.click}}</span>
          </p>
        </div>
      </router-link>
    </li>
    
  </ul>
</template>

<script>
import {Toast} from "mint-ui"
export default {
  components: {},
  props: {},
  data() {
    return {
      newslist:[]//新闻列表
    };
  },
  watch: {},
  computed: {},
  methods: {
    //获取新闻列表
    getNewsList(){
      this.axios.get("api/getnewslist").then((result)=>{
        if (result.data.status===0) {
          //如果没失败,将数据保存到data上
          this.newslist=result.data.message
        }else{
          Toast("获取新闻失败")
        }
      }
      )
    }
  },
  created() {
    this.getNewsList()
  },
  mounted() {}
};
</script>
<style lang="scss"scoped >
.mui-table-view{
  li{
    h1{
      font-size:14px;
    }
    .mui-ellipsis{
      font-size:12px;
      color:red;
      display:flex;
      justify-content:space-between;
      
    }
  }
}

</style>