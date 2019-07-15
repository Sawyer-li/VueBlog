<template>
  <div class="aboutBox">
    <Header></Header>
    <img src="/static/pkq.jpg" alt="">
  </div>
</template>
<script>
import Header from "../components/Header";
export default {
  data(){
    return {
      test: 2,
      test1: "1212"
    }
  },
  components: {
    Header
  },
  mounted(){
    const _this = this;
    this.$watch("test", function(newVal, oldVal){
      console.log("success");
      console.log(oldVal,newVal)
    })
    this.test = 5;
  }
}
</script>
<style>
html,body{ width: 100%; }
.aboutBox img{ width: 100%; }
</style>

