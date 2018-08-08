<template>
  <div class="menu">
    <div class="item" v-fib="{type:'相册页',name:'为他点赞'}" @click="addPopularity" v-show="!isMe">为他<br>点赞</div>
    <div class="item" v-fib="{type:'相册页',name:'排行榜'}" @click="goRank">排行榜</div>
    <div class="item" v-fib="{type:'相册页',name:'我也要玩'}" v-show="!isMe" @click="play">我也<br>要玩</div>
    <div class="item" v-fib="{type:'相册页',name:'再做一个'}" v-show="isMe" @click="playAgain">再做<br>一个</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["isMe", "rid"],
  components: {},
  filters: {},
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  mounted() {},
  methods: {
    goRank() {
      this.$router.push({
        path: "/rank"
      });
    },
    play() {
      this.$router.push({
        path: "/"
      });
    },
    playAgain() {
      this.$router.push({
        path: "/city"
      });
    },
    addPopularity() {
      this.$store
        .dispatch("addPopularity", {
          openId: this.user.user.openid,
          id: this.rid
        })
        .then(data => {
          if (data.code == 200) {
            this.$toasted.error("小红心+1").goAway(1200);
          } else {
            this.$toasted.error("每天只能点赞3次喔").goAway(1200);
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.menu {
  position: fixed;
  bottom: 0.3rem;
  right: 0.54rem;
  width: 1rem; // height: 3rem;
  z-index: 100000;
  .item {
    margin-bottom: 0.26rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    background: #cc352e;
    color: #fff;
    font-size: 0.24rem; // font-weight: bold;
  }
}
</style>
