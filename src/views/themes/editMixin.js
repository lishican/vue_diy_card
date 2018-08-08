const Swiper = window.Swiper;
import Menu from "../../components/menu";
import Map from "../../components/map";
import Logo from "../../components/logo";
import Edit from "../../components/edit";
import { mapGetters } from "vuex";

const swiperAnimateCache = require("swiper-animate-cn").swiperAnimateCache;
const swiperAnimate = require("swiper-animate-cn").swiperAnimate;
import Player from "../../utils/player";

const axios = require("axios");
const wx = window.wx;
export default {
  data() {
    return {
      mySwiper: null,
      currentIndex: 0,
      isHavaEdit: false,
      isFromShare: false,
      updateFile: "updateFile",
      isMe: true,
      isChange: true,
      btnName: "立即生成",
      currentImgKey: {},
      citys: [],
      provs2: [],
      rid: 0,
      provs: [],
      player: null,
      themes: {
        albume_1: "themeInfo1",
        albume_2: "themeInfo2",
        albume_3: "themeInfo3"
      }
    };
  },
  components: {
    Logo,
    Edit,
    Map,
    Menu
  },
  watch: {
    musicInfo: {
      handler(curVal, oldVal) {
        this.playMusic(curVal.currentText);
      },
      deep: true
    }
  },
  filters: {},
  directives: {
    edit: {
      update(el, binding) {
        if (typeof el.src != "undefined") {
          if (binding.value.isEdit && binding.value.isChange) {
            el.parentNode.classList.add("edit_img");
            el.parentNode.classList.add("edit_img");
          } else {
            el.parentNode.classList.remove("edit_img");
          }
        } else {
          if (binding.value.isEdit && binding.value.isChange) {
            el.classList.add("edit_a");
          } else {
            el.classList.remove("edit_a");
          }
        }
        console.log(el.src);
      }
    }
  },

  computed: {
    ...mapGetters({
      mapData: "mapData",
      musicInfo: "musicInfo"
    })
  },
  mounted() {
    this.$store.dispatch("showMusic", {
      theme: this.themeType,
      key: "music",
      show: false
    });

    this.playMusic(this.themeInfo.music);
    let isReal = this.$route.query.id;
    let isEdit = this.$route.query.isEdit;

    if (isReal && !isEdit) {
      this.$store
        .dispatch("saveShare", {
          openId: document.getElementById("openId").value,
          id: isReal,
          type: 2
        })
        .then(data => {
          console.log(data);
        });
    }

    if (isReal) {
      this.rid = isReal;
      this.isFromShare = true;
      this.fetchInfo(isReal, isEdit);
    } else {
      let citys = decodeURI(this.$route.query.citys);
      let provs2 = decodeURI(this.$route.query.prov);
      this.init(citys, provs2);
    }

    this.initSwiper();
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("showMusic", {
      theme: this.themeType,
      key: "music",
      show: false
    });
    this.$store.commit("hideShare", {});
    this.$store.dispatch("hideMusic");
    this.$store.commit("initTheme");
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
      });
    next();
  },

  methods: {
    playMusic(url) {
      this.$player.autoPlay(url);
    },
    showEdit2() {
      this.isEdit = true;
      if (
        this.themeInfo.city == "请填写所属的城市" ||
        this.themeInfo.clueType == "所属俱乐部，如无可不填"
      ) {
        this.mySwiper.slideTo(0);
      }
    },
    fetchInfo(id, isEdit) {
      this.$store.dispatch("fetchPageInfo", { ridingId: id }).then(data => {
        if (data.code == 200) {
          if (
            document.getElementById("openId").value == data.ridingMapInfo.openid
          ) {
            this.isMe = true;
          } else {
            this.isMe = false;
          }
          if (isEdit) {
            this.isFromShare = false;
            this.isHavaEdit = true;
            this.btnName = "立即修改";
          }
          this.$store.commit("updateThemeInfo", {
            themeType: this.themeType,
            themeInfo: JSON.parse(data.ridingMapInfo.pages)
          });
          this.init(data.ridingMapInfo.citys, data.ridingMapInfo.provinces);
        } else {
          this.$toasted.error("相册已过期").goAway(1200);
          setTimeout(() => {
            this.$router.replace({
              path: "/rank"
            });
          }, 2000);
        }
      });
    },
    init(citys, provs2) {
      this.citys = citys.split(",");
      this.provs2 = provs2.split(",");
      this.provs = this.unique(provs2.split(","));
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
                    // name: Object.keys(c[i])[0],
                    coord: Object.values(c[i])[0].split(",")
                  },
                  {
                    // name: Object.keys(c[i + 1])[0],
                    coord: Object.values(c[i + 1])[0].split(",")
                  }
                ]);
              }
            }
            this.$store.commit("updateMapData", {
              citys: cc,
              lines: l,
              distant: data.compreM,
              rawCity: citys,
              rawProv: provs2,
              time: new Date()
            });
          } else {
            this.$toasted.error(data.error).goAway(1000);
          }
        });
    },
    unique(arr) {
      let res = [];
      for (let i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) == -1) {
          res.push(arr[i]);
        }
      }
      return res;
    },
    doShare() {
      console.log(this.themeInfo);

      let userImgs = Object.values(this.themeInfo).filter(v => {
        let isQn = !/img/.test(v);
        let isOnLine = /http/.test(v);
        let isImg = !/mp3/.test(v);
        return isQn && isImg && isOnLine;
      });
      if (this.themeInfo.line == "您" || this.themeInfo.line == "") {
        return this.$toasted.error("请完善相册首页的个人资料").goAway(1200);
      }
      if (!/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.themeInfo.phone)) {
        return this.$toasted.error("请输入正确的手机号").goAway(1200);
      }
      if (
        this.themeInfo.city == "请填写所属的城市" ||
        this.themeInfo.city == "" ||
        this.themeInfo.motoType == "请填写摩托车型号" ||
        this.themeInfo.motoType == ""
      ) {
        return this.$toasted.error("请完善相册首页的个人资料").goAway(1200);
      }
      if (/(p11|p2|p1_1)/.test(this.themeInfo.p11)) {
        return this.$toasted.error("至少上传封面图和2张风景图").goAway(1200);
      }
      if (userImgs.length < 3) {
        return this.$toasted.error("至少上传封面图和2张风景图").goAway(1200);
      }

      this.themeInfo.clueType =
        this.themeInfo.clueType == "所属俱乐部，如无可不填"
          ? "个人"
          : this.themeInfo.clueType;
      console.log(userImgs);
      let param = {
        imgs: userImgs.join(","),
        templetId: this.themeType,
        ridingName: this.themeType,
        openId: document.getElementById("openId").value,
        img: this.themeInfo.line,
        name: document.getElementById("nickName").value,
        pages: JSON.stringify(this.themeInfo),
        kilometers: this.mapData.distant,
        citys: this.mapData.rawCity,
        provinces: this.mapData.rawProv,
        phone: this.themeInfo.phone,
        motorcycleType: this.themeInfo.motoType,
        affOrg: this.themeInfo.clueType || "个人",
        coverUrl: this.themeInfo.p11,
        audioUrl: this.themeInfo.music
      };
      if (this.btnName == "立即修改") {
        param.ridingId = this.rid;
      }

      this.$store.dispatch("saveThemeInfo", param).then(data => {
        if (data.code == 200) {
          this.$store.commit("showShare", {
            templateId: data.ridingMap.id,
            name: this.$route.name
          });
          window.shareCard(
            {
              url: `/${this.$route.name}?id=${data.ridingMap.id}`
            },
            () => {
              this.$store
                .dispatch("saveShare", {
                  openId: document.getElementById("openId").value,
                  id: data.ridingMap.id,
                  type: 1
                })
                .then(data => {
                  console.log(data);
                });
            }
          );
        } else {
          this.$toasted.error(data.msg).goAway(1200);
        }
      });
    },
    saveEdit() {
      this.isHavaEdit = true;
      this.isEdit = false;
    },
    handleFileUpload(e) {
      let that = this;
      if (!e.target.files[0]) {
        return false;
      }
      let fileType = e.target.files[0].name.slice(
        e.target.files[0].name.lastIndexOf(".") + 1
      );

      let isMatch = ["jpg", "png", "jpeg"];

      if (isMatch.length == 0) {
        document.getElementById("updateFile").value = null;
        this.$toasted.error("只能上传jpg,png格式").goAway(1400);
        return false;
      }

      if (e.target.files[0].size > 1024 * 1024 * 20) {
        document.getElementById("updateFile").value = null;
        this.$toasted.error("上传的图片不能超过20M").goAway(1400);
        return false;
      }
      if (e.target.files[0].size > 1024 * 1024 * 4) {
        this.$toasted.error("5M以上图片上传较慢，请耐心等待。").goAway(4400);
      }
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); //发起异步请求
      reader.onload = function() {
        document.getElementById("updateFile").value = null;
        that.$store.dispatch("showCrop", {
          theme: that.themeType,
          key: that.currentImgKey.key,
          rawImg: {
            key: this.result,
            ow: that.currentImgKey.ow,
            oh: that.currentImgKey.oh
          }
        });
      };
    },
    choseMusic() {
      this.$store.dispatch("showMusic", {
        theme: this.themeType,
        key: "music",
        show: true
      });
    },
    showCrop(key, e) {
      if (!this.isEdit) {
        return false;
      }
      this.currentImgKey = {
        key: key,
        ow: e.target.clientWidth,
        oh: e.target.clientHeight
      };
      document.getElementById("updateFile").click();
    },
    showEdit(key) {
      if (!this.isEdit) {
        return false;
      }
      this.$store.dispatch("showEdit", {
        theme: this.themeType,
        key
      });
    },
    toNext() {
      this.mySwiper.slidePrev();
    },
    initSwiper() {
      let that = this;
      this.mySwiper && this.mySwiper.destroy(false);
      this.mySwiper = new Swiper(".albume_container", {
        direction: "vertical",
        loop: false,
        observer: true,
        longSwipesRatio: 0.1,
        touchRatio: 1,
        observerParents: true,
        initialSlide: 0,
        mousewheelControl: true,
        watchSlidesProgress: true,
        speed: 300,
        on: {
          slideChange: function() {},
          update: function() {},
          init: function() {
            this.myIndex = 0;
            that.currentIndex = 0;
            if (this.slides.length > 0) {
              swiperAnimateCache(this); //隐藏动画元素
              swiperAnimate(this); //初始化完成开始动画
            }
          },
          progress: function() {
            for (let i = 0; i < this.slides.length; i++) {
              let slide = this.slides.eq(i);
              let progress = this.slides[i].progress;
              let translate = progress * this.height * 0.8;
              let scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
              if (i == this.myIndex) {
                slide.transform(
                  "translate3d(0," + translate + "px,0) scale(" + scale + ")"
                );
                slide.css({
                  "z-index": 0,
                  boxShadow: "0px 0px 10px rgba(0,0,0,.5)"
                });
              }
            }
            if (this.slides.length > 0) {
              if (this.activeIndex == this.slides.length) {
                return false;
              }
              swiperAnimate(this);
            }
          },
          setTransition: function(speed) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.transition(speed + "ms");
            }
            //自定义事件
          },
          slideChangeTransitionEnd: function() {
            this.myIndex = this.activeIndex;
            that.currentIndex = this.activeIndex;
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.transform("");
              slide.css("z-index", 1);
            }
            if (this.slides.length > 0) {
              swiperAnimate(this);
            }
          }
        }
      });
    }
  }
};
