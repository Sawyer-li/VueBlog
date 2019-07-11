<template>
  <div class="setBox">
    <Header></Header>
    <div class="setBody">
      <div class="headImgBox"> 
        <img class="headImg" :src="this.user.head_url">
        <input class="fileInput" name="img" type="file" id="img-input" @change="changeImg">
      </div>
      <div class="inpuxBox">
        <h3>一句话</h3>
        <a-input placeholder="Basic usage"/>
      </div>
      <div class="inpuxBox">
        <h3>两句话</h3>
        <a-input placeholder="Basic usage"/>
      </div>
      <div class="inpuxBox">
        <h3>三句话</h3>
        <a-input placeholder="Basic usage"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
.setBody {
  width: 1000px;
  margin:  0 auto;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.headImgBox{
  width: 150px;
  height: 150px;
}
.headImgBox{ position: relative;}
.fileInput{
  opacity: 0;
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
}
.headImg{
  position: absolute;
  left: 0;
  top: 0;
  width: 150px;
  height: 150px;
}
</style>
<script>
import { post } from "../utils/ajax";
import Header from "../components/Header";
export default {
  data() {
    return {
      user: ""
    }
  },
  components: { Header },
  mounted() {
    this.user =JSON.parse(localStorage.getItem("user"));
  },
  methods: {
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
      post("/api/user/avatar", formData).then(res => {
        this.$message.success(res.msg);
        this.user.head_url = res.path;
        localStorage.setItem('user',JSON.stringify(this.user));
      })
      .catch((e) => {
        console.log(e);
        this.$message.error(e);
      })
    }
  }
};
</script>
<style scoped>
</style>