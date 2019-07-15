<template>
  <div class="loginBox">
    <div class="loginBody fr">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted: () => {},
  methods: {}
};
</script>
<style scoped>
.loginBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(/static/wallpaper/3.jpg) no-repeat 0 0;
  background-size: 100% 100%;
}
.loginBody {
  width: 400px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  padding-top: 100px;
}
</style>