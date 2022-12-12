<template>
  <div style="margin: 0 10%">
    <!-- 商品详情 -->
    <div style="margin: 0 0 20px">
      <h2 style="padding: 10px; background: #409eff; border-radius: 10px">
        商品详情
      </h2>
      <div class="">
        <el-card class="box-card">
          <div slot="header" class="clearfix orderInfo">
            <span>订单号：</span><strong>{{ orderItem.oid }}</strong>
            <span>下单时间：</span><strong>{{ orderItem.createdTime }}</strong>
            <span>收货人：</span><strong>{{ orderItem.oid }}</strong>
          </div>
          <div>
            <table
              style="width: 100%; border-radius: 10px; border: 2px solid black"
            >
              <thead style="border-bottom: 1px solid black">
                <tr>
                  <th></th>
                  <th>商品</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>小计</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width: 15%; padding: 10px">
                    <img style="border-radius: 10px" :src="orderItem.image" />
                  </td>
                  <td style="width: 50%">
                    <a href="#"
                      ><h3>{{ orderItem.title }}</h3></a
                    >
                  </td>
                  <td>
                    <h3>{{ "￥" + orderItem.price }}</h3>
                  </td>
                  <td>
                    <h3>{{ orderItem.num }}</h3>
                  </td>
                  <td>
                    <h3>{{ "￥" + orderItem.price * orderItem.num }}</h3>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <el-table :data="orderItem" stripe border>
              <el-table-column label="" width="180">
                <template slot-scope="scope">
                  <img
                    style="width: 100%; height: 100%"
                    :src="scope.row.image"
                    alt="图片加载失败"
                  />
                </template>
              </el-table-column>
              <el-table-column label="商品" prop="title">{{orderItem.title}}</el-table-column>
              <el-table-column label="单价" width="100" prop="price">
              </el-table-column>
              <el-table-column
                label="数量"
                width="50"
                prop="num"
              ></el-table-column>
              <el-table-column label="小计" width="150"
                ><template slot-scope="scope">
                  <strong>{{
                    "￥" + scope.row.price * scope.row.num
                  }}</strong></template
                ></el-table-column
              >
            </el-table> -->
          </div>
        </el-card>
      </div>
    </div>
    <!-- 订单详情 -->
    <div>
      <h2>订单详情</h2>
      <div class="box-card clearfix orderInfo" style="padding: 20px">
        <h3 style="color: #409eff">
          1.提交订单 2018-12-2 20:32:17<i class="el-icon-circle-check"></i>
        </h3>
        <h3 style="color: #409eff">
          2.付款成功 2018-12-2 20:35:03<i class="el-icon-circle-check"></i>
        </h3>
        <h3 style="color: #409eff">
          3.商城发货 2018-12-3 08:13:34<i class="el-icon-circle-check"></i>
        </h3>
        <h3 style="color: #d3dce6">4.用户收货</h3>
        <h3 style="color: #d3dce6">5.购物评价</h3>
      </div>
    </div>
    <!-- 收货详情 -->
    <div style="margin: 0 0 20px">
      <h2>收货详情</h2>
      <div
        slot="header"
        class="box-card clearfix orderInfo"
        style="padding: 20px"
      >
        <span>收货人姓名：</span><strong>roydon</strong> <span>联系电话：</span
        ><strong>1820***8745</strong> <span>邮政编码：</span
        ><strong>476600</strong> <span>收货地址：</span
        ><strong>{{ order.address }}</strong>
      </div>
    </div>
    <!--  物流信息 -->
    <div>
      <h2>物流信息</h2>
      <div class="box-card clearfix orderInfo" style="padding: 20px">
        <div><span>发货时间：</span><strong>2018-12-3 08:13:34</strong></div>
        <div><span>物流公司：</span><strong>顺丰快递</strong></div>
        <div><span>快递单号：</span><strong>301111303203048</strong></div>
        <div>
          <h3>物流详情:</h3>
          <div>
            <p>2018-12-3 08:13:34 您的快递在【北京国贸分拣中心】分拣完毕</p>
            <p>2018-12-3 08:39:50 您的快递在【北京国贸分拣中心】准备装车</p>
            <p>2018-12-3 12:20:07 您的快递到达【北京中关村分拣中心】</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderInfo",

  data() {
    return {
      orderItem: {},
      order: {},
    };
  },
  created() {
    // this.orderItem = this.$route.query.order;
    this.orderItem = localStorage.getItem("toOrderInfo")
      ? JSON.parse(localStorage.getItem("toOrderInfo"))
      : null;
    this.getOrderByOid();
  },
  mounted() {},
  methods: {
    async getOrderByOid() {
      if (this.orderItem.oid) {
        this.order = (
          await this.request.get("/order/" + this.orderItem.oid)
        ).data;
        if (this.order) {
          console.log(this.order);
        } else {
          this.$message.error("发生未知错误");
        }
      }
    },
  },
};
</script>

<style scoped>
.box-card {
  background: rgb(255, 255, 255);
  border-radius: 10px;
}
.orderInfo > span {
  display: inline-block;
  font-size: 16px;
  font-weight: 300;
  /* color: wheat; */
}
.orderInfo > span:nth-child(n + 2) {
  padding: 0 0 0 10px;
}
.orderInfo > strong {
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
}
tbody > tr > td h3 {
  text-align: center;
}
div h2 {
  padding: 10px;
  background: #409eff;
  border-radius: 10px;
}
</style>
