<template>
  <div class="com">
    <Map/>
    <div class="title">
      <!-- <img src="../assets/zhinan.png" alt=""> -->
      <div>该路线共跨过<span class="red">{{provs.length}}</span>个省份<br>踏遍<span class="red">{{citys.length}}</span>个城市</div>
    </div>
    <div class="t1">
      <div class="qt">骑行路线</div>
      <div class="qtc">
        <div class="item" v-for="(item,index) in citys" :key="index">{{item}}</div>
      </div>
    <p class="p2">该线路总公里数达<span class="red">{{mapData.distant}}</span>公里</p>

    </div>
    <div class="t2">
     上传骑行美照，生成你的里程碑音乐相册，<br>即有机会获得壳牌爱德王子专属定制产品， <br>以及其他丰厚奖品。 <span v-fib="{type:'城市选择',name:'奖品一览'}" class="aas" @click="showW">奖品一览</span>
    </div>
    <div class="btng">
      <div class="btn" v-fib="{type:'城市选择',name:'重选线路'}" @click="doChose">重选线路</div>
      <div class="btn" v-fib="{type:'城市选择',name:'上传照片'}" @click="doPic">上传照片</div>
     
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Map from "../components/map";
const axios = require("axios");
const wx = window.wx;
export default {
  data() {
    return {
      citys: [],
      provs: [],
      provs2: []
    };
  },
  components: {
    Map
  },
  filters: {},
  computed: {
    ...mapGetters({
      mapData: "mapData"
    })
  },
  mounted() {
    this.init();

    setTimeout(() => {
      wx.ready(function() {
        document.getElementById("mainMp3").play();
      });
    }, 1000);
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
  methods: {
    showW() {
      this.$store.commit("toggleRule");
    },
    init() {
      let citys = decodeURI(this.$route.query.citys);
      let provs2 = decodeURI(this.$route.query.provs);
      this.citys = citys.split(",");
      this.provs2 = provs2.split(",");
      this.provs = this.unique(provs2.split(","));
      let linesData = [];
      this.$store
        .dispatch("fetchMap", {
          openId: document.getElementById("openId").value,
          citys: citys
        })
        .then(data => {
          if (data.code == 200) {
            let c = data.xy;
            let l = [];
            let cc = [];
            for (let i = 0; i < c.length; i++) {
              cc.push({
                name: Object.keys(c[i])[0],
                value: Object.values(c[i])[0].split(",")
              });
              if (i < c.length - 1) {
                l.push([
                  {
                    coord: Object.values(c[i])[0].split(",")
                  },
                  {
                    coord: Object.values(c[i + 1])[0].split(",")
                  }
                ]);
              }
            }
            this.$store.commit("updateMapData", {
              citys: cc,
              lines: l,
              rawCity: citys,
              rawProv: provs2,
              distant: data.compreM
            });
          } else {
            this.$toasted.error("城市选择失败，请重选").goAway(1000);
            this.$router.back();
          }
        });
    },
    unique(arr) {
      let res = [];
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        if (res.indexOf(arr[i]) == -1) {
          res.push(arr[i]);
        }
      }
      return res;
    },
    doChose() {
      this.$router.back();
    },
    doPic() {
      this.$router.push({
        path:
          "/albumlist?citys=" +
          this.citys.join(",") +
          "&provs=" +
          this.provs2.join(",")
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  border-radius: 0.12rem;
}
.aas {
  color: #dd1d21;
  text-decoration: underline;
  margin: 0.1rem auto;
  width: 6.1rem;
}
.btng {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.9rem;
  width: 6.1rem;
  margin: 0 auto;
  .btn {
    background: #dd1d21;
    width: 3rem;
    height: 0.88rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.36rem;
  }
}
.p2 {
  // padding-left: 0.8rem;
  margin-top: 0.1rem;
  font-size: 0.3rem;
  font-weight: bold;
  margin-bottom: 0.1rem;
}
.t2 {
  width: 6.12rem;
  font-size: 0.28rem;
  color: #3e3a39;
  margin: 0.11rem auto;
  font-weight: bold;
  line-height: 1.8;
}
.t1 {
  width: 6.12rem;
  // height: 1.8rem;
  margin: 0 auto;
  border-bottom: 1px solid #dcdcdc;
  .qt {
    font-size: 0.36rem;
    color: #3e3a39;
    margin-bottom: 0.15rem;
    font-weight: bold;
  }
  .qtc {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
      height: 0.38rem;
      background: #dd1d21;
      color: #fff;
      margin-right: 0.14rem;
      margin-bottom: 0.1rem;
      padding: 0 0.14rem;
      position: relative;
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-left: 0.1rem solid #fff;
        border-right: none;
        border-top: 0.2rem solid transparent;
        border-bottom: 0.2rem solid transparent;
        z-index: 10;
      }
      &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: -0.15rem;
        width: 0;
        height: 0;
        border-left: 0.15rem solid #dd1d21;
        border-right: none;
        border-top: 0.2rem solid transparent;
        border-bottom: 0.2rem solid transparent;
        z-index: 10;
      }
    }
  }
}
.title {
  position: fixed;
  z-index: 1000;
  top: 0.4rem;
  left: 0;
  width: 100%;
  font-size: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3e3a39;
  font-weight: bold;
  text-align: center;
  img {
    display: block;
    width: 0.3rem;
    margin-right: 0.2rem;
  }
}
</style>
