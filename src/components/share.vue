<template>
  <div class="share " v-show="isShowShare.show">
    <div v-show='isShowShare2' class="shareModal animated fadeIn" @click="isShowShare2=!isShowShare2">
      <img src="../assets/sharep.png" alt="">
    </div>
    <div class="content animated zoomIn">
      <div class="banner">
        <img src="../assets/ng.png" alt="">
      </div>
      <div class="content2">
        <div class="bottom">
          <div class="btn" v-fib="{type:'相册页制作成功页',name:'分享作品'}" @click='showShare'>分享作品</div>
          <div class="btn"  v-fib="{type:'相册页制作成功页',name:'查看排行榜'}" @click="goRank">查看排行榜</div>
        </div>
        <div class="cup">
          <img class="img" src="../assets/ticket.png" alt="">
          <div class="tia" id="target">
            拒绝跟风，你就是不一样的烟火！<br> ￥壳牌爱德王子￥<br> 在此献上<span>199-30</span>元天猫优惠券 <br>（复制这条信息，打开手机淘宝即可领取）
          </div>
        </div>
          <div class="btn btn2" v-fib="{type:'相册页制作成功页',name:'立即复制'}"  id="copyBtn" ref="copy" data-clipboard-target="#target" @click="doCopy">立即复制</div>

      </div>
    </div>
      <div class="close" @click="goHere">
        <img src="../assets/close.png" alt="">
      </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      isShowShare2: false,
      copyBtn: null
    };
  },
  computed: {
    ...mapGetters({
      isShowShare: "isShowShare"
    })
  },
  mounted() {
    // this.copyBtn = new clipboard(this.$refs[copy]);
  },
  methods: {
    doCopy() {
      var clipboard = new Clipboard("#copyBtn");
      clipboard.on("success", e => {
        console.log(e);
        this.$toasted.error("复制成功").goAway(2000);
        // e.clearSelection();
      });
      // var copyTarget = document.getElementById("success_form_input");
      // copyTarget.select();
      // document.execCommand("Copy");
      // this.$toasted.success("复制成功").goAway(2000);
      // let _this = this;
      // let clipboard = _this.copyBtn;
      // clipboard.on("success", function() {
      //   _this.$toasted.success("复制成功").goAway(2000);
      // });
      // clipboard.on("error", function() {
      //   _this.$toasted.error("复制失败，请手动复制").goAway(2000);
      // });
    },
    showShare() {
      this.isShowShare2 = true;
    },
    goHere() {
      this.$router.replace({
        path: "/" + this.isShowShare.name + "?id=" + this.isShowShare.templateId
      });
      this.$store.dispatch("hideShare");
      setTimeout(() => {
        location.reload();
      }, 200);
      console.log(this.isShowShare);
    },
    goRank() {
      this.$router.replace({
        path: "/rank"
      });
      this.$store.dispatch("hideShare");
    },
    seeZuo() {
      this.$router.replace({
        path: "/list"
      });
      this.$store.dispatch("hideShare");
    }
  }
};
</script>
<style lang="scss" scoped>
.share {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.82);
  flex-direction: column;
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
    text-align: center;
    img {
      display: inline-block;
      width: 90%;
    }
  }

  .close {
    width: 0.65rem;
    height: 0.65rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin-top: 0.3rem;
    }
  }
  .content {
    width: 5rem;
    height: 7.5rem;
    background: #fff;
    position: relative;
    text-align: center;
    border-radius: 0.1rem;
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
    animation-duration: 0.2s;

    .shareimg {
      margin-top: 0.4rem;
      width: 2rem;
    }
    .banner {
      width: 5rem;
      height: 3.84rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .btn2 {
      width: 4.5rem;
      height: 0.6rem;
      font-size: 0.25rem;
      border-radius: 0 0 0.12rem 0.12rem;
      margin: 0 auto;
    }
    .cup {
      position: relative;
      width: 4.5rem;
      font-size: 0.24rem;
      border: 1px solid #dbdbdb;
      border-radius: 0.12rem 0.12rem 0 0;
      border-bottom: none;
      margin: 0.15rem auto 0;
      padding: 0.2rem 0.1rem;
      padding-top: 0.4rem;
      .tia {
        font-size: 0.2rem;
        font-weight: bold;
        span {
          color: #ff0000;
        }
      }

      .img {
        position: absolute;
        left: 50%;
        width: 0.6rem;
        margin-left: -0.3rem;
        top: -0.3rem;
      }
    }
    .content2 {
      padding-top: 0.1rem;
    }
    .bottom {
      // position: absolute;
      // bottom: 0.3rem;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .btn {
        border-radius: 0.1rem;
        font-size: 0.24rem;
        width: 1.5rem;
        height: 0.6rem;
      }
    }
  }
}
</style>
