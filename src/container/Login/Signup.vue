<template>
  <div class="signupBody">
    <h2>注册页</h2>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          placeholder="邮箱"
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
        >
          <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="你的昵称"
          v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
          }
        ]"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="密码"
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
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="重复密码"
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
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button class="btn" type="primary" html-type="submit">Register</a-button>
      </a-form-item>
    </a-form>
    <router-link to="/user/signin">登入</router-link>
  </div>
</template>
<style>
.signupBody {
  width: 100%;
  text-align: center;
}
.signupBody h2 {
  color: azure;
  font-size: 25px;
  text-align: center;
}
.signupBody .btn {
  width: 100%;
}
</style>
<script>
import md5 from "js-md5";
import { get, post } from "../../utils/ajax";
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
            span: 24,
            offset: 0
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
        const { email, nickname, password, confirm } = values;
        const md5password = md5(password);
        post("/user/register", {
          name: nickname,
          password: md5password,
          email: email
        })
          .then(res => {
            this.$message.success("register success");
            setTimeout(() => {
              _this.$router.push("/user/signin");
            }, 500);
          })
          .catch(err => {
            if (err.response.status == 400) {
              this.$message.error(err.response.data.msg);
            } else {
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
