<template>
  <div class="music animated fadeInDown" v-show="musicInfo.show">
    <div class="top">
      <div class="content">
        <div class="inner">
          <div :class="['music_item',currentChose==item.value?'active':'']" v-for="(item,index) in musicList" :key='index' @click='choseMusicItem(item)'>
            <div>{{item.name}}</div><img :src="item.img" alt=""></div>
        </div>
      </div>
      <div class="right">
        <div class="btn" @click='doCancel'>关闭</div>
      </div>
    </div>
    <div class="bg" @click='doCancel'></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "../utils/muisc_play";
export default {
  data() {
    return {
      currentChose: null
    };
  },
  components: {},
  filters: {},
  computed: {
    ...mapGetters({
      musicList: "musicList",
      musicInfo: "musicInfo"
    })
  },
  watch: {},
  mounted() {},
  methods: {
    doSure() {
      this.$store.dispatch("saveMusic", {
        text: this.currentChose
      });
    },
    doCancel() {
      this.$store.dispatch("hideMusic");
    },
    choseMusicItem(item) {
      console.log(item);
      this.$store.dispatch("saveMusic", {
        text: item.value
      });
      this.currentChose = item.value;
    }
  }
};
</script>
<style lang="scss" scoped>
.music {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10003333333;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  animation-duration: 0.3s;
  .bg {
    flex: 1;
    width: 100%;
  }
  .top {
    background: rgba(0, 0, 0, 0.86);
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  .right {
    border-left: 1px solid #ccc;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .btn {
      margin: 0.1rem;
      width: 1.4rem;
      height: 0.6rem;
      font-size: 0.24rem;
    }
  }
  .content {
    width: 5rem;
    overflow-x: auto;
    overflow-y: hidden;
    height: 2rem;
    .inner {
      // width: 10rem;
      display: flex;
      align-items: center;
      height: 2rem;
    }
    .music_item {
      border: 2px solid transparent;
      width: 1.4rem;
      height: 1.8rem;
      color: #ffffff;
      font-size: 0.26rem;
      display: inline-flex;
      margin-left: 0.23rem;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;

      img {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }
      &.active {
        img {
          border: 2px solid #ff0000;
        }
        color: #ff0000;
      }
    }
  }
}
</style>
