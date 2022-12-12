<template>
  <div class="header wrapper">
    <h1 class="logo">
      <a href="/"><img src="../assets/zutshoplogo.png" alt="" /></a>
    </h1>
    <!-- 导航 -->
    <div class="nav">
      <ul>
        <li>
          <a href="#"><i class="el-icon-star-off"></i>收藏</a>
        </li>
        <li>
          <el-dropdown>
            <a href="/orders"
              ><el-badge :value="orderNum" class="item" type="primary">
                <i class="el-icon-s-order"></i>
                订单
              </el-badge></a
            >
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><router-link to="#"
                  ><i class="el-icon-loading"></i>待付款</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item
                ><router-link to="#"
                  ><i class="el-icon-sold-out"></i>待收款</router-link
                ></el-dropdown-item
              >
              <el-dropdown-item
                ><router-link to="#"
                  ><i class="el-icon-present"></i>售后服务</router-link
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <a href="/cart"><i class="el-icon-shopping-cart-full"></i>购物车</a>
        </li>
      </ul>
    </div>
    <!-- search -->
    <el-input
      style="width: 400px"
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
              ><i class="el-icon-user"></i>个人信息</router-link
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><router-link to="/password"
              ><i class="el-icon-lock"></i>修改密码</router-link
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><router-link to="/address"
              ><i class="el-icon-truck"></i>收货管理</router-link
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
    orderNum: Number,
  },
  data() {
    return {
      goodName: "",
      // title: "",
      // orderNum: 0,
    };
  },
  created() {},
  methods: {
    searchGood() {
      localStorage.setItem("goodName", String(this.goodName));
      this.$router.push("/goods");
      window.location.reload();
    },
    logout() {
      this.$confirm("确定要退出登录?", "退出登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.request.get("/user/logout").then((res) => {
            console.log(res);
            if (res.code === 200) {
              localStorage.removeItem("userInfo");
              localStorage.removeItem("_t");
              localStorage.removeItem("toOrderInfo");
              localStorage.removeItem("_oNum");
              // this.$router.push("/");
              this.$router.push("/");
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
    },
  },
};
</script>

<style scoped>
</style>