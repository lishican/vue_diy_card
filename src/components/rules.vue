<template>
  <div class="rule" v-show="isShowRule">
    <div class="inner animated zoomIn">
      <div class="content">
        <h3>- 活动介绍 -</h3>
        分享你最喜爱的骑行路线，并制作成里程碑音乐相册参与评选，即有机会参与壳牌爱德王子官方组织的线下骑行活动，以及专属摩旅人的丰富奖品！
        <h3>- 奖品设置 -</h3>
        <img class="reward" src="../assets/rule.png" alt="">
        <h3>- 活动时间 -</h3>
        <span class="y">评选截止时间：</span><span class="r">即日起至8月30日23:59</span><br>
        <span class="y">奖品派发时间：</span>将有专人联系领奖，所有礼品将在活动结束后的15个工作日内免费寄出。<br>
        <h3>- 注意事项 -</h3>
        1、各项奖项不可重复获奖；<br> 2、活动期间使用任何舞弊行为的用户一经发现，即刻取消活动资格；
        <br> 3、用户需提供真实信息。如因用户资料不全导致活动奖品无法正确发放的情况，主办方不对由此产生的任何后果负责；
        <br> 4、本活动最终解释权归壳牌爱德王子所有。
        <br>
        5、进入<span class="r">“壳牌爱德王子”</span> 微信公众号 获取活动最新动态，以及更多摩托车润滑知识！
        <br>
        <br>
        <img class="code" src="../assets/rq.jpg" alt="">
      </div>
      <div class="btn" @click="back">返回</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  filters: {},
  computed: {
    ...mapGetters({
      isShowRule: "isShowRule"
    })
  },
  mounted() {},
  methods: {
    back() {
      this.$store.commit("toggleRule");
    }
  }
};
</script>
<style lang="scss" scoped>
.rule {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1022222220;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 0.3rem;
  .reward {
    width: 100%;
    display: block;
    margin: 0 auto;
    pointer-events: all;
  }
  .y {
    color: #fdce06;
  }
  .r {
    color: #ff0000;
  }
  .inner {
    .code {
      display: block;
      margin: 0 auto;
      width: 40%;
      pointer-events: all;
    }
    width: 90%;
    height: 95%;
    background: rgba(0, 0, 0, 0.86);
    border-radius: 0.1rem;
    animation-duration: 0.3s;
    border-radius: 0.2rem;
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.36);
    .content {
      font-size: 0.24rem;
      color: #fff;
      padding: 0.4rem;
      padding-top: 0.2rem;
      height: 90%;
      overflow: auto;
      line-height: 1.6;
      h3 {
        color: #fdce06;
        text-align: center;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        font-size: 0.3rem;
      }
    }
    .btn {
      margin: 0.05rem auto;
      width: 1.6rem;
      height: 0.6rem;
      font-size: 0.28rem;
    }
  }
}
</style>
