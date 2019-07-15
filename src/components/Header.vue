<template>
  <div class="head">
    <div class="headBox">
      <router-link to="/list"><h1 class="fl">BLOG</h1></router-link>
      <nav class="fl clear">
        <a href="/home">Home</a>
        <a href="/about">About</a>
      </nav>
      <div class="user fr" v-if="!user">
        <router-link to="/user/signin">登入</router-link>
        <router-link to="/user/signup">注册</router-link>
      </div>
      <div class="user fr clear" v-if="user">
        <router-link to="/edit">
          <a-button class="fl writeBlogBtn">写文章</a-button>
        </router-link>
        <div class="fr">
          <img class="headImg" :src="user.head_url" alt="head">
          <router-link to="/setting"><span>{{user.username}}</span></router-link> 
          <span class="logout" @click="logout">注销</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: ""
    };
  },
  components: {},
  computed: {},

  mounted() {
    this.user =JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    logout() {
      localStorage.clear();
      this.user = "";
    }
  }
};
</script>
<style scoped>
.head {
  height: 64px;
  background: #24292e;
}
.headBox{
  width: 980px;
  margin: 0 auto;
}
h1 {
  color: #fff;
  height: 64px;
  line-height: 64px;
}
.user {
  height: 64px;
  line-height: 64px;
  color: #fff;
}
.user .logout {
  color: #1890ff;
  margin-left: 5px;
}
.user .logout:hover {
  text-decoration: underline;
}
.user .writeBlogBtn {
  margin-top: 17px;
  margin-right: 60px;
}
.user .headImg{
  margin-right: 10px;
  width: 40px; 
  height: 40px;
  border-radius: 50%;
}
</style>