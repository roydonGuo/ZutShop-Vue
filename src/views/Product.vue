<template>
  <div class="product-container">
    <!-- 商品预览图位置 -->
    <div class="image-list">
      <div class="img-big" style="display: block; width: 100%;object-fit: cover;">
        <img :src="bigImage">
      </div>
      <div class="small-img-list">
        <div class="img-small" v-for="i in imageList" :key="i.index">
          <img :src="i.url" class="img-responsive" @click="showSmallImage(i.index)">
        </div>
      </div>
    </div>
    <!-- 商品内容介绍 -->
    <div class="good-detail">
      <h1 style="margin:10px">戴尔Dell 燃700R1605银色</h1>
      <p style="padding:0 10px"><small>仅上海，广州，沈阳仓有货！预购从速！</small></p>
      <div class="price-bar" style="padding:10px 2%">
        <small>学员售价：</small><strong style="color:red">¥ 4899.00</strong>
        <div><small>*退货补运费 *7天无理由退货 *24小时快速退款 </small></div>
      </div>
      <div style="padding:10px 10%;line-height: 2;">
        <Counter :count="goods_num" :cid="gid"></Counter>
        <p><small><b>学子商城</b>发货并提供售后服务,今日下单,明日送达</small></p>
      </div>
      <div class="btn-primary">
        <el-button type="primary" style="width:100%;font-size: 18px;font-weight: 600;">立即购买</el-button>
      </div>
      <div class="good-btn">
        <el-button icon="el-icon-star-off">加入收藏</el-button>
        <el-button icon="el-icon-shopping-cart-full">加购物车</el-button>
      </div>

    </div>
    <!-- 介绍 -->
    <div style="width:100%;float:left">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h2 class="panel-title">售后保障</h2>
        </div>
        <div class="panel-body ">
          <div class="row">
            <div class="saled-title"><i class="el-icon-trophy"></i>正品保障</div>
          </div>
          <div class="row">
            <p>学子商城向您保证所售商品均为正品行货，学子商城自营商品开具机打发票或电子发票。</p>
          </div>
          <div class="row">
            <div class="col-md-1 saled-icon"><span class="fa fa-wrench"></span></div>
            <div class="saled-title"><i class="el-icon-s-shop"></i>厂家服务</div>
          </div>
          <div class="row">
            <p>本产品全国联保，享受三包服务，质保期为：二年质保</p>
          </div>
          <div class="row">
            <div class="saled-title"><i class="el-icon-s-custom"></i>郑重承诺</div>
          </div>
          <div class="row">
            <p>学子商城销售并发货的商品，由学子商城提供发票和相应的售后服务。请您放心购买！
              <br>
              注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
            </p>
          </div>
          <div class="row">
            <div class="saled-title"><i class="el-icon-map-location"></i>全国联保</div>
          </div>
          <div class="row">
            <p>
              凭质保证书及学子商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由学子商城联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。学子商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！
              <br>
              注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
            </p>
          </div>
          <div class="row">
            <div class="saled-title"><i class="el-icon-truck"></i>无忧退货</div>
          </div>
          <div class="row">
            <p>
              客户购买学子商城商品7日内（含7日，自客户收到商品之日起计算），在保证商品完好的前提下，可无理由退货。（部分商品除外，详情请见各商品细则）</p>
          </div>
          <div class="saled-content">
            <small><b>权利声明：</b><br>
              所有商品信息、商品咨询等内容，是学子商城重要的经营资源，未经许可，禁止非法转载使用。<br>
              注：本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。</small>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import bus from "@/components/eventBus.js";
import Counter from "@/components/cart/Counter.vue"
export default {
  name: "Product",
  data() {
    return {
      goods_num: 1,
      gid: 0,
      bigImage: "",
      imageList: [
        { index: 0, url: "https://img1.imgtp.com/2022/12/17/FXPZJmn6.png" },
        { index: 1, url: "https://img1.imgtp.com/2022/12/17/DvE7I2Yp.png" },
        { index: 2, url: "https://img1.imgtp.com/2022/12/17/ypDhxKRf.png" },
        { index: 3, url: "https://img1.imgtp.com/2022/12/17/nVtUHZgE.png" },
        { index: 4, url: "https://img1.imgtp.com/2022/12/17/Y5FRtzgY.png" },
      ]
    };
  },

  created() {
    this.bigImage = this.imageList[0].url
    bus.$on("share", (obj) => {
      this.goods_num = obj.num
    })
  },
  methods: {
    showSmallImage(index) {
      // console.log(index);
      this.bigImage = this.imageList[index].url
    }

  },
  components: {
    Counter,
  },
};
</script>

<style scoped>
.panel {
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}

.panel-default>.panel-heading {
  color: #333;
  background-color: #f5f5f5;
  /* border-color: #ddd; */
}

.panel-heading {
  padding: 10px 20px;
  /* border-bottom: 1px solid transparent; */
  /* border-top-left-radius: 3px;
  border-top-right-radius: 3px; */
}

.panel-body {
  padding: 20px;
}

.saled-title {
  color: #092F97;
  margin: 10px;
  font-size: 18px;
}

.saled-title>i {
  font-size: 30px;
  margin: 0 10px 0 0;
}

.row {
  margin: 20px 0;
}
.row>p{
padding: 0 50px;}

.price-bar {
  background: #ddeffb;
  color: #092f97;
  border: 3px solid #699fd7;
  border-radius: 6px;
  font-size: 30px;
  margin: 5px;
}

.btn-primary {
  padding: 10px 10%;
  width: 100%;
}

.btn-primary .btn-goumai {
  width: 100%;
  color: #fff;
  /* background-color: #428bca;
  border-color: #357ebd; */
  text-align: center;
  display: inline-block;
  cursor: pointer;
}

.good-btn {
  position: absolute;
  bottom: 5%;
  font-size: 16px !important;
  width: 100%;
  padding: 0 10px;
  text-align: center;
}

.good-detail {
  height: 430px;
  width: 50%;
  position: relative;
  /* background: green; */
  float: right;
}

.product-container {
  margin: 0 10%;
  padding: 0 10%;
  box-sizing: border-box;
  /* background: pink; */
  /* height: 500px; */
  border-radius: 10px;
}

.image-list {
  width: 50%;
  float: left;
  height: 430px;
  /* float: left; */
  /* background: blue; */
}

.img-big {
  padding: 0 10%;
  position: relative;
  width: 200px;
  height: 320px;
}

.img-big>img {
  position: absolute;
  border: 2px solid #888;
  border-radius: 6px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 320px;
  width: 400px;
  object-fit: cover;
}

.small-img-list {
  padding: 10px 10px;
  /* background: red; */
  width: 100%;
  height: 120px
}

.img-small {
  /* border: 3% solid #888; */
  position: relative;
  margin: 1%;
  float: left;
  width: 18%;
  cursor: pointer;
  height: 80px;
  /* vertical-align: middle; */
}

.img-small :hover {
  box-shadow: 0 0 8px #888;
}

.img-responsive {
  position: absolute;
  border: 2px solid #888;
  border-radius: 6px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80px;
  width: 80px;
  object-fit: cover;
}
</style>
