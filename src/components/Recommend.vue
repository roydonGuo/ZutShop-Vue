<template>
  <div class="container">
    <div class="box-left">
      <HotGoods :title="leftTitle" :GoodsData="todayNewList"></HotGoods>
    </div>
    <div class="box-right">
      <HotGoods :title="rightTitle" :GoodsData="hotGoodsList"></HotGoods>
    </div>
  </div>
</template>
  
<script>
import HotGoods from "@/components/HotGoods";
export default {
  name: "Recommend",
  components: { HotGoods },
  data() {
    return {
      leftTitle: "今日热销",
      rightTitle: "爆款推荐",
      pageNum: 1,
      pageSize: 5,
      todayNewList: [],
      hotGoodsList: [],
    }
  },
  created() {
    this.getTodayNewList()
    this.getHotGoods()
  },
  methods: {
    //左侧今日热销
    getTodayNewList() {
      this.request
        .get("/goods/today", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.todayNewList = res.data.records;
        });
    },

    //右侧爆款推荐
    getHotGoods() {
      this.request
        .get("/goods/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.hotGoodsList = res.data.data.records;
          // console.log(typeof this.hotGoodsList);
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 20px auto;
  overflow: hidden;
}

.box-left {
  float: left;
  display: inline-block;
  width: 49%;
  border-radius: 10px;
  box-sizing: border-box;
}

.box-right {
  float: right;
  display: inline-block;
  width: 49%;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>