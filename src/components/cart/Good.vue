<template>
  <div class="goods-container">
    <!-- 左侧图片 -->
    <div class="thumb">
      <div class="custom-control custom-checkbox">
        <!-- 复选框 -->
        <input type="checkbox" class="custom-control-input" :id="'cb' + cid" :checked="goods_state"
          @change="stateChanged" />
        <label class="custom-control-label" :for="'cb' + cid">
          <!-- 商品的缩略图 -->
          <img :src="goods_image" alt="..." />
        </label>
      </div>
    </div>
    <!-- 右侧信息区域 -->
    <div class="goods-info">
      <!-- 商品标题 -->
      <h3 class="goods-title">{{ goods_title }}</h3>
      <div class="goods-info-bottom">
        <!-- 商品价格 -->
        <span class="goods-price">单价：￥{{ goods_price.toFixed(2) }}</span>
        <!-- 商品的数量 -->
        <Counter :count="goods_num" :cid="cid"></Counter>
      </div>
    </div>
    <!-- 删除操作 -->
    <div>
      <el-popconfirm class="ml-5" confirm-button-text="确定" cancel-button-text="我再想想" icon="el-icon-info"
        icon-color="red" title="您确定删除吗？" @confirm="removeGood">
        <el-button type="info" style="mini" circle slot="reference" icon="el-icon-delete">
        </el-button>
      </el-popconfirm>
      <!-- <el-button type="info" icon="el-icon-delete" circle @click="removeGood"></el-button> -->
    </div>
  </div>
</template>

<script>
import Counter from "@/components/cart/Counter.vue";

export default {
  props: {
    cid: {
      required: true,
      type: Number,
    },
    goods_num: {
      default: 1,
      type: Number,
    },
    goods_image: {
      default: "",
      type: String,
    },
    goods_title: {
      default: "",
      type: String,
    },
    goods_price: {
      default: "",
      type: Number,
    },
    goods_state: {
      default: true,
      type: Boolean,
    },

  },
  methods: {
    stateChanged(e) {
      const nowState = e.target.checked;
      this.$emit("state-changed", { cid: this.cid, state: nowState });
    },
    removeGood() {
      // console.log(this.cid);
      const removeCid = this.cid
      this.request.delete("/cart/" + this.cid).then((res) => {
        // console.log(id);
        if (res.data) {
          this.$message.success("删除成功");
          // window.location.reload();
          //删除成功后告诉父组件数据减少了
          this.$emit("has-cart-delete", { cid: removeCid });
        } else {
          this.$message.error("删除失败");
        }
      });
    }
  },
  components: {
    Counter,
  },
};
</script>

<style  scoped>
.goods-container {
  /* border-top: 1px solid #efefef; */
  background: white;
  border-radius: 10px;
  margin: 0 0 10px;
  padding: 10px;
  display: flex;
}

.goods-container .thumb .custom-control {
  display: flex;
  align-items: center;
}

.goods-container .thumb label {
  display: inline-block;
}

.goods-container .thumb img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  margin: 0 10px;
}


.goods-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 10px;
}

.goods-info-bottom {
  display: flex;
  justify-content: space-between;
}

.goods-price {
  font-weight: bold;
  color: red;
  font-size: 14px;
}
</style>
