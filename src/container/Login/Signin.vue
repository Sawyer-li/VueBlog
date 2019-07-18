<template>
  <div class="signinBody fr">
    <h2>登入</h2>
    <a-alert :type="alert.type" :message="alert.msg" banner v-show="alert.is" />
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input
          placeholder="名称或邮箱"
          v-decorator="[
          'userName',
          {rules: [{ required: true, message: 'Please input your username!' }]}
        ]"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          type="password"
          placeholder="密码"
          v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your Password!' }]}
        ]"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          class="btn"
          type="primary"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >Log in</a-button>
      </a-form-item>
    </a-form>
    <router-link to="/user/signup">注册</router-link>
  </div>
</template>
<style>
.signinBody {
  width: 100%;
  text-align: center;
}
.signinBody h2 {
  color: azure;
  font-size: 25px;
  text-align: center;
}
.signinBody .btn {
  width: 100%;
}
</style>
<script>
import md5 from "js-md5";
import { get, post } from "../../utils/ajax";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: "register",
  data() {
    return {
      form: this.$form.createForm(this),
      hasErrors,
      alert: {
        type: "error",
        msg: "",
        is: false
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    handleSubmit(e) {
      const _this = this;
      e.preventDefault();
      _this.form.validateFields((err, values) => {
        const password = md5(values.password);
        if (err) {
          return;
        }
        post("/user/login", {
          account: values.userName,
          password: password
        })
          .then(res => {
            const { token, msg, user } = res;
            _this.alert.type = "success";
            _this.alert.msg = msg;
            _this.alert.is = true;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("username", values.userName);
            setTimeout(() => {
              _this.$router.push("/");
            }, 500);
          })
          .catch(err => {
            console.log("err:");
            if (err.response) {
              _this.form.setFieldsValue({
                password: ""
              });
              _this.alert.type = "error";
              _this.alert.msg = err.response.data.mess;
              _this.alert.is = true;
            } else {
              console.log("Error", err.message);
            }
          });
      });
    },
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    }
  }
};
</script>
