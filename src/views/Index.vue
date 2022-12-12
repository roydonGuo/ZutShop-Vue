<template>
  <div>
    <Header :user="user" :isLogin="isLogin"></Header>
    <el-main style="padding: 0">
      <Nav></Nav>
      <router-view />
      
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
    },
  },
};
</script>

<style scoped>
</style>