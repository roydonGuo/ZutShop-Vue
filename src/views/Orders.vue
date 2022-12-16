<template>
  <div style="margin: 0 10%">
    <div v-for="o in orderData" :key="o.oid" class="text item">
      <!-- {{'列表内容 ' + o }} -->
      <el-card class="box-card" style="margin: 20px 0">
        <div slot="header" class="clearfix orderInfo">
          <span>订单号：</span><strong>{{ o.oid }}</strong>
          <span>下单时间：</span><strong>{{ o.orderTime }}</strong>
          <span>收货人：</span><strong>{{ o.name }}</strong>
          <strong style="float: right">{{ "￥" + o.totalPrice }}</strong
          ><span style="float: right">订单总金额：</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div>
          <!-- {{ "列表内容 " + o }}----订单中商品列表 -->
          <!-- 商品	单价	数量	小计	售后	状态	操作 -->
          <el-table
            :data="o.orderItemList"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            default-expand-all
            :summary-method="getTotalPrice"
            show-summary
            stripe
            border
          >
            <el-table-column label="" width="180">
              <template slot-scope="scope">
                <img
                  style="width: 100%; height: 100%"
                  :src="scope.row.image"
                  alt="图片加载失败"
                />
              </template>
            </el-table-column>
            <el-table-column label="商品" prop="title"></el-table-column>
            <el-table-column label="单价" width="100" prop="price">
              <!-- <template slot-scope="scope">
                <strong>{{ "￥" + scope.row.price }}</strong></template
              > -->
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
            <el-table-column label="售后" width="100">
              <a href="#"
                ><el-button size="mini" type="success" round
                  >申请售后</el-button
                ></a
              >
            </el-table-column>
            <el-table-column label="状态" width="100">
              <div>已发货</div>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  class="mr-5"
                  round
                  @click="toOrderInfo(scope.row)"
                  >订单详情</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  @click="sureReceive(scope.row)"
                  >确认收货<i class="el-icon-circle-check"></i
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <div style="padding: 10px 0; display: inline-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      orderData: {},
      orderItemData: {},
      // totalPrice: 0,
      pageNum: 1,
      pageSize: 2,
      total: 0,
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getTotalPrice(param) {
      const { columns, data } = param;
      // console.log(param);
      const sums = [];
      columns.forEach((index) => {
        const values = data.map((item) =>
          Number(item.num * Number(item.price))
        );
        const total = values.reduce((prev, curr) => {
          return prev + curr;
        });
        sums[6] = "订单总金额";
        sums[7] = "￥" + total;
        // this.orderData[index].totalPrice = total
        // console.log(this.orderData);
      });
      return sums;
    },
    getOrderList() {
      this.request
        .get("/order/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            // console.log(res.data.data);
            this.orderData = res.data.data.records;
            this.total = parseInt(res.data.data.total);
            localStorage.setItem("_oNum", Number(this.total));
          }
        });
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getOrderList();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getOrderList();
    },
    toOrderInfo(row) {
      localStorage.setItem("toOrderInfo", JSON.stringify(row));
      // console.log(row);
      this.$router.push({
        path: "/orderInfo",
        query: {
          order: row,
        },
      });
    },
    sureReceive(row) {},
  },
};
</script>

<style scoped>
.el-table {
  border-radius: 10px;
}
.el-table thead {
  color: black !important;
  font-weight: 900 !important;
}

.el-dialog {
  border-radius: 10px !important;
}
.box-card {
  background: gold;
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
</style>
