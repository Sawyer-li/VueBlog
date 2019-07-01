<template>
  <div class="loginBox">
    <h2>登入页</h2>
    <a-alert :type="alert.type" :message="alert.msg" banner v-show="alert.is"/>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input
          placeholder="Please input your username"
          v-decorator="[
          'userName',
          {rules: [{ required: true, message: 'Please input your username!' }]}
        ]"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          type="password"
          placeholder="Password"
          v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your Password!' }]}
        ]"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
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
  </div>
</template>
<style>
.loginBox {
  width: 400px;
  margin: 0 auto;
  margin-top: 50px;
}
.loginBox h2 {
  text-align: center;
}
.loginBox .btn {
  width: 100%;
}
</style>
<script>
import md5 from "js-md5";
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
        _this.$ajax
          .post("/api/user/login", {
            name: values.userName,
            password: password
          })
          .then(res => {
            const { token, msg, user } = res.data;
            _this.alert.type = "success";
            _this.alert.msg = msg;
            _this.alert.is = true;
            user.head_url = "http://192.168.1.153:3000"+user.head_url;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem("username", values.userName);
            setTimeout(()=>{
              _this.$router.push("/");
            },500)
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
