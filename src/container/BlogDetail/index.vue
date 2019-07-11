<template>
  <div class="blog">
    <Header></Header>
    <div class="blogBox">
      <div class="blogMain">
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
        <Commnent :blogId="blogId" :update="updateComment" />
        <div class="commentBox">
          <a-textarea
            placeholder="please your comment"
            :autosize="{minRows:2, maxRows: 6}"
            v-model="commentContent"
          ></a-textarea>
          <a-button class="replyBtn" @click="handleSubmitComment">回复</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Commnent from "./Comment";
import { get, post } from "../../utils/ajax";
export default {
  data() {
    return {
      title: "",
      dochtml: "",
      create_time: "",
      author: "",
      headUrl: "",
      commentContent: "",
      updateComment: 1
    };
  },
  components: { Header, Commnent },
  computed: {
    blogId: function() {
      return this.$route.params.id;
    }
  },
  methods: {
    handleSubmitComment() {
      post("/api/comment/addComment", {
        blogId: this.blogId,
        content: this.commentContent
      }).then((res)=>{
        this.updateComment++;
      })
    }
  },
  mounted() {
    get("/api/blog/getBlogDetail/" + this.blogId).then(res => {
      const { title, dochtml, create_time, author, head_url } = res;
      this.title = title;
      this.dochtml = dochtml;
      this.create_time = create_time;
      this.author = author;
      this.headUrl = head_url;
    });
  }
};
</script>
<style scoped>
.blogBox {
  width: 980px;
  margin: 0 auto;
}
.blogMain {
  width: 700px;
  margin: 0 auto;
  padding-top: 20px;
}
.docBody {
  margin-top: 10px;
  word-wrap: break-word;
}
.status img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.wordStatus {
  margin-left: 20px;
}
.commentBox textarea {
  display: block;
  width: 650px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px;
  font-size: 14px;
  resize: none;
}
.replyBtn {
  margin-top: 10px;
}
</style>