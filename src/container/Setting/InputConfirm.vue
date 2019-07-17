<template>
  <div class="inputConfirm clear">
    <h3 class="label fl">{{label}}</h3>
    <div class="content fl">
      <div class="show clear" v-if="isShow">
        <div class="text fl">{{text}}</div>
        <a class="editBtn fl" @click="isShow=!isShow">编辑</a>
      </div>
      <div class="edit" v-if="!isShow">
        <input class="fl" type="text" v-model="value" />
        <div class="buttonGroup fl">
          <button class="confirm" @click="confirm">确认</button>
          <button class="cancel" @click="isShow=!isShow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "text", "type"],
  data() {
    return {
      isShow: true,
      value: ""
    };
  },
  created() {
    this.value = this.text;
  },
  methods: {
    confirm() {
      const { type, value } = this;
      this.$emit("confirm", type, value);
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style scoped>
.inputConfirm {
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  position: relative;
  padding: 30px 0;
}
.label {
  position: absolute;
  font-size: 15px;
  font-weight: 600;
  font-synthesis: style;
  line-height: 36px;
  color: #444;
}
.content {
  padding: 0 64px 0 140px;
  line-height: 36px;
}
.content .text {
  font-size: 15px;
  color: #1a1a1a;
}
.content .editBtn{

}
</style>