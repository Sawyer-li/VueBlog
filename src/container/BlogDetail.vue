<template>
  <div class="blog">
    <Header></Header>
    <div class="blogBox">
      <h1>{{title}}</h1>
      <div class="status clear">
        <div class="fl">
          <img :src="headUrl" alt="head" />
        </div>
        <div class="fl wordStatus">
          <div class="author">{{author}}</div>
          <div class="create_time">{{create_time}}</div>
        </div>
      </div>
      <div class="docBody" v-html="dochtml"></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { get } from "../utils/ajax";
export default {
  data() {
    return {
      title: "",
      dochtml: "",
      create_time: "",
      author: "",
      headUrl: ""
    };
  },
  components: { Header },
  computed: {},
  mounted() {
    const { id } = this.$route.params;
    get("/api/blog/getBlogDetail/" + id).then(res => {
      const { title, dochtml, create_time, author, head_url } = res;
      this.title = title;
      this.dochtml = dochtml;
      this.create_time = create_time;
      this.author = author;
      this.headUrl = "http://192.168.1.153:3000"+head_url;
    });
  }
};
</script>
<style scoped>
.blogBox {
  width: 980px;
  margin: 0 auto;
}
.docBody {
  word-wrap: break-word;
}
.status img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.wordStatus{
  margin-left: 20px;
}
</style>