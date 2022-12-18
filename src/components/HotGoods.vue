<template>
  <!-- 热门商品列表 -->
  <div>
    <div class="goods-title">
      <h1>{{ title }}</h1>
    </div>
    <div class="goods-list">
      <div class="goods-item" v-for="g in GoodsData" :key="g.gid">
        <div class="item-7">
          <div class="grid-content">
            <router-link :to="'/product/' + g.gid">
              <h4>{{ g.title }}</h4>
            </router-link>
            <h6 style="color:#888">{{g.sellPoint}}</h6>
            <h2 style="color:red">¥{{ g.price }}</h2>
          </div>
        </div>
        <div class="item-3">
          <div class="grid-content">
            <img :src="g.image" class="img-responsive" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HotGoods",
  props: {
    title: String,
    GoodsData: Array
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped>
h4 ,h5,h6{
  overflow: hidden;
  text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-title {
  padding: 10px;
  background: #409eff;
  border-radius: 10px;
}

.goods-list {
  height: 500px;
  border-radius: 10px;
  background: #ffffff;
}

.goods-item {
  height: 100px;
  border-bottom: 1px solid #888;
}

.item-7 {
  width: 77%;
  display: inline-block;
  overflow: hidden;
}

.item-3 {
  width: 23%;
  display: inline-block;
  overflow: hidden;
}

.grid-content {
  border-radius: 10px;
  padding: 0 20px;
  /* min-height: 120px; */
}

.img-responsive {
  display: inline-block;
  padding: 10px;
  width: 100%;
  height: 90px;
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

h2 {
  margin: 10px 0;
}
</style>