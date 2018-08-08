<template>
  <div class="albume">
    <div :class="['container',isEdit?'edit_status':'' ]">
      <div class="albume_container theme1 ">
        <div class="swiper-wrapper">
          <div class="swiper-slide page1">
            <Logo/>
            <div class="bg">
              <img src="../../assets/theme1/bg.png" alt="">
            </div>

            <div class="tip2 animated ani" v-show="isEdit" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0.6s" v-if="themeInfo.p11.indexOf('p1_1')>-1">上传一张你与爱骑摩托车的合照吧！<br>点击上传图片</div>
            <div class="card animated ani" swiper-animate-effect="zoomIn" swiper-animate-duration="100" swiper-animate-delay="0">
              <div class="banner">
                 <img  v-edit="this" @click="showCrop('p11',$event)" :src="themeInfo.p11" alt="">
              </div>
              <img class="traval" src="../../assets/theme1/traval.png" alt="">
              <div class="t1" ><span v-edit="this"  @click="showEdit('line')">{{themeInfo.line}}</span>的骑行路线</div>
              <div :class="['t2', 'animated', 'ani',themeInfo.city=='请填写所属的城市'?'gray':'']" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0">
                <img src="../../assets/theme1/p1_2.png" alt="">
                <div v-edit="this" @click="showEdit('city')">{{themeInfo.city}}</div>
              </div>
              <div :class="['t2', 'animated', 'ani',themeInfo.motoType=='请填写摩托车型号'?'gray':'']" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".3">
                <img src="../../assets/theme1/p1_3.png" alt="">
                <div v-edit="this" @click="showEdit('motoType')">{{themeInfo.motoType}}</div>
              </div>
              <div :class="['t2', 'animated', 'ani',themeInfo.clueType=='所属俱乐部，如无可不填'?'gray':'']" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".6">
                <img src="../../assets/theme1/p1_4.png" alt="">
                <div v-edit="this" @click="showEdit('clueType')">{{themeInfo.clueType}}</div>
              </div>
              <div v-if="!isFromShare" :class="['t2', 'animated', 'ani',themeInfo.phone=='手机号不会对外公布，仅作获奖通知'?'gray':'']" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".6">
                <img src="../../assets/theme1/p1_5.png" alt="">
                <div v-edit="this" @click="showEdit('phone')">{{themeInfo.phone}}</div>
              </div>
            </div>
          </div>
          <div class="swiper-slide page2">
            <div class="bg">
              <img src="../../assets/theme1/bg.png" alt="">
            </div>
            <div class="map ">
              <Map/>
            </div>
            <div class="title animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0" v-if="mapData.rawProv">
              该路线共跨过<span>{{mapData.rawProv.split(',').length}}</span>个省份<br>踏遍<span>{{mapData.rawCity.split(',').length}}</span>个城市
            </div>
            <div class="linea animated ani" swiper-animate-effect="rotateIn" swiper-animate-duration="100" swiper-animate-delay="0">
              <div class="t1">骑行路线</div>
              <div class="line" v-if="mapData.rawProv">
                {{mapData.rawCity.replace(/,/g,'->')}}
              </div>
              <p>该线路总公里数达<span class="red">{{mapData.distant}}</span>公里</p>
            </div>
          </div>
          <div class="swiper-slide page3">
            <div class="bg">
              <img src="../../assets/theme1/bg.png" alt="">
            </div>
            <div class="text1 animated ani" v-edit="this" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0" @click="showEdit('p33')">{{themeInfo.p33}}
            </div>
            <!-- <div class="text2 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".3s" v-edit="this" @click="showEdit('p34')">{{themeInfo.p34}}
            </div> -->
            <div class="img p1 animated ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="100" swiper-animate-delay=".3s">
              <img v-edit="this" @click="showCrop('p31',$event)" :src="themeInfo.p31" alt="">
            </div>
            <div class="img p2 animated ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="100" swiper-animate-delay=".3s">
              <img v-edit="this" @click="showCrop('p32',$event)" :src="themeInfo.p32" alt="">
            </div>
          </div>
          <div class="swiper-slide page4">
            <div class="bg">
              <img src="../../assets/theme1/bg.png" alt="">
            </div>
            <div class="img1 animated ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="100" swiper-animate-delay="0">
              <img v-edit="this" @click="showCrop('p41',$event)" :src="themeInfo.p41" alt="">
            </div>
            <div class="img2 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".6s">
              <img v-edit="this" @click="showCrop('p42',$event)" :src="themeInfo.p42" alt="">
            </div>
            <div class="text animated ani" swiper-animate-effect="zoomIn" swiper-animate-duration="100" swiper-animate-delay=".6s">
              <div class="t1" v-edit="this" @click="showEdit('p45')">{{themeInfo.p45}}
              </div>
            </div>
            <div class="img3 animated ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="100" swiper-animate-delay=".3s">
              <img v-edit="this" @click="showCrop('p44',$event)" :src="themeInfo.p44" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <Edit :id='updateFile' :currentIndex.sync='currentIndex' :isFromShare.sync='isFromShare' :isHavaEdit.sync='isHavaEdit' :isEdit.sync='isEdit' :btnName.sync='btnName' :isMe.sync='isMe' :rid.sync='rid' @doShare='doShare' @handleFileUpload='handleFileUpload'
      @saveEdit='saveEdit' @choseMusic='choseMusic' @showEdit2='showEdit2' />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import editMixin from "./editMixin";
