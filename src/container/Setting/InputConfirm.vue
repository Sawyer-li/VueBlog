<template>
  <div class="inputConfirm clear">
    <h3 class="label fl">{{label}}</h3>
    <div class="content fl">
      <div class="show clear" v-if="isShow">
        <div class="text fl">{{text}}</div>
        <a class="editBtn fl" @click="isShow=!isShow" v-if="isedit">编辑</a>
      </div>
      <div class="editBox" v-if="!isShow">
        <input class="textInput" type="text" v-model="value" />
        <div class="buttonGroup">
          <a-button type="primary" class="confirm" @click="confirm">确认</a-button>
          <a-button class="cancel" @click="isShow=!isShow">取消</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "text", "type", "isEdit"],
  data() {
    return {
      isShow: true,
      value: "",
      isedit: true
    };
  },
  created() {
    this.value = this.text;
    if (this.isEdit != undefined) {
      this.isedit = false;
    }
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
  width: 100%;
  padding: 0 64px 0 140px;
  line-height: 36px;
}
.content .text {
  font-size: 15px;
  color: #1a1a1a;
}
.content .editBtn {
  margin-left: 10px;
}
.textInput {
  border: none;
  border-bottom: 1px solid gray;
}
.editBox {
  width: 100%;
}
.editBox .textInput {
  width: 80%;
}
.buttonGroup {
  margin-top: 5px;
}
</style>