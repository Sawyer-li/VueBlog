<template>
  <div id="edit">
    <Header></Header>
    <div class="editBox">
      <div class="titleBox clear">
        <a-input class="fl title" v-model="docTitle" placeholder="请输入标题" />
        <a-button-group class="typeBox fl">
          <a-button
            v-for="item,key in typeList"
            :key="key"
            :type="item ? 'primary':'default'"
            @click="selectType(key)"
          >{{key}}</a-button>
        </a-button-group>
      </div>
      <VmMarkdown
        theme="dark"
        class="textBody"
        width="1080px"
        height="600px"
        v-on:getHtml="showHtml"
        :defaultText="intro"
      ></VmMarkdown>
      <div class="btnBox">
        <a-button type="primary" class="sendPro" @click="sendDoc">发送文章</a-button>
      </div>
    </div>
  </div>
</template>
<style>
.editBox {
  width: 1080px;
  margin: 0 auto;
  margin-top: 20px;
}
.titleBox{
  margin-top: 10px;
}
.titleBox .title{
  width: 82%;
}
.titleBox .typeBox {
  margin-left: 1%;
  width: 17%;
}

.textBody {
  margin-top: 10px;
  width: 1080px;
  height: 500px;
}
.sendPro {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
}
.typeBtn {
}
</style>
<script>
import { get, post } from "../../utils/ajax";
import Header from "../../components/Header";
import VmMarkdown from "vm-markdown";
export default {
  name: "Edit",
  components: {
    VmMarkdown,
    Header
  },
  data() {
    return {
      intro: "",
      docTitle: "",
      typeList: {
        vue: false,
        node: false,
        linux: false
      }
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/list");
    }
  },
  methods: {
    showHtml(data) {
      console.log(data);
    },
    sendDoc() {
      var _this = this;
      let html = document.querySelector(".vm-markdown-html").innerHTML;
      const username = localStorage.getItem("userName");
      post("/blog/senddoc", {
        title: _this.docTitle,
        author: username,
        dochtml: html
      }).then(res => {
        const { id } = res;
        _this.$message.success("发表成功");
        setTimeout(() => {
          this.$router.push({ path: "/blog/" + id });
        }, 500);
      });
    },
    selectType(key) {
      this.typeList[key] = !this.typeList[key];
    }
  }
};
</script>
