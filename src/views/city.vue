<template>
  <div class="city">
    <div class="title">
      <div class="t">骑行路线</div>
      <div class="t2">
        <img src="../assets/delete.png" alt="">
        <div @click="clean" v-fib="{type:'城市选择',name:'情空'}">清空</div>
      </div>
    </div>
    <div class="city_list">
      <div class="item" v-for="(item,index) in choseCityList" :key='index'>{{item.label}}</div>
    </div>
    <div class="content">
      <div class="t1">请按骑行顺序选择城市</div>
      <div class="t2">最多可选择5个城市</div>
      <div class="city_province">
        <div class="province" ref='province1' @scroll.passive="onScroll">
          <div class="inner" ref='province'>
            <div :class="['item',currntPro==province.label?'active':'']" v-for="(province,index) in provinces" :key='index' @click='chosePro(province)'>
              <div class="msg" v-show='choseCityList.filter(v=>v.prov==province.label).length>0'><span>{{choseCityList.filter(v=>v.prov==province.label).length}}</span></div>{{province.label}}</div>
          </div>
        </div>
        <div class="bar">
          <div class="site" :style="{top:site+'%'}"></div>
          <div class="line"></div>
        </div>
        <div class="city2">
          <div class="inner">
            <div :class="['item',choseCityList.filter(v=>v.label==item.label).length>0?'active':'']" @click="choseCity(item)" v-for="(item,index) in cityList" :key='index'><span>{{item.label}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="moto_info"  >
      <div class="moto" @touchstart='motoStart' @touchmove='motoMove' @touchend='motoEnd' :style="{'left':motoSite.disX+'%'}">
        <img src="../assets/moto.png" alt="">
      </div>
      <div class="text" v-show="!motoSite.isMove">{{this.choseCityList.length>=2?'>>向右滑动摩托车生成路线>>':'请至少选择2个城市'}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { citys, provinces } from "../utils/city";
const axios = require("axios");
const wx = window.wx;
export default {
  data() {
    return {
      site: 1,
      citys: citys,
      provinces: provinces,
      cityList: citys.filter(v => v.prov == "广东省"),
      currntPro: "广东省",
      choseCityList: [],
      motoSite: {
        x: 0,
        disX: 0,
        isMove: false
      }
    };
  },
  components: {},
  filters: {},
  computed: {
    ...mapGetters({})
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
  mounted() {},
  methods: {
    clean() {
      this.choseCityList = [];
    },
    motoStart(e) {
      if (this.choseCityList.length < 2) {
        return false;
      }
      this.motoSite.x = e.touches[0].clientX;
      this.motoSite.isMove = true;
    },
    motoMove(e) {
      if (this.choseCityList.length < 2) {
        return false;
      }
      this.motoSite.disX = (e.touches[0].clientX - this.motoSite.x) / 320 * 100;
      this.motoSite.disX = this.motoSite.disX > 70 ? 70 : this.motoSite.disX;
      console.log(this.motoSite.disX);
    },
    doEnd() {
      let citys = this.choseCityList.map(v => v.label);
      let provs = this.choseCityList.map(v => v.prov);
      console.log(citys);
      this.$router.push({
        path: "/line?citys=" + encodeURI(citys) + "&provs=" + encodeURI(provs)
      });
    },
    motoEnd(e) {
      if (this.choseCityList.length < 2) {
        return false;
      }
      if (this.motoSite.disX < 60) {
        this.motoSite.isMove = false;

        this.motoSite = {
          x: 0,
          disX: 0
        };
      } else {
        this.doEnd();
        this.motoSite = {
          x: 0,
          disX: 70
        };
      }
    },
    choseCity(item) {
      console.log(this.choseCityList);
      if (
        this.choseCityList.length > 0 &&
        this.choseCityList.filter(v => v.label == item.label).length > 0
      ) {
        this.choseCityList = this.choseCityList.filter(
          v => v.label != item.label
        );
      } else {
        if (this.choseCityList.length >= 5) {
          return this.$toasted.error("最多选择5个城市").goAway();
        }
        this.choseCityList.push(item);
      }
      console.log(this.choseCityList);
    },
    chosePro(item) {
      this.currntPro = item.label;
      this.cityList = this.citys.filter(v => v.prov == item.label);
      console.log(item);
    },
    goNext() {
      this.$router.push({
        path: "/line"
      });
    },
    onScroll(e) {
      console.log();
      console.log();
      console.log();
      this.site =
        this.$refs["province1"].scrollTop /
        this.$refs["province"].clientHeight *
        100;
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.city {
  padding: 0.12rem 0.75rem;
  .content {
    .t1 {
      margin-top: 0.2rem;
      font-size: 0.36rem;
      font-weight: bold;
      margin-bottom: 0.01rem;
    }
    .t2 {
      font-size: 0.26rem;
      color: #3e3a39;
      margin-bottom: 0.3rem;
    }
    .city_province {
      display: flex;
      width: 100%;
      height: 6.2rem;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      .province {
        width: 1.52rem;
        overflow: visible;
        overflow-y: auto;
        overflow-x: visible;
        padding-top: 0.3rem;
        .inner {
          width: 1.32rem;
        }
        .item {
          text-align: center;
          width: 100%;
          border: 1px solid #fbce07;
          height: 0.9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.14rem;
          position: relative;
          overflow: visible;
          &.active {
            background: #fbce07;
          }
          .msg {
            box-sizing: border-box;
            position: absolute;
            top: -0.15rem;
            right: -0.2rem;
            background: #dd1d21;
            height: 0.3rem;
            padding: 0 0.12rem;
            display: flex;
            color: #fff;
            justify-content: center;
            align-items: center;
            border-radius: 0.15rem;
            span {
              line-height: 1;
              position: relative;
              top: 0.015rem;
            }
          }
        }
      }
      .city2 {
        flex: 1;
        overflow: auto;
        .item {
          display: inline-block;
          border: 1px solid #dcdcdc;
          height: 0.9rem;
          width: 1.2rem;
          margin-bottom: 0.14rem;
          margin-right: 0.1rem;
          font-size: 0.22rem;
          position: relative;
          span {
            position: absolute;
            top: 50%;
            left: 50%;
            text-align: center;
            width: 90%;
            transform: translate(-50%, -50%);
            line-height: 1.2;
          }
          &.active {
            background: #dcdcdc;
          }
        }
      }
      .bar {
        width: 0.34rem;
        position: relative;
        margin-right: 0.2rem;
        .line {
          position: absolute;
          left: 50%;
          width: 0.04rem;
          margin-left: -0.02rem;
          height: 100%;
          background: #dcdcdc;
        }
        .site {
          position: absolute;
          left: 50%;
          width: 0.2rem;
          border-radius: 50%;
          margin-left: -0.1rem;
          height: 0.2rem;
          background: #dcdcdc;
          z-index: 22;
        }
      }
    }
  }
  .city_list {
    padding: 0.13rem 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 1.2rem;
    border-bottom: 2px solid #dbdbdb;
    .item {
      background: #dd1d21;
      font-size: 0.24rem;
      color: #fff;
      padding: 0 0.24rem;
      // padding-left:.15rem;
      height: 0.4rem;
      // border-radius: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.1rem;
      position: relative;

      margin-right: 0.135rem;
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: -0.001rem;
        width: 0;
        height: 0;
        border-left: 0.1rem solid #ffffff;
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
        right: -0.152rem;
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
  .moto_info {
    width: 100%;
    margin-top: 0.3rem;
    background: #dd1d21;
    height: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 0.4rem;
    position: relative;
    .text {
      margin-left: 1.3rem;
    }
    .moto {
      position: absolute;
      top: 0.13rem;
      left: 0;
      width: 1.2rem;
      margin-left: 0.12rem;
      margin-right: 0.12rem;
      // transition: 0.2s all;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .title {
    font-size: 0.36rem;
    color: #333;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    .t2 {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.33rem;
      }
      border-bottom: 1px solid #dd1d21;
    }
  }
}
</style>
