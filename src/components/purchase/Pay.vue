<template>
  <div class="create-order-contrainer">

    <div>
      <h2>选择支付方式：</h2>

    </div>
    <!-- 支付 -->
    <div>

      在线支付
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