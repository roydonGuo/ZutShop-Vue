<template>
  <div>
    <div class="content clearfix" style="margin: 0 10%; box-sizing: border-box">
      <!-- 待渲染商品数据 -->
      <div class="good-item" v-for="g in goodsData" :key="g.gid">
        <router-link :to="'/product/' + g.gid">
          <div class="img-cover">
            <img :src="g.image" alt="获取图片源失败" />
          </div>
        </router-link>
        <h4>{{ "￥" + g.price }}</h4>
        <div class="good-detail">
          <router-link :to="'/product/' + g.gid">
            <h4>{{ g.title }}</h4>
          </router-link>
          <!-- <a href="/product">
            {{ g.title }}
          </a> -->
        </div>
        <div class="good-btn">
          <el-button size="mini" icon="el-icon-star-off">加入收藏</el-button>
          <el-button size="mini" icon="el-icon-shopping-cart-full" @click="addCart(g.gid)">加购物车</el-button>
        </div>
      </div>
    </div>

    <!-- 分页控制 -->
    <div style="margin: 20px 10%; padding: 10px; text-align: center">
      <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[12]"
        :page-size="pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: "Goods",
  props: {
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 12,
      total: 0,
      title: "",
      goodsData: {},
    };
  },
  created() {
    // this.getGoods();
    // window.location.reload();
    // console.log("1");

  },
  mounted() {
    this.title = localStorage.getItem("goodName")
      ? localStorage.getItem("goodName")
      : "";
    this.getGoods();
    localStorage.removeItem("goodName");
  },
  updated() {

    // window.location.reload();
  },
  // watch: {
  //   title() {
  //     this.getGoods();
  //   },
  // },
  methods: {
    //加入购物车功能
    addCart(gid) {
      console.log(gid);
      const cart = {};
      cart.gid = gid;
      // console.log(cart);
      this.request.post("/cart/add", cart).then((res) => {
        if (res.code === 200) {
          // console.log(res);
          this.$message.success("添加成功");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    getGoods() {
      this.request
        .get("/goods/search", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            title: this.title,
          },
        })
        .then((res) => {
          this.goodsData = res.data.records;
          // console.log(this.goodsData);
          this.total = Number(res.data.total);
        });
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getGoods();
    },
  },
  updated() { },
};
</script>

<style scoped>
h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* overflow: hidden; */
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
}

.good-item {
  float: left;
  position: relative;
  width: 23%;
  border-radius: 10px;
  height: 360px;
  background: white;
  border: 1px solid #888888;
  margin: 0 1% 1%;
}

@media (max-width: 992px) {
  .good-item {
    width: 46%;
  }
}

@media (max-width: 500px) {
  .good-item {
    width: 100%;
  }
}

.good-item:hover {
  box-shadow: 0px 0px 8px #888888;
}

.img-cover {
  padding: 2%;
  border-radius: 10px;
  width: 100%;
  height: 64%;
}

.img-cover>img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  vertical-align: middle;
}

.good-item>h4 {
  color: red;
  font-size: 18px;
  margin: 10px;
}

.good-item>.good-detail {
  margin: 0 10px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.good-detail>a:hover {
  color: gold;
}

.good-btn {
  position: absolute;
  bottom: 2%;
  width: 100%;
  padding: 0 10px;
  text-align: center;
}
</style>
