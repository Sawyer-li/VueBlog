<template>
  <div class="regBox">
    <h2>注册页</h2>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="Email">
        <a-input
          v-decorator="[
          'email',
          {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }]
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="nickname">
        <a-input
          v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
          }
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Password">
        <a-input
          placeholder="Please input your password!"
          v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Confirm Password">
        <a-input
          placeholder="Please input your password again!"
          v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button class="btn" type="primary" html-type="submit">Register</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style>
.regBox {
  width: 600px;
  margin: 0 auto;
  margin-top: 50px;
}
.regBox h2 {
  text-align: center;
}
</style>
<script>
import md5 from "js-md5";
export default {
  name: "register",
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  mounted() {},
  methods: {
    handleSubmit(e) {
      const _this = this;
      e.preventDefault();
      _this.form.validateFields((err, values) => {
        const { email, nickname, password, confirm } = values
        const md5password = md5(password);
        _this.$ajax
          .post("/api/user/register", {
              name: nickname,
              password: md5password,
              email: email
          })
          .then(res => {
            this.$message.success('register success');
            setTimeout(()=>{
              _this.$router.push("/login");
            },500)
          })
          .catch(err => {
            if(err.response.status == 400){
              this.$message.error(err.response.data.msg);
            }else{
              this.$message.error(err.response.data.msg);
            }
          });
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
</script>
