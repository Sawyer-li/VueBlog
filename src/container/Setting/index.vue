<template>
  <div class="setBox">
    <Header></Header>
    <div class="setBody clear">
      <div class="headImgBox fl">
        <img class="headImg" :src="this.user.head_url" />
        <div class="headMask"></div>
        <a-icon class="icon" type="camera" />
        <input class="fileInput" name="img" type="file" id="img-input" @change="changeImg" />
      </div>
      <div class="fl messBox" v-if="msgBox.isFetching">
        <InputConfirm
          v-for="(item,index) in msgBox.order"
          :key="item.type"
          :type="item.type"
          :label="item.label"
          :isEdit="item.isEdit"
          :text="msgBox.data[item.type]"
          @confirm="setSingleMess"
        ></InputConfirm>
      </div>
    </div>
  </div>
</template>
<script>
import { post, get } from "../../utils/ajax";
import Header from "../../components/Header";
import InputConfirm from "./InputConfirm";
export default {
  data() {
    return {
      user: "",
      name: "sawyer",
      shortIntro: "一直特立独行的猪",
      Intro: "一个特立独行有思想的猪",
      msgBox: {
        isFetching: false,
        order: [
          {
            label: "姓名:",
            type: "username",
          },
          {
            label: "一句话介绍:",
            type: "shortIntroduction",
          },{
            label: "手机号:",
            type: "mobile",
          },{
            label: "邮箱:",
            type: "email",
            isEdit: false
          },{
            label: "个人介绍:",
            type: "introduction",
          }
        ],
        data: ""
      }
    };
  },
  components: { Header, InputConfirm },
  created() {
    const { msgBox } = this;
    this.user = JSON.parse(localStorage.getItem("user"));
    get("/user/me").then(res => {
      msgBox.isFetching = true;
      msgBox.data = res;
    });
  },
  mounted() {},
  methods: {
    setSingleMess(type,text) {
      console.log(type,text);
      post('/user/set',{
        text,
        type
      }).then((res)=>{
        console.log(res);
        this.msgBox.data[type] = text;
      })
    },
    changeImg(e) {
      const file = e.target.files[0];
      var imageType = /^image\//;
      //是否是图片
      if (!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
      }
      var formData = new window.FormData();
      formData.append("avatar", file);
      post("/user/avatar", formData)
        .then(res => {
          this.$message.success(res.msg);
          this.user.head_url = res.path;
          console.log(this.user.head_url);
          localStorage.setItem("user", JSON.stringify(this.user));
        })
        .catch(e => {
          console.log(e);
          this.$message.error(e);
        });
    }
  }
};
</script>
<style scoped>
.setBody {
  width: 1000px;
  margin: 0 auto;
  padding: 50px;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.headImgBox {
  width: 150px;
  height: 150px;
}
.headImgBox {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}
.headMask,
.fileInput,
.headImg {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
}
.fileInput {
  opacity: 0;
}
.headMask {
  background: #000;
  opacity: 0.5;
}
.headImgBox .icon {
  position: absolute;
  left: 50px;
  top: 50px;
  font-size: 50px;
  color: #fff;
}
.messBox {
  width: 700px;
  margin-left: 50px;
}
</style>