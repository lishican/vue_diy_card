<template>
  <div class="home">
    <div class="logo1">
      <img src="../assets/shell logo.png" alt="">
    </div>
    <div class="logo2">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="banner">
      <div class="inn" v-show='isPlay'>
        <video playsinline preload ref='v12' src="http://ofvbasfrz.bkt.clouddn.com/51239b1c-dff2-4038-af3c-16f9702a3e8f"></video>
      </div>
      <div class="img" v-show='!isPlay'>
        <div class="play" @click='doPlay'> <img src="../assets/play.png" alt=""></div>
        <img class="am" src="http://ofvbasfrz.bkt.clouddn.com/20180803060039_aaa.png" alt="">
      </div>
    </div>
    <div class="t1">
      拒绝跟风<br>名副“骑”实
    </div>
    <div class="t2">
      有人说，爱上摩旅便是大地之子<br> 因为深知
      <br> 风光无限，亲眼所见才现旖旎
      <br> 路况多样，亲身体验方知精彩
      <br> 你踏过中国大江南北，见尽世间繁华
      <br> 哪一段旅程最让你铭心刻骨？
      <br>
    </div>
    <div class="btng">
      <div class="btn b1" @click='choseLine' v-fib="{type:'首页',name:'选择路线'}">选择路线</div>
      <div class="btn" @click='seeOther' v-fib="{type:'首页',name:'排行榜'}">排行榜</div>
      <div class="btn c2" @click="knowMore" v-fib="{type:'首页',name:'了解更多'}">了解更多</div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import Rule from "../components/rules";
const axios = require("axios");
const wx = window.wx;
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      isPlay: false,
      playTimer: null
    };
  },
  components: {
    Rule
  },
  filters: {},
  computed: {
    ...mapGetters({})
  },
  beforeRouteLeave(to, from, next) {
    let url = "http://advance.exuniq.com/h5/qx" + to.fullPath;
    console.log(url);
    axios
      .post("http://advance.exuniq.com/common/jsapi", {
        signurl: url
      })
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
  mounted() {},
  destroyed() {
    this.playTimer && clearInterval(this.playTimer);
    this.isPlay = false;
    this.$refs["v12"].pause();
    this.$refs["v12"].currentTime = 0;
    setTimeout(() => {
      this.$player.autoPlay(
        "http://ofvbasfrz.bkt.clouddn.com/825a005c-92c1-478a-ab57-162a82587ece"
      );
      wx.ready(function() {
        document.getElementById("mainMp3").play();
      });
    }, 200);
  },
  methods: {
    doPlay() {
      if (this.isPlay) {
        return false;
      }
      document.getElementById("mainMp3").pause();
      document.getElementById("main2Mp3").pause();
      this.isPlay = true;
      this.$refs["v12"].play();
      this.playTimer = setInterval(() => {
        console.log(this.$refs["v12"].currentTime);

        if (this.$refs["v12"].currentTime > 20) {
          setTimeout(() => {
            this.$player.autoPlay(
              "http://ofvbasfrz.bkt.clouddn.com/825a005c-92c1-478a-ab57-162a82587ece"
            );
            wx.ready(function() {
              document.getElementById("mainMp3").play();
            });
          }, 200);

          this.playTimer && clearInterval(this.playTimer);
          this.isPlay = false;
          this.$refs["v12"].pause();
          this.$refs["v12"].currentTime = 0;
        }
      }, 12);
    },
    knowMore() {
      this.$store.commit("toggleRule");
    },
    seeOther() {
      this.$router.push({
        path: "/rank"
      });
    },
    choseLine() {
      this.$router.push({
        path: "/city"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  .logo1 {
    position: fixed;
    width: 1.38rem;
    left: 0;
    top: 0.15rem;
    z-index: 100;
    img {
      border: 1px solid #fed700;
      display: block;
      width: 100%;
    }
  }
  .seeOr {
    width: 1.7rem;
    height: 0.6rem;
    border-radius: 0.14rem 0 0 0.14rem;
    font-size: 0.2rem;
    padding: 0;
  }
  .btng {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 0.9rem;
    width: 6.1rem;
    margin: 0.2rem auto;
    .btn {
      background: #dd1d21;
      width: 2.9rem;
      height: 0.88rem;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.36rem;
      margin-bottom: 0.1rem;
      border-radius: 0.06rem;
      &.c2 {
      }
      &.b1 {
        width: 6.1rem;
      }
    }
  }
  .t1 {
    margin: 0.1rem 0.6rem;
    font-size: 0.46rem;
    font-weight: bold;
    color: #3e3a39;
    margin-bottom: 0;
  }
  .t2 {
    margin-top: 0.15rem;
    margin-bottom: 0.3rem;
    margin-left: 0.6rem;
    font-size: 0.28rem;
    color: #3e3a39;
  }
  .logo2 {
    position: fixed;
    width: 1.38rem;
    right: 0.63rem;
    top: 0.15rem;
    z-index: 100;
    img {
      display: block;
      width: 100%;
    }
  }
  .banner {
    margin-top: 1.2rem;
    width: 100%;
    height: 4.3rem;
    overflow: hidden;
    position: relative;
    .inner {
      // width: 100%;
      // height: 4.86rem;
      // transform: scale(1.4);
    }
    .img {
      width: 100%;
      height: 4.3rem;
      overflow: hidden;
      position: relative;
      .play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 0.7rem;
        height: 1rem;
        z-index: 1000;
        pointer-events: all;
        img {
          display: block;
          height: 100%;
        }
      }
      .am {
        position: absolute;
        bottom: 0%;
        height: 100%;

        display: block;
        width: 100%;
      }
    }
    video {
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
    }
    img {
    }
  }
}
</style>
