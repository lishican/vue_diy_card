<template>
  <div class="albume">
    <div :class="['container',isEdit?'edit_status':'' ]">
      <div class="albume_container theme3">
        <div class="swiper-wrapper">
          <div class="swiper-slide page1">
            <Logo/>
            <div class="bg nimated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0" >
              <img  class="aj" v-edit="this" @click="showCrop('p11',$event)" :src="themeInfo.p11" alt="">
            </div>

            <div class="tip2 animated ani"  v-show="isEdit" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0.6s" v-if="themeInfo.p11.indexOf('p11')>-1">上传一张你与爱骑摩托车的合照吧！<br>点击上传图片</div>




            <div class="line-t animated ani"  swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".3s" ><span v-edit="this"  @click="showEdit('line')">{{themeInfo.line|brfn}}</span>的骑行路线</div>
            <div class="card animated ani" swiper-animate-effect="zoomIn" swiper-animate-duration="100" swiper-animate-delay="0">
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
            <!-- <div class="img animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".3s">
              <img   v-edit="this" @click="showCrop('p11',$event)" :src="themeInfo.p11" alt="">
            </div> -->
            <!-- <div class="bb animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".6s"></div> -->
             <!--<div class="bd1 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".6s"></div>
            <div class="bd2 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".9s"></div> -->
          </div>
          <div class="swiper-slide page2">
 <div class="bg nimated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0" >
              <img src="../../assets/theme3/p112.jpg" alt="">
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
             <div class="bg nimated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0" >
              <img src="../../assets/theme3/p112.jpg" alt="">
            </div>
            <!-- <div class="bd1 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".9s"></div>
            <div class="bd2 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".6s"></div>
            <div class="bd3 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".3s"></div> -->
            <div class="pic1 animated ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="100" swiper-animate-delay="0">
              <img v-edit="this" @click="showCrop('p31',$event)" :src="themeInfo.p31" alt="">
            </div>
            <div class="pic2 animated ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="100" swiper-animate-delay=".3s">
              <img  v-edit="this" @click="showCrop('p32',$event)" :src="themeInfo.p32" alt="">
            </div>
          </div>
          <div class="swiper-slide page4">
             <div class="bg nimated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay="0" >
              <img src="../../assets/theme3/p112.jpg" alt="">
            </div>
            <div class="arrow1 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".9s">
              <img src="../../assets/theme3/arr2.svg" alt="">
            </div>
            <div class="arrow2 animated ani" swiper-animate-effect="fadeIn" swiper-animate-duration="100" swiper-animate-delay=".9s">
              <img src="../../assets/theme3/arr.svg" alt="">
            </div>

            <!-- <div class="t22 animated ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="100" swiper-animate-delay=".6s" v-edit="this" @click="showEdit('p45')">{{themeInfo.p45}}</div>
            <div class="t23 animated ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="100" swiper-animate-delay=".6s" v-edit="this" @click="showEdit('p46')" v-html='themeInfo.p46'></div> -->
            <div class="pic1 animated ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="100" swiper-animate-delay="0">
              <img  v-edit="this" @click="showCrop('p41',$event)" :src="themeInfo.p41" alt="">
            </div>
            <div class="pic2 animated ani" swiper-animate-effect="fadeInRight" swiper-animate-duration="100" swiper-animate-delay=".3s">
              <img  v-edit="this" @click="showCrop('p42',$event)" :src="themeInfo.p42" alt="">
            </div>
            <div class="pic3 animated ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="100" swiper-animate-delay=".6s">
              <img  v-edit="this" @click="showCrop('p43',$event)" :src="themeInfo.p43" alt="">
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
      themeType: "themeInfo3"
    };
  },
  filters: {
    brfn: val => {
      return val;
    }
  },
  computed: {
    ...mapGetters({
      themeInfo: "themeInfo3"
    })
  }
};
</script>
<style lang="scss" scoped>
@import url("../../utils/albume.scss");
.theme3 {
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: #eeeeee;
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
      font-size: 0.3rem;
      text-align: center;
      span {
        font-size: 0.4rem;
        font-weight: bold;
        color: #dd1d21;
      }
    }
    .linea {
      position: absolute;
      bottom: 0.8rem;
      width: 6rem;
      right: 0.75rem;
      padding-left: 0.2rem;
      font-weight: bold;
      font-size: 0.3rem;
      border-left: 0.2rem solid #fbce07;
      background: #fff;
    }
  }
  .page4 {
    // color: #fff;
    .arrow1 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      z-index: 10001;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .t22 {
      position: absolute;
      top: 1.8rem;
      left: 0.5rem;
      z-index: 1000;
      width: 1rem;
      font-size: 0.46rem;
    }
    .t23 {
      position: absolute;
      top: 4.8rem;
      right: 0.2rem;
      text-align: center;
      z-index: 1000;
      width: 1.8rem;
      font-size: 0.46rem;
    }
    .pic1 {
      position: absolute;
      top: 1.5rem;
      right: 0.25rem;
      width: 65%;
      z-index: 10001;
      img {
        display: block;
        width: 100%;
      }
    }
    .pic2 {
      position: absolute;
      top: 4.5rem;
      left: 0.25rem;
      width: 65%;
      z-index: 10001;
      img {
        display: block;
        width: 100%;
      }
    }
    .pic3 {
      position: absolute;
      top: 7.5rem;
      right: 0.25rem;
      width: 65%;
      z-index: 10001;
      img {
        display: block;
        width: 100%;
      }
    }
    .arrow2 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      z-index: 10001;
      img {
        transform: rotate(180deg);
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .page3 {
    .bd1 {
      position: absolute;
      left: 30%;
      top: 0;
      width: 3rem;
      height: 3.03rem;
      z-index: 1001;
      background: #fbce07;
    }
    .bd2 {
      position: absolute;
      right: 1.7rem;
      top: 3rem;
      width: 2.2rem;
      height: 1.2rem;
      z-index: 1001;
      background: #fbce07;
    }
    .bd3 {
      position: absolute;
      left: 36%;
      top: 7.5rem;
      width: 0.26rem;
      height: 3.03rem;
      z-index: 1001;
      background: #fbce07;
    }
    .pic1 {
      position: absolute;
      left: 0;
      top: 2rem;
      width: 100%;
      height: 5.03rem;
      z-index: 100;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .pic2 {
      position: absolute;
      right: 0;
      top: 7.5rem;
      width: 60%;
      height: 3.03rem;
      z-index: 100;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .page1 {
    .img {
      position: absolute;
      left: 0;
      top: 4.4rem;
      width: 100%;
      height: 5.03rem;
      z-index: 100;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .bd1 {
      position: absolute;
      top: 4.4rem;
      right: 0.8rem;
      width: 0.14rem;
      z-index: 100;
      height: 5.03rem;
      background: #fff;
      z-index: 10001;
    }
    .line-t {
      position: absolute;
      top: 3rem;
      left: 3rem;
      width: 3rem;
      z-index: 100;
      z-index: 10001;
      font-size: 0.34rem;
      font-weight: bold;
      // color: #fff;
      span {
        display: block;
        font-size: 0.45rem;
        position: absolute;
        top: -0.63rem;
        left: -0.4rem;
        // width: 0.64rem;
        text-align: center;
      }
    }
    .bd2 {
      position: absolute;
      top: 8rem;
      right: 0;
      width: 100%;
      z-index: 100;
      height: 0.53rem;
      background: #fff;
      z-index: 10001;
    }
    .bb {
      position: absolute;
      top: 4.51rem;
      right: 4.8rem;
      width: 0.4rem;
      z-index: 100;
      height: 3.5rem;
      background: #fbce07;
      z-index: 10000;
    }
    .tip2 {
      position: absolute;
      z-index: 1000;
      left: 50%;
      width: 60%;
      transform: translateX(-50%);
      top: 75%;
      text-align: center;
      font-size: 0.36rem;
      font-weight: bold;
      color: #fff;
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
      top: 3.5rem;
      left: 2rem;
      z-index: 100;
      width: 5.5rem;
      height: 3.5rem;
      background: #fff;
      padding-left: 0.12rem;
      border-left: 0.35rem solid #fbce07;
      // padding-left: 20px;
      // padding-top: 0.4rem;
      .t1 {
        width: 100%;
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
        width: 100%;
        padding-left: 0.2rem;
        display: flex;
        justify-content: flex-start;
        height: 0.75rem;
        align-items: center;
        margin-bottom: 0.1rem;
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
