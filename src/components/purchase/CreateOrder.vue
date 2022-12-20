<template>
  <div class="create-order-contrainer">
    <div>
      <h2>选择收货地址：</h2>
      <el-select v-model="selectAddressData" placeholder="请选择收货地址" @change="handleIsopenSelect" clearable
        style="margin:0 10%;width:80%">
        <el-option v-for="item in addressData" :key="item.aid" :value="item.aid"
          :label="item.name + '--' + item.tag + '--' + item.district + '--' + item.address">
          <span style="float: left">{{ item.district + '--' + item.address }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
          <span style="float: right; color: blue; font-size: 13px">{{ "[" + item.tag + "]" }}</span>
          <span v-if="item.isDefault == 1" style="float: right; color: orange; font-size: 13px">默认：</span>
        </el-option>
      </el-select>
    </div>
    <!-- 订单商品信息 -->
    <el-card class="box-card" style="margin: 20px 0;background:gold">
      <div slot="header" class="clearfix orderInfo">
        <strong>订单商品信息</strong>
      </div>
      <div>
        <el-table :data="goods" stripe border :summary-method="getTotalPrice" show-summary>
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
    </el-card>
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
      addressId: 0,
      orderCreate: {},//待生成的订单
      selectAddressData: "",
      totalPrice: 0,
    }
  },
  created() {
    this.getAddressData()
  },
  mounted() {

  },
  methods: {
    getTotalPrice(param) {
      const { columns, data } = param;
      // console.log(data);
      const sums = [];
      columns.forEach((index) => {
        const values = data.map((item) =>
          Number(item.num * Number(item.goods.price))
        );
        const total = values.reduce((prev, curr) => {
          return prev + curr;
        });
        sums[0] = "订单总金额";
        sums[4] = "￥" + total;
        this.totalPrice = total
        // console.log(this.goods);
        // console.log(this.totalPrice);
      });
      this.orderCreate.price = this.totalPrice
      this.orderCreate.cartList = this.goods
      // console.log(this.orderCreate);
      this.$emit("addressSelected", this.orderCreate)
      return sums;
    },
    handleIsopenSelect(aid) {
      this.addressId = aid
      this.orderCreate.aid = this.addressId
      // console.log(this.orderCreate);
      this.$emit("addressSelected", this.orderCreate)
    },
    getAddressData() {
      this.request.get("/address/list").then((res) => {
        this.addressData = res.data;
        console.log(this.addressData);
        //过滤出默认地址
        this.selectAddressData = "[默认]" + res.data[0].name + '--' + res.data[0].tag + '--' + res.data[0].district + '--' + res.data[0].address
        this.addressId = res.data[0].aid
        this.orderCreate.aid = this.addressId
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