<template>
  <!-- 轮播 -->
  <div>
    <div class="banner">
      <div class="wrapper" style="position: relative">
        <!-- 轮播 -->
        <div class="showImg" style="position: absolute">
          <img @mouseover="changeInterval(true)" @mouseleave="changeInterval(false)" v-for="item in imgArr"
            :key="item.id" :src="item.url" alt="暂无图片" v-show="item.id === currentIndex" />
          <div @click="clickIcon('up')" class="iconDiv icon-left">
            <i class="el-icon-caret-left"></i>
          </div>
          <div @click="clickIcon('down')" class="iconDiv icon-right">
            <i class="el-icon-caret-right"></i>
          </div>
          <div class="banner-circle">
            <ul>
              <li @click="changeImg(item.id)" v-for="item in imgArr" :key="item.id"
                :class="item.id === currentIndex ? 'active' : ''"></li>
            </ul>
          </div>
        </div>
        <div class="left">
          <ul>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">电脑办公<span>&gt;</span></a>
            </li>
          </ul>
        </div>
        <div class="right">
          <h2>我的订单</h2>
          <div class="content">
            <dl>
              <dt>惠普-星15笔记本</dt>
              <dd>正在运输中</dd>
            </dl>
            <dl>
              <dt>惠普-星14笔记本</dt>
              <dd>正在运输中</dd>
            </dl>
            <dl>
              <dt>惠普-星13笔记本</dt>
              <dd>已签收</dd>
            </dl>
          </div>
          <a href="#" class="more">订单详情</a>
        </div>
      </div>
    </div>
    <!-- 商品推荐区域 -->
    <Recommend></Recommend>
  </div>
</template>

<script>
import Recommend from "@/components/Recommend";
export default {
  name: "Main",
  components: { Recommend },
  data() {
    return {
      currentIndex: 0, //当前所在图片下标
      timer: null, //定时轮询
      imgArr: [
        { id: 0, url: "https://img1.imgtp.com/2022/12/15/vB1JSkf3.png" },
        {
          id: 1,
          url: "https://img1.imgtp.com/2022/12/15/YwePgYp7.png",
        },
        {
          id: 2,
          url: "https://img1.imgtp.com/2022/12/15/5fXGJFFs.png",
        },
        {
          id: 3,
          url: "https://img1.imgtp.com/2022/12/15/c27WY8Nz.png",
        },
        {
          id: 4,
          url: "https://img1.imgtp.com/2022/12/15/CoL2GHhV.png",
        },
      ],
    };
  },
  methods: {
    //开启定时器
    startInterval() {
      // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > this.imgArr.length - 1) {
          this.currentIndex = 0;
        }
      }, 3000);
    },
    // 点击左右箭头
    clickIcon(val) {
      if (val === "down") {
        this.currentIndex++;
        if (this.currentIndex === this.imgArr.length) {
          this.currentIndex = 0;
        }
      } else {
        /* 第一种写法
          this.currentIndex--;
          if(this.currentIndex < 0){
            this.currentIndex = this.imgArr.length-1;
          } */
        // 第二种写法
        if (this.currentIndex === 0) {
          this.currentIndex = this.imgArr.length;
        }
        this.currentIndex--;
      }
    },
    // 点击控制圆点
    changeImg(index) {
      this.currentIndex = index;
    },
    //鼠标移入移出控制
    changeInterval(val) {
      if (val) {
        clearInterval(this.timer);
      } else {
        this.startInterval();
      }
    },
  },
  //进入页面后启动定时轮询
  mounted() {
    this.startInterval();
  },
};
</script>
<style scoped>
/* 清除li前面的圆点 */
li {
  list-style-type: none;
}

.showImg {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 轮播图片 */
.showImg img {
  width: 100%;
  height: 100%;
}

/* 箭头图标 */
.iconDiv {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: 1px solid rgba(200, 199, 199, 0.604);
  border-radius: 15px;
  background-color: rgba(206, 198, 198, 0.2);
  line-height: 30px;
  text-align: center;
  font-size: 25px;
  cursor: pointer;
}

.iconDiv:hover {
  background-color: rgb(145, 211, 255);
}

.icon-left {
  left: 15%;
}

.icon-right {
  right: 15%;
}

/* 控制圆点 */
.banner-circle {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
}

.banner-circle ul {
  margin: 0 30%;
  height: 100%;
  text-align: center;
}

.banner-circle ul li {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 6px;
  background-color: rgba(125, 125, 125, 0.8);
  cursor: pointer;
}

.active {
  background-color: rgb(65, 135, 246) !important;
}
</style>