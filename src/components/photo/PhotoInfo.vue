<template>
  <div class="photoinfo-container">
    <h1>{{photoinfo.title}}</h1>
    <p class="subtitle">
      <span>发布时间:{{photoinfo.add_time|dataFormat}}</span>
      <span>点击次数:{{photoinfo.click}}</span>
    </p>

    <hr />
    <!-- 缩略图  具体看官网-->
    <div class="thumbs">
      <vue-preview
        :list="list"
        :thumbImageStyle="{width: '100px', height: '100px', margin: '10px','box-shadow': '0 0 10px #999'}"
        :previewBoxStyle="{border: '1px solid #eee'}"
        :tapToClose="true"
        @close="closeHandler"
        @destroy="destroyHandler"
      />
    </div>

    <div v-html="photoinfo.content" class="photoinfo-content"></div>
    <!-- 评论子组件 -->
    <comment :id="id"></comment>
    <!-- 这里传id不懂 -->
  </div>
</template>

<script>
//导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  components: {
    //注册子组件
    comment: comment
  },
  props: {},
  data() {
    return {
      id: this.$route.params.id, //从路由中获取的 图片id
      photoinfo: {}, //图片详情
      list: [] //缩略图数组
    };
  },
  watch: {},
  computed: {},
  methods: {
    getPhotoInfo() {
      //获取图片详情
      this.axios.get("api/getimageInfo/" + this.id).then(result => {
        if (result.data.status === 0) {
          this.photoinfo = result.data.message[0];
        }
      });
    },
    getThumbs() {
      //获取缩略图
      this.axios.get("api/getthumimages/" + this.id).then(result => {
        if (result.data.status === 0) {
          //循环每个图片数据,补全图片的宽和高,以及略缩图路径
          result.data.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          this.list = result.data.message;
        }
      });
    },
    // 即将关闭的时候，调用这个处理函数
    closeHandler() {
      console.log("closeHandler");
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log("destroyHandler");
    }
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h1 {
    font-size: 15px;
    color: blue;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }
  .photoinfo-content {
    font-size: 13px;
  }
  
  
}
</style>