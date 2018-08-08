<template>
  <div id="app" class="app_container">
    <router-view/>
    <textEdit/>
    <Share/>
    <imgCrop/>
    <musicEdit/>
    <Rule/>

  </div>
</template>


<script>
import moment from "moment";
import textEdit from "./components/textEdit";
import musicEdit from "./components/music";
import imgCrop from "./components/imageCrop";
import Share from "./components/share";
import Loading from "./components/loading";
import Rule from "./components/rules";

export default {
  data() {
    return {
      userInfo: {
        openId: document.getElementById("openId").value,
        name: document.getElementById("nickName").value,
        img: document.getElementById("headImg").value
      }
    };
  },
  mounted() {
    this.$store.dispatch("initUser", this.userInfo).then(data => {
      console.log(data);
    });
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
  components: {
    Rule,
    textEdit,
    Loading,
    imgCrop,
    Share,
    musicEdit
  }
};
</script>


<style lang="scss">
html {
  font-size: 16px;
  position: relative;
  width: 100%;
  height: 100%;
}
body {
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 0.28rem;
  background: #fff;
}
[v-cloak] {
  display: none;
}
* {
  box-sizing: border-box;
}
img,
a {
  outline: none;
  appearance: none;
}
img {
  pointer-events: none;
}
@keyframes muiscIconRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.gray {
  color: #999;
}
.app_container {
  position: relative;
  width: 100%;
  height: 100%;
}
.red {
  color: #dd1d21;
}
.btn {
  background: #dd1d21;
  width: 2.8rem;
  height: 0.88rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.36rem;
}

// 公告的
</style>
