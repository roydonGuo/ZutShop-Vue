<template>
  <div class="purchase-contrainer">

    <el-steps :active="active" finish-status="success" simple style="margin:20px 0;background:#88821">
      <el-step title="选择收货地址" icon="el-icon-loading"></el-step>
      <el-step title="在线支付" icon="el-icon-loading"></el-step>
      <el-step title="付款成功"></el-step>
    </el-steps>

    <CreateOrder v-if="active === 0" :active="active" :goods="goodsSelected" @addressSelected="getOrderCreate">
    </CreateOrder>
    <Pay v-if="active === 1" :active="active"></Pay>
    <PaySuccess v-if="active === 2" :active="active"></PaySuccess>

    <div style="text-align:center;padding:20px 10%">

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
      goodsSelected: [],
      orderCreate: {},
      order: {},
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
    getOrderCreate(val) {
      // console.log(val);
      this.orderCreate = val;
      console.log(this.orderCreate);
    },

    next() {
      this.active += 1;
      if (this.active == 1) {
        //创建订单
        this.request.post("/order/create", this.orderCreate).then((res) => {
          if (res.code === 200) {
            this.order = res.data
            this.$message.success("请确保安全支付环境");
          } else {
            this.$message.error(res.msg)
          }
        })
      }
      if (this.active == 2) {
        //选择支付方式后前往支付,参数描述：{subject：商品名/other；tranceNo：订单号；totalAmount：总价}
        window.open(`http://localhost:7778/alipay/pay?subject=${this.order.phone}&traceNo=${this.order.oid}&totalAmount=${this.order.price}`)
      }
      if (this.active > 2) {
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