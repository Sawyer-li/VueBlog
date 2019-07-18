<template>
  <div class="listBox">
    <Header></Header>
    <ul class="bloglist">
      <li class="item" v-for="item in titleList">
        <router-link  :to="item.to"><div class="title">{{item.title}}</div></router-link>
        <div class="bottom clear">
          <div class="create_time fl">{{item.create_time}}</div>
          <div class="name fl">{{item.author}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
.bloglist {
  width: 980px;
  margin: 0 auto;
  margin-top: 50px;
}
.bloglist li {
  border-bottom: 1px solid #e8e8e8;
  padding: 12px 0;
}
.item .title {
  height: 22px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: bold;
}
.item .bottom{
  color: rgba(0, 0, 0, 0.45);
}
.item .name{
  margin-left: 20px;
}

</style>
<script>
import Header from "../components/Header";
import { get } from "../utils/ajax"
export default {
  name: "List",
  components: { Header },
  data() {
    return {
      titleList: []
    };
  },
  mounted() {
    get("/blog/getAllTitle").then(res => {
      this.titleList = res;
      this.titleList.forEach(item => {
        item.to = "/blog/" + item.id;
      });
    });
  }
};
</script>
