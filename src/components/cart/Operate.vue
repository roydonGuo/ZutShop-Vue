<template>
  <div class="operate-container">
    <!-- 左侧的全选 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="cbFull" :checked="isFull" @change="selectAll" />
      <label class="custom-control-label" for="cbFull">全选</label>
    </div>
    <!-- 中间的合计 -->
    <div>
      <span>合计：</span>
      <span class="total-price">￥{{ amt.toFixed(2) }}</span>
    </div>
    <!-- 结算按钮 -->
    <button v-if="total == 0">

    </button>

    <button type="button" v-else class="btn-settle" @click="purchase">
      结算({{ total }})
    </button>

  </div>
</template>

<script>
export default {
  props: {
    isFull: {
      type: Boolean,
      default: true,
    },
    amt: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    goodsSelected: {
      type: Array,
      default: []
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    //点击结算，去购买
    async purchase() {
      // console.log(this.goodsSelected)
      // localStorage.setItem("createOrder",JSON.stringify(this.goodsSelected))
      this.$router.push({ path: '/purchase', query: { goodsSelected: this.goodsSelected } });
    },
    selectAll(e) {
      this.$emit("isAll", e.target.checked);
    },
  },
};
</script>

<style  scoped>
.operate-container {
  font-size: 12px;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  border-top: 1px solid #efefef;
  /* position: fixed; */
  /* bottom: 0; */
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

.custom-checkbox {
  display: flex;
  align-items: center;
}

#cbFull {
  margin-right: 5px;
}

.btn-settle {
  height: 40px;
  color: white;
  min-width: 100px;
  border-radius: 25px;
  border: 0 !important;
  text-align: center;
  background: #409EFF;
  font-size: 14px;
}

.btn-settle:hover {
  background: #b8b8ff;
  columns: black;
}

.total-price {
  font-weight: bold;
  font-size: 14px;
  color: red;
}
</style>
