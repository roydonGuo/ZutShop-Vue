<template>
  <div class="header wrapper">
    <h1 class="logo">
      <a href="/"><img src="../assets/zutshoplogo.png" alt="" /></a>
    </h1>
    <!-- 导航 -->
    <div class="nav">
      <ul>
        <li>
          <a href="###">收藏</a>
        </li>
        <li>
          <a href="###">订单</a>
        </li>
        <li>
          <a href="###">购物车</a>
        </li>
      </ul>
    </div>
    <!-- search -->
    <el-input
      style="width: 400px;"
      placeholder="请输入商品名称"
      suffix-icon="el-icon-goods"
      v-model="goodName"
    ></el-input>
    <el-button type="primary" icon="el-icon-search" @click="searchGood"
      >搜索</el-button
    >
    <!-- user head -->
    <div id="user" class="user" v-if="!isLogin"><a href="/login">登录</a></div>
    <div id="user" class="user" v-else>
      <el-dropdown>
        <img
          v-if="user.avatar"
          :src="user.avatar"
          alt="无图片"
          style="border-radius: 50%"
        />
        <img
          v-else
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          alt="无图片"
          style="border-radius: 50%"
        />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><router-link to="/user"
              ><span class="el-icon-user-solid"></span>个人信息</router-link
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><router-link to="/password"
              ><span class="el-icon-lock"></span>修改密码</router-link
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><router-link to="/address"
              ><span class="el-icon-truck"></span>收货管理</router-link
            ></el-dropdown-item
          >
          <el-dropdown-item style="color: red"
            ><span class="el-icon-coordinate"></span
            ><span @click="logout">退出登录</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    user: Object,
    isLogin: Boolean,
  },
  data() {
    return {
      goodName: "",
    };
  },
  created() {},
  methods: {
    searchGood() {},
    logout() {
      this.$confirm("确定要退出登录?", "退出登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.request.get("/user/logout").then((res) => {
            console.log(res);
            if (res.code === 200) {
              localStorage.removeItem("userInfo");
              localStorage.removeItem("_t");
              // this.$router.push("/");
              this.$router.push("/", true);
              window.location.reload();
              this.$message.success("退出成功");
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消");
        });

      // console.log("logout");
      // localStorage.removeItem("userInfo");
      // localStorage.removeItem("_t");
      // window.location.reload()
      // this.$message.success("退出成功")
    },
  },
};
</script>

<style scoped>
</style>