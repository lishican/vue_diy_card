<template>
  <div class="text_eidt_root  fadeIn" v-show='editInfo.show' @click.capture.prevent='1'>
    <div class="modal animated slideInDown">
      <textarea v-model.trim="text" :placeholder="placeholderV" @input="doChange" @focus="doFoucs" />
      <div class='tip' >
        {{editInfo.key=='line'?'用户名称最多5个字':''}} 当前字数{{text.length}}
      </div>}
      <div class="b_btn_group">
        <div class="btn" @click="doCancel" v-fib="{type:'相册编辑弹框',name:'取消'}">
          取消
        </div>
        <div class="btn" @click="doSave" v-fib="{type:'相册编辑弹框',name:'保存'}">
          保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      text: "",
      placeholderV: ""
    };
  },
  components: {},
  filters: {},
  computed: {
    ...mapGetters({
      editInfo: "editInfo"
    })
  },
  watch: {
    editInfo: {
      handler(curVal, oldVal) {
        this.placeholderV = this.editInfo.currentText;
        // this.placeholderV = this.editInfo.currentText;
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    doChange(e) {
      console.log(this.editInfo);
      if (this.editInfo.key == "line") {
        this.text = e.target.value.slice(0, 5);
      }
      if (this.editInfo.key == "phone") {
        this.text = e.target.value.replace(/[^\d]/g, "");
        this.text = this.text.slice(0, 11);
      }
    },
    doFoucs(e) {
      let value = e.target.value;

      // if (
      //   value == "您" ||
      //   value == "请填写所属的城市" ||
      //   value == "请填写摩托车型号" ||
      //   value == "请填写所属俱乐部"
      // ) {
      //   this.text;
      // }
    },
    doSave() {
      this.$store.dispatch("saveEditText", { text: this.text });
      this.text = "";
    },
    doCancel() {
      this.$store.dispatch("hideEditText", {});
      this.text = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.text_eidt_root {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000005;
  background: rgba(0, 0, 0, 0.8);
  .modal {
    animation-duration: 0.2s;
    position: absolute;
    top: 1rem;
    left: 50%;
    margin-left: -3rem;
    width: 6rem;
    height: 4rem;
    background: #fff;
    border-radius: 0.1rem;
    overflow: hidden;
    textarea {
      width: 100%;
      height: 3rem;
      border-radius: 0.3rem 0.3rem 0 0;
      padding: 0.2rem;
      border: none;
    }
    .tip {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0.8rem;
      background: #f8f8f8;
      line-height: 1.8;
      text-align: right;
      padding-right: 0.2rem;
      color: #dd1d21;
      font-size: 0.24rem;
    }
    .b_btn_group {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 0.8rem;
      border-top: 1px solid #dbdbdb;
      .btn {
        height: 100%;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #dd1d21;
        color: #fff;
        &:first-of-type {
          background: #b5b5b5;
          color: #fff;
          border-right: 1px solid #dbdbdb;
        }
      }
    }
  }
}
</style>
