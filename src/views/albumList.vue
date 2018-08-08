<template>
  <div class="albumList">
    <div class="t2">你的里程碑音乐相册从一个赏心悦目的模板开启</div>
    <div class="albume_container swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../assets/封面1.jpg" alt="">
        </div>
      
        <div class="swiper-slide">
          <img src="../assets/封面3.jpg" alt="">
        </div>
          <div class="swiper-slide">
          <img src="../assets/封面2.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="tip">{{types2[slideIndex]}}</div>
    <div class="btn chose" @click='doSure'>确认选择</div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapGetters } from "vuex";
const axios = require("axios");
const wx = window.wx;
export default {
  data() {
    return {
      mySwiper: null,
      slideIndex: 0,
      types2: {
        0: "唯美风格",
        1: "城市风格",
        2: "极简风格"
      },
      types: {
        0: "albume_1",
        1: "albume_2",
        2: "albume_3"
      }
    };
  },
  components: {},
  filters: {},
  computed: {
    ...mapGetters({})
  },
  mounted() {
    this.initSwiper();
  },
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
    doSure() {
      let query = this.$route.query;

      this.$router.push({
        path:
          "/" +
          this.types[this.slideIndex] +
          "?citys=" +
          query.citys +
          "&prov=" +
          query.provs +
          "&type=1"
      });
    },
    initSwiper() {
      let that = this;
      this.mySwiper = new Swiper(".albume_container", {
        effect: "coverflow",
        grabCursor: true,
        initialSlide: 1,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        on: {
          slideChange: function() {
            that.slideIndex = this.realIndex;
            console.log();
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.t2 {
  margin: 0.3rem 0.7rem 0.3rem;
  font-size: 0.28rem;
  font-weight: bold;
  color: #3e3a39;
}
.tip {
  font-size: 0.3rem;
  color: #3e3a39;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  text-align: center;
}
.albume_container {
  display: block;
  width: 100%;
  height: 7.6rem;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.5rem;
    img {
      display: block;
      width: 4.5rem;
      height: 7.6rem; // box-shadow: 0 0 0.2rem #efd7b7;
    }
  }
}
.chose {
  width: 6.12rem;
  margin: 0 auto;
}
</style>
