<template>
  <div class="create-order-contrainer">
    <div>
      <h2>选择收货地址：</h2>
      <!-- <el-select v-model="selectAddressData" placeholder="请选择收货地址" @change="handleIsopenSelect" clearable
        style="margin:0 10%;width:80%">
        <el-option v-for="item in addressData" :key="item.aid" :value="JSON.stringify(item)"
          :label="selectAddressData">
          <span style="float: left">{{ item.district + '--' + item.address }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
          <span style="float: right; color: blue; font-size: 13px">{{ "[" + item.tag + "]" }}</span>
          <span v-if="item.isDefault == 1" style="float: right; color: orange; font-size: 13px">默认：</span>
        </el-option>
      </el-select> -->
    </div>
    <!-- 订单商品信息 -->
    <!-- <el-card class="box-card" style="margin: 20px 0;background:gold">
      <div slot="header" class="clearfix orderInfo">
        <strong>订单商品信息</strong>
      </div>
      <div>
        <el-table :data="goods" stripe border>
          <el-table-column label="" width="120" align="center">
            <template slot-scope="scope">
              <img style="width: 100%; height: 100%" :src="scope.row.goods.image" alt="图片加载失败" />
            </template>
          </el-table-column>
          <el-table-column label="商品" align="center" prop="goods.title"></el-table-column>
          <el-table-column label="单价" width="100" align="center" prop="goods.price">
          </el-table-column>
          <el-table-column label="数量" width="50" align="center" prop="num"></el-table-column>
          <el-table-column label="金额" width="150" align="center">
            <template slot-scope="scope">
              <strong>{{ "￥" + scope.row.goods.price * scope.row.num }}</strong>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card> -->

  </div>
</template>

<script>
export default {
  name: "CreateOrder",
  props: {
    active: {
      required: true,
      type: Number,
      default: 0,
    },
    goods: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      addressData: [],
      orderCreate: {},//待生成的订单
      selectAddressData: {},
    }
  },
  created() {
    this.getAddressData()

    // console.log(this.goods);
    // if (this.goods.goods == undefined) {
    //   this.$message.error("没有选购商品，请前往购物车")
    // }
  },
  methods: {
    handleIsopenSelect() {
      this.orderCreate.address = JSON.parse(this.selectAddressData)
      console.log(this.orderCreate.address);
      this.$forceUpdate()
    },
    getAddressData() {
      this.request
        .get("/address/list")
        .then((res) => {
          this.addressData = res.data;
          //过滤出默认地址
          // const defaultAddress = res.data.filter(address => address.isDefault === 1)
          this.selectAddressData = res.data[0]
          this.orderCreate.address = this.selectAddressData
          // this.$forceUpdate()
          console.log(this.selectAddressData);
        });
    }
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