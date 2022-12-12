<template>
  <div>
    <header class="header">
      <img src="@/assets/zutshoplogo.png" alt="" />
      <span class="pull-right">
        <h3><small>欢迎访问</small><strong>学子商城</strong></h3>
      </span>
    </header>
    <div class="login-app">
      <div
        style="
          margin: 100px auto;
          background-color: rgba(255, 255, 255, 0.9);
          width: 350px;
          height: 350px;
          padding: 20px;
          border-radius: 10px;
        "
      >
        <div style="margin: 20px 0; text-align: center; font-size: 24px">
          <b>注 册</b>
        </div>
        <el-form :model="user" :rules="rules" ref="userForm">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              size="medium"
              style="margin: 5px 0"
              prefix-icon="el-icon-user"
              v-model="user.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              size="medium"
              style="margin: 5px 0"
              prefix-icon="el-icon-lock"
              show-password
              v-model="user.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              placeholder="请确认密码"
              size="medium"
              style="margin: 5px 0"
              prefix-icon="el-icon-lock"
              show-password
              v-model="user.confirmPassword"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin: 5px 0; text-align: right">
            <el-button
              type="primary"
              size="small"
              autocomplete="off"
              @click="register"
              >注册</el-button
            >
            <el-button
              type="warning"
              size="small"
              autocomplete="off"
              @click="$router.push('/login')"
              >返回登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    register() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          // 表单校验合法
          if (this.user.password !== this.user.confirmPassword) {
            this.$message.error("两次输入的密码不一致");
            return false;
          }
          this.request.post("/user/register", this.user).then((res) => {
            // console.log(res);
            if (res.code === 200) {
              this.$router.push("/login");
              this.$message.success("注册成功");
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped >
header {
  padding: 0 10%;
}
.login-app {
  height: 80%;
  overflow: hidden;
  background: url("@/assets/images/login_bg.jpg") no-repeat center;
  background-size: cover;
}
.pull-right {
  float: right;
  font-size: 2rem;
}
</style>