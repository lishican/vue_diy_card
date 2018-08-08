<template>
  <div class="albume">
    <div :class="['container',isEdit?'edit_status':'' ]">
      <div class="albume_container theme2 ">
        <div class="swiper-wrapper">
          <div class="swiper-slide page1">
            <Logo/>
            <div class="bg">
              <img  v-edit="this" @click="showCrop('p11',$event)" :src="themeInfo.p11" alt="">
            </div>

            <div class="tip2 animated ani" v-show="isEdit" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0.6s" v-if="themeInfo.p11.indexOf('p2')>-1">上传一张你与爱骑摩托车的合照吧！<br>点击上传图片</div>
            <!-- <div class="title animated ani"  swiper-animate-effect="zoomIn" swiper-animate-duration="100" swiper-animate-delay="0">
              <img  v-edit="this" @click="showCrop('p11',$event)" :src="themeInfo.p11" alt="">
            </div> -->
            <div class="card animated ani"  swiper-animate-effect="zoomIn" swiper-animate-duration="100" swiper-animate-delay="0">
              <div class="t1 animated ani"   swiper-animate-effect="fadeInDown" swiper-animate-duration="100" swiper-animate-delay="0" ><span v-edit="this"  @click="showEdit('line')">{{themeInfo.line}}</span>的骑行路线</div>
            <div :class="['t2', 'animated', 'ani',themeInfo.city=='请填写所属的城市'?'gray':'']" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0">
                <img src="../../assets/theme2/icon1.png" alt="">
                <div v-edit="this" @click="showEdit('city')">{{themeInfo.city}}</div>
              </div>
              <div :class="['t2', 'animated', 'ani',themeInfo.motoType=='请填写摩托车型号'?'gray':'']" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".3">
                <img src="../../assets/theme2/icon2.png" alt="">
                <div v-edit="this" @click="showEdit('motoType')">{{themeInfo.motoType}}</div>
              </div>
              <div :class="['t2', 'animated', 'ani',themeInfo.clueType=='所属俱乐部，如无可不填'?'gray':'']" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".6">
                <img src="../../assets/theme2/icon3.png" alt="">
                <div v-edit="this" @click="showEdit('clueType')">{{themeInfo.clueType}}</div>
              </div>
                <div v-if="!isFromShare" :class="['t2', 'animated', 'ani',themeInfo.phone=='手机号不会对外公布，仅作获奖通知'?'gray':'']" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".6">
                <img src="../../assets/theme2/icon4.png" alt="">
                <div v-edit="this" @click="showEdit('phone')">{{themeInfo.phone}}</div>
              </div>
            </div>
          </div>
          <div class="swiper-slide page2">
            <div class="bg">
            <img   :src="themeInfo.p11" alt="">
            </div>
               <div class="map " >
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
            <div class="img1 animated ani"  swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0">
              <img  v-edit="this" @click="showCrop('p31',$event)" :src="themeInfo.p31" alt="">
            </div>
            <div class="bd animated ani"  swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".3s" ></div>
            <div class="wave">
              <img src="../../assets/theme2/p2.png" alt="">
            </div>
            <div class="tt animated ani" v-edit="this"  swiper-animate-effect="fadeInRight" swiper-animate-duration="100" swiper-animate-delay=".3s" @click="showEdit('p32')">{{themeInfo.p32}} 
            </div>
            <!-- <div class="t1 animated ani" v-edit="this"  swiper-animate-effect="fadeInUp" swiper-animate-duration="100" swiper-animate-delay=".6s" @click="showEdit('p33')">{{themeInfo.p33}} 
            </div> -->
            <!-- <div class="line animated ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="100" swiper-animate-delay=".7s"  >..................................</div> -->
            <div class="t2 animated ani" v-edit="this" swiper-animate-effect="fadeInUp" swiper-animate-duration="100" swiper-animate-delay=".9s" @click="showEdit('p34')">{{themeInfo.p34}} 
            </div>
          </div>
          <div class="swiper-slide page4">
            <div class="pic1 animated ani" swiper-animate-effect="fadeInDown" swiper-animate-duration="100" swiper-animate-delay=".2s">
              <img  v-edit="this" @click="showCrop('p41',$event)" :src="themeInfo.p41" alt="">
            </div>
            <div class="pic2 animated ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="100" swiper-animate-delay=".4s">
              <img  v-edit="this" @click="showCrop('p42',$event)" :src="themeInfo.p42" alt="">
            </div>
            <div class="pic3 animated ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="100" swiper-animate-delay=".6s">
              <img v-edit="this" @click="showCrop('p43',$event)" :src="themeInfo.p43" alt="">
            </div>
            <div class="pic4 animated ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="100" swiper-animate-delay=".8s">
              <img v-edit="this" @click="showCrop('p44',$event)" :src="themeInfo.p44" alt="">
            </div>
            <div class="pic5 animated ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="100" swiper-animate-delay="1s">
              <img src="../../assets/theme2/p3.png" alt="">
            </div>
            <div class="text animated ani"  swiper-animate-effect="fadeInUp" swiper-animate-duration="100" swiper-animate-delay="1s" v-edit="this" @click="showEdit('clueType')">{{themeInfo.p45}}
            </div>
          </div>
        </div>
      </div>
    </div>
     <Edit :id='updateFile' :currentIndex.sync='currentIndex' :isFromShare.sync='isFromShare' :isHavaEdit.sync='isHavaEdit' :isEdit.sync='isEdit' :btnName.sync='btnName' :isMe.sync='isMe' :rid.sync='rid' @doShare='doShare' @handleFileUpload='handleFileUpload' @saveEdit='saveEdit' @choseMusic='choseMusic' @showEdit2='showEdit2'
    />
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
      themeType: "themeInfo2"
    };
  },
  computed: {
    ...mapGetters({
      themeInfo: "themeInfo2"
    })
  }
};
</script>
<style lang="scss" scoped>
@import url("../../utils/albume.scss");
.theme2 {
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
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
      z-index: 100;
      font-size: 0.3rem;
      text-align: center;
      color: #fff;
      span {
        font-size: 0.4rem;
        font-weight: bold;
        color: #dd1d21;
      }
    }
    .linea {
      position: absolute;
      bottom: 0.8rem;
      z-index: 1000;
      width: 6rem;
      right: 0.75rem;
      padding-left: 0.2rem;
      font-weight: bold;
      font-size: 0.3rem;
      color: #fff;
      border-left: 0.2rem solid #fbce07;
    }
  }
  .page4 {
    .pic1 {
      position: absolute;
      top: 0.3rem;
      left: 50%;
      margin-left: -3.5rem;
      width: 7rem;
      height: 4rem;
      z-index: 1000;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .pic2 {
      position: absolute;
      top: 4.6rem;
      right: 0.25rem;
      width: 3rem;
      height: 3rem;
      z-index: 1000;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .pic3 {
      position: absolute;
      top: 7.9rem;
      right: 0.25rem;
      width: 3rem;
      height: 3rem;
      z-index: 1000;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .pic5 {
      position: absolute;
      top: 5.5rem;
      left: 0.25rem;
      width: 3.5rem;
      height: 3rem;
      z-index: 1000;
      img {
        display: block;
        width: 100%;
      }
    }
    .text {
      position: absolute;
      top: 5rem;
      left: 0.25rem;
      width: 3.5rem;
      z-index: 1000;
      font-weight: bold;
      font-size: 0.36rem;
    }
    .pic4 {
      position: absolute;
      top: 7.9rem;
      left: 0.25rem;
      width: 3.8rem;
      height: 3rem;
      z-index: 1000;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .page3 {
    width: 100%;
    height: 100%;
    background: #fefefe;
    .img1 {
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      width: 5rem;
      height: 7rem;
      z-index: 1000;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .tt {
      position: absolute;
      top: 1.5rem;
      right: 0.8rem;
      width: 0.5rem;
      z-index: 1000;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .t1 {
      position: absolute;
      top: 8rem;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .t2 {
      position: absolute;
      top: 9rem;
      left: 50%;
      width: 7rem;
      margin-left: -3.5rem;
      text-align: left;
      font-size: 0.28rem;
      text-indent: 1em;
      font-weight: bold;
    }
    .line {
      position: absolute;
      top: 8.5rem;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .wave {
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
      width: 1.5rem;
      z-index: 1000;
      img {
        display: block;
        width: 100%;
      }
    }
    .bd {
      position: absolute;
      top: 0.6rem;
      left: 0.6rem;
      width: 5rem;
      height: 7rem;
      border: 1px solid #dbdbdb;
      z-index: 999;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .page1 {
    .tip2 {
      position: absolute;
      z-index: 1000;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      top: 30%;
      text-align: center;
      font-size: 0.36rem;
      font-weight: bold;
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
      bottom: 15%;
      left: 50%;
      margin-left: -3.13rem;
      margin-top: -4.29rem;
      z-index: 100;
      width: 6.26rem;
      height: 3.38rem;
      background: rgba(0, 0, 0, 0.56);
      color: #fff;
      padding-left: 20px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0.2rem;
        left: -0.2rem;
        width: 100%;
        height: 100%;
        z-index: 100;
        border: 1px solid #fff;
        pointer-events: none;
      }
      .t1 {
        width: 100%;
        padding-left: 0.3rem;
        // padding-top: 0.3rem;
        font-weight: bold;
        font-size: 0.4rem;
        position: relative;
        top: -0.7rem;
        span {
          font-size: 0.45rem;
          margin-right: 0.1rem;
        }
      }
      .t2 {
        width: 100%;
        padding-left: 0.2rem;
        display: flex;
        justify-content: flex-start;
        height: 0.75rem;
        position: relative;
        top: -0.3rem;
        align-items: center;
        div {
          display: flex;
          align-items: center;
          height: 0.75rem;
          flex: 1;
          padding: 0.12rem;
        }
        img {
          display: block;
          width: 0.4rem;
          margin-right: 0.2rem;
        }
      }
    }
    .title {
      position: absolute;
      top: 1.5rem;
      margin-left: -3.13rem;
      z-index: 100;
      left: 50%;
      width: 6.26rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 1.56);
      border: 1px solid #dbdbdb;
      border-radius: 0.1rem;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
