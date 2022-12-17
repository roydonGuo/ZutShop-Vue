<template>
  <div class="top-nav">
    <div class="col-md-6">
      <ul class="nav-pills">
        <li class="active">
          <a href="/"><span class="el-icon-s-home"></span></a>
        </li>
        <li><a href="/goods">推荐</a></li>
        <li><a href="#">秒杀</a></li>
        <li><a href="#">优惠券</a></li>
        <li><a href="#">学子VIP</a></li>
        <li><a href="#">外卖</a></li>
        <li><a href="#">超市</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Nav",
};
</script>
<style scoped>
.top-nav {
  background-color: #ffffff;
  height: 60px;
  padding: 10px 10%;
  margin-bottom: 20px;
}

.col-md-6 {
  float: left;
  /* width: 50%; */
}

.nav-pills>li {
  float: left;
  margin: 0 4px;
}

.nav-pills>li>a {
  font-size: 16px;
  border-radius: 6px;
  color: black;
  position: relative;
  display: block;
  padding: 10px 15px;
}

.nav-pills>li>a:hover {
  background: #e2e1e1;
  color: blue;
}

.active {
  border-radius: 6px;
  background: #409EFF
}
</style>