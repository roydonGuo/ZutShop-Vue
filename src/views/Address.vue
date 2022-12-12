<template>
  <div style="padding: 0 10%">
    <el-table
      :data="addressData"
      border
      stripe
      :header-cell-class-name="headerBg"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column label="地址类型" width="80"
        ><template slot-scope="scope">
          <el-tag>{{ scope.row.tag }}</el-tag>
        </template></el-table-column
      >
      <el-table-column prop="name" label="收货人" width="120"></el-table-column>
      <el-table-column prop="district" label="地址"></el-table-column>
      <el-table-column prop="address" label="详细地址"></el-table-column>
      <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
      <el-table-column align="center" label="默认地址" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isDefault"
            :active-value="1"
            :inactive-value="0"
            @change="changeDefault(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)"
            >编辑 <i class="el-icon-edit"></i
          ></el-button>
          <el-popconfirm
            class="ml-5"
            confirm-button-text="确定"
            cancel-button-text="我再想想"
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="delRow(scope.row.aid)"
          >
            <el-button type="danger" slot="reference"
              >删除 <i class="el-icon-remove-outline"></i>
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- 修改地址的dialog -->
    <el-dialog title="地址信息" :visible.sync="dialogFormVisible" width="50%">
      <el-form label-width="100px" size="small">
        <el-form-item label="收货人">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="form.zip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-cascader
            size="large"
            placeholder="试试搜索：河南"
            filterable
            separator="--"
            :options="options"
            v-model="selectedOptions"
            @change="addressChoose"
            :props="{ expandTrigger: 'hover' }"
          >
          </el-cascader
        ></el-form-item>
        <el-form-item label="详细地址">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址类型">
          <el-input v-model="form.tag" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增地址的dialog -->
    <el-dialog
      title="新增地址："
      :visible.sync="addDialogFormVisible"
      width="50%"
    >
      <el-form
        :model="form"
        label-width="100px"
        size="small"
        :rules="rules"
        ref="addressForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="收货人" prop="name">
              <el-input v-model="form.name" autocomplete="off"> </el-input>
            </el-form-item> </el-col
          ><el-col :span="12"
            ><el-form-item label="手机" prop="phone">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item> </el-col
        ></el-row>
        <el-row>
          <el-form-item label="收货地址">
            <el-cascader
              size="large"
              placeholder="试试搜索：河南"
              filterable
              separator="--"
              :options="options"
              v-model="selectedOptions"
              @change="addressChoose"
              :props="{ expandTrigger: 'hover' }"
            >
            </el-cascader
          ></el-form-item>
          <!-- <el-form-item label="收货地址">
            <el-col :span="8">
              <el-select v-model="district" filterable placeholder="请选择">
                <el-option
                  v-for="item in district"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-col>
            <el-col :span="8">
              <el-select v-model="district.cityList" filterable placeholder="请选择">
                <el-option
                  v-for="item in district.cityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-col>
            <el-col :span="8">
              <el-select v-model="district.cityList.areaList" filterable placeholder="请选择">
                <el-option
                  v-for="item in district.cityList.areaList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option> </el-select
            ></el-col>
          </el-form-item> -->
        </el-row>
        <el-form-item label="邮政编码" prop="zip">
          <el-input v-model="form.zip" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="地址类型">
          <el-input v-model="form.tag" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAddress">确 定</el-button>
      </div>
    </el-dialog>
    <div
      style="
        margin: 0 0 10px;
        padding: 10px 0;
        display: inline-block;
        float: right;
      "
    >
      <el-button type="primary" class="mr-5" @click="handleAdd"
        >新增 <i class="el-icon-circle-plus-outline"></i>
      </el-button>
      <el-popconfirm
        class="mr-5"
        confirm-button-text="确定"
        cancel-button-text="我再想想"
        icon="el-icon-info"
        icon-color="red"
        title="您确定批量删除这些数据吗？"
        @confirm="delBatch"
      >
        <el-button type="danger" slot="reference"
          >批量删除 <i class="el-icon-remove-outline"></i
        ></el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  name: "Address",
  data() {
    return {
      value: true,
      addressData: [],
      pageNum: 1,
      pageSize: 5,
      total: 0,
      form: {},
      dialogFormVisible: false,
      addDialogFormVisible: false,
      multipleSelection: [],
      headerBg: "headerBg",
      fileList: [],
      rules: {
        name: [
          { required: true, message: "请输入收货人", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        zip: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 8 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度为11位数字",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          {
            min: 1,
            max: 60,
            message: "描述过长",
            trigger: "blur",
          },
        ],
      },
      // district: {},
      options: regionData,
      selectedOptions: [],
    };
  },
  created() {
    this.load();
    // this.getCity();
  },
  methods: {
    addressChoose(value) {
      this.form.district =
        CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]];
      // this.selectedOptions.push(CodeToText[value[0]] , CodeToText[value[1]] , CodeToText[value[2]]);
      console.log(this.form.district);
    },
    load() {
      this.request
        .get("/address/page", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          // console.log(res);
          this.addressData = res.data.data.records;
          // console.log(this.addressData);
          this.total = parseInt(res.data.data.total);
        });
    },
    /* 获取省市区选项 */
    // getCity() {
    //   this.request.get("/district/list").then((res) => {
    //     console.log(res);
    //     this.district = res.data;
    //   });
    // },

    reset() {
      this.username = "";
      this.email = "";
      this.address = "";
      this.load();
    },

    handleSizeChange(pageSize) {
      console.log(pageSize);
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum);
      this.pageNum = pageNum;
      this.load();
    },
    handleAdd() {
      this.addDialogFormVisible = true;
      this.form = {};
    },
    update() {
      this.request.post("/address/update", this.form).then((res) => {
        if (res.data) {
          this.$message.success("保存成功");
          this.dialogFormVisible = false;
          this.selectedOptions = {};
          this.load();
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    addAddress() {
      this.$refs["addressForm"].validate((valid) => {
        if (valid) {
          // 表单校验合法
          this.request.post("/address/add", this.form).then((res) => {
            if (res.data) {
              this.$message.success("保存成功");
              this.addDialogFormVisible = false;
              this.selectedOptions = {};
              this.load();
            } else {
              this.$message.error("保存失败");
            }
          });
        }
      });
    },
    changeDefault(row) {
      console.log(row);
      console.log(row.isDefault);
      this.request.post("/address/setDefault", row).then((res) => {
        if (res.data) {
          this.$message.success("保存成功");
          this.addDialogFormVisible = false;
          this.load();
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    handleEdit(row) {
      this.form = { ...row };
      this.dialogFormVisible = true;
    },
    delRow(id) {
      this.request.delete("/address/" + id).then((res) => {
        // console.log(id);
        if (res.data) {
          this.$message.success("删除成功");
          this.load();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    handleSelectionChange(rows) {
      // console.log(rows)
      this.multipleSelection = rows;
    },
    delBatch() {
      let ids = this.multipleSelection.map((row) => row.aid); // [{}, {}, {}] => [1,2,3]
      // console.log(ids)
      this.request
        .delete("/address/del/batch", {
          data: ids,
        })
        .then((res) => {
          if (res.data) {
            this.$message.success("批量删除成功");
            this.pageNum = 1;
            this.load();
          } else {
            this.$message.error("批量删除失败");
          }
        });
    },
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
