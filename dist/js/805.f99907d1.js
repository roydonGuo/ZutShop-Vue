"use strict";(self["webpackChunkzut_shop"]=self["webpackChunkzut_shop"]||[]).push([[805],{9805:function(t,e,s){s.r(e),s.d(e,{default:function(){return g}});var a=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"content clearfix",staticStyle:{margin:"0 10%","box-sizing":"border-box"}},t._l(t.goodsData,(function(s){return e("div",{key:s.gid,staticClass:"good-item"},[e("router-link",{attrs:{to:"/product/"+s.gid}},[e("div",{staticClass:"img-cover"},[e("img",{attrs:{src:s.image,alt:"获取图片源失败"}})])]),e("h4",[t._v(t._s("￥"+s.price))]),e("div",{staticClass:"good-detail"},[e("router-link",{attrs:{to:"/product/"+s.gid}},[e("h4",[t._v(t._s(s.title))])])],1),e("div",{staticClass:"good-btn"},[e("el-button",{attrs:{size:"mini",icon:"el-icon-star-off"}},[t._v("加入收藏")]),e("el-button",{attrs:{size:"mini",icon:"el-icon-shopping-cart-full"},on:{click:function(e){return t.addCart(s.gid)}}},[t._v("加购物车")])],1)],1)})),0),e("div",{staticStyle:{margin:"20px 10%",padding:"10px","text-align":"center"}},[e("el-pagination",{attrs:{"current-page":t.pageNum,"page-sizes":[12],"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)])},i=[],o={name:"Goods",props:{},data(){return{pageNum:1,pageSize:12,total:0,title:"",goodsData:{}}},created(){"favorites"===this.$route.query.type?this.getFavoriteGoods():this.$route.query.title?(this.title=this.$route.query.title,console.log(this.title),this.getGoods()):this.getGoods()},mounted(){},updated(){},methods:{addCart(t){console.log(t);const e={};e.gid=t,e.num=1,console.log(e),this.request.post("/cart/add",e).then((t=>{200===t.code?this.$message.success("添加成功"):this.$message.error("添加失败")}))},getFavoriteGoods(){this.request.get("/favorites/list",{params:{pageNum:this.pageNum,pageSize:this.pageSize}}).then((t=>{this.goodsData=t.data.records,this.total=Number(t.data.total)}))},getGoods(){this.request.get("/goods/search",{params:{pageNum:this.pageNum,pageSize:this.pageSize,title:this.title}}).then((t=>{this.goodsData=t.data.records,this.total=Number(t.data.total)}))},handleCurrentChange(t){this.pageNum=t,"favorites"===this.$route.query.type?this.getFavoriteGoods():this.getGoods()}},updated(){}},r=o,n=s(1001),d=(0,n.Z)(r,a,i,!1,null,"00b51436",null),g=d.exports}}]);
//# sourceMappingURL=805.f99907d1.js.map