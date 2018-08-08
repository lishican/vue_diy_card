<template>
  <div class="list">
    <div v-show='isShowShare' class="shareModal animated fadeIn" @click="isShowShare=!isShowShare">
      <img src="../assets/sharep.png" alt="">
    </div>
    <div class='empty' v-if="loginUserMapInfo&&loginUserMapInfo.length==0">
      <div>暂无相册</div>
      <!-- <div class="btn" @click='make'>立即制作</div> -->
    </div>
    <div class="item" v-for="(item,index) in loginUserMapInfo" :key="index" @click='goTheme(item)'>
      <img :src="item.coverUrl" alt="">
      <div class="content">
        <div class="sty">风格：{{item.templetId|styleF}}</div>
        <div class="sty">更新日期：{{item.updateTime.time|formatT}}</div>
        <div class="sty">点赞数：{{item.popularity}}</div>
        <div class="sty">路线：{{item.citys}}</div>
      </div>
      <div class="option">
        <div class="del btn" v-fib="{type:'相册列表',name:'转发'}" @click.capture.stop="doChange(item)">转发</div>
        <div class="del btn"  v-fib="{type:'相册列表',name:'删除'}" @click.capture.stop="delTheme(item)">删除</div>
      </div>
    </div>
    <div class="btng">
      <div class="btn again one"  v-fib="{type:'相册列表',name:'立即制作'}"  @click="doAgain1">{{loginUserMapInfo.length==0?'立即制作':'再做一个'}}</div>
      <div class="btn again two" v-fib="{type:'相册列表',name:'返回首页'}" @click="doAgain2">返回首页</div>
      <div class="btn again two" v-fib="{type:'相册列表',name:'排行榜'}"  @click="doAgain3">排行榜</div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters } from "vuex";
const axios = require("axios");
const wx = window.wx;
export default {
  data() {
    return {
      isShowShare: false
    };
  },
  computed: {
    ...mapGetters({
      loginUserMapInfo: "loginUserMapInfo"
    })
  },
  filters: {
    formatT(val) {
      return dayjs(val).format("YYYY年M月DD日");
    },
    styleF(val) {
      let styles = {
        themeInfo1: "唯美风格",
        themeInfo2: "城市风格",
        themeInfo3: "极简风格",
        "": "默认风格"
      };
      return styles[val];
    }
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
    doAgain1() {
      this.$router.push({
        path: "/city"
      });
    },
    doAgain2() {
      this.$router.push({
        path: "/"
      });
    },
    doAgain3() {
      this.$router.push({
        path: "/rank"
      });
    },
    doChange(item) {
      console.log(item);

      let types = {
        themeInfo1: "albume_1",
        themeInfo2: "albume_2",
        themeInfo3: "albume_3"
      };

      if (item) {
        console.log(`/${types[item.templetId]}?id=${item.id}`);
        window.shareCard(
          {
            url: `/${types[item.templetId]}?id=${item.id}`
          },
          () => {
            this.isShowShare = !this.isShowShare;
            this.$store
              .dispatch("saveShare", {
                openId: document.getElementById("openId").value,
                id: item.id,
                type: 1
              })
              .then(data => {
                console.log(data);
              });
          }
        );
      }
      this.isShowShare = !this.isShowShare;
    },
    make() {
      this.$router.push({
        path: "/"
      });
    },
    goTheme(item) {
      let styles = {
        themeInfo1: "albume_1",
        themeInfo2: "albume_2",
        themeInfo3: "albume_3"
      };
      this.$router.push({
        path: `/${styles[item.templetId]}?id=${item.id}&isEdit=true`
      });
      console.log(item);
    },
    delTheme(item) {
      if (confirm("确认删除吗，删除后别人不能查看了")) {
        this.$store
          .dispatch("delCard", {
            id: item.id
          })
          .then(data => {
            if (data.code == 200) {
              this.$toasted.error("删除成功").goAway(1000);
            }
            console.log(data);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efefef;
  padding-top: 0.2rem;
  overflow: auto;
  .shareModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    z-index: 100000;
    background: rgba(0, 0, 0, 0.83);
    animation-duration: 0.3s;
    img {
      display: block;
      width: 100%;
    }
  }
  .empty {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #999;
    font-size: 0.28rem;
    .btn {
      margin-top: 0.4rem;
      width: 1.5rem;
      height: 0.6rem;
      font-size: 0.2rem;
    }
  }
  .btng {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin: 0.5rem auto;
  }
  .again {
    display: flex;
    font-size: 0.3rem;
    width: 1.5rem;
    height: 0.86rem;
    margin: 0.1rem auto 0;
    border-radius: 0.1rem;
    &.one {
      width: 7.2rem;
    }
    &.two {
      width: 3.5rem;
    }
  }
  .item {
    width: 7.2rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
    margin-bottom: 0.2rem;
    background: #fff; // box-shadow: .1rem .1rem .2rem rgba(0,0,0,.12);
    img {
      width: 2rem;
      height: 2rem;
    }
    .content {
      padding-left: 0.2rem;
      flex: 1;
      height: 2rem;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-direction: column;
      font-size: 0.2rem;
    }
    .option {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .del {
      margin: 0.12rem;
      width: 1rem;
      height: 0.6rem;
      font-size: 0.24rem;
      margin-right: 0.2rem;
    }
  }
}
</style>
