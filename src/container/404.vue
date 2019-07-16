<template>
  <div>
    <Header></Header>
    <div class="_404Box">
      <img src="/static/404.jpg" alt="">
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
export default {
  data () {
    return {
    };
  },
  components: { Header }
}

</script>
<style scoped>
  ._404Box{
    width: 100%;
    text-align: center;
    padding-top: 130px;
  }
</style>