<template>
  <div class="create-order-contrainer">

    <div>
      <h2>选择支付方式：</h2>

    </div>
    <!-- 支付 -->
    <div style="text-align:center;margin:20px">

      <el-radio v-model="radio" label="1">支付宝</el-radio>
      <el-radio disabled  v-model="radio" label="2">微信</el-radio>
      <el-radio disabled  v-model="radio" label="3">中国建设银行</el-radio>
    </div>

  </div>
</template>

<script>
export default {
  name: "CreateOrder",
  props: {
    active: {
      required: true,
      type: Number,
      default: 1,
    }
  },
  data() {
    return {
      radio: "1",
    }
  },
  created() {

  },
  methods: {

  },
}
</script>

<style scoped>
h2 {
  padding: 10px;
  background: #409eff;
  border-radius: 10px;
}
</style>