export default {
  mixins: [editMixin],
  data() {
    return {
      isEdit: false,
      themeType: "themeInfo1"
    };
  },
  computed: {
    ...mapGetters({
      themeInfo: "themeInfo1"
    })
  }
};
</script>
<style lang="scss" scoped>
@import url("../../utils/albume.scss");
.theme1 {
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .page4 {
    .img1 {
      position: absolute;
      width: 90%;
      height: 6rem;
      top: 0.5rem;
      left: 0;
      z-index: 100;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .img2 {
      position: absolute;
      width: 4rem;
      top: 2.7rem;
      left: 3rem;
      z-index: 100;
      border: 3px solid #fff;
      border-radius: 0.05rem;
      img {
        display: block;
        width: 100%;
      }
    }
    .text {
      position: absolute;
      top: 56%;
      width: 100%;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0.2rem;
      z-index: 99;
      height: 1.6rem;
      background: rgba(255, 255, 255, 0.6);
      font-weight: bold;
    }
    .img3 {
      position: absolute;
      width: 7rem;
      bottom: 0;
      right: 0;
      z-index: 100;
      border-radius: 0.05rem;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .page3 {
    .text1 {
      width: 0.7rem; // border: 1px solid #000;
      position: absolute;
      right: 0.14rem;
      font-weight: bold;
      top: 0.5rem;
      z-index: 100;
      text-align: center;
      padding: 0.14rem;
    }
    .text2 {
      width: 0.7rem; // border: 1px solid #000;
      position: absolute;
      right: 0.85rem;
      font-weight: bold;
      top: 0.5rem;
      z-index: 100;
      padding: 0.14rem;
      text-align: center;
    }
    .p1 {
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 75%;
      z-index: 100;
      img {
        display: block;
        width: 100%;
      }
    }
    .p2 {
      position: absolute;
      right: 0.8rem;
      top: 7rem;
      width: 5rem;
      height: 4rem;
      z-index: 1020;
      border: 3px solid #fff;
      border-radius: 3px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .page2 {
    .map {
      position: absolute;
      top: 20%;
      left: 0;
      width: 100%;
      z-index: 100;
    }
    .title {
      position: absolute;
      top: 0.8rem;
      width: 6rem;
      right: 0.75rem;
      font-size: 0.3rem;
      text-align: center;
      z-index: 1222;
      span {
        font-size: 0.4rem;
        font-weight: bold;
        color: #dd1d21;
      }
    }
    .linea {
      z-index: 1222;
      position: absolute;
      bottom: 0.8rem;
      width: 6rem;
      right: 0.75rem;
      padding-left: 0.2rem;
      font-weight: bold;
      font-size: 0.3rem;
      border-left: 0.2rem solid #fbce07;
    }
  }
  .page1 {
    .tip2 {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      width: 60%;
      font-size: 0.34rem;
      color: #fff;
      font-weight: bold;
      text-align: center;
      z-index: 100000;
      pointer-events: none;
      height: 0.8rem;
      border-radius: 0.4rem;
      color: #fff;
      background: #f44336;
      pointer-events: none;
      font-size: 0.24rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -3.13rem;
      margin-top: -4.29rem;
      z-index: 100;
      width: 6.16rem;
      height: 8.38rem;
      background: #fff;
      .banner {
        display: block;
        width: 100%;
        height: 4.3rem;
        position: relative;
        &.edit_img {
          &::after {
            display: flex;
            align-items: flex-start;
            padding-top: 1.5rem;
            opacity: 0;
          }
          &::before {
            display: flex;
            align-items: flex-start;
            padding-top: 1.5rem;
            opacity: 0;
          }
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .traval {
        position: absolute;
        bottom: 0.4rem;
        right: 0.2rem;
        width: 1rem;
        font-size: 0.49rem;
      }
      .t1 {
        width: 80%;
        padding-left: 0.3rem;
        padding-top: 0.3rem;
        font-weight: bold;
        font-size: 0.4rem;
        span {
          font-size: 0.45rem;
          margin-right: 0.1rem;
        }
      }
      .t2 {
        width: 90%;
        padding-left: 0.2rem;
        display: flex;
        justify-content: flex-start;
        height: 0.8rem;
        align-items: center;
        .gray {
        }
        div {
          flex: 1;
          padding: 0.12rem;
        }
        img {
          display: block;
          width: 0.3rem;
          margin-right: 0.12rem;
        }
      }
    }
  }
}
</style>
