<template>
  <div>
    <h1>评论区</h1>
    <ul class="comments">
      <li class="comment clear" v-for="(item,index) in comments" :key="item.id">
        <div class="headImg fl">
          <img :src="item.head_url" alt />
        </div>
        <div class="fl detail">
          <div class="baseInfor clear">
            <div class="name fl">{{item.username}}</div>
            <div class="time fl">{{item.create_time}}</div>
            <div class="fr floor">{{index+1}} 楼</div>
          </div>
          <div class="content">{{item.content}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { get } from "../../utils/ajax";
export default {
  data() {
    return {
      comments: []
    };
  },
  props: ["blogId", "update"],
  watch: {
    update() {
      this.init();
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { blogId } = this;
      const testData = "1231231";
      get("/comment/" + blogId).then(res => {
        this.comments = res;
        console.log(this.comments);
      });
    }
  }
};
</script>
<style scoped>
.comments {
}
.comment {
  border-bottom: 1px solid #e2e2e2;
  margin-top: 5px;
}
.comment .detail {
  width: 632px;
}
.comment .headImg img {
  margin: 10px;
  width: 48px;
  height: 48px;
  border-radius: 4px;
}
.comment .baseInfor {
  margin-top: 10px;
}
.comment .baseInfor .name {
  font-weight: bold;
}
.comment .baseInfor .time {
  color: #ccc;
  margin-left: 10px;
}
.comment .content {
  font-size: 16px;
}
</style>