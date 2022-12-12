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
          <b>登 录</b>
        </div>
        <el-form :model="user" :rules="rules" ref="userForm">
          <el-form-item prop="username">
            <el-input
              size="medium"
              style="margin: 10px 0"
              prefix-icon="el-icon-user"
              v-model="user.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              size="medium"
              style="margin: 10px 0"
              prefix-icon="el-icon-lock"
              show-password
              v-model="user.password"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin: 10px 0; text-align: right">
            <el-button
              type="primary"
              size="small"
              autocomplete="off"
              @click="login"
              >登录</el-button
            >
            <el-button type="warning" size="small" autocomplete="off">
              <router-link to="/register">注册</router-link></el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
      },
    };
  },
  methods: {
    login() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          // 表单校验合法
          this.request.post("/user/login", this.user).then((res) => {
            // console.log(res);
            if (res.code === 200) {
              localStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.userInfo)
              ); // 存储用户信息到浏览器
              localStorage.setItem("_t", res.data.token);
              this.$router.push("/");
              this.$message.success("登录成功");
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

<style scoped>
header {
  padding: 0 10%;
}
.login-app {
  height: 80%;
  /* background-image: linear-gradient(to bottom right, #FC466B, #3F5EFB); */
  overflow: hidden;
  background: url("@/assets/images/login_bg.jpg") no-repeat center;
  background-size: cover;
}
.pull-right {
  float: right;
  font-size: 2rem;
}
</style>