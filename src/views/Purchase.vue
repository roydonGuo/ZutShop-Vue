<template>
  <div class="purchase-contrainer">
    <div>待确认信息</div>
  </div>
</template>

<script>
export default {
  name: "Purchase",
  components: {},
  data() {
    return {

    }
  },
  created() {
    this.$message.success("请确认订单信息")
  },
  methods: {

  },
}
</script>

<style scoped>
.purchase-contrainer {
  margin: 0 10%;
  background: pink;
  border-radius: 10px;
  height: 300px;
}
</style>