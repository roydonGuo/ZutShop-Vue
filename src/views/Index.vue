<template>
  <div>
    <Header :user="user" :orderNum="orderNum" :isLogin="isLogin"></Header>
    <el-main style="padding: 0">
      <Nav></Nav>
      <router-view />
      <!-- <button class="top circle" @click="toTop">^</button> -->
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
      if (this.user) {
        this.isLogin = true;
      }
      this.orderNum = localStorage.getItem("_oNum")
        ? Number(localStorage.getItem("_oNum"))
        : 0;
    },
    // toTop() {
    //   document.documentElement.scrollTop = 0;
    // },
  },
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