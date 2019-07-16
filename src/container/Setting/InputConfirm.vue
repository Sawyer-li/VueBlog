<template>
  <div class="inputConfirm clear">
    <h3 class="label fl">{{label}}</h3>
    <div class="content fl">
      <div class="show clear" v-if="isShow">
        <div class="text fl">{{text}}</div>
        <button class="fl" @click="isShow=!isShow" >编辑</button>
      </div>
      <div class="edit" v-if="!isShow">
        <input class="fl" type="text" />
        <div class="buttonGroup fl">
          <button class="confirm">确认</button>
          <button class="cancel" @click="isShow=!isShow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['label', 'text'],
  data() {
    return {
      isShow: true
    };
  },
  components: {},

  computed: {},

  mounted: () => {},
  methods: {
    
  }
};
</script>
<style scoped>
  .inputConfirm{
    border-bottom: 1px solid gray;
  }
</style>