<template>
  <div class="container">
    <div class="box-left">
      <div class="goods-title">
        <h1>今日推荐</h1>
      </div>
      <div class="goods-item">
        <div class="item-7">
          <div class="grid-content bg-purple">
            <a href="#"
              >齐心（COMIX）C5902 A5优品商务笔记本子记事本日记本122张</a
            >
            <h2>¥50</h2>
          </div>
        </div>
        <div class="item-3">
          <div class="grid-content bg-purple">
            <img
              src="https://img1.imgtp.com/2022/12/15/c27WY8Nz.png"
              class="img-responsive"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="box-right">
      <div class="goods-title">
        <h1>爆款排行</h1>
      </div>
      <div class="goods-item">
        <div class="item-7">
          <div class="grid-content bg-purple">
            <a href="/product"
              >得力（deli）1548A商务办公桌面计算器 太阳能双电源</a
            >
            <h2>¥50</h2>
          </div>
        </div>
        <div class="item-3">
          <div class="grid-content bg-purple">
            <img
              src="https://img1.imgtp.com/2022/12/15/vB1JSkf3.png"
              class="img-responsive"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "Recommend",
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 20px auto;
  min-height: 400px;
  max-height: 400px;
  /* background: blue; */
  overflow: hidden;
}
.box-left {
  float: left;
  width: 49%;
  background: #e5e9f2;
  min-height: 400px;
  border-radius: 10px;
  /* background: red; */
}
.box-right {
  float: right;
  width: 49%;
  background: #e5e9f2;
  min-height: 400px;
  border-radius: 10px;
  /* background: green; */
}
.goods-title {
  padding: 10px;
  background: #409eff;
  border-radius: 10px;
}
.goods-item {
  background: #d3dce6;
}
.item-7 {
  width: 70%;
  display: inline-block;
  overflow: hidden;
}
.item-3 {
  width: 30%;
  display: inline-block;
  overflow: hidden;
}
.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 10px;
  padding: 20px;
  min-height: 120px;
}

/* 左盒子样式修改 */
.img-responsive {
  display: block;
  width: 100%;
  height: 80px;
  vertical-align: middle;
}

.grid-content a {
  color: black;
  font-size: 16px;
  -webkit-line-clamp: 2;
}
.grid-content a:hover {
  transform: .3s;
  color: #409eff;
}
h2{
  margin: 10px 0;
}
</style>