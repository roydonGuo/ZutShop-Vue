<template>
  <div>
    <Header :user="user" :orderNum="orderNum" :isLogin="isLogin"></Header>
    <el-main style="padding: 0">
      <Nav></Nav>
      <router-view />
      <el-backtop></el-backtop>
    </el-main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default {
  name: "Index",
  components: { Header, Footer, Nav },
  data() {
    return {
      user: {},
      isLogin: false,
      orderNum: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.user = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
        //请求后台拿到用户
      if (this.user) {
        this.isLogin = true;
        // console.log(this.user);
      }
      this.orderNum = localStorage.getItem("_oNum")
        ? Number(localStorage.getItem("_oNum"))
        : 0;
    },
  },
  beforeUpdate() {
    // localStorage.removeItem("userInfo");
    // localStorage.removeItem("_t");
    // localStorage.removeItem("toOrderInfo");
    // localStorage.removeItem("_oNum");
  }
};
</script>

<style scoped>
.top {
  position: fixed;
  width: 30px;
  height: 30px;
  bottom: 50px;
  right: 100px;
  background-color: aqua;
}
</style>