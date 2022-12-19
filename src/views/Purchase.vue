<template>
  <div class="purchase-contrainer">

    <el-steps :active="active" finish-status="success" simple style="margin:20px 0;background:#88821">
      <el-step title="选择收货地址" icon="el-icon-loading"></el-step>
      <el-step title="在线支付" icon="el-icon-loading"></el-step>
      <el-step title="付款成功"></el-step>
    </el-steps>

    <CreateOrder v-if="active === 0" :active="active" :goods="goodsSelected"></CreateOrder>
    <Pay v-if="active === 1" :active="active"></Pay>
    <PaySuccess v-if="active === 2" :active="active"></PaySuccess>

    <div style="text-align:center;margin:20px">

      <el-button type="primary" v-if="active === 0" @click="next">确认订单</el-button>
      <el-button type="primary" v-else-if="active === 1" @click="next">确认支付</el-button>
      <router-link v-else to="/orders"><el-button type="success">查看订单</el-button></router-link>

    </div>
  </div>
</template>

<script>
import CreateOrder from '@/components/purchase/CreateOrder.vue';
import Pay from '@/components/purchase/Pay.vue';
import PaySuccess from '@/components/purchase/PaySuccess.vue';
export default {
  name: "Purchase",
  components: { CreateOrder, Pay, PaySuccess },
  data() {
    return {
      active: 0,
      goodsSelected: []
    }
  },
  created() {
    // this.goodsSelected = localStorage.getItem("createOrder") ? JSON.parse(localStorage.getItem("createOrder")) : []
    this.goodsSelected = this.$route.query.goodsSelected;
    // console.log(this.goodsSelected);
  },
  // watch: {
  //   active(newVal, oldVal) {
  //     console.log(newVal + '|' + oldVal);
  //   }
  // },
  methods: {
    next() {
      if (this.active++ > 2) {
        this.active = 0
      }
    }

  },
}
</script>

<style scoped>
.purchase-contrainer {
  margin: 0 10%;
  background: white;
  border-radius: 10px;
  /* height: 500px; */
}

.el-steps--simple {
  padding: 10px 8%;
  border-radius: 10px;
  color: white !important;
  /* background: #409eff; */
}

.el-step__title.is-wait {
  color: #fff !important;
}
</style>