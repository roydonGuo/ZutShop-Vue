<template>
  <div class="number-container d-flex justify-content-center align-items-center">
    购买数量
    <!-- 减 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="reduceCount">
      -
    </button>
    <!-- 购买的数量 -->
    <span class="number-box">{{ count }}</span>
    <!-- 加 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="addCount">
      +
    </button>
  </div>
</template>

<script>
import bus from "@/components/eventBus.js";

export default {
  props: {
    cid: {
      required: true,
      type: Number,
    },
    count: {
      default: 1,
      type: Number,
    },
  },
  methods: {
    addCount() {
      var obj = { cid: this.cid, num: this.count + 1 };
      // console.log("'+'---id:" + obj.cid + "---" + "value:" + obj.num);
      bus.$emit("share", obj);
    },
    reduceCount() {
      if (this.count > 1) {
        var obj = { cid: this.cid, num: this.count - 1 };
        // console.log("'-'---id:" + obj.cid + "---" + "value:" + obj.num);
        bus.$emit("share", obj);
      }
    },
  },
};
</script>

<style scoped>
.number-box {
  min-width: 30px;
  text-align: center;
  margin: 5px;
  font-size: 16px;
}

.btn-sm {
  width: 30px;
  height: 25px;
}
</style>
