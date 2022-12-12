<template>
  <div style="padding: 0 10%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单号：</span>
        <span>下单时间：</span>
        <span>收货人：</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        > -->
      </div>
      <div>
        <!-- {{ "列表内容 " + o }}----订单中商品列表 -->
        <!-- 商品	单价	数量	小计	售后	状态	操作 -->
        <el-table :data="orderItemData" stripe>
          <el-table-column label="商品"></el-table-column>
          <el-table-column label="单价" width="100"></el-table-column>
          <el-table-column label="数量" width="100"></el-table-column>
          <el-table-column label="小计"></el-table-column>
          <el-table-column label="售后" width="100">
            <a href="#">申请售后</a>
          </el-table-column>
          <el-table-column label="状态">
            <div>已发货</div>
            <div><a href="/orderInfo">订单详情</a></div>
          </el-table-column>

          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.row)"
                >确认收货<i class="el-icon-circle-check"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <div style="padding: 10px 0; display: inline-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20]"
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
      orderItemData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
    };
  },
  created() {},
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleEdit(row) {},
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
</style>
