<template>
  <div class="create-order-contrainer">

    <div>
      <h2>订单完成</h2>

    </div>
    

  </div>
</template>

<script>
export default {
  name: "PaySuccess",
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
  background: #67C23A;
  border-radius: 10px;
  text-align: center;
}
</style>