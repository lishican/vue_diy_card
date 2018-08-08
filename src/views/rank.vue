<template>
  <div class="rank">
    <Logo/>
    <div class="title">
     
      <div class="rank2"><img src="../assets/pai.png" alt="">排行榜</div>
      <div class="work" @click="seeList"  v-fib="{type:'相册列表',name:'我的作品'}">我的作品</div>
    </div>
    <div class="content">
      <div :class="['item',index==0?'first':'']" v-for="(item,index) in ridingMapList" :key='index' @click='goTheme(item)'>
        <img class="pic" :src="item.coverUrl" alt="">
        <div class="text">
          <div class="top">top{{index+1}}</div>
          <div class="heat">
            <img src="../assets/heart.png" alt="">
            <div class="num">{{item.popularity}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn" @click="doMake" v-fib="{type:'相册列表',name:'我也要制作'}">我也要制作</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "../components/logo";
const axios = require("axios");
const wx = window.wx;
export default {
  data() {
    return {};
  },
  components: {
    Logo
  },
  filters: {},
  computed: {
    ...mapGetters({
      ridingMapList: "ridingMapList"
    })
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    let url = "http://advance.exuniq.com/h5/qx" + to.fullPath;
    console.log(url);
    axios
      .post("http://advance.exuniq.com/common/jsapi", { signurl: url })
      .then(data => {
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.data.appId, // 必填，公众号的唯一标识
          timestamp: data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
          signature: data.data.signature, // 必填，签名，见附录1
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      });
    next();
  },
  methods: {
    seeList() {
      this.$router.replace({
        path: "/list"
      });
    },
    goTheme(item) {
      let styles = {
        themeInfo1: "albume_1",
        themeInfo2: "albume_2",
        themeInfo3: "albume_3"
      };

      this.$router.push({
        path: `/${styles[item.templetId]}?id=${item.id}`
      });
    },
    doMake() {
      this.$router.replace({
        path: "/"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.rank {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efefef;
  .btn {
    margin: 0.4rem auto 0;
    width: 6.12rem;
    font-size: 0.32rem;
  }
  .content {
    margin: 0 auto;
    width: 6.12rem;
    height: 7.9rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow: auto;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.37);
    .item {
      &.first {
        width: 6.12rem;
        height: 4rem;
      }
      overflow: hidden;
      margin-bottom: 0.06rem;
      width: 3rem;
      height: 1.88rem;
      position: relative;
      .pic {
        display: block;
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .text {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.3rem;
        color: #fff;
        padding: 0 0.2rem;
        background: rgba(0, 0, 0, 0.67);
        .heat {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 0.5rem;
          img {
            margin-right: 0.1rem;
            width: 0.3rem;
          }
        }
      }
    }
  }
  .title {
    margin: 1.2rem auto 0;
    width: 6.12rem;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.35rem;
    font-weight: bold;
    color: #3e3a39;
    .work {
      text-decoration: underline;
    }
    .rank2 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      margin-right: 0.2rem;
      width: 0.3rem;
    }
  }
}
</style>
