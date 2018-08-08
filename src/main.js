import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import Toasted from "vue-toasted";
import "./utils/reset.css";
import "animate.css";
import "swiper/dist/css/swiper.min.css";
const dataSDK = window.dataSDK || null;
const echarts = require("echarts/lib/echarts");
const axios = require("axios");
const wx = window.wx;
Vue.use(Toasted, {
  singleton: true,
  closeOnSwipe: true,
  theme: "bubble",
  className: "toa1",
  containerClass: ["toa1"],
  position: "top-center"
});
import Player from "./utils/player";
let player = new Player({
  animaClass: "muiscIconRotate"
});
player.autoPlay(
  "http://ofvbasfrz.bkt.clouddn.com/825a005c-92c1-478a-ab57-162a82587ece",
  true
);
const filterRoutes = ["albume_1", "albume_2", "albume_3"];
router.beforeEach((to, from, next) => {
  console.log(to);

  if (!/albume_/.test(to.fullPath)) {
    // document.getElementById("main2Mp3").play();
    // if (wx) {
    //   wx.ready(function() {
    //     document.getElementById("main2Mp3").play();
    //   });
    // }
    player.autoPlay(
      "http://ofvbasfrz.bkt.clouddn.com/825a005c-92c1-478a-ab57-162a82587ece"
    );
  } else {
    // document.getElementById("main2Mp3").pause();
  }

  let url = "http://advance.exuniq.com/h5/qx" + to.fullPath;
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
      if (filterRoutes.filter(v => v == to.name).length == 0) {
        window.commonShare();
      }
    });
  next();
});

Vue.directive("fib", {
  bind: function(el, binding) {
    console.log(binding.value);
    el.addEventListener("click", () => {
      dataSDK.btnClick(binding.value.type, binding.value.name);
      console.log(binding.value.type, binding.value.name);
    });
  }
});
Vue.directive("mp3", {
  bind: function(el, binding) {
    let id = binding.expression;
    el.addEventListener("click", () => {
      document.getElementById(id).play();
    });
  }
});

let chinaJson = require("./utils/china.json");
echarts.registerMap("china", chinaJson);
let geoMapList = chinaJson.features.map(v => {
  return {
    cp: v.properties.cp,
    name: v.properties.name
  };
});
let geoCoordMap = {};
geoMapList.forEach(v => {
  geoCoordMap[v.name] = v.cp;
});

Vue.prototype.$geoCoordMap = geoCoordMap;
Vue.prototype.$echarts = echarts;
Vue.prototype.$player = player;
Vue.config.productionTip = true;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
// miaoyi123！@#
