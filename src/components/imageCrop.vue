<template>
  <div class="crop_page_root " v-show='cropInfo.show'>
    <div class="edit">
      <img class="main" ref="editimg" src='' :style="{'width':cropInfo.rawImg.ow,'height':cropInfo.rawImg.oh}" :src="cropInfo.rawImg.key" alt="裁剪的图片" />
    </div>
    <div class="btg">
      <div class="crop btn" @click='rotate'>
        旋转
      </div>
    <div class="crop btn" @click="back">返回</div>
      
    </div>
    <div class="crop2 btn" @click='doCrop'>
        {{isLoading?"图片处理中...":"确认裁剪"}}
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cropper from "cropperjs";
import uuid from "uuid";
import axios from "axios";
import "cropperjs/dist/cropper.min.css";
export default {
  data() {
    return {
      cropper: null,
      isLoading: false,
      imgInfo: {
        w: 100,
        h: 100,
        src: require("../assets/car.png")
      }
    };
  },
  components: {},
  filters: {},
  watch: {
    cropInfo: {
      handler(curVal, oldVal) {
        this.initCrop();
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      cropInfo: "cropInfo"
    })
  },
  mounted() {},
  methods: {
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    doCrop() {
      var that = this;
      let canvasObj = that.cropper.getCroppedCanvas({
        width: parseInt(that.cropInfo.rawImg.ow, 10) * 2,
        height: parseInt(that.cropInfo.rawImg.oh, 10) * 2
      });
      this.isLoading = true;

      console.log(canvasObj);

      let blob = this.dataURLtoBlob(canvasObj.toDataURL("image/png"));
      this.handleUpload(blob);
      // let base64 = canvasObj.toBlob(blob => {
      //   console.log(blob);
      //   this.handleUpload(blob);
      // });
      // console.log(base64);
    },
    getRamdomStr() {
      return uuid() + ".png";
    },
    // 上传token
    getToken() {
      return axios.get("http://t10.miaoxing100.cn/common/uploadToken");
    },
    // 上传到七牛
    uploadToQn(formData) {
      axios
        .post("http://up-z2.qiniu.com/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(data => {
          let url = "http://ofvbasfrz.bkt.clouddn.com/" + data.data.key;
          this.updateImg(url);
        });
    },

    back() {
      this.$store.dispatch("hideCrop", {});
    },
    updateImg(url) {
      this.isLoading = false;
      this.$store.dispatch("saveCrop", {
        text: url
      });
    },
    // input file 合并到表单
    handleUpload(blob) {
      this.getToken().then(data => {
        console.log(data);
        let token = data.data.data;
        let key = this.getRamdomStr();
        let file = blob;
        let f = new FormData();
        f.append("token", token);
        f.append("key", key);
        f.append("file", file);
        this.uploadToQn(f);
      });
    },
    rotate() {
      this.cropper.rotate(10);
    },
    initCrop() {
      this.cropper && this.cropper.destroy();
      let aspectRatio =
        parseInt(this.cropInfo.rawImg.ow, 10) /
        parseInt(this.cropInfo.rawImg.oh, 10);
      this.$nextTick(() => {
        this.cropper = new Cropper(this.$refs["editimg"], {
          dragMode: "move",
          responsive: true,
          aspectRatio: aspectRatio,
          autoCropArea: 0.0,
          restore: false,
          guides: false,
          center: false,
          highlight: false,
          cropBoxMovable: false,
          cropBoxResizable: false,
          toggleDragModeOnDblclick: false,
          rotatable: true
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.crop_page_root {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3002;
  background: #232e3a;
  -webkit-overflow-scrolling: touch;
  .btg {
    margin: 0.2rem auto;
    width: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn {
    border-radius: 0.12rem;
  }
  .crop2 {
    margin: 0 auto;
    width: 6rem;
  }
  .edit {
    width: 80%;
    height: 7rem;
    border: 1px solid #ff0000;
    margin: 0.5rem auto;
  }
}
</style>
