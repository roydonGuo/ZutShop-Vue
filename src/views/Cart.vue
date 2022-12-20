<template>
  <div style="margin: 0 20%;">

    <h2><i class="el-icon-shopping-cart-full"> </i>购物车</h2>
    <Operate :isFull="operateState" @isAll="allSelect" :amt="amt" :total="total" :goodsSelected="goodsSelected">
    </Operate>
    <div class="box-card clearfix" style="padding: 20px">

      <Good v-for="c in cartData" :key="c.cid" :cid="c.cid" :goods_num="c.num" :goods_image="c.goods.image"
        :goods_title="c.goods.title" :goods_price="c.goods.price" :goods_state="c.state" @state-changed="getNowState"
        @has-cart-delete="getNowCart">
      </Good>

    </div>
  </div>
</template>

<script>
import bus from "@/components/eventBus.js";
import Good from "@/components/cart/Good.vue";
import Operate from "@/components/cart/Operate.vue";
export default {
  name: "Cart",
  data() {
    return {
      user: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
      cartData: [],
    };
  },
  components: {
    Good, Operate
  },
  created() {
    this.getUserCart();
    bus.$on("share", (obj) => {
      this.cartData.some((item) => {
        if (item.cid === obj.cid) {
          item.num = obj.num;
          // console.log(item);
          this.request.post("/cart/add", item).then((res) => {
            if (res.code === 200) {
              // console.log(this.cartData);
            } else {
              this.$message.error("获取购物车失败")
            }
          });
          return true;
        }
      });

    })
  },
  computed: {
    operateState() {
      return this.cartData.every((item) => item.state);
    },
    // 已勾选商品的总价值
    amt() {
      return this.cartData
        .filter((item) => item.state)
        .reduce(
          (total, item) => (total += item.goods.price * item.num),
          0
        );
    },
    //哪些商品被勾选了，是数组[100021,100025,...]
    goodsSelected() {
      return this.cartData
        .filter((item) => item.state)
    },
    total() {
      return this.cartData
        .filter((item) => item.state)
        .reduce((total, item) => (total += item.num), 0);
    },
  },
  methods: {
    async getUserCart() {
      await this.request.get("/cart/list", {
        params: {
          uid: this.user.uid
        },
      }).then((res) => {
        if (res.code === 200) {
          res.data.forEach((c) => {
            //挂载状态数据
            c.state = false;
          })
          this.cartData = res.data;
          // console.log(this.cartData);
        } else {
          this.$message.error("获取购物车失败")
        }
      });
    },
    getNowState(obj) {
      // obj 就是子组件传来的新状态 {id: 1, state: false}...
      // console.log(obj);
      this.cartData.some((item) => {
        if (item.cid == obj.cid) {
          item.state = obj.state;
          // 终止后续不必要的循环
          return true;
        }
      });
    },
    getNowCart(obj) {
      // console.log(obj);
      //遍历剔除被删除的数据
      this.getUserCart();
      // this.cartData.filter((item) => {
      //   return item.cid != obj.cid;
      // });
    },
    allSelect(e) {
      // console.log(e);
      this.cartData.forEach((item) => {
        item.state = e;
      });
      // console.log(this.cartData);
    },
  },
  updated() {

  },
};
</script>

<style scoped>
.box-card {
  background: rgba(185, 187, 255, 0.623);
  border-radius: 10px;
}

tbody>tr>td h3 {
  text-align: center;
}

div h2 {
  padding: 10px;
  background: #409eff;
  border-radius: 10px;
}

.el-table--border {
  border-radius: 10px;
}

/* .number-box {
  text-align: center;
  display: inline-block;
  line-height: inherit;
  margin: 6px;
  height: 24px;
  border: 1px solid black;
} */

.btn-sm {
  cursor: pointer;
  line-height: inherit;
  margin: 6px;
  -webkit-appearance: button;
  height: 24px;
  width: 24px;
}
</style>